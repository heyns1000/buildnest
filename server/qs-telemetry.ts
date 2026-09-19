import { log } from "./vite";

/**
 * QS Command Center telemetry bridge — BuildNest™ → Heyns1000 QS Command Center
 * ("Find The Tail" Brain).
 *
 * Fire-and-forget: telemetry failures never break webhook processing.
 * Target endpoint is configured via QS_COMMAND_CENTER_ENDPOINT.
 */
export async function sendQSTelemetry(
  event: string,
  data: Record<string, unknown>
): Promise<void> {
  const endpoint = process.env.QS_COMMAND_CENTER_ENDPOINT;
  if (!endpoint) {
    log(
      `QS telemetry skipped (QS_COMMAND_CENTER_ENDPOINT not set): ${event}`,
      "qs-bridge"
    );
    return;
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const apiKey = process.env.HSOMNI9000_API_KEY;
    if (apiKey) {
      headers["X-API-KEY"] = apiKey;
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        event,
        data,
        source: "buildnest",
        sent_at: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      log(
        `QS telemetry rejected by endpoint: ${res.status} ${res.statusText}`,
        "qs-bridge"
      );
    }
  } catch (err) {
    log(`QS telemetry error: ${(err as Error).message}`, "qs-bridge");
  }
}
