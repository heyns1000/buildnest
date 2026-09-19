import test from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";
import express from "express";
import { registerQSCommandCenterRoutes } from "../server/qs-command-center-routes";

/**
 * Integration tests for the Heyns1000 QS Command Center webhook bridge.
 * Run with: npm test (tsx --test)
 */

const samplePayload = {
  event: "tail_finding.trigger",
  trace_id: "TR-QS-2026-X99",
  timestamp: "2026-09-19T09:49:00Z",
  governance_level: "ATOM",
  payload: {
    project_id: "PRJ-HA-01",
    boq_hash: "8c3b1c0",
    allowable_override_blocked: true,
    audit_scope: ["material_reconciliation", "landed_cost", "jbcc_certificates"],
  },
};

function createApp() {
  const app = express();
  app.use(
    express.json({ verify: (req: any, _res, buf) => { req.rawBody = buf; } })
  );
  registerQSCommandCenterRoutes(app);
  return app;
}

async function post(app: express.Express, body: unknown, headers: Record<string, string> = {}) {
  const server = app.listen(0);
  const port = (server.address() as any).port;
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/webhooks/qs-command-center`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    return { status: res.status, json };
  } finally {
    server.close();
  }
}

function sign(body: string, secret: string): string {
  return "sha256=" + crypto.createHmac("sha256", secret).update(body).digest("hex");
}

test("accepts tail_finding.trigger and returns INLINE/v111 atom confirmation", async () => {
  delete process.env.HSOMNI9000_API_KEY;
  delete process.env.QS_WEBHOOK_SECRET;

  const { status, json } = await post(createApp(), samplePayload);

  assert.equal(status, 200);
  assert.equal(json.status, "INLINE");
  assert.equal(json.locked_state, "v111");
  assert.equal(json.governance_level, "ATOM");
  assert.equal(json.immutable, true);
  assert.equal(json.event, "tail_finding.trigger");
  assert.equal(json.trace_id, "TR-QS-2026-X99");
});

test("accepts boq.line_sync and returns INLINE/v111 atom confirmation", async () => {
  delete process.env.HSOMNI9000_API_KEY;
  delete process.env.QS_WEBHOOK_SECRET;

  const { status, json } = await post(createApp(), {
    event: "boq.line_sync",
    trace_id: "TR-QS-2026-B01",
    timestamp: "2026-09-19T10:00:00Z",
    payload: { boq_id: "BOQ-77", lines: 214 },
  });

  assert.equal(status, 200);
  assert.equal(json.status, "INLINE");
  assert.equal(json.locked_state, "v111");
  assert.equal(json.event, "boq.line_sync");
});

test("rejects unknown events with 400", async () => {
  delete process.env.HSOMNI9000_API_KEY;
  delete process.env.QS_WEBHOOK_SECRET;

  const { status, json } = await post(createApp(), {
    event: "unknown.event",
    trace_id: "TR-QS-2026-BAD",
    timestamp: "2026-09-19T10:01:00Z",
  });

  assert.equal(status, 400);
  assert.equal(json.error, "Invalid payload");
});

test("rejects payloads missing trace_id with 400", async () => {
  delete process.env.HSOMNI9000_API_KEY;
  delete process.env.QS_WEBHOOK_SECRET;

  const { status } = await post(createApp(), {
    event: "tail_finding.trigger",
    timestamp: "2026-09-19T10:02:00Z",
  });

  assert.equal(status, 400);
});

test("enforces X-API-KEY when HSOMNI9000_API_KEY is set", async () => {
  process.env.HSOMNI9000_API_KEY = "test-qs-key";
  delete process.env.QS_WEBHOOK_SECRET;
  const app = createApp();

  const wrongKey = await post(app, samplePayload, { "X-API-KEY": "wrong-key" });
  assert.equal(wrongKey.status, 401);

  const noKey = await post(app, samplePayload);
  assert.equal(noKey.status, 401);

  const rightKey = await post(app, samplePayload, { "X-API-KEY": "test-qs-key" });
  assert.equal(rightKey.status, 200);
  assert.equal(rightKey.json.status, "INLINE");

  delete process.env.HSOMNI9000_API_KEY;
});

test("enforces X-QS-Signature HMAC when QS_WEBHOOK_SECRET is set", async () => {
  const secret = "shared-hmac-secret";
  const apiKey = "test-qs-key";
  process.env.QS_WEBHOOK_SECRET = secret;
  process.env.HSOMNI9000_API_KEY = apiKey;
  const app = createApp();

  const raw = JSON.stringify(samplePayload);

  const badSig = await post(app, samplePayload, {
    "X-API-KEY": apiKey,
    "X-QS-Signature": sign(raw, "wrong-secret"),
  });
  assert.equal(badSig.status, 401);

  const goodSig = await post(app, samplePayload, {
    "X-API-KEY": apiKey,
    "X-QS-Signature": sign(raw, secret),
  });
  assert.equal(goodSig.status, 200);
  assert.equal(goodSig.json.locked_state, "v111");

  delete process.env.QS_WEBHOOK_SECRET;
  delete process.env.HSOMNI9000_API_KEY;
});
