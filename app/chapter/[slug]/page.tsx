import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Clock, User } from 'lucide-react';
import { getPostBySlug, getPostsFromMultipleCategories } from '@/lib/wordpress';
import { formatDate, getReadingTime } from '@/lib/utils';
import TableOfContents from '@/components/TableOfContents';
import { getDummyPostBySlug } from '@/lib/dummy-posts';

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

  return (
    <article className="bg-white dark:bg-black min-h-screen">
      <div className="container mx-auto px-6 py-8 max-w-[1200px]">
        {/* Three Column Layout */}
        <div className="lg:grid lg:grid-cols-[200px_1fr_200px] lg:gap-0">
          {/* Left Empty Column */}
          <div className="hidden lg:block" />
          
          {/* Main Content */}
          <div className="max-w-[800px]">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <div className="text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: 'General Sans, sans-serif' }}>
                <Link href="/chapter" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Chapter
                </Link>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-900 dark:text-white">{slug}</span>
              </div>
            </nav>

            {/* Title */}
            <h1
              className="text-gray-900 dark:text-white mb-8"
              style={{ 
                fontFamily: 'Acid Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: '50px',
                lineHeight: '100%',
                letterSpacing: '-0.02em'
              }}
            >
              {post.title}
            </h1>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden mb-6">
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Post Meta */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-12" style={{ fontFamily: 'General Sans, sans-serif' }}>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>by {post.author.name}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{getReadingTime(post.content)}</span>
              </div>
              {post.categories.length > 0 && (
                <>
                  <span>•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {post.categories[0].name}
                  </span>
                </>
              )}
            </div>

            {/* Main Content */}
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Table of Contents - Sidebar */}
          <TableOfContents content={post.content} />
        </div>
      </div>
    </article>
  );
}
