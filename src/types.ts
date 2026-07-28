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

export type EntityArchetype =
  | "telecom_operator"
  | "mobile_money_operator"
  | "fintech_platform"
  | "financial_services_bank"
  | "fintech_lending"
  | "logistics_platform"
  | "energy_utility"
  | "extractives_operator"
  | "real_estate_construction"
  | "education_provider"
  | "passenger_mobility"
  | "b2b_saas_platform"
  | "healthtech_platform"
  | "insurance_platform"
  | "fmcg_brand"
  | "retail_chain"
  | "ecommerce_platform"
  | "manufacturer"
  | "distributor_network"
  | "ngo"
  | "development_program"
  | "public_institution"
  | "survey_dataset"
  | "solo_entrepreneur"
  | "family_business"
  | "cooperative_sacco"
  | "cross_border_trader"
  | "university_spinout"
  | "diaspora_venture"
  | "creator_economy_individual"
  | "agritech_aggregator"
  | "impact_enterprise"
  | "religious_institution"
  | "chama_savings_group";

export type MVRVerdict =
  | "permission_not_yet_earned"
  | "pilot_only"
  | "pilot_ready"
  | "ready_to_scale";

export interface FirstCallRequest {
  subject?: Record<string, unknown>;
  market_scope?: Record<string, unknown>;
  entity?: string;
  entity_name?: string;
  company_name?: string;
  company?: string;
  name?: string;
  query?: string;
  country?: string;
  sector?: string;
  industry?: string;
  entity_archetype?: string;
  use_case?: string;
  question?: string;
  intent?: string;
  decision?: string;
  intended_action?: string;
  decision_context?: string;
  stage?: string;
  target_users?: string;
  evidence_available?: string | string[];
  evidence_types?: string | string[];
  sources?: string | string[];
  known_partners?: string | string[];
  partners?: string | string[];
  channels?: string | string[];
  evidence_pack?: Array<Record<string, unknown>>;
  evidence_items?: Array<Record<string, unknown>>;
  city?: string;
  town_or_zone?: string;
}

export interface RecommendedInputsRequest {
  endpoint?: string;
  route?: string;
  path?: string;
  entity_archetype?: EntityArchetype;
  category?: string;
  subject?: Record<string, unknown>;
  country?: string;
  goal?: string;
  evidence_maturity?: string;
}

export interface RemediationPathRequest {
  decision_result?: Record<string, unknown>;
  subject?: Record<string, unknown>;
  market_scope?: Record<string, unknown>;
  evidence_pack?: Array<Record<string, unknown>>;
  compiled_pack?: Record<string, unknown>;
  target_verdict?: MVRVerdict;
  audience?: string;
  gap_plan?: Record<string, unknown>;
  evidence_run?: Record<string, unknown>;
  evidence_recruitment_plan?: Record<string, unknown>;
  mvr_result?: Record<string, unknown>;
  decision_room?: Record<string, unknown>;
  red_team?: Record<string, unknown>;
  release_check?: Record<string, unknown>;
  project_id?: string;
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
