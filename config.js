// Public client settings. Do NOT put API keys here: this file is served to every browser.
// On Vercel the AI analyst uses the server function api/chat.js, which reads GEMINI_API_KEY
// from the project's environment variables.
window.GC_CONFIG = {
  geminiKey: "",
  geminiModel: "gemini-flash-lite-latest"
};
