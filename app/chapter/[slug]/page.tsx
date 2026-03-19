import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Clock, User } from 'lucide-react';
import { getPostBySlug, getPostsFromMultipleCategories, getPostsByCategorySlug } from '@/lib/wordpress';
import { formatDate, getReadingTime } from '@/lib/utils';
import { getDummyPostBySlug } from '@/lib/dummy-posts';
import PostPageClient from '@/components/PostPageClient';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true; // Allow dynamic post slugs not generated at build time

export async function generateStaticParams() {
  // Get posts from all categories for chapter
  const postsResponse = await getPostsFromMultipleCategories(
    ['insights', 'research', 'white-paper'],
    { perPage: 100 }
  );
  
  return postsResponse.data.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  let post = await getPostBySlug(slug);
  
  // Fallback to dummy posts if WordPress API returns null
  if (!post) {
    post = getDummyPostBySlug(slug);
  }

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage.url,
              width: post.featuredImage.width,
              height: post.featuredImage.height,
              alt: post.featuredImage.alt,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
      images: post.featuredImage ? [post.featuredImage.url] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  let post = await getPostBySlug(slug);
  
  // Fallback to dummy posts if WordPress API returns null
  if (!post) {
    post = getDummyPostBySlug(slug);
  }

  if (!post) {
    notFound();
  }

  // Fetch related posts from the same category
  let relatedPosts: any[] = [];
  if (post.categories && post.categories.length > 0) {
    const categorySlug = post.categories[0].slug;
    const relatedResponse = await getPostsByCategorySlug(categorySlug, { perPage: 4 });
    
    // Filter out current post and limit to 3
    relatedPosts = relatedResponse.data
      .filter((p) => p.id !== post.id)
      .slice(0, 3);
  }

  return (
    <PostPageClient 
      post={post}
      parentPage="Chapter"
      parentHref="/chapter"
      relatedPosts={relatedPosts}
    />
  );
}
