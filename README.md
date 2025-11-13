MVR API TypeScript Client

Official TypeScript client for the African Market OS — Minimum Viable Relationships (MVR) API.

This SDK provides a simple, strongly-typed interface to all MVR v2.6.0-enterprise endpoints, including:

✔ Scores
✔ Survey Aggregation
✔ Trends
✔ Forecasts
✔ Benchmarking
✔ Insights
✔ Policy Multi-Audit
✔ Health Checks
✔ Session-Based Authentication

📦 Installation
npm install @africanmarketos/mvr-api-client

🚀 Usage Example
import { MVRApiClient } from '@africanmarketos/mvr-api-client';

// Initialize client
const client = new MVRApiClient({
  license: 'your-license-key',
  email: 'your@email.com'
});

// Get MVR scores
const scores = await client.getScores('fintech');
console.log(`MVR Index: ${scores.mvr_index}`);

// Submit survey data
const surveyResult = await client.surveyAggregate({
  stakeholder_responses: [
    {
      dimension: 'Embeddedness',
      scale: 4,
      reasons: ['Strong community integration']
    }
  ],
  sector: 'fintech'
});

⚠️ Error Handling Example
try {
  const result = await client.getScores();
} catch (error) {
  if (error.error_code === 'RATE_LIMIT_EXCEEDED') {
    console.log(`Rate limited. Retry after: ${error.retry_after}s`);
  } else {
    console.error('API Error:', error);
  }
}

🔐 Session Authentication
// Create session
const session = await client.createSession(
  'your-license-key',
  'email@example.com'
);

// Use session token client
const sessionClient = client.withSession(session.session_token);

const scores = await sessionClient.getScores();
console.log(scores);
