# MVR API TypeScript Client

Lightweight TypeScript client for the current **MVR API - Minimum Viable Relationships** surface.

This client targets the live MVR Core API v6.32.x:

- `POST /v1/auth-check`
- `POST /v1/entity-resolve`
- `POST /v1/evidence-completeness`
- `POST /v1/decision-check`
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

const result = await client.entityResolve({
  entity_name: "MTN Nigeria",
  country: "NG"
});

console.log(result.response_meta?.environment); // "sandbox" when using demo key
```

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
- MCP endpoint: https://africanmarketos.com/mcp
- MCP Registry name: `io.github.africanmarketos591/mvr-api`
- Sandbox guide: https://africanmarketos.com/docs/sandbox.md
- Agent instructions: https://africanmarketos.com/AGENTS.md

## Attribution

Minimum Viable Relationships (MVR), originated by Farouk Mark Mukiibi, African Market OS.

Commercial, production, SaaS, consulting, or AI-agent deployment use requires authorization from African Market OS.
