// Serverless proxy for the AI Growth Analyst.
// The Gemini key lives only in the server environment variable GEMINI_API_KEY,
// so it is never shipped to the browser or committed to the repository.
const ALLOWED_MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash", "gemini-flash-latest"];

module.exports = async (req, res) => {
  if (req.method === "GET") return res.status(200).json({ ok: Boolean(process.env.GEMINI_API_KEY) });
  if (req.method !== "POST") return res.status(405).json({ error: { message: "POST only" } });
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: { message: "GEMINI_API_KEY is not set on the server." } });

  let body = req.body || {};
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const model = ALLOWED_MODELS.includes(body.model) ? body.model : "gemini-2.5-flash";
  const payload = {
    contents: body.contents,
    systemInstruction: body.systemInstruction,
    tools: body.tools,
    generationConfig: body.generationConfig
  };
  if (!Array.isArray(payload.contents) || JSON.stringify(payload).length > 300000) {
    return res.status(400).json({ error: { message: "Bad request" } });
  }
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify(payload)
    });
    const text = await r.text();
    res.setHeader("Content-Type", "application/json");
    return res.status(r.status).send(text);
  } catch (e) {
    return res.status(502).json({ error: { message: "Could not reach Gemini: " + e.message } });
  }
};
