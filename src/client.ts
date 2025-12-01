import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {
  MVRApiConfig,
  AMOSScoreRequest,
  AMOSScoreResponse,
  HealthResponse,
  MVRError,
} from './types';

/**
 * Structured error wrapper for AMOS / MVR API failures.
 */
export class MVRApiError extends Error {
  public readonly errorData: MVRError;

  constructor(errorData: MVRError) {
    super(errorData.message || errorData.error || 'MVR API error');
    this.name = 'MVRApiError';
    this.errorData = errorData;
  }
}

/**
 * Main AMOS-MVR API client (license + email authentication).
 *
 * - Scores via POST /v1/amos/score
 * - Health via  GET  /health
 */
export class MVRClient {
  private client: AxiosInstance;
  private config: MVRApiConfig;

  constructor(config: MVRApiConfig) {
    if (!config.license || !config.email) {
      throw new Error('license and email are required in MVRApiConfig');
    }

    this.config = {
      baseURL: 'https://africanmarketos.com',
      timeout: 30000,
      maxRetries: 3,
      ...config,
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'x-mvr-license': this.config.license,
        'x-buyer-email': this.config.email,
        'Content-Type': 'application/json',
        // keep this in sync with package.json if you bump
        'User-Agent': 'amos-mvr-ts-client/1.0.0',
      },
    });
  }

  // ------------------------------------------------------------
  // INTERNAL REQUEST WRAPPER
  // ------------------------------------------------------------
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const maxRetries = this.config.maxRetries ?? 0;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response: AxiosResponse<T> = await this.client.request<T>(config);
        return response.data;
      } catch (err) {
        const axiosErr = err as AxiosError;

        // If this is an Axios error with a response, map it to MVRError
        if (axios.isAxiosError(axiosErr) && axiosErr.response) {
          const status = axiosErr.response.status;

          // Handle rate limiting with Retry-After header
          if (status === 429 && attempt < maxRetries) {
            const retryAfterHeader = axiosErr.response.headers?.['retry-after'];
            const retryAfterSeconds = retryAfterHeader
              ? parseInt(String(retryAfterHeader), 10)
              : 60;

            await new Promise((resolve) =>
              setTimeout(resolve, retryAfterSeconds * 1000),
            );
            continue;
          }

          const raw = (axiosErr.response.data || {}) as any;

          const errorData: MVRError = {
            ok: false,
            error: raw.error ?? 'API_ERROR',
            error_code: raw.error_code ?? String(status ?? 'API_ERROR'),
            message:
              raw.message ??
              raw.error ??
              'Unknown error from AMOS / MVR API endpoint',
            request_id: raw.request_id,
            limit: raw.limit,
            window: raw.window,
            retry_after: raw.retry_after,
            attribution: raw.attribution ?? {
              framework: 'Minimum Viable Relationships (MVR)',
              creator: 'Farouk Mark Mukiibi',
              source: 'African Market OS',
              license: 'CC BY 4.0 | Commercial Use Licensed',
              doi: '10.5281/zenodo.17310446',
            },
          };

          throw new MVRApiError(errorData);
        }

        // Network / unknown error with no response
        if (attempt === maxRetries) {
          const fallbackError: MVRError = {
            ok: false,
            error: 'NETWORK_ERROR',
            error_code: 'NETWORK_ERROR',
            message:
              err instanceof Error ? err.message : 'Unknown network error',
            attribution: {
              framework: 'Minimum Viable Relationships (MVR)',
              creator: 'Farouk Mark Mukiibi',
              source: 'African Market OS',
              license: 'CC BY 4.0 | Commercial Use Licensed',
              doi: '10.5281/zenodo.17310446',
            },
          };
          throw new MVRApiError(fallbackError);
        }

        // simple exponential backoff for transient network errors
        await new Promise((resolve) =>
          setTimeout(resolve, 2 ** attempt * 1000),
        );
      }
    }

    // This should be unreachable, but TS likes a final throw
    throw new MVRApiError({
      ok: false,
      error: 'UNKNOWN_ERROR',
      error_code: 'UNKNOWN_ERROR',
      message: 'Unknown error calling AMOS / MVR API',
      attribution: {
        framework: 'Minimum Viable Relationships (MVR)',
        creator: 'Farouk Mark Mukiibi',
        source: 'African Market OS',
        license: 'CC BY 4.0 | Commercial Use Licensed',
        doi: '10.5281/zenodo.17310446',
      },
    });
  }

  // ------------------------------------------------------------
  // AMOS SCORING
  // ------------------------------------------------------------

  /**
   * POST /v1/amos/score
   *
   * Compute AMOS relational risk score, porosity, MVR-I and safe credit limit.
   */
  async scoreAMOS(payload: AMOSScoreRequest): Promise<AMOSScoreResponse> {
    return this.request<AMOSScoreResponse>({
      method: 'POST',
      url: '/v1/amos/score',
      data: payload,
    });
  }

  // ------------------------------------------------------------
  // HEALTH
  // ------------------------------------------------------------

  /**
   * GET /health
   *
   * Lightweight health probe (no auth required).
   */
  async health(): Promise<HealthResponse> {
    return this.request<HealthResponse>({
      method: 'GET',
      url: '/health',
    });
  }
}

// Optional backwards-compat export for old codebases
export { MVRClient as MVRApiClient };
