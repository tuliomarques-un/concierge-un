# ✈️ Concierge UN — Universo Narrado

## Estrutura:
```
/
├── public/
│   └── index.html       ← Frontend
├── api/
│   └── search.js        ← Proxy SerpApi (serverless)
├── vercel.json          ← Config
└── README.md
```

## Deploy:
1. Suba esses arquivos pro repositório GitHub (raiz)
2. Na Vercel, conecte o repositório
3. Em Settings → Environment Variables, adicione: SERPAPI_KEY = sua key
4. Redeploy
