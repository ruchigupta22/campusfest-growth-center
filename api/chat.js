// Serverless proxy for the AI Growth Analyst.
// - The Gemini key lives only in the server environment variable GEMINI_API_KEY.
// - Only this site's own pages may call it (Origin/Referer must match the host).
// - Per-IP rate limit (best-effort, per server instance) and an output-token cap.
// - If the requested model fails (retired, overloaded), it falls back to another one.
const MODEL_PATTERN = /^gemini-[a-z0-9.\-]{1,40}$/;
const FALLBACK_MODELS = ["gemini-flash-lite-latest", "gemini-flash-latest"];
const WINDOW_MS = 10 * 60 * 1000;   // 10 minutes
const MAX_REQUESTS = 150;           // model calls per IP per window (one question uses ~2-6)
const MAX_OUTPUT_TOKENS = 1024;
const hits = new Map();

function allowed(req) {
  const host = String(req.headers.host || "").toLowerCase();
  const src = String(req.headers.origin || req.headers.referer || "");
  try { return host && new URL(src).host.toLowerCase() === host; } catch (e) { return false; }
}

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX_REQUESTS;
}

module.exports = async (req, res) => {
  if (req.method === "GET") return res.status(200).json({ ok: Boolean(process.env.GEMINI_API_KEY) });
  if (req.method !== "POST") return res.status(405).json({ error: { message: "POST only" } });
  if (!allowed(req)) return res.status(403).json({ error: { message: "This endpoint only serves the Growth Center site." } });
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return res.status(429).json({ error: { message: "Too many requests. Please wait a few minutes and try again." } });
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: { message: "GEMINI_API_KEY is not set on the server." } });

  let body = req.body || {};
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const requested = MODEL_PATTERN.test(String(body.model || "")) ? body.model : FALLBACK_MODELS[0];
  const generationConfig = Object.assign({}, body.generationConfig || {}, {
    maxOutputTokens: Math.min(Number((body.generationConfig || {}).maxOutputTokens) || MAX_OUTPUT_TOKENS, MAX_OUTPUT_TOKENS)
  });
  const payload = { contents: body.contents, systemInstruction: body.systemInstruction, tools: body.tools, generationConfig };
  if (!Array.isArray(payload.contents) || JSON.stringify(payload).length > 300000) {
    return res.status(400).json({ error: { message: "Bad request" } });
  }
  const models = [requested].concat(FALLBACK_MODELS.filter(m => m !== requested));
  let last = { status: 502, text: JSON.stringify({ error: { message: "Could not reach Gemini." } }) };
  for (const model of models) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify(payload)
      });
      const text = await r.text();
      last = { status: r.status, text };
      if (r.ok || (r.status !== 404 && r.status !== 429 && r.status < 500)) break;
    } catch (e) {
      last = { status: 502, text: JSON.stringify({ error: { message: "Could not reach Gemini: " + e.message } }) };
    }
  }
  res.setHeader("Content-Type", "application/json");
  return res.status(last.status).send(last.text);
};
