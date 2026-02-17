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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-[60px]">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} viewMode="grid" />
        ))}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-[60px]">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} viewMode="grid" />
      ))}
    </div>
  );
}
