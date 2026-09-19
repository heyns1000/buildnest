import type { Express, Request } from "express";
import crypto from "crypto";
import { z } from "zod";
import { sendQSTelemetry } from "./qs-telemetry";

/**
 * Heyns1000 QS Command Center → BuildNest™ webhook bridge.
 *
 * Inbound contract: POST /api/webhooks/qs-command-center
 *   Headers: X-API-KEY (HSOMNI9000_API_KEY), X-QS-Signature (sha256 HMAC of raw body, optional)
 *   Events:  tail_finding.trigger · boq.line_sync
 * Response: Atom-level immutable confirmation — status INLINE, locked state v111.
 */

const webhookSchema = z.object({
  event: z.enum(["tail_finding.trigger", "boq.line_sync"]),
  trace_id: z.string().min(1),
  timestamp: z.string().min(1),
  governance_level: z.string().optional(),
  payload: z.record(z.any()).optional(),
});

function timingSafeEqualStr(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/** true = valid, false = invalid, null = signature not enforced (secret unset) */
function verifySignature(req: Request): boolean | null {
  const secret = process.env.QS_WEBHOOK_SECRET;
  if (!secret) return null;

  const provided = req.header("X-QS-Signature") || "";
  const rawBody = (req as any).rawBody
    ? (req as any).rawBody.toString()
    : JSON.stringify(req.body ?? {});
  const expected =
    "sha256=" +
    crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  return timingSafeEqualStr(provided, expected);
}

export function registerQSCommandCenterRoutes(app: Express) {
  app.post("/api/webhooks/qs-command-center", async (req, res) => {
    // --- API key authentication (X-API-KEY: HSOMNI9000_API_KEY) ---
    const apiKey = process.env.HSOMNI9000_API_KEY;
    if (apiKey) {
      const provided = req.header("X-API-KEY") || "";
      if (!provided || !timingSafeEqualStr(provided, apiKey)) {
        return res.status(401).json({
          error: "Unauthorized",
          message: "Invalid or missing X-API-KEY header",
        });
      }
    } else {
      console.warn(
        "⚠️ HSOMNI9000_API_KEY not configured — QS Command Center webhook accepting unauthenticated requests (dev mode)"
      );
    }

    // --- Optional HMAC signature verification (X-QS-Signature) ---
    const signatureValid = verifySignature(req);
    if (signatureValid === false) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid or missing X-QS-Signature header",
      });
    }

    // --- Payload validation ---
    const parsed = webhookSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid payload",
        message: "Expected a QS Command Center webhook payload",
        details: parsed.error.flatten(),
      });
    }

    const { event, trace_id, timestamp, governance_level, payload } =
      parsed.data;

    console.log(
      `📡 QS Command Center webhook received: ${event} · trace ${trace_id}`
    );

    const confirmation = {
      status: "INLINE",
      locked_state: "v111",
      governance_level: governance_level || "ATOM",
      atom_confirmation: true,
      immutable: true,
      event,
      trace_id,
      payload_keys: payload ? Object.keys(payload) : [],
      received_at: new Date().toISOString(),
      source_timestamp: timestamp,
      message: "Atom-level immutable confirmation — state locked at v111",
    };

    // Fire-and-forget telemetry back to the QS Command Center
    void sendQSTelemetry("buildnest.confirmation", {
      event,
      trace_id,
      status: "INLINE",
      locked_state: "v111",
    });

    res.status(200).json(confirmation);
  });

  console.log("✅ QS Command Center webhook routes registered");
  console.log("   📡 POST /api/webhooks/qs-command-center (tail_finding.trigger · boq.line_sync)");
}
