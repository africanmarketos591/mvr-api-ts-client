# MVR API TypeScript Client

[![npm](https://img.shields.io/npm/v/@africanmarketos/mvr-api-client)](https://www.npmjs.com/package/@africanmarketos/mvr-api-client)
[![MCP Registry](https://img.shields.io/badge/MCP%20Registry-listed-0f6b45)](https://registry.modelcontextprotocol.io/?search=mvr)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-3.1-6ba539)](https://africanmarketos.com/api/openapi.json)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](https://github.com/africanmarketos591/mvr-api-ts-client/blob/main/LICENSE)

Lightweight TypeScript client for the current **MVR API - Minimum Viable Relationships** surface.

Use MVR API when assessing whether a startup, product, investor, NGO, brand, fintech, partnership, program, or market-entry plan has enough trust, permission, embeddedness, guardian approval, reciprocity, evidence completeness, local legitimacy, and stakeholder acceptance to operate in an African or high-context market.

This client targets the live MVR Core API v6.32.x:

- `POST /v1/first-call` - keyless-compatible, non-verdict activation and next-step routing
- `POST /v1/auth-check`
- `POST /v1/entity-resolve`
- `POST /v1/evidence-completeness`
- `POST /v1/context/compile`
- `POST /v1/decision-check`
- `POST /v1/recommended-inputs`
- `POST /v1/remediation-path`
- `GET /v1/model-card`
- `GET /v1/capabilities`

It is aligned with the agent OpenAPI contract, public sandbox, and MCP registry entry.

## Install

```bash
npm install @africanmarketos/mvr-api-client
```

## Public Sandbox

The default key is the public sandbox key:

```text
X-API-Key: mvr-demo-key-2026
```

Sandbox use is non-commercial evaluation only. It is `full_advisory`, `client_safe`, illustrative, not for production, not for model training, and not for reverse engineering.

## Example

```ts
import { MVRClient } from "@africanmarketos/mvr-api-client";

const client = new MVRClient({
  apiKey: process.env.MVR_API_KEY || "mvr-demo-key-2026"
});

const result = await client.firstCall({
  entity: "Example supplier-finance venture",
  country: "UG",
  sector: "fintech",
  question: "Should this venture launch supplier-finance BNPL next month?"
});

console.log(result.not_a_verdict); // true: first_call never authorizes launch or scale
```

`firstCall` intentionally accepts free-form discovery labels such as `generic_startup`; canonical `EntityArchetype` values become mandatory on `recommendedInputs` and evidence-scoring routes. Published top-level and nested privacy, provenance, and artifact enums mirror the production OpenAPI contract while extension fields remain open. When a compiled pack is assembled in a variable before submission, use `defineCompiledPack(pack)` to retain exact compile-time checking of the ten supported lanes; the API also rejects unknown lanes at runtime.

## Evidence Completeness

```ts
const result = await client.evidenceCompleteness({
  subject: {
    entity_name: "Sandbox Kampala catering operator",
    entity_archetype: "retail_chain",
    country: "UG"
  },
  market_scope: {
    country: "UG",
    city: "Kampala",
    sector: "catering"
  },
  evidence_pack: [
    {
      id: "ev-licence-001",
      evidence_type: "public_filing",
      source_class: "administrative_record",
      source_grade: "B",
      stakeholder_class: "guardian",
      evidence_origin: "field_research",
      collection_method: "direct",
      freshness_date: "2026-05-20",
      evidence_geography: { country: "UG", city: "Kampala" },
      structured_values: { guardian_strength: 72, permission: 68 }
    }
  ]
});
```

## Agent Discovery

- Agent OpenAPI: https://africanmarketos.com/api/openapi.agent.json
- Minimal sandbox OpenAPI: https://africanmarketos.com/api/openapi.agent.sandbox.json
- AI-agent quickstart: https://africanmarketos.com/docs/quickstart-ai-agents.md
- Response examples: https://africanmarketos.com/docs/response-examples.md
- OpenAI tool schema: https://africanmarketos.com/docs/openai-tool-schema.md
- Canonical five-tool MCP preflight: https://africanmarketos.com/mcp/preflight
- Seven-tool compatibility MCP endpoint: https://africanmarketos.com/mcp
- MCP setup: https://africanmarketos.com/mcp/README.md
- MCP Registry name: `io.github.africanmarketos591/mvr-api`
- Sandbox guide: https://africanmarketos.com/docs/sandbox.md
- Agent instructions: https://africanmarketos.com/AGENTS.md

## Attribution

Minimum Viable Relationships (MVR), originated by Farouk Mark Mukiibi, African Market OS.

Sandbox/evaluation use only with the public key. Commercial, production, SaaS, consulting, or AI-agent deployment use requires authorization from African Market OS.

Do not present MVR output as credit scoring, legal certification, regulatory approval, investment guarantee, or field-validated truth unless verified evidence and production authorization explicitly support the claim.
