import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../config';
import { postSlug, visiblePosts } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = visiblePosts(await getCollection('posts'));
  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? 'https://dante-7777.github.io',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/writing/${postSlug(post.id)}/`,
    })),
  });
}
