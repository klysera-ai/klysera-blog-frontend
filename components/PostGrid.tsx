'use client';

import PostCard from './PostCard';
import type { Post } from '@/types/wordpress';
import { useViewMode } from '@/contexts/ViewModeContext';

interface PostGridProps {
  posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
  const { viewMode, mounted } = useViewMode();

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <PostCard key={post.id} post={post} viewMode="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} viewMode="grid" />
      ))}
    </div>
  );
}
