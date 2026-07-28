const assert = require("node:assert/strict");
const http = require("node:http");
const { after, before, test } = require("node:test");
const { MVRApiError, MVRClient } = require("../dist");

let server;
let baseURL;
const received = [];

before(async () => {
  server = http.createServer((req, res) => {
    let raw = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => { raw += chunk; });
    req.on("end", () => {
      const body = raw ? JSON.parse(raw) : null;
      received.push({ method: req.method, url: req.url, headers: req.headers, body });
      res.setHeader("Content-Type", "application/json");
      if (req.url === "/v1/remediation-path" && body?.target_verdict === "approve_everything") {
        res.statusCode = 422;
        res.end(JSON.stringify({ error: "Utility validation failed", details: ["target_verdict must be canonical"] }));
        return;
      }
      res.statusCode = 200;
      res.end(JSON.stringify({ status: "ok", not_a_verdict: req.url === "/v1/first-call" }));
    });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseURL = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test("certified helper methods preserve route, body, and headers", async () => {
  const client = new MVRClient({ baseURL, apiKey: "test-key", maxRetries: 0, timeout: 2000 });
  await client.firstCall({ entity: "Example", country: "UG", question: "Should it launch?" });
  await client.recommendedInputs({ endpoint: "/v1/decision-check", entity_archetype: "distributor_network" });
  await client.remediationPath({ decision_result: { status: "abstained" }, target_verdict: "pilot_only" });

  assert.deepEqual(received.slice(0, 3).map((item) => item.url), [
    "/v1/first-call",
    "/v1/recommended-inputs",
    "/v1/remediation-path"
  ]);
  assert.equal(received[0].body.question, "Should it launch?");
  assert.equal(received[1].body.entity_archetype, "distributor_network");
  assert.equal(received[2].body.target_verdict, "pilot_only");
  assert.equal(received[0].headers["x-api-key"], "test-key");
  assert.equal(received[0].headers["x-response-profile"], "full_advisory");
  assert.match(received[0].headers["user-agent"], /6\.32\.3$/);
});

test("structured HTTP errors remain MVRApiError instances", async () => {
  const client = new MVRClient({ baseURL, apiKey: "test-key", maxRetries: 0, timeout: 2000 });
  await assert.rejects(
    () => client.remediationPath({ decision_result: {}, target_verdict: "approve_everything" }),
    (error) => {
      assert.ok(error instanceof MVRApiError);
      assert.equal(error.status, 422);
      assert.equal(error.errorData.error, "Utility validation failed");
      return true;
    }
  );
});
