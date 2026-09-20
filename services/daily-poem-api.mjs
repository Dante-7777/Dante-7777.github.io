const upstream = 'https://haitang.app/';

const decodeHtml = (value) => value
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replaceAll('&nbsp;', ' ')
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&#39;', "'")
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .trim();

export async function lookupDailyPoem() {
  const response = await fetch(upstream, {
    headers: { 'user-agent': 'Akatsuki Daily Verse/1.0 (+https://akatsuki.fashion/)' },
  });
  if (!response.ok) throw new Error('今日诗笺暂时无法读取');
  const html = await response.text();
  const section = html.slice(html.indexOf('每日一诗'));
  const match = section.match(/href="\/works\/(\d+)"[\s\S]*?<h1[^>]*>([^<]+)<\/h1>[\s\S]*?href="\/works\?d=[^"]+"[^>]*>\[<!--[\s\S]*?-->([^<]+)<!--[\s\S]*?-->\]<\/a><a[^>]*>([^<]+)<\/a>[\s\S]*?<pre[^>]*>([\s\S]*?)<\/pre>/);
  if (!match) throw new Error('今日诗笺格式发生变化');
  return {
    title: decodeHtml(match[2]),
    dynasty: decodeHtml(match[3]),
    author: decodeHtml(match[4]),
    content: decodeHtml(match[5]),
    url: `https://haitang.app/works/${match[1]}`,
    source: upstream,
  };
}
