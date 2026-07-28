import type {
  CompiledPack,
  defineCompiledPack,
  EvidenceCompletenessRequest,
  EvidenceItem,
  FirstCallRequest,
  RecommendedInputsRequest
} from "../src/types";

const evidence: EvidenceItem = {
  id: "EV-1",
  evidence_type: "survey",
  evidence_origin: "field_research",
  source_grade: "B",
  source_class: "structured_field_research",
  stakeholder_class: "retailer",
  collection_method: "structured_interview_protocol",
  entity_archetype: "retail_chain",
  guardian_tier: "meso_community",
  source_confidence: "high",
  review_status: "verified",
  privacy_envelope: { contains_pii: false },
  source_artifacts: [{ artifact_id: "ART-1", human_reviewed: true }],
  evidence_geography: { country: "UG", city: "Kampala" },
  structured_values: { trust: 72, permission: 68 }
};

const compiledPack: CompiledPack = {
  survey_pack: [evidence],
  public_reality_pack: []
};

const firstCall: FirstCallRequest = {
  subject: { entity_name: "Example venture", entity_archetype: "generic_startup", custom_discovery_hint: "early" },
  entity_archetype: "generic_startup",
  market_scope: { country: "UG", sector: "supplier finance" }
};

const recommendedInputs: RecommendedInputsRequest = {
  endpoint: "/v1/decision-check",
  entity_archetype: "fintech_lending"
};

const completeness: EvidenceCompletenessRequest = {
  subject: { entity_name: "Example venture", entity_archetype: "fintech_lending" },
  market_scope: { country: "UG" },
  evidence_pack: [evidence],
  compiled_pack: compiledPack
};

// @ts-expect-error unsupported evidence types must fail before an API request is sent
const badEvidenceType: EvidenceItem = { evidence_type: "blog_post" };

// @ts-expect-error recommended-inputs accepts only canonical archetypes
const badRecommendedArchetype: RecommendedInputsRequest = { entity_archetype: "generic_startup" };

// @ts-expect-error server-enforced source classes must fail before an API request is sent
const badSourceClass: EvidenceItem = { source_class: "blog" };

// @ts-expect-error server-enforced stakeholder classes must fail before an API request is sent
const badStakeholderClass: EvidenceItem = { stakeholder_class: "random_person" };

// @ts-expect-error server-enforced collection methods must fail before an API request is sent
const badCollectionMethod: EvidenceItem = { collection_method: "scraped_guess" };

// @ts-expect-error compiled packs are closed to the ten server-supported lanes
const badCompiledPack: CompiledPack = { unexpected_pack: [] };

const widenedPack = { survey_pack: [evidence], unexpected_pack: [] };
// @ts-expect-error use defineCompiledPack when exact compile-time lane closure is required
const badWidenedPack = defineCompiledPack(widenedPack);

void [firstCall, recommendedInputs, completeness, badEvidenceType, badRecommendedArchetype, badSourceClass, badStakeholderClass, badCollectionMethod, badCompiledPack, badWidenedPack];
