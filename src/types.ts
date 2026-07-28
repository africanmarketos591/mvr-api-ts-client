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

export type EvidenceType =
  | "public_filing"
  | "survey"
  | "interview"
  | "observation"
  | "telemetry"
  | "admin_data"
  | "evaluation"
  | "retail_audit"
  | "social_listening"
  | "partner_network"
  | "program_monitoring";

export type EvidenceOrigin =
  | "public_osint"
  | "field_research"
  | "mixed"
  | "corporate_telemetry"
  | "platform_telemetry";

export type SourceGrade = "A" | "B" | "C" | "D";

export type SourceClass =
  | "entity_reported"
  | "independently_audited"
  | "regulator_published"
  | "administrative_record"
  | "probability_sample_survey"
  | "nonprobability_survey"
  | "structured_field_research"
  | "third_party_evaluation"
  | "retail_audit"
  | "telemetry_internal"
  | "media_reported"
  | "model_inferred";

export type StakeholderClass =
  | "agent" | "anchor_customer" | "bank_lender" | "beneficiary" | "board" | "board_member"
  | "chama_member" | "channel_gatekeeper" | "chief" | "civil_society_org" | "clinic"
  | "community_guardian" | "community_leader" | "competitor" | "competitors" | "consumer"
  | "cooperative_member" | "court" | "courts" | "creditor" | "creditors"
  | "customary_land_authority" | "customer" | "customs" | "customs_authority" | "distributor"
  | "donor" | "donor_guardian" | "enumerator" | "farmer" | "field_agent" | "field_supervisor"
  | "gatekeeper" | "guarantor" | "guardian" | "guardian_node" | "implementing_partner"
  | "incumbent" | "incumbent_competitor" | "incumbents" | "influencer" | "informal_logistics"
  | "informal_logistics_partner" | "institutional_guardian" | "internal_operations" | "internal_operator"
  | "investor" | "investor_board" | "investors" | "journalist" | "journalists" | "judiciary"
  | "judiciary_court" | "labor_union" | "labour_union" | "land_custodian" | "land_owner"
  | "landlord" | "landowner" | "lender" | "lender_creditor" | "lenders" | "market_queen"
  | "media" | "media_press" | "member" | "micro_logistics" | "mobile_money_agent"
  | "organized_labour" | "platform_partner" | "political_guardian" | "press" | "public_official"
  | "regulator" | "regulatory_body" | "religious_leader" | "research_respondent_group"
  | "retail_partner" | "retailer" | "retailer_partner" | "revenue_authority" | "sacco_member"
  | "school" | "service_provider" | "shareholder" | "shareholders" | "supplier" | "suppliers"
  | "tax_authority" | "tax_revenue_authority" | "teacher" | "traditional_chief" | "union"
  | "upstream_supplier" | "upstream_vendor" | "vc" | "vendor" | "vendors" | "venture_capital"
  | "worker_association" | "works_council";

export type CollectionMethod =
  | "structured_interview_protocol" | "expert_ethnographic_observation" | "field_observation"
  | "survey_platform_verified" | "survey_paper_based" | "key_informant_interview"
  | "team_consensus_estimate" | "founder_intuition" | "inferred_from_secondary" | "direct"
  | "inferred" | "secondary_source" | "corporate_telemetry" | "database_aggregation"
  | "expert_opinion" | "intercept_interview";

export type GuardianTier = "macro_regulator" | "meso_community" | "micro_street";
export type SourceConfidence = "high" | "medium" | "low";
export type ReviewStatus = "pending" | "approved" | "accepted" | "verified" | "reviewed" | "rejected";
export type PublicMetricScope = "entity_scale" | "country_scale" | "regional_scale" | "city_scale" | "site_scale";

export type ProvenanceExtractionMethod =
  | "human"
  | "deterministic_parser"
  | "llm_inferred"
  | "automated_query";

export type PrivacyConsentBasis =
  | "consent"
  | "contract"
  | "legitimate_interest"
  | "public_interest"
  | "legal_obligation"
  | "not_applicable";

export type PrivacyRetentionClass = "session_only" | "30d" | "90d" | "1y" | "7y" | "contractual";
export type PrivacyRedactionStatus = "raw" | "minimized" | "redacted" | "aggregated";

export interface PrivacyEnvelope {
  contains_pii?: boolean;
  contains_sensitive_personal_data?: boolean;
  consent_basis?: PrivacyConsentBasis;
  retention_class?: PrivacyRetentionClass;
  redaction_status?: PrivacyRedactionStatus;
  safe_for_modeling?: boolean;
  [key: string]: unknown;
}

export interface ProvenanceLedger {
  source_family?: string;
  source_doc_id?: string;
  source_locator?: string;
  extraction_method?: ProvenanceExtractionMethod;
  extraction_confidence?: number;
  compiler_stage?: string;
  data_integrity?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface SourceArtifact {
  artifact_id?: string;
  media_type?: string;
  storage_uri?: string;
  sha256?: string;
  extraction_method?: ProvenanceExtractionMethod;
  extractor_version?: string;
  extracted_at?: string;
  human_reviewed?: boolean;
  [key: string]: unknown;
}

export interface FirstCallSubject {
  entity_name?: string;
  name?: string;
  country?: string;
  entity_archetype?: string;
  category?: string;
  [key: string]: unknown;
}

export interface MVRSubject {
  entity_name?: string;
  name?: string;
  country?: string;
  entity_archetype?: EntityArchetype;
  category?: string;
  [key: string]: unknown;
}

export interface MVRMarketScope {
  country?: string;
  sector?: string;
  city?: string;
  town_or_zone?: string;
  region?: string;
  analysis_date?: string;
  evaluation_date?: string;
  [key: string]: unknown;
}

export interface EvidenceItem {
  id?: string;
  evidence_id?: string;
  evidence_type?: EvidenceType;
  evidence_origin?: EvidenceOrigin;
  source_grade?: SourceGrade;
  source_class?: SourceClass;
  entity_archetype?: EntityArchetype;
  stakeholder_class?: StakeholderClass;
  guardian_tier?: GuardianTier;
  collection_method?: CollectionMethod;
  source_confidence?: SourceConfidence;
  freshness_date?: string;
  evidence_geography?: MVRMarketScope;
  geography?: MVRMarketScope;
  temporal?: Record<string, unknown>;
  public_metric_scope?: PublicMetricScope;
  public_metrics?: Record<string, unknown>;
  structured_values?: Record<string, number>;
  structured_values_scale?: string;
  behavioral_values?: Record<string, unknown>;
  structured_values_provenance?: Record<string, unknown>;
  human_reviewed?: boolean;
  review_status?: ReviewStatus;
  reviewed_by?: string;
  reviewed_at?: string;
  human_review?: Record<string, unknown>;
  organ_attestation?: Record<string, unknown>;
  _verifier_attestation?: Record<string, unknown>;
  privacy_envelope?: PrivacyEnvelope;
  uncertainty_envelope?: Record<string, unknown>;
  provenance_ledger?: ProvenanceLedger;
  survey_payload?: Record<string, unknown>;
  program_payload?: Record<string, unknown>;
  admin_data_payload?: Record<string, unknown>;
  retail_audit_payload?: Record<string, unknown>;
  source_artifacts?: SourceArtifact[];
  [key: string]: unknown;
}

export interface CompiledPack {
  public_reality_pack?: EvidenceItem[];
  telemetry_proxy_pack?: EvidenceItem[];
  localized_observed_pack?: EvidenceItem[];
  survey_pack?: EvidenceItem[];
  retail_audit_pack?: EvidenceItem[];
  ngo_program_pack?: EvidenceItem[];
  administrative_data_pack?: EvidenceItem[];
  evaluation_pack?: EvidenceItem[];
  partner_network_pack?: EvidenceItem[];
  social_listening_pack?: EvidenceItem[];
}

export function defineCompiledPack<T extends CompiledPack>(
  pack: T & Record<Exclude<keyof T, keyof CompiledPack>, never>
): T {
  return pack;
}

export interface FirstCallRequest {
  subject?: FirstCallSubject;
  market_scope?: MVRMarketScope;
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
  subject?: MVRSubject;
  country?: string;
  goal?: string;
  evidence_maturity?: string;
}

export interface RemediationPathRequest {
  decision_result?: Record<string, unknown>;
  subject?: MVRSubject;
  market_scope?: MVRMarketScope;
  evidence_pack?: EvidenceItem[];
  compiled_pack?: CompiledPack;
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
  subject: MVRSubject & { entity_name: string; entity_archetype: EntityArchetype };
  market_scope: MVRMarketScope & { country: string };
  evidence_pack: EvidenceItem[];
  compiled_pack?: CompiledPack;
  stakeholder_scope?: string[];
  target_verdict?: MVRVerdict;
  [key: string]: unknown;
}

export interface ContextCompileRequest extends Record<string, unknown> {
  analysis_date?: string;
  requested_use?: string;
  subject?: MVRSubject;
  market_scope?: MVRMarketScope;
  evidence_pack?: EvidenceItem[];
  compiled_pack?: CompiledPack;
}

export interface DecisionCheckRequest extends Record<string, unknown> {
  mode?: "exploratory" | "evidence_backed" | "compiled_evidence";
  subject?: MVRSubject;
  market_scope?: MVRMarketScope;
  evidence_pack?: EvidenceItem[];
  compiled_pack?: CompiledPack;
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
