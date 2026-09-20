const upstream = 'https://www.shufazidian.com/s.php';
const preferredArtists = ['王羲之', '王献之', '怀素', '张旭', '米芾', '孙过庭'];
const famousWorks = {
  王羲之: ['十七帖', '兰亭序', '丧乱帖', '得示帖', '远宦帖', '七十帖'],
  王献之: ['中秋帖', '鸭头丸帖', '廿九日帖', '奉别帖', '地黄汤帖'],
  怀素: ['自叙帖', '小草千字文', '草书千字文', '论书帖', '食鱼帖'],
  张旭: ['古诗四帖', '肚痛帖', '冠军帖', '断千字文'],
  米芾: ['蜀素帖', '苕溪诗帖', '珊瑚帖', '值雨帖', '虹县诗帖'],
  孙过庭: ['书谱', '草书千字文'],
};

const decodeHtml = (value) => value
  .replaceAll('&middot;', '·')
  .replaceAll('&nbsp;', ' ')
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replace(/<[^>]+>/g, '')
  .replace(/\s+/g, ' ')
  .trim();

export async function lookupCalligraphy(character) {
  if (!/^\p{Script=Han}$/u.test(character)) throw new Error('请输入一个汉字');
  const body = new URLSearchParams({ wd: character, sort: '7' });
  const response = await fetch(upstream, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'user-agent': 'Akatsuki Calligraphy Index/1.0 (+https://dante-7777.github.io/)',
    },
    body,
  });
  if (!response.ok) throw new Error('书法字典暂时无法访问');
  const html = await response.text();
  const matches = [...html.matchAll(/<a[^>]+href="(https:\/\/[^"<>]+)"[^>]+title="([^"<>]+)"[^>]*>\s*<img[^>]+src="(https:\/\/[^"<>]+)"/g)];
  const seen = new Set();
  const items = matches.map((match) => {
    const label = decodeHtml(match[2]);
    const parts = label.split('·').map((part) => part.trim()).filter(Boolean);
    return { image: match[3], original: match[1], label, dynasty: parts[0] || '', artist: parts[1] || label, work: parts.slice(2).join(' · ') };
  }).filter((item) => item.label !== '-' && !seen.has(item.image) && seen.add(item.image));
  const groups = preferredArtists.flatMap((artist) => {
    const works = famousWorks[artist] || [];
    const artistItems = items.filter((item) => item.artist === artist);
    artistItems.sort((a, b) => {
      const rank = (work) => {
        const index = works.findIndex((known) => work.includes(known));
        return index < 0 ? 99 : index;
      };
      return rank(a.work) - rank(b.work);
    });
    const distinctWorks = [];
    const repeatedWorks = [];
    const usedWorks = new Set();
    for (const item of artistItems) {
      const bucket = item.work && !usedWorks.has(item.work) ? distinctWorks : repeatedWorks;
      bucket.push(item);
      if (item.work) usedWorks.add(item.work);
    }
    return artistItems.length ? [{ artist, results: [...distinctWorks, ...repeatedWorks].slice(0, 6) }] : [];
  });
  return { character, groups, source: 'https://www.shufazidian.com/' };
}
