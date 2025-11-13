import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { 
  MVRApiConfig, 
  MVRScoreResponse, 
  SurveyAggregateRequest, 
  SurveyAggregateResponse,
  TrendsResponse,
  ForecastRequest,
  ForecastResponse,
  CompareRequest,
  CompareResponse,
  BenchmarkResponse,
  InsightsResponse,
  TemperatureResponse,
  PolicyAuditResponse,
  StoryResponse,
  MetaResponse,
  UsageResponse,
  WhoAmIResponse,
  DocsResponse,
  SessionResponse,
  HealthResponse,
  MVRError
} from './types';

export class MVRApiClient {
  private client: AxiosInstance;
  private config: MVRApiConfig;

  constructor(config: MVRApiConfig) {
    this.config = {
      baseURL: 'https://africanmarketos.com/v1',
      timeout: 30000,
      maxRetries: 3,
      ...config
    };

    if (!this.config.license || !this.config.email) {
      throw new Error('License and email are required for MVR API client');
    }

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'x-mvr-license': this.config.license,
        'x-buyer-email': this.config.email,
        'Content-Type': 'application/json',
        'User-Agent': `mvr-api-ts-client/2.6.0`
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        console.debug(`MVR API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          console.warn(`Rate limited. Retrying after ${retryAfter} seconds`);
          await new Promise(resolve => setTimeout(resolve, (parseInt(retryAfter) || 60) * 1000));
          return this.client.request(error.config!);
        }
        return Promise.reject(error);
      }
    );
  }

  private async request<T>(endpoint: string, options: any = {}): Promise<T> {
    try {
      const response = await this.client.request<T>({
        url: endpoint,
        ...options
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw {
        ok: false,
        error: 'NETWORK_ERROR',
        error_code: 'NETWORK_ERROR',
        message: error instanceof Error ? error.message : 'Unknown network error',
        attribution: {
          framework: 'Minimum Viable Relationships (MVR)',
          creator: 'Farouk Mark Mukiibi',
          source: 'African Market OS',
          license: 'CC BY 4.0 | Commercial Use Licensed',
          doi: '10.5281/zenodo.17310446'
        }
      };
    }
  }

  // Scores endpoints
  async getScores(sector?: string): Promise<MVRScoreResponse> {
    const params = sector ? { sector } : {};
    return this.request<MVRScoreResponse>('/v1/scores', { method: 'GET', params });
  }

  async surveyAggregate(request: SurveyAggregateRequest): Promise<SurveyAggregateResponse> {
    return this.request<SurveyAggregateResponse>('/v1/survey-aggregate', {
      method: 'POST',
      data: request
    });
  }

  // Intelligence endpoints
  async getTrends(sector?: string, days?: number): Promise<TrendsResponse> {
    const params: any = {};
    if (sector) params.sector = sector;
    if (days) params.days = days;
    
    return this.request<TrendsResponse>('/v1/trends', { method: 'GET', params });
  }

  async forecast(request: ForecastRequest): Promise<ForecastResponse> {
    return this.request<ForecastResponse>('/v1/forecast', {
      method: 'POST',
      data: request
    });
  }

  async compare(request: CompareRequest): Promise<CompareResponse> {
    return this.request<CompareResponse>('/v1/compare', {
      method: 'POST',
      data: request
    });
  }

  async getBenchmark(sector?: string): Promise<BenchmarkResponse> {
    const params = sector ? { sector } : {};
    return this.request<BenchmarkResponse>('/v1/benchmark', { method: 'GET', params });
  }

  async getInsights(sector?: string): Promise<InsightsResponse> {
    const params = sector ? { sector } : {};
    return this.request<InsightsResponse>('/v1/insights', { method: 'GET', params });
  }

  async getTemperature(): Promise<TemperatureResponse> {
    return this.request<TemperatureResponse>('/v1/temperature', { method: 'GET' });
  }

  async getPolicyMulti(): Promise<PolicyAuditResponse> {
    return this.request<PolicyAuditResponse>('/v1/policy_multi', { method: 'GET' });
  }

  async postPolicyMulti(): Promise<PolicyAuditResponse> {
    return this.request<PolicyAuditResponse>('/v1/policy_multi', { method: 'POST' });
  }

  async getStory(): Promise<StoryResponse> {
    return this.request<StoryResponse>('/v1/story', { method: 'GET' });
  }

  async postStory(): Promise<StoryResponse> {
    return this.request<StoryResponse>('/v1/story', { method: 'POST' });
  }

  // Utilities endpoints
  async getMeta(): Promise<MetaResponse> {
    return this.request<MetaResponse>('/v1/meta', { method: 'GET' });
  }

  async getUsage(): Promise<UsageResponse> {
    return this.request<UsageResponse>('/v1/usage', { method: 'GET' });
  }

  async whoami(): Promise<WhoAmIResponse> {
    return this.request<WhoAmIResponse>('/v1/whoami', { method: 'GET' });
  }

  async getDocs(): Promise<DocsResponse> {
    return this.request<DocsResponse>('/v1/docs', { method: 'GET' });
  }

  async createSession(license: string, email: string): Promise<SessionResponse> {
    return this.request<SessionResponse>('/v1/session/new', {
      method: 'POST',
      data: { license, email }
    });
  }

  async health(): Promise<HealthResponse> {
    return this.request<HealthResponse>('/v1/health', { method: 'GET' });
  }

  // Session-based client
  withSession(sessionToken: string): SessionMVRApiClient {
    return new SessionMVRApiClient({
      baseURL: this.config.baseURL,
      sessionToken,
      timeout: this.config.timeout
    });
  }
}

export class SessionMVRApiClient {
  private client: AxiosInstance;

  constructor(config: { baseURL?: string; sessionToken: string; timeout?: number }) {
    this.client = axios.create({
      baseURL: config.baseURL || 'https://africanmarketos.com/v1',
      timeout: config.timeout || 30000,
      headers: {
        'x-mvr-session': config.sessionToken,
        'Content-Type': 'application/json',
        'User-Agent': `mvr-api-ts-client/2.6.0`
      }
    });
  }

  async getScores(sector?: string): Promise<MVRScoreResponse> {
    const params = sector ? { sector } : {};
    const response = await this.client.get<MVRScoreResponse>('/v1/scores', { params });
    return response.data;
  }

  // Additional session endpoints can be added here...
}
