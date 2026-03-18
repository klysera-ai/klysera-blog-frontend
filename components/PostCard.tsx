import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/types/wordpress';
import { formatDate, stripHtml, truncate, getPostUrl, getReadingTime } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  viewMode?: 'grid' | 'list';
  hoveredPostId?: number | null;
  onHover?: (id: number | null) => void;
  theme?: string;
}

export default function PostCard({ 
  post, 
  viewMode = 'grid', 
  hoveredPostId, 
  onHover,
  theme 
}: PostCardProps) {
  const excerpt = stripHtml(post.excerpt);

  // Calculate colors for list view based on hover state
  const getListItemClasses = () => {
    if (viewMode !== 'list' || !onHover) {
      return 'text-black dark:text-white';
    }

    const isThisHovered = hoveredPostId === post.id;
    const isAnyHovered = hoveredPostId !== null;

    if (isThisHovered) {
      return 'text-black dark:text-white';
    }
    
    if (isAnyHovered) {
      return 'text-[#8E8E93] dark:text-[#FFFFFF63]';
    }
    
    return 'text-black dark:text-white';
  };

  if (viewMode === 'list') {
    const postUrl = getPostUrl(post.slug, post.categories[0]?.slug);
    return (
      <article 
        className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800"
        style={{ paddingBottom: '20px' }}
        onMouseEnter={() => onHover?.(post.id)}
        onMouseLeave={() => onHover?.(null)}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px_150px] gap-4 md:gap-8">

          {/* Title */}
          <Link href={postUrl} className="flex-1">
            <h2 
              className={`transition-colors ${getListItemClasses()}`}
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '22px',
                fontWeight: '200',
                lineHeight: '1.3',
              }}
            >
              {post.title}
            </h2>
          </Link>

          {/* Category */}
          {post.categories.length > 0 && (
            <span 
              className={`${getListItemClasses()}`}
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '14px',
                fontWeight: '200',
                whiteSpace: 'nowrap',
              }}
            >
              {post.categories[0].name}
            </span>
          )}

          {/* Date */}
          <time 
            dateTime={post.date}
            className={getListItemClasses()}
            style={{
              fontFamily: 'Acid Grotesk, sans-serif',
              fontSize: '14px',
              fontWeight: '200',
              whiteSpace: 'nowrap',
              textAlign:'left',
            }}
          >
            {formatDate(post.date)}
          </time>
        </div>
      </article>
    );
  }

  const postUrl = getPostUrl(post.slug, post.categories[0]?.slug);
  const readingTime = getReadingTime(post.content);
  
  return (
    <article className="group flex flex-col bg-white dark:bg-[#001F3F]">
      {/* Featured Image */}
      {post.featuredImage && (
        <Link href={postUrl}>
          <div 
            className="relative w-full overflow-hidden border-[0.98px] border-[#B1B9C8] dark:border-[#0557AD] p-[12px]"
            style={{
              width: '100%',
              maxWidth: '352px',
              height: 'auto',
              aspectRatio: '1/1',
            }}
          >
            <div className="border-[0.98px] border-[#B1B9C8] dark:border-[#0557AD]" style={{
              width: '100%',
              maxWidth: '340px',
              height: 'auto',
              aspectRatio: '1/1',
            }}>
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              width={340}
              height={340}
              className="object-cover w-full h-full"
            />
            </div>
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="flex flex-col gap-3 pt-4">
        {/* Reading Time */}
        <span 
          className="text-[#444E60] dark:text-[#F0F4F8]"
          style={{
            fontFamily: 'General Sans, sans-serif',
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '20px',
          }}
        >
          {readingTime} mins read
        </span>

        {/* Title */}
        <Link href={postUrl}>
          <h3 
            className="text-[#001F3F] dark:text-[#F0F4F8] transition-colors"
            style={{
              fontFamily: 'Acid Grotesk, sans-serif',
              fontSize: '20px',
              fontWeight: '400',
              lineHeight: '32px',
              letterSpacing: '-0.02em',
            }}
          >
            {post.title}
          </h3>
        </Link>

        {/* Category & Date */}
        <div className="flex items-center gap-2">
          {/* Category */}
          {post.categories.length > 0 && (
            <>
              <span 
                className="text-[#68778F] dark:text-[#CFDDE8]"
                style={{
                  fontFamily: 'General Sans, sans-serif',
                  fontSize: '12px',
                  fontWeight: '400',
                  lineHeight: '20px',
                }}
              >
                {post.categories[0].name}
              </span>
              <span className="text-[#68778F] dark:text-[#CFDDE8]">|</span>
            </>
          )}

          {/* Date */}
          <time 
            className="text-[#68778F] dark:text-[#CFDDE8]"
            dateTime={post.date}
            style={{
              fontFamily: 'General Sans, sans-serif',
              fontSize: '12px',
              fontWeight: '400',
              lineHeight: '20px',
            }}
          >
            {formatDate(post.date, 'd MMM, yyyy')}
          </time>
        </div>
      </div>
    </article>
  );
}
