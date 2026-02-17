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
  const getTitleColor = () => {
    if (viewMode !== 'list' || !onHover) {
      return theme === 'dark' ? '#FFFFFF' : '#000000';
    }

    const isThisHovered = hoveredPostId === post.id;
    const isAnyHovered = hoveredPostId !== null;

    if (theme === 'dark') {
      if (isThisHovered) return '#FFFFFF';
      if (isAnyHovered) return '#FFFFFF63';
      return '#FFFFFF';
    } else {
      if (isThisHovered) return '#000000';
      if (isAnyHovered) return '#8E8E93';
      return '#000000';
    }
  };

  if (viewMode === 'list') {
    const postUrl = getPostUrl(post.slug, post.categories[0]?.slug);
    return (
      <article 
        className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800"
        style={{ paddingTop: '20px', paddingBottom: '20px' }}
        onMouseEnter={() => onHover?.(post.id)}
        onMouseLeave={() => onHover?.(null)}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px_150px] gap-4 md:gap-8">

          {/* Title */}
          <Link href={postUrl} className="flex-1">
            <h2 
              className="transition-colors"
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '26px',
                fontWeight: '400',
                lineHeight: '1.3',
                color: getTitleColor(),
              }}
            >
              {post.title}
            </h2>
          </Link>

          {/* Category */}
          {post.categories.length > 0 && (
            <span 
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '14px',
                fontWeight: '400',
                whiteSpace: 'nowrap',
                color: getTitleColor(),
              }}
            >
              {post.categories[0].name}
            </span>
          )}

          {/* Date */}
          <time 
            dateTime={post.date}
            style={{
              fontFamily: 'Acid Grotesk, sans-serif',
              fontSize: '14px',
              fontWeight: '400',
              whiteSpace: 'nowrap',
              textAlign:'left',
              color: getTitleColor(),
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
    <article style={{ padding: '15px', borderColor: '#DCE5EF', borderWidth: '1px' }} className="group bg-white dark:bg-black rounded-none overflow-hidden border dark:border-[#A9A9A94D]">
      {post.featuredImage && (
        <Link href={postUrl}>
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </Link>
      )}

      <div style={{ padding: '20px' }}>
        {/* Title */}
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

        {/* Category & Date */}
        <div className="flex items-center justify-between">
          {/* Category Label - Bottom Left */}
          {post.categories.length > 0 && (
            <span 
              className="text-gray-900 dark:text-white"
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '14px',
                fontWeight: '400',
              }}
            >
              {post.categories[0].name}
            </span>
          )}

          {/* Date - Bottom Right */}
          <time 
            dateTime={post.date}
            className="text-gray-500 dark:text-gray-400"
            style={{
              fontFamily: 'Acid Grotesk, sans-serif',
              fontSize: '14px',
              fontWeight: '400',
            }}
          >
            {formatDate(post.date)}
          </time>
        </div>
      </div>
    </article>
  );
}
