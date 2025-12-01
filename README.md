# African Market OS — AMOS-MVR TypeScript Client

Official **TypeScript SDK** for the  
**African Market OS – AMOS-MVR API (Relational Porosity v9.x)**

This client provides a strongly-typed interface to the AMOS relational risk engine, including:

- ✅ Residual Risk Score (RRS)
- ✅ Relational readiness (MVR-I)
- ✅ Relational porosity (Pz) & shield explanation
- ✅ Cash runway & liquidity state
- ✅ Safe credit limits (local + USD)
- ✅ Engine metadata & health checks

---

## 📦 Installation

```bash
npm install @africanmarketos/amos-mvr-client
# or
yarn add @africanmarketos/amos-mvr-client
🚀 Quickstart
ts
Copy code
import { AmosMvrClient } from '@africanmarketos/amos-mvr-client';

const client = new AmosMvrClient({
  license: 'your-license-key',
  email: 'you@example.com',
  // optional:
  // baseUrl: 'https://africanmarketos.com',
});

// Minimal AMOS score request
const score = await client.score({
  amos_id: 'DEMO_ENTITY_001',
  sector: 'FMCG_BEVERAGE',
  region: 'EA',
  revenue: 3_000_000_000,
  expenses: 2_600_000_000,
  cash: 170_000_000,
  total_debt: 640_000_000,
  arrears: 43_000_000,
  days_silent: 2,
  occupancy_rate: 98,
  collection_rate: 96,
  currency: 'KES',
});

console.log('RRS:', score.RRS_SCORE);
console.log('MVR-I:', score.meta.MVR_I);
console.log('Safe limit (local):', score.CREDIT_ENGINE.ESTIMATED_SAFE_CREDIT_LIMIT_LOCAL);
🧪 Including explicit MVR scores (optional)
ts
Copy code
const score = await client.score({
  amos_id: 'ANCHOR_TELCO_2025',
  sector: 'FINTECH',
  region: 'EA',
  revenue: 307_142_100_000,
  cash: 22_098_100_000,
  total_debt: 120_881_300_000,
  arrears: 7_000_000_000,
  days_silent: 1,
  occupancy_rate: 97,
  collection_rate: 97,
  currency: 'KES',
  current_credit_limit_local: 200_000_000_000,
  mvr: {
    mvr_i: 83,
    embeddedness: 86,
    trust: 85,
    reciprocity: 79,
    guardian_vouchers: 82,
    continuity: 85,
    channel_permission: 80,
  },
});

console.log(score.meta.HEADLINE);
❤️ Health Check
ts
Copy code
const health = await client.health();
console.log('Status:', health.status);
console.log('Core version:', health.version);
console.log('Wrapper:', health.wrapper);
⚠️ Error Handling
All API errors are raised as a structured AmosMvrError (wrapping the AMOS error envelope):

ts
Copy code
import { AmosMvrClient, AmosMvrError } from '@africanmarketos/amos-mvr-client';

try {
  const score = await client.score({
    // …missing required fields, for example
  });
} catch (err) {
  if (err instanceof AmosMvrError) {
    console.error('AMOS error code:', err.error.error);
    console.error('Message:', err.error.message);
    console.error('Request ID:', err.error.request_id);
  } else {
    console.error('Unexpected error:', err);
  }
}
📘 Engine & Framework
Engine: AMOS – African Market OS Relational Porosity Engine (v9.x)

API: AMOS-MVR REST API (v1.0)

Framework: Minimum Viable Relationships (MVR) Framework™
DOI (framework): 10.5281/zenodo.17310446

The AMOS-MVR client measures:

Trust & reciprocity

Embeddedness & belonging

Permission & cultural-market fit

Guardian vouchers & continuity

…to estimate relational readiness, residual risk, and safe credit limits for high-context African markets.

🧬 Attribution & Licensing
The Minimum Viable Relationships (MVR) Framework™ is published under African Market OS.

Base content: CC BY 4.0 for academic / research use

Commercial / applied use of MVR™ / AMOS-MVR (APIs, SDKs, diagnostics, embeddings) requires a license, partnership, or referral agreement with African Market OS.

Learn more:

MVR Framework: https://africanmarketos.com/the-mvr-framework-minimum-viable-relationships/

Commercial & Referral Use Policy:
https://africanmarketos.com/african-market-os-mvr-framework-commercial-referral-use-policy/

Machine-readable license metadata:
https://africanmarketos.com/.well-known/mvr-license.json
