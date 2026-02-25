import type { WPPost, WPAPIResponse, Post } from '@/types/wordpress';

const API_URL = process.env.WORDPRESS_API_URL || 'https://wordpress.klysera.ai/wp-json/wp/v2';

// Check if WordPress API is configured
const isWordPressConfigured = API_URL && !API_URL.includes('your-wordpress-site.com');

/**
 * Fetch WordPress posts with optional parameters
 */
export async function getPosts(params?: {
  page?: number;
  perPage?: number;
  categories?: number[];
  tags?: number[];
  search?: string;
}): Promise<WPAPIResponse<Post[]>> {
  // Return empty data if WordPress is not configured
  if (!isWordPressConfigured) {
    return {
      data: [],
      total: 0,
      totalPages: 0,
    };
  }

  const { page = 1, perPage = 12, categories, tags, search } = params || {};

  const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    _embed: 'true',
  });

  if (categories && categories.length > 0) {
    queryParams.append('categories', categories.join(','));
  }

  if (tags && tags.length > 0) {
    queryParams.append('tags', tags.join(','));
  }

  if (search) {
    queryParams.append('search', search);
  }

  try {
    const response = await fetch(`${API_URL}/posts?${queryParams}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const total = parseInt(response.headers.get('X-WP-Total') || '0', 10);
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10);
    const data: WPPost[] = await response.json();

    return {
      data: data.map(transformPost),
      total,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      data: [],
      total: 0,
      totalPages: 0,
    };
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Return null if WordPress is not configured
  if (!isWordPressConfigured) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed=true`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const data: WPPost[] = await response.json();

    if (data.length === 0) {
      return null;
    }

    return transformPost(data[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

/**
 * Fetch all post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<string[]> {
  // Return empty array if WordPress is not configured
  if (!isWordPressConfigured) {
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/posts?per_page=100&_fields=slug`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch post slugs: ${response.statusText}`);
    }

    const data: Array<{ slug: string }> = await response.json();
    return data.map((post) => post.slug);
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

/**
 * Fetch post slugs by category slug
 */
export async function getPostSlugsByCategorySlug(categorySlug: string): Promise<string[]> {
  if (!isWordPressConfigured) {
    return [];
  }

  const category = await getCategoryBySlug(categorySlug);
  
  if (!category) {
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/posts?categories=${category.id}&per_page=100&_fields=slug`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch post slugs: ${response.statusText}`);
    }

    const data: Array<{ slug: string }> = await response.json();
    return data.map((post) => post.slug);
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

/**
 * Transform WordPress post to simplified format
 */
function transformPost(post: WPPost): Post {
  const author = post._embedded?.author?.[0];
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const terms = post._embedded?.['wp:term'];

  return {
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    date: post.date,
    author: {
      name: author?.name || 'Unknown',
      avatar: author?.avatar_urls?.['96'] || '',
    },
    featuredImage: featuredMedia
      ? {
          url: featuredMedia.source_url,
          alt: featuredMedia.alt_text || post.title.rendered,
          width: featuredMedia.media_details?.width || 1200,
          height: featuredMedia.media_details?.height || 630,
        }
      : null,
    categories:
      terms?.[0]?.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })) || [],
    tags:
      terms?.[1]?.map((tag) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
      })) || [],
  };
}

/**
 * Fetch category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<{ id: number; name: string; description: string; slug: string } | null> {
  if (!isWordPressConfigured) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/categories?slug=${slug}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch category: ${response.statusText}`);
    }

    const data: Array<{ id: number; name: string; description: string; slug: string }> = await response.json();

    if (data.length === 0) {
      return null;
    }

    return {
      id: data[0].id,
      name: data[0].name,
      description: data[0].description,
      slug: data[0].slug,
    };
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

/**
 * Fetch posts by category slug
 */
export async function getPostsByCategorySlug(categorySlug: string, params?: {
  page?: number;
  perPage?: number;
}): Promise<WPAPIResponse<Post[]>> {
  // First get the category ID
  const category = await getCategoryBySlug(categorySlug);
  
  if (!category) {
    return {
      data: [],
      total: 0,
      totalPages: 0,
    };
  }

  // Then fetch posts with that category ID
  return getPosts({
    ...params,
    categories: [category.id],
  });
}

/**
 * Fetch posts from multiple category slugs
 */
export async function getPostsFromMultipleCategories(categorySlugs: string[], params?: {
  page?: number;
  perPage?: number;
}): Promise<WPAPIResponse<Post[]>> {
  if (!isWordPressConfigured) {
    return {
      data: [],
      total: 0,
      totalPages: 0,
    };
  }

  // Fetch all categories
  const categoryPromises = categorySlugs.map(slug => getCategoryBySlug(slug));
  const categories = await Promise.all(categoryPromises);
  
  // Filter out null categories and get IDs
  const categoryIds = categories
    .filter((cat): cat is NonNullable<typeof cat> => cat !== null)
    .map(cat => cat.id);

  if (categoryIds.length === 0) {
    return {
      data: [],
      total: 0,
      totalPages: 0,
    };
  }

  // Fetch posts with all category IDs
  return getPosts({
    ...params,
    categories: categoryIds,
  });
}
