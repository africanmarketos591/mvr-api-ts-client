// Core client configuration
export interface MVRApiConfig {
  baseURL?: string;     // default: https://africanmarketos.com
  license: string;      // x-mvr-license
  email: string;        // x-buyer-email
  timeout?: number;     // ms
  maxRetries?: number;  // for network / 429 retries
}

/**
 * Attribution block used in MVRError and other metadata.
 */
export interface AttributionObject {
  framework: string;
  creator: string;
  source: string;
  license: string;
  doi: string;
}

/**
 * Optional generic version metadata (SDK-side, not the AMOS model version).
 */
export interface VersionInfo {
  api: string;
  feature?: string;
  method?: string;
  model?: string;
  mvr_proprietary: boolean;
}

/**
 * SDK-level error envelope (what MVRApiError wraps).
 * This is *not* the raw AMOSErrorResponse, but a normalized shape.
 */
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

/* ------------------------------------------------------------------ */
/*  AMOS SCORE REQUEST (POST /v1/amos/score)                          */
/* ------------------------------------------------------------------ */

export type AMOSSector =
  | 'GENERIC'
  | 'FINTECH'
  | 'FMCG_RETAIL'
  | 'FMCG_BEVERAGE'
  | 'FMCG_OILS'
  | 'FMCG_DAIRY'
  | 'FMCG_PERSONAL_CARE'
  | 'FMCG_FOODS'
  | 'FMCG_ALCOHOL';

export interface AMOSMVRBlock {
  mvr_i?: number;            // 0–100
  embeddedness?: number;     // 0–100
  trust?: number;            // 0–100
  cultural_fit?: number;     // 0–100
  reciprocity?: number;      // 0–100
  guardian_vouchers?: number;// 0–100
  continuity?: number;       // 0–100
  channel_permission?: number;// 0–100
}

/**
 * AMOSScoreRequest matches the scoring payload you send to /v1/amos/score.
 * Only the minimum core fields are required; everything else is optional.
 */
export interface AMOSScoreRequest {
  // required core fields
  amos_id: string;
  sector: AMOSSector;
  region: string;                // EA, WA, ZA, GENERIC, etc.
  revenue: number;               // local currency
  cash: number;                  // local currency
  days_silent: number;
  occupancy_rate: number;        // 0–100
  collection_rate: number;       // 0–100

  // optional aliases / additional financials
  id?: string;
  name?: string;
  legal_name?: string;

  total_revenue?: number;
  expenses?: number;
  opex?: number;

  cash_balance?: number;
  total_debt?: number;
  debt_total?: number;
  arrears?: number;
  overdue?: number;

  revenue_growth?: number;

  days_since_last_activity?: number;
  days_since_last_scan?: number;

  guardian_endorsements?: number;
  number_of_customers?: number;
  number_of_suppliers?: number;

  grant_dependency?: number; // 0–1
  active_users?: number;
  active_customers?: number;

  sku_sales_8w?: number[];   // up to 8 weeks
  promo_units?: number;
  baseline_units?: number;

  currency?: string;         // e.g. "KES"
  fx_rate?: number;
  fx_rate_12m_ago?: number;
  forward_cover?: number;
  fx_exposed_debt?: number;

  outage_hours_per_day?: number;
  diesel_share_opex?: number; // 0–1

  corridor_id?: string;
  port_dwell_days?: number;
  truck_turnaround_days?: number;

  current_credit_limit_local?: number;
  prev_ghosting?: number;

  mvr?: AMOSMVRBlock;

  unstructured_text?: string;
}

/* ------------------------------------------------------------------ */
/*  AMOS SCORE RESPONSE (POST /v1/amos/score)                         */
/* ------------------------------------------------------------------ */

export interface RRSConfidenceInterval {
  lower: number;
  upper: number;
  error: number;
}

export interface AMOSExplanation {
  porosity?: string;
  mvr_shield?: string;
  mvr_shield_factor?: string;
  final_contained_pd?: string;
  shield_impact_percentage?: string;
  headline?: string;
  risk_narrative?: string;
}

export type MVRBand = 'EMBEDDED' | 'VIABLE' | 'FRAGILE';
export type PotemkinGapBand = 'NONE' | 'LOW' | 'HIGH';
export type RunwayState = 'CRITICAL' | 'DANGER' | 'WATCH' | 'HEALTHY' | 'STRONG';

/**
 * Ghosting / survival diagnostics.
 */
export interface AMOSGhosting {
  flag?: boolean;
  isDead?: boolean;
  impact?: number;
  survival_probability?: number;
  days_to_ghost?: number;
  expectedRhythm?: number;
}

/**
 * Cash runway and liquidity metrics.
 */
export interface AMOSCashMetrics {
  cash_runway_days?: number;
  runwayState?: RunwayState;
  net_cash?: number;
  burn_rate_per_day?: number;
}

/**
 * Deeper diagnostics block.
 */
export interface AMOSDiagnostics {
  AFI_SCORE?: number;
  POTEMKIN_RAW_GAP?: number;
  POTEMKIN_GAP?: number;
  CANNIBALISATION_RISK?: number;
  SKU_VOLATILITY_CV?: number;
  SKU_SAMPLE_SIZE?: number;
}

/**
 * Rich AMOS relational physics + diagnostics.
 */
export interface AMOSMeta {
  EXPLANATION?: AMOSExplanation;

  SECTOR?: string;
  REGION?: string;

  GRANT_DEPENDENCY?: number;
  DAYS_SILENT?: number;
  PD_GHOST?: number;

  ghosting?: AMOSGhosting;

  HAS_POTEMKIN_RISK?: boolean;
  POTEMKIN_GAP_BAND?: PotemkinGapBand;

  MVR_I?: number;          // 0–100
  MVR_BAND?: MVRBand;
  MVR_STRONGEST_DIMENSIONS?: string[];
  MVR_WEAKEST_DIMENSIONS?: string[];

  MVR_RV?: number;
  MVR_WV?: number;
  MVR_GD?: number;
  MVR_EQ?: number;
  MVR_AS?: number;
  MVR_RC?: number;

  COLLECTION_RATE?: number;

  FX_GAP_RATIO?: number;
  FX_PD_MULTIPLIER?: number;
  COLD_CHAIN_LEAKAGE?: number;
  CORRIDOR_LEAKAGE?: number;

  PROMO_INCREMENTALITY?: number;
  PROMO_QUALITY?: string;

  DAYS_TO_DEATH_CAPPED?: boolean;

  TIMELINE_SOURCE?: string;
  TIMELINE_TREND?: string;

  DATA_COMPLETENESS_SCORE?: number;
  MISSING_FIELDS?: string[];
  CRITICAL_MISSING_FIELDS?: string[];

  MVR_GATE_DECISION?: string;  // "APPROVE" | "HOLD" | "DECLINE"
  MVR_GATE_REASONS?: string[];

  COMPASS_FIT_BAND?: string;
  COMPASS_MVR_QUADRANT?: string;

  HEADLINE?: string;
  FLAGS?: string[];

  NETWORK_HEALTH?: number;

  CASH_METRICS?: AMOSCashMetrics;
  DIAGNOSTICS?: AMOSDiagnostics;

  SEASONAL_FACTOR?: number;
  GRANT_HAIRCUT_APPLIED?: boolean;
}

/**
 * Credit engine block mapping relational physics into a safe credit limit
 * and operational recommendation.
 */
export interface CreditEngineBlock {
  ESTIMATED_SAFE_CREDIT_LIMIT_LOCAL: number;
  ESTIMATED_SAFE_CREDIT_LIMIT_USD: number | null;
  RECOMMENDED_ACTION: string;
  MVR_DECISION: string; // "APPROVE" | "HOLD" | "DECLINE"
  SEASONAL_FACTOR: number;
  GRANT_HAIRCUT_APPLIED: boolean;
  EXPOSURE_TO_REVENUE_RATIO: number | null;
  RECOMMENDED_TO_CURRENT_RATIO: number | null;
}

/**
 * Wrapper metadata about the running engine/container.
 */
export interface WrapperBlock {
  version: string;
  core_version: string;
  request_id: string;
  timestamp: string; // ISO date-time
}

/**
 * Model metadata block (versioning, regulatory notes, etc.).
 */
export interface ModelMetadata {
  model_version: string;
  core_version: string;
  wrapper_version: string;
  calibration_date: string;
  regulatory_status: string;
  physics_framework: string;
}

/**
 * Core AMOS scoring response.
 */
export interface AMOSScoreResponse {
  RRS_SCORE: number;                // raw residual risk score (0–100)
  RRS_CONFIDENT: number;            // confidence-weighted residual risk
  RRS_CONFIDENCE: number;           // 0–100
  RRS_CONFIDENCE_INTERVAL: RRSConfidenceInterval;
  Pz_POROSITY: number;              // 0–1

  meta: AMOSMeta;
  CREDIT_ENGINE: CreditEngineBlock;
  WRAPPER: WrapperBlock;
  MODEL_METADATA: ModelMetadata;
}

/* ------------------------------------------------------------------ */
/*  AMOS ERROR ENVELOPE (raw API side)                                */
/* ------------------------------------------------------------------ */

export interface AMOSErrorResponse {
  error: string;
  details?: any;
  request_id: string;
}

/* ------------------------------------------------------------------ */
/*  HEALTH (GET /health)                                              */
/* ------------------------------------------------------------------ */

/**
 * Health endpoint (no auth).
 * Matches the new AMOS /health response.
 */
export interface HealthResponse {
  status: string;     // e.g. "OK"
  version: string;    // core version, e.g. "v9.2.6-FINAL"
  wrapper: string;    // wrapper version
  request_id: string;
  timestamp: string;  // ISO date-time
}
