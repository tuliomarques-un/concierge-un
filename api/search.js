export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const API_KEY = process.env.SERPAPI_KEY;
  if (!API_KEY) {
    return res.status(500).json({
      error: "SERPAPI_KEY não configurada. Vá em Vercel → Settings → Environment Variables e adicione SERPAPI_KEY.",
    });
  }

  try {
    const params = new URLSearchParams({ api_key: API_KEY, ...req.query });
    const resp = await fetch(`https://serpapi.com/search.json?${params}`);
    const data = await resp.json();

    if (data.error) return res.status(400).json({ error: data.error });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message || "Erro interno" });
  }
}
