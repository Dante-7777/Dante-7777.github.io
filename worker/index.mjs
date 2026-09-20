import { lookupCalligraphy } from '../services/calligraphy-api.mjs';

const allowedOrigins = new Set([
  'https://akatsuki.fashion',
  'https://www.akatsuki.fashion',
  'https://dante-7777.github.io',
]);

function responseHeaders(request) {
  const origin = request.headers.get('origin');
  return {
    ...(origin && allowedOrigins.has(origin) ? { 'access-control-allow-origin': origin } : {}),
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'public, max-age=3600',
    vary: 'Origin',
  };
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const headers = responseHeaders(request);
    if (request.method === 'OPTIONS') return new Response(null, { headers });
    if (request.method !== 'GET' || url.pathname !== '/api/calligraphy') {
      return Response.json({ error: 'Not found' }, { status: 404, headers });
    }
    try {
      const result = await lookupCalligraphy(url.searchParams.get('character') || '');
      return new Response(JSON.stringify(result), { headers });
    } catch (error) {
      return new Response(JSON.stringify({ error: error instanceof Error ? error.message : '查询失败' }), { status: 400, headers });
    }
  },
};
