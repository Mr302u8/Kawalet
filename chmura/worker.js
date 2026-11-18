// Kawalet - zapis krzywych w Cloudflare KV. Hasło jest w sekrecie KAWALET_PASS (nie w kodzie, nie na stronie).
// Powiązanie KV o nazwie KV. Odczyt i zapis wymagają nagłówka X-Kawalet-Key równego hasłu.
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Kawalet-Key',
};
const J = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });
export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
    if (!env.KAWALET_PASS || !env.KV) return J({ error: 'brak konfiguracji (sekret KAWALET_PASS lub KV)' }, 500);
    if (req.headers.get('X-Kawalet-Key') !== env.KAWALET_PASS) return J({ error: 'zle haslo' }, 401);
    if (req.method === 'GET') {
      const v = await env.KV.get('curves');
      return new Response(v || '{"curves":{}}', { headers: { ...CORS, 'Content-Type': 'application/json' } });
    }
    if (req.method === 'PUT') {
      const text = await req.text();
      if (text.length > 200000) return J({ error: 'za duze' }, 413);
      try { const o = JSON.parse(text); if (!o || typeof o.curves !== 'object') throw 0; } catch (e) { return J({ error: 'zly format' }, 400); }
      await env.KV.put('curves', text);
      return J({ ok: true });
    }
    return J({ error: 'metoda' }, 405);
  },
};
