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
    const readingTime = getReadingTime(post.content);
    
    return (
      <article 
        className="bg-white dark:bg-[#001F3F] border-b border-[#E5E5E7] dark:border-[#CFDDE829] py-6 transition-colors"
        onMouseEnter={() => onHover?.(post.id)}
        onMouseLeave={() => onHover?.(null)}
      >
        {/* Desktop Layout - Grid with columns */}
        <div className="hidden md:grid grid-cols-[1fr_120px_140px_140px] gap-8 items-center">

          {/* Title */}
          <Link href={postUrl} className="flex-1">
            <h2 
              className={`transition-colors hover:opacity-70 ${getListItemClasses()}`}
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '22px',
                fontWeight: '200',
                lineHeight: '28px',
                letterSpacing: '-0.02em',
              }}
            >
              {post.title}
            </h2>
          </Link>

          {/* Read Time */}
          <span 
            className={`${getListItemClasses()}`}
            style={{
              fontFamily: 'Acid Grotesk, sans-serif',
              fontSize: '14px',
              fontWeight: '200',
              lineHeight: '20px',
              whiteSpace: 'nowrap',
            }}
          >
            {readingTime} mins read
          </span>

          {/* Date */}
          <time 
            dateTime={post.date}
            className={getListItemClasses()}
            style={{
              fontFamily: 'Acid Grotesk, sans-serif',
              fontSize: '14px',
              fontWeight: '200',
              lineHeight: '20px',
              whiteSpace: 'nowrap',
            }}
          >
            {formatDate(post.date, 'd MMM, yyyy')}
          </time>

          {/* Category */}
          {post.categories.length > 0 && (
            <span 
              className={`${getListItemClasses()}`}
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '14px',
                fontWeight: '200',
                lineHeight: '20px',
                whiteSpace: 'nowrap',
              }}
            >
              {post.categories[0].name}
            </span>
          )}
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="md:hidden flex flex-col gap-3">
          {/* Title */}
          <Link href={postUrl}>
            <h2 
              className={`transition-colors hover:opacity-70 ${getListItemClasses()}`}
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '18px',
                fontWeight: '200',
                lineHeight: '24px',
                letterSpacing: '-0.02em',
              }}
            >
              {post.title}
            </h2>
          </Link>

          {/* Meta Info Row */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Read Time */}
            <span 
              className={`${getListItemClasses()}`}
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '12px',
                fontWeight: '200',
                lineHeight: '16px',
              }}
            >
              {readingTime} mins read
            </span>

            <span className={`${getListItemClasses()}`}>|</span>

            {/* Date */}
            <time 
              dateTime={post.date}
              className={getListItemClasses()}
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '12px',
                fontWeight: '200',
                lineHeight: '16px',
              }}
            >
              {formatDate(post.date, 'd MMM, yyyy')}
            </time>

            {/* Category */}
            {post.categories.length > 0 && (
              <>
                <span className={`${getListItemClasses()}`}>|</span>
                <span 
                  className={`${getListItemClasses()}`}
                  style={{
                    fontFamily: 'Acid Grotesk, sans-serif',
                    fontSize: '12px',
                    fontWeight: '200',
                    lineHeight: '16px',
                  }}
                >
                  {post.categories[0].name}
                </span>
              </>
            )}
          </div>
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
