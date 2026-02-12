'use client';

import { useState, useMemo } from 'react';
import PostGrid from '@/components/PostGrid';
import type { Post } from '@/types/wordpress';
import { useSearchFilter } from '@/contexts/SearchFilterContext';

interface PostListWithPaginationProps {
  allPosts: Post[];
}

export default function PostListWithPagination({ allPosts }: PostListWithPaginationProps) {
  const [visibleCount, setVisibleCount] = useState(10);
  const { searchQuery, selectedCategories, selectedAuthors, dateSort, customDateRange } = useSearchFilter();

  // Filter posts based on search query, categories, and authors
  const filteredPosts = useMemo(() => {
    let filtered = allPosts;

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(post => 
        post.categories.some(cat => selectedCategories.includes(cat.slug))
      );
    }

    // Filter by author
    if (selectedAuthors.length > 0) {
      filtered = filtered.filter(post => 
        selectedAuthors.includes(post.author.name)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const excerptMatch = post.excerpt.toLowerCase().includes(query);
        const authorMatch = post.author.name.toLowerCase().includes(query);
        
        return titleMatch || excerptMatch || authorMatch;
      });
    }

    // Sort by date
    if (dateSort === 'latest') {
      filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (dateSort === 'oldest') {
      filtered = [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (dateSort === 'custom' && customDateRange.start && customDateRange.end) {
      const startDate = new Date(customDateRange.start);
      const endDate = new Date(customDateRange.end);
      filtered = filtered.filter(post => {
        const postDate = new Date(post.date);
        return postDate >= startDate && postDate <= endDate;
      });
    }

    return filtered;
  }, [allPosts, searchQuery, selectedCategories, selectedAuthors, dateSort, customDateRange]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 10, filteredPosts.length));
  };

  // Reset visible count when search changes
  useMemo(() => {
    setVisibleCount(10);
  }, [searchQuery, selectedCategories, selectedAuthors, dateSort, customDateRange]);

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-20">
        <svg
          className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h2 
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
          style={{
            fontFamily: 'Acid Grotesk, sans-serif',
            fontSize: '26px',
          }}
        >
          No results found
        </h2>
        <p 
          className="text-gray-600 dark:text-gray-400"
          style={{
            fontFamily: 'General Sans, sans-serif',
            fontSize: '16px',
          }}
        >
          {searchQuery ? `No posts match "${searchQuery}"` : 'No posts available'}
        </p>
      </div>
    );
  }

  return (
    <>
      <PostGrid posts={visiblePosts} />
      
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-white dark:bg-black text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            style={{
              fontFamily: 'General Sans, sans-serif',
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
