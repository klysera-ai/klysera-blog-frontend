'use client';

import { useState } from 'react';
import PostCard from './PostCard';
import type { Post } from '@/types/wordpress';
import { useViewMode } from '@/contexts/ViewModeContext';
import { useTheme } from '@/hooks/useTheme';

interface PostGridProps {
  posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
  const { viewMode, mounted } = useViewMode();
  const { theme } = useTheme();
  const [hoveredPostId, setHoveredPostId] = useState<number | null>(null);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 lg:gap-x-[31px] gap-y-8 md:gap-y-10 lg:gap-y-[40px]">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} viewMode="grid" />
        ))}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="w-full">
        {/* Table Header - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-[1fr_120px_140px_140px] gap-8 pb-4 mb-6 border-b border-[#E5E5E7] dark:border-[#38383A]">
          <div></div> {/* Empty space for title column */}
          <div 
            className="text-[#68778F] dark:text-[#98989D]"
            style={{
              fontFamily: 'General Sans, sans-serif',
              fontSize: '11px',
              fontWeight: '400',
              lineHeight: '20px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            READ TIME
          </div>
          <div 
            className="text-[#68778F] dark:text-[#98989D]"
            style={{
              fontFamily: 'General Sans, sans-serif',
              fontSize: '11px',
              fontWeight: '400',
              lineHeight: '20px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            DATE
          </div>
          <div 
            className="text-[#68778F] dark:text-[#98989D]"
            style={{
              fontFamily: 'General Sans, sans-serif',
              fontSize: '11px',
              fontWeight: '400',
              lineHeight: '20px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            CATEGORY
          </div>
        </div>

        {/* Post List */}
        <div>
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              viewMode="list"
              hoveredPostId={hoveredPostId}
              onHover={setHoveredPostId}
              theme={theme}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 lg:gap-x-[31px] gap-y-8 md:gap-y-10 lg:gap-y-[40px]">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} viewMode="grid" />
      ))}
    </div>
  );
}
