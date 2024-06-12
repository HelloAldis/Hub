import type { PaginateFunction } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { APP_BLOG } from 'astrowind:config';
import { cleanSlug, trimSlash, BLOG_BASE, POST_PERMALINK_PATTERN, CATEGORY_BASE, TAG_BASE } from './permalinks';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedPost = async (post: CollectionEntry<'post'>): Promise<Post> => {
  const { id, slug: rawSlug = '', data } = post;
  const { Content, headings, remarkPluginFrontmatter } = await post.render();

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
  } = data;

  const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;

  const category = rawCategory
    ? {
        slug: cleanSlug(rawCategory),
        title: rawCategory,
      }
    : undefined;

  const tags = rawTags.map((tag: string) => ({
    slug: cleanSlug(tag),
    title: tag,
  }));

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category: category?.slug }),

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    author: author,

    draft: draft,

    metadata,

    Content: Content,
    // or 'content' in case you consume from API

    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async function (user: string): Promise<Array<Post>> {
  const posts = await getCollection(user);
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

let _aldisPosts: Array<Post>;
let _camilaPosts: Array<Post>;
let _sevenPosts: Array<Post>;

/** */
export const isBlogEnabled = APP_BLOG.isEnabled;
export const isRelatedPostsEnabled = APP_BLOG.isRelatedPostsEnabled;
export const isBlogListRouteEnabled = APP_BLOG.list.isEnabled;
export const isBlogPostRouteEnabled = APP_BLOG.post.isEnabled;
export const isBlogCategoryRouteEnabled = APP_BLOG.category.isEnabled;
export const isBlogTagRouteEnabled = APP_BLOG.tag.isEnabled;

export const blogListRobots = APP_BLOG.list.robots;
export const blogPostRobots = APP_BLOG.post.robots;
export const blogCategoryRobots = APP_BLOG.category.robots;
export const blogTagRobots = APP_BLOG.tag.robots;

export const blogPostsPerPage = APP_BLOG?.postsPerPage;

/** */
export const fetchPosts = async (user: string): Promise<Array<Post>> => {
  if (user === 'seven') {
    if (_sevenPosts) {
      return _sevenPosts;
    } else {
      _sevenPosts = await load('seven');
      return _sevenPosts;
    }
  } else if (user === 'camila') {
    if (_camilaPosts) {
      return _camilaPosts;
    } else {
      _camilaPosts = await load('camila');
      return _camilaPosts;
    }
  } else {
    if (_aldisPosts) {
      return _aldisPosts;
    } else {
      _aldisPosts = await load('aldis');
      return _aldisPosts;
    }
  }
};

/** */
export const findPostsBySlugs = async (slugs: Array<string>, user: string): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];

  const posts = await fetchPosts(user);

  return slugs.reduce(function (r: Array<Post>, slug: string) {
    posts.some(function (post: Post) {
      return slug === post.slug && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findPostsByIds = async (ids: Array<string>, user: string): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];

  const posts = await fetchPosts(user);

  return ids.reduce(function (r: Array<Post>, id: string) {
    posts.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findLatestPosts = async ({ count }: { count?: number }, user: string): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchPosts(user);

  return posts ? posts.slice(0, _count) : [];
};

/** */
export const getStaticPathsBlogList = async ({ paginate }: { paginate: PaginateFunction }, user: string, size = blogPostsPerPage) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];
  return paginate(await fetchPosts(user), {
    params: { blog: BLOG_BASE || undefined },
    pageSize: size,
  });
};

/** */
export const getStaticPathsBlogPost = async (user: string) => {
  if (!isBlogEnabled || !isBlogPostRouteEnabled) return [];
  return (await fetchPosts(user)).flatMap((post) => ({
    params: {
      blog: post.permalink,
    },
    props: { post },
  }));
};

/** */
export const getStaticPathsBlogCategory = async ({ paginate }: { paginate: PaginateFunction }, user: string, size = blogPostsPerPage) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const posts = await fetchPosts(user);
  const categories = {};
  posts.map((post) => {
    post.category?.slug && (categories[post.category?.slug] = post.category);
  });

  return Array.from(Object.keys(categories)).flatMap((categorySlug) =>
    paginate(
      posts.filter((post) => post.category?.slug && categorySlug === post.category?.slug),
      {
        params: { category: categorySlug, blog: CATEGORY_BASE || undefined },
        pageSize: size,
        props: { category: categories[categorySlug] },
      }
    )
  );
};

/** */
export const getStaticPathsBlogTag = async ({ paginate }: { paginate: PaginateFunction }, user: string, size = blogPostsPerPage) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const posts = await fetchPosts(user);
  const tags = {};
  posts.map((post) => {
    Array.isArray(post.tags) &&
      post.tags.map((tag) => {
        tags[tag?.slug] = tag;
      });
  });

  return Array.from(Object.keys(tags)).flatMap((tagSlug) =>
    paginate(
      posts.filter((post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.slug === tagSlug)),
      {
        params: { tag: tagSlug, blog: TAG_BASE || undefined },
        pageSize: size,
        props: { tag: tags[tagSlug] },
      }
    )
  );
};

/** */
export async function getRelatedPosts(originalPost: Post, user: string, maxResults: number = 4): Promise<Post[]> {
  const allPosts = await fetchPosts(user);
  const originalTagsSet = new Set(originalPost.tags ? originalPost.tags.map((tag) => tag.slug) : []);

  const postsWithScores = allPosts.reduce((acc: { post: Post; score: number }[], iteratedPost: Post) => {
    if (iteratedPost.slug === originalPost.slug) return acc;

    let score = 0;
    if (iteratedPost.category && originalPost.category && iteratedPost.category.slug === originalPost.category.slug) {
      score += 5;
    }

    if (iteratedPost.tags) {
      iteratedPost.tags.forEach((tag) => {
        if (originalTagsSet.has(tag.slug)) {
          score += 1;
        }
      });
    }

    acc.push({ post: iteratedPost, score });
    return acc;
  }, []);

  postsWithScores.sort((a, b) => b.score - a.score);

  const selectedPosts: Post[] = [];
  let i = 0;
  while (selectedPosts.length < maxResults && i < postsWithScores.length) {
    selectedPosts.push(postsWithScores[i].post);
    i++;
  }

  return selectedPosts;
}

export const getTags = async (user: string) => {
	const allPosts = await fetchPosts(user);
	const tagMap = new Map();
	allPosts.forEach((post) => {
    if(post.tags) {
      post.tags.forEach((tag) => {
        tagMap.set(tag.slug, tag.title);
      })
    }
	});

	return tagMap;
}

export const getCategories = async (user: string) => {
	const allPosts = await fetchPosts(user);
	const categories = new Map();
	allPosts.forEach((post) => {
    if (post.category) {
      categories.set(post.category.slug, post.category.title);
    }
	});

	return Array.from(categories);
}
