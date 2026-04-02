const https = require("https");

module.exports = (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const API_KEY = process.env.SERPAPI_KEY;
  if (!API_KEY) {
    return res.status(500).json({
      error: "SERPAPI_KEY não configurada. Vá em Vercel → Settings → Environment Variables.",
    });
  }

  // Build query params
  const params = new URLSearchParams(req.query);
  params.set("api_key", API_KEY);

  const url = `https://serpapi.com/search.json?${params.toString()}`;

  https.get(url, (response) => {
    let data = "";
    response.on("data", (chunk) => { data += chunk; });
    response.on("end", () => {
      try {
        const json = JSON.parse(data);
        if (json.error) return res.status(400).json({ error: json.error });
        return res.status(200).json(json);
      } catch (e) {
        return res.status(500).json({ error: "Erro ao processar resposta do SerpApi" });
      }
    });
  }).on("error", (err) => {
    return res.status(500).json({ error: err.message });
  });
};
