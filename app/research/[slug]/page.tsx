import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug, getPostSlugsByCategorySlug } from '@/lib/wordpress';
import { formatDate, getReadingTime } from '@/lib/utils';
import ShareButtons from '@/components/ShareButtons';
import { getDummyPostBySlug } from '@/lib/dummy-posts';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true; // Allow dynamic post slugs not generated at build time

export async function generateStaticParams() {
  const slugs = await getPostSlugsByCategorySlug('research');
  return slugs.map((slug) => ({
    slug,
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
      {/* Featured Image Hero */}
      {post.featuredImage && (
        <div className="relative w-full h-[300px] md:h-[600px]">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
      )}

      {/* Content Container */}
      <div className="container mx-auto px-4 -mt-16 md:-mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <Link
                href="/research"
                className="inline-flex items-center gap-1.5 md:gap-2 text-gray-600 hover:text-gray-900 dark:text-white/80 dark:hover:text-white transition-colors text-sm md:text-base"
                style={{
                  fontFamily: 'General Sans, sans-serif',
                }}
              >
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Research
              </Link>
            </nav>

            {/* Categories */}
            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <span
                    key={category.id}
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-full"
                    style={{
                      fontFamily: 'Acid Grotesk, sans-serif',
                      fontSize: '14px',
                    }}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-gray-900 dark:text-white mb-6 mt-8 md:mt-16 text-3xl md:text-5xl" style={{
              fontFamily: 'Acid Grotesk, sans-serif', lineHeight: '1.2', fontWeight: '600',
            }}


            >
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-white/70 mb-8">
              <time
                dateTime={post.date}
                style={{
                  fontFamily: 'Acid Grotesk, sans-serif',
                  fontSize: '14px',
                }}
              >
                {formatDate(post.date)}
              </time>
              <span>•</span>
              <span
                style={{
                  fontFamily: 'Acid Grotesk, sans-serif',
                  fontSize: '14px',
                }}
              >
                {getReadingTime(post.content)}
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-lg">
              {post.author.avatar && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                </div>
              )}
              <div>
                <p
                  className="text-gray-900 dark:text-white"
                  style={{
                    fontFamily: 'Acid Grotesk, sans-serif',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  {post.author.name}
                </p>
                <p
                  className="text-gray-600 dark:text-gray-400"
                  style={{
                    fontFamily: 'General Sans, sans-serif',
                    fontSize: '14px',
                  }}
                >
                  Author
                </p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 md:p-12 mb-12">
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-lg p-8 mb-12">
              <h3
                className="text-gray-900 dark:text-white mb-4"
                style={{
                  fontFamily: 'Acid Grotesk, sans-serif',
                  fontSize: '20px',
                  fontWeight: '500',
                }}
              >
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg"
                    style={{
                      fontFamily: 'Acid Grotesk, sans-serif',
                      fontSize: '14px',
                    }}
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <ShareButtons title={post.title} />

          {/* Back to Research Button */}
          <div className="text-center pb-12">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              style={{
                fontFamily: 'General Sans, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all research
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
