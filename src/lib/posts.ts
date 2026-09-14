import type { CollectionEntry } from 'astro:content';

export const visiblePosts = (posts: CollectionEntry<'posts'>[]) =>
  posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

export const postSlug = (id: string) => id.replace(/\/index$/, '');

export const dateText = (date: Date) =>
  new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

export const taxonomyPath = (kind: 'categories' | 'tags', value: string) =>
  `/${kind}/${encodeURIComponent(value)}/`;

export const readingMinutes = (body = '') => {
  const plainText = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`\[\]()!-]/g, ' ');
  const chineseCharacters = plainText.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const latinWords = plainText.match(/[A-Za-z0-9]+/g)?.length ?? 0;
  return Math.max(1, Math.ceil(chineseCharacters / 350 + latinWords / 220));
};
