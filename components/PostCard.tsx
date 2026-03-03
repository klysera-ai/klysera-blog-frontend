import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/types/wordpress';
import { formatDate, stripHtml, truncate, getPostUrl } from '@/lib/utils';

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
  return (
    <article style={{ padding: '15px', borderWidth: '1px' }} className="group flex flex-col justify-between  bg-white dark:bg-black rounded-none overflow-hidden border border-[#DCE5EF] dark:border-[#A9A9A94D]">
      {post.featuredImage && (
        <Link href={postUrl}>
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </Link>
      )}

          
      <div className='flex flex-col flex-1 justify-between min-h-[80px]'>
        {/* Title */}
        <Link href={postUrl}>
          <p 
            className="py-[15px] text-[#001F3F] dark:text-white transition-colors"
            style={{
              fontFamily: 'Acid Grotesk, sans-serif',
              fontSize: '16px',
              fontWeight: '200',
              lineHeight: '1.5',
            }}
          >
            {post.title}
          </p>
        </Link>

        {/* Category & Date */}
        <div className="flex items-center justify-between">
          {/* Category Label - Bottom Left */}
          {post.categories.length > 0 && (
            <span 
            className='text-[#001F3F] dark:text-white   transition-colors'
              style={{
                fontFamily: 'General Sans, sans-serif',
                fontSize: '14px',
                fontWeight: '400',
                }}
            >
              {post.categories[0].name}
            </span>
          )}

          {/* Date - Bottom Right */}
          <time 
          className='text-[#A9A9A9] dark:text-[#A9A9A9]  transition-colors'
            dateTime={post.date}
            style={{
              fontFamily: 'General Sans, sans-serif',
              fontSize: '14px',
              fontWeight: '400',
            }}
          >
            {formatDate(post.date, 'd MMM yyyy')}
          </time>
        </div>
      </div>
    </article>
  );
}
