import { createServer } from 'node:http';
import { lookupCalligraphy } from '../services/calligraphy-api.mjs';
import { lookupDailyPoem } from '../services/daily-poem-api.mjs';

const port = 8787;
createServer(async (request, response) => {
  response.setHeader('access-control-allow-origin', '*');
  response.setHeader('content-type', 'application/json; charset=utf-8');
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (!['/api/calligraphy', '/api/daily-poem'].includes(url.pathname)) throw new Error('Not found');
    const result = url.pathname === '/api/daily-poem'
      ? await lookupDailyPoem()
      : await lookupCalligraphy(url.searchParams.get('character') || '');
    response.end(JSON.stringify(result));
  } catch (error) {
    response.statusCode = 400;
    response.end(JSON.stringify({ error: error instanceof Error ? error.message : '查询失败' }));
  }
}).listen(port, '127.0.0.1', () => console.log(`Calligraphy API: http://127.0.0.1:${port}`));
