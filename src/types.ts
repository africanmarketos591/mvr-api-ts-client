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

export interface FirstCallRequest {
  entity?: string;
  entity_name?: string;
  company_name?: string;
  country?: string;
  sector?: string;
  use_case?: string;
  question?: string;
  decision?: string;
  intended_action?: string;
  stage?: string;
  target_users?: string;
  evidence_available?: string[];
  known_partners?: string[];
  [key: string]: unknown;
}

export interface RecommendedInputsRequest extends Record<string, unknown> {
  endpoint?: string;
  route?: string;
  path?: string;
  entity_archetype?: string;
  category?: string;
  subject?: Record<string, unknown>;
  country?: string;
  goal?: string;
  evidence_maturity?: string;
}

export interface RemediationPathRequest extends Record<string, unknown> {
  decision_result?: Record<string, unknown>;
  subject?: Record<string, unknown>;
  market_scope?: Record<string, unknown>;
  evidence_pack?: Array<Record<string, unknown>>;
  compiled_pack?: Record<string, unknown>;
  target_verdict?: string;
  audience?: string;
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
