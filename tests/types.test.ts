import type {
  CompiledPack,
  EvidenceCompletenessRequest,
  EvidenceItem,
  FirstCallRequest
} from "../src/types";

const evidence: EvidenceItem = {
  id: "EV-1",
  evidence_type: "survey",
  evidence_origin: "field_research",
  source_grade: "B",
  entity_archetype: "retail_chain",
  evidence_geography: { country: "UG", city: "Kampala" },
  structured_values: { trust: 72, permission: 68 }
};

const compiledPack: CompiledPack = {
  survey_pack: [evidence],
  public_reality_pack: []
};

const firstCall: FirstCallRequest = {
  subject: { entity_name: "Example venture", entity_archetype: "fintech_lending" },
  market_scope: { country: "UG", sector: "supplier finance" }
};

const completeness: EvidenceCompletenessRequest = {
  subject: { entity_name: "Example venture", entity_archetype: "fintech_lending" },
  market_scope: { country: "UG" },
  evidence_pack: [evidence],
  compiled_pack: compiledPack
};

// @ts-expect-error unsupported evidence types must fail before an API request is sent
const badEvidenceType: EvidenceItem = { evidence_type: "blog_post" };

// @ts-expect-error unsupported archetypes must not be accepted as canonical values
const badArchetype: FirstCallRequest = { entity_archetype: "generic_startup" };

// @ts-expect-error compiled packs are closed to the ten server-supported lanes
const badCompiledPack: CompiledPack = { unexpected_pack: [] };

void [firstCall, completeness, badEvidenceType, badArchetype, badCompiledPack];
