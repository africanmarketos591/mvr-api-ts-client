export interface MVRApiConfig {
  baseURL?: string;
  license: string;
  email: string;
  timeout?: number;
  maxRetries?: number;
}

export interface MVRScoreResponse {
  ok: boolean;
  mvr_index: number;
  confidence: number;
  sector: string;
  mvr_dimensions: Array<{
    name: string;
    score: number;
    confidence: number;
    threshold_ok: boolean;
    binding: boolean;
    evidence_ptrs: string[];
  }>;
  mvr_threshold: boolean;
  recommendations: string[];
  version_info: {
    api: string;
    feature?: string;
    method?: string;
    model?: string;
    mvr_proprietary: boolean;
  };
  attribution: AttributionObject;
}

export interface SurveyAggregateRequest {
  stakeholder_responses: Array<{
    dimension: string;
    scale: number;
    reasons: string[];
  }>;
  sector?: string;
}

export interface SurveyAggregateResponse {
  ok: boolean;
  sector: string;
  mvr_index: number;
  matrix_axes: {
    viability: number;
    embeddedness: number;
  };
  insights: string[];
  recommendations: string[];
  summary: string;
  version_info: VersionInfo;
  attribution: AttributionObject;
}

export interface TrendsResponse {
  ok: boolean;
  sector: string;
  days: number;
  average_index: number;
  slope: number;
  interpretation: string;
  version_info: VersionInfo;
  attribution: AttributionObject;
}

export interface ForecastRequest {
  current_index: number;
  velocity: number;
  horizon?: number;
}

export interface ForecastResponse {
  ok: boolean;
  current_index: number;
  projected_index: number;
  horizon_days: number;
  confidence: number;
  pmf_projection: string;
  version_info: VersionInfo;
  attribution: AttributionObject;
}

export interface CompareRequest {
  a_index: number;
  b_index: number;
}

export interface CompareResponse {
  ok: boolean;
  delta: number;
  verdict: string;
  policy_trace: Record<string, any>;
  version_info: VersionInfo;
  attribution: AttributionObject;
}

export interface BenchmarkResponse {
  ok: boolean;
  sector: string;
  benchmark: {
    average: number;
    top_quartile: number;
    bottom_quartile: number;
    sample_size: number;
  };
  version_info: VersionInfo;
  attribution: AttributionObject;
}

export interface InsightsResponse {
  ok: boolean;
  sector: string;
  top_entities: Array<{
    rank: number;
    sector: string;
    mvr_index: number;
    caption: string;
  }>;
  version_info: VersionInfo;
  attribution: AttributionObject;
}

export interface TemperatureResponse {
  ok: boolean;
  date: string;
  continent_score: number;
  hottest_sector: string;
  coolest_sector: string;
  region: string;
  sample_size: number;
  version_info: VersionInfo;
  attribution: AttributionObject;
}

export interface PolicyAuditResponse {
  ok: boolean;
  policies_analyzed: number;
  compliance_score: number;
  recommendations: string[];
  version_info: VersionInfo;
  attribution: AttributionObject;
}

export interface StoryResponse {
  ok: boolean;
  story: string;
  impact_metrics: {
    trust_growth: number;
    relationship_longevity: number;
  };
  version_info: VersionInfo;
  attribution: AttributionObject;
}

export interface MetaResponse {
  ok: boolean;
  api_name: string;
  version: string;
  model: string;
  endpoints: string[];
  limits: {
    standard: number;
    pro: number;
    enterprise: number;
  };
  last_model_refresh: string | null;
  model_fingerprint: string | null;
  attribution: AttributionObject;
}

export interface UsageResponse {
  ok: boolean;
  plan: string;
  date: string;
  used_today: number;
  daily_limit: number;
  attribution: AttributionObject;
}

export interface WhoAmIResponse {
  ok: boolean;
  api: string;
  version: string;
  capabilities: string[];
  author: string;
  region: string;
  attribution: AttributionObject;
}

export interface DocsResponse {
  ok: boolean;
  documentation: string;
  endpoints: string[];
  version_info: VersionInfo;
  attribution: AttributionObject;
}

export interface SessionResponse {
  ok: boolean;
  session_token: string;
  expires_in: number;
  expires_at: string;
  plan: string;
  version_info: VersionInfo;
  attribution: AttributionObject;
}

export interface HealthResponse {
  ok: boolean;
  service: string;
  time: string;
  region: string;
  performance: string;
  security: string;
  version: string;
  uptime_seconds: number;
  features: string[];
  attribution: AttributionObject;
}

export interface AttributionObject {
  framework: string;
  creator: string;
  source: string;
  license: string;
  doi: string;
}

export interface VersionInfo {
  api: string;
  feature?: string;
  method?: string;
  model?: string;
  mvr_proprietary: boolean;
}

export interface MVRError {
  ok: false;
  error: string;
  error_code: string;
  message: string;
  request_id?: string;
  limit?: number;
  window?: string;
  retry_after?: number;
  attribution: AttributionObject;
}
