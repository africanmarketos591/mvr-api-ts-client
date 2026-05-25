export interface MVRClientConfig {
  baseURL?: string;
  apiKey?: string;
  timeout?: number;
  maxRetries?: number;
  responseProfile?: "full_advisory" | "strict_calibrated";
}

export interface MVRApiErrorEnvelope {
  error?: string;
  message?: string;
  details?: unknown;
  validation_errors?: string[];
  response_contract_version?: string;
  response_meta?: Record<string, unknown>;
}

export interface EntityResolveRequest {
  entity_name?: string;
  query?: string;
  country?: string;
  [key: string]: unknown;
}

export interface EvidenceCompletenessRequest {
  subject: {
    entity_name: string;
    entity_archetype: string;
    country?: string;
    [key: string]: unknown;
  };
  market_scope: {
    country: string;
    city?: string;
    sector?: string;
    analysis_date?: string;
    [key: string]: unknown;
  };
  evidence_pack: Array<Record<string, unknown>>;
  stakeholder_scope?: string[];
  target_verdict?: string;
  [key: string]: unknown;
}

export interface ContextCompileRequest extends Record<string, unknown> {
  analysis_date?: string;
  requested_use?: string;
  market_scope?: Record<string, unknown>;
  evidence_pack?: Array<Record<string, unknown>>;
}

export interface DecisionCheckRequest extends Record<string, unknown> {
  mode?: "exploratory" | "evidence_backed" | "compiled_evidence";
  subject?: Record<string, unknown>;
  market_scope?: Record<string, unknown>;
  evidence_pack?: Array<Record<string, unknown>>;
}

export interface MVRResponseMeta {
  environment?: "sandbox" | string;
  illustrative_only?: boolean;
  not_for_production?: boolean;
  response_profile?: string;
  output_mode?: string;
  model_version?: string;
  [key: string]: unknown;
}

export interface MVRGenericResponse extends Record<string, unknown> {
  status?: string;
  response_meta?: MVRResponseMeta;
}
