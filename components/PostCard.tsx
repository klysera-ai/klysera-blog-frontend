import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/types/wordpress';
import { formatDate, stripHtml, truncate, getPostUrl } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  viewMode?: 'grid' | 'list';
}

export default function PostCard({ post, viewMode = 'grid' }: PostCardProps) {
  const excerpt = stripHtml(post.excerpt);

  if (viewMode === 'list') {
    const postUrl = getPostUrl(post.slug, post.categories[0]?.slug);
    return (
      <article className="flex flex-col md:flex-row gap-6 bg-white dark:bg-black rounded-lg hover:shadow-lg transition-shadow">
        {post.featuredImage && (
          <Link href={postUrl} className="md:w-1/3 flex-shrink-0">
            <div className="relative h-64 md:h-full w-full rounded-lg overflow-hidden">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt}
                fill
                className="object-cover"
              />
            </div>
          </Link>
        )}

        <div className="flex-1 flex flex-col" style={{ paddingTop: '15px', paddingRight: '15px', paddingBottom: '15px' }}>
          {/* Category Label */}
          {post.categories.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <span 
                className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-md"
                style={{
                  fontFamily: 'Acid Grotesk, sans-serif',
                  fontSize: '16px',
                }}
              >
                {post.categories[0].name}
              </span>
            </div>
          )}

          {/* Title */}
          <Link href={postUrl}>
            <h2 
              className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                marginBottom: '15px',
                lineHeight: '1.4',
              }}
            >
              {post.title}
            </h2>
          </Link>

          {/* Excerpt */}
          <p 
            className="text-gray-600 dark:text-gray-400 flex-1"
            style={{
              fontFamily: 'General Sans, sans-serif',
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '20px',
            }}
          >
            {truncate(excerpt, 200)}
          </p>

          {/* Author Section */}
          <div className="flex items-center gap-3">
            {post.author.avatar && (
              <div 
                className="relative rounded-full overflow-hidden flex-shrink-0" 
                style={{ width: '40px', height: '40px' }}
              >
                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
              </div>
            )}
            <div>
              <p 
                className="text-gray-900 dark:text-white font-medium"
                style={{
                  fontFamily: 'Acid Grotesk, sans-serif',
                  fontSize: '14px',
                  marginBottom: '2px',
                }}
              >
                {post.author.name}
              </p>
              <time 
                dateTime={post.date}
                className="text-gray-500 dark:text-gray-400"
                style={{
                  fontFamily: 'Acid Grotesk, sans-serif',
                  fontSize: '14px',
                }}
              >
                {formatDate(post.date)}
              </time>
            </div>
          </div>
        </div>
      </article>
    );
  }

  const postUrl = getPostUrl(post.slug, post.categories[0]?.slug);
  return (
    <article className="bg-white dark:bg-black rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {post.featuredImage && (
        <Link href={postUrl}>
          <div className="relative h-64 w-full">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      )}

      <div style={{ padding: '20px' }}>
        {/* Title/Text */}
        <Link href={postUrl}>
          <p 
            className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            style={{
              fontFamily: 'Acid Grotesk, sans-serif',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '1.5',
              marginBottom: '40px',
            }}
          >
            {post.title}
          </p>
        </Link>

        {/* Author Section & Category */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {post.author.avatar && (
              <div 
                className="relative rounded-full overflow-hidden flex-shrink-0" 
                style={{ width: '40px', height: '40px' }}
              >
                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
              </div>
            )}
            <div>
              <p 
                className="text-gray-900 dark:text-white font-medium"
                style={{
                  fontFamily: 'Acid Grotesk, sans-serif',
                  fontSize: '14px',
                  marginBottom: '2px',
                }}
              >
                {post.author.name}
              </p>
              <time 
                dateTime={post.date}
                className="text-gray-500 dark:text-gray-400"
                style={{
                  fontFamily: 'Acid Grotesk, sans-serif',
                  fontSize: '14px',
                }}
              >
                {formatDate(post.date)}
              </time>
            </div>
          </div>

          {/* Category Label - Bottom Right */}
          {post.categories.length > 0 && (
            <span 
              className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-md"
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '16px',
              }}
            >
              {post.categories[0].name}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
