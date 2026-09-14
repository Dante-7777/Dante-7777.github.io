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
