import { getRssString } from '@astrojs/rss';

import { SITE, METADATA, APP_BLOG } from 'astrowind:config';
import { fetchPosts } from '~/utils/blog';
import { getBlogPostPermalink } from '~/utils/permalinks';

export const GET = async () => {
  const aldisPosts = await fetchPosts('aldis');
  const aldisItems = aldisPosts.map((post) => ({
    link: getBlogPostPermalink(post.permalink, 'aldis'),
    title: post.title,
    description: post.excerpt,
    pubDate: post.publishDate,
  }));

  const camilaPosts = await fetchPosts('camila');
  const camilaItems = camilaPosts.map((post) => ({
    link: getBlogPostPermalink(post.permalink, 'camila'),
    title: post.title,
    description: post.excerpt,
    pubDate: post.publishDate,
  }));

  const sevenPosts = await fetchPosts('seven');
  const sevenItems = sevenPosts.map((post) => ({
    link: getBlogPostPermalink(post.permalink, 'seven'),
    title: post.title,
    description: post.excerpt,
    pubDate: post.publishDate,
  }));

  const rss = await getRssString({
    title: `${SITE.name}`,
    description: METADATA?.description || '',
    site: import.meta.env.SITE,

    items: [...aldisItems, ...camilaItems, ...sevenItems],

    trailingSlash: SITE.trailingSlash,
  });

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
