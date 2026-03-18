'use client';

import { useState, useEffect } from 'react';
import { useViewMode } from '@/contexts/ViewModeContext';
import { useSearchFilter } from '@/contexts/SearchFilterContext';
import type { Post } from '@/types/wordpress';

interface SearchToolbarProps {
  posts?: Post[];
}

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'chapter', label: 'Chapter' },
  { id: 'insights', label: 'Insights' },
  { id: 'research', label: 'Research' },
  { id: 'white-paper', label: 'White Paper' },
];

export default function SearchToolbar({ posts = [] }: SearchToolbarProps) {
  const [localSearch, setLocalSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isSearchExpanded, setIsSearchExpanded] = useState(true);
  const {searchQuery, setSearchQuery, selectedCategories, setSelectedCategories } = useSearchFilter();
  const { viewMode, toggleViewMode, mounted } = useViewMode();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 400);

    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery]);

  // Handle tab change and update category filter
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'all') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([tabId]);
    }
  };

  const handleViewChange = (mode: 'grid' | 'list') => {
    if (viewMode !== mode) {
      toggleViewMode();
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full bg-white dark:bg-[#001F3F]">
      <div className="mx-auto">
        {/* Mobile Layout */}
        <div className="flex md:hidden flex-col gap-3">
          {/* Tabs - Scrollable horizontally on mobile */}
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-shrink-0 px-0 py-2 font-['General_Sans'] text-[12px] whitespace-nowrap transition-colors text-center tracking-[-0.02em] font-normal leading-[16px] ${
                  activeTab === tab.id
                    ? 'text-[#001F3F] dark:text-white'
                    : 'text-[#68778F] dark:text-[#68778F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search and View Toggle Row */}
          <div className="flex items-center gap-2 justify-between">
            {/* Search - Collapsible */}
            {!isSearchExpanded ? (
              <button
                onClick={() => setIsSearchExpanded(true)}
                className="rounded flex items-center justify-center"
                aria-label="Open search"
              >
                <svg
                  className="text-[#68778F]"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </button>
            ) : (
              <div className="relative flex-1 border border-[#B1B9C8] dark:border-[#02356B] rounded-[2px]">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#68778F]"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onBlur={() => {
                    // if (!localSearch) setIsSearchExpanded(false);
                  }}
                  autoFocus
                  className="w-full pl-9 pr-3 py-2  text-[#001F3F] dark:text-white placeholder:text-[#68778F] text-sm font-['General_Sans'] border-none focus:outline-none focus:ring-1 focus:ring-[#B1B9C8] dark:focus:ring-[#0557AD] rounded bg-transparent"
                />
              </div>
            )}

            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 rounded">
              <button
                onClick={() => handleViewChange('grid')}
                className={`rounded transition-colors ${
                  viewMode === 'grid'
                    ? ' text-[#001F3F] dark:text-white'
                    : 'text-[#68778F]'
                }`}
                aria-label="Grid view"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor"/>
                  <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor"/>
                  <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor"/>
                  <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor"/>
                </svg>
              </button>
              <button
                onClick={() => handleViewChange('list')}
                className={`rounded transition-colors ${
                  viewMode === 'list'
                    ? 'text-[#001F3F] dark:text-white'
                    : 'text-[#68778F]'
                }`}
                aria-label="List view"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="3" width="12" height="1.5" rx="0.75" fill="currentColor"/>
                  <rect x="2" y="7" width="12" height="1.5" rx="0.75" fill="currentColor"/>
                  <rect x="2" y="11" width="12" height="1.5" rx="0.75" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between ">
          {/* Left: Tabs */}
          <div className="flex items-center gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-1 py-2 font-['General_Sans'] text-[14px] transition-colors text-center tracking-[-0.02em] ${
                  activeTab === tab.id
                    ? 'text-[#001F3F] dark:text-white font-semibold leading-[12px]'
                    : 'text-[#68778F] dark:text-[#68778F] font-normal leading-[20px] hover:text-[#001F3F] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right: Search and View Toggle */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative border border-[#B1B9C8] dark:border-[#02356B] rounded-[2px]">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#68778F]"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-[280px] pl-10 pr-4 py-2 text-[#001F3F] bg-transparent dark:text-white placeholder:text-[#68778F] text-sm font-['General_Sans'] border-none focus:outline-none focus:ring-1 focus:ring-[#B1B9C8] dark:focus:ring-[#0557AD] rounded"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1  p-1 rounded">
              <button
                onClick={() => handleViewChange('grid')}
                className={` rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'text-[#001F3F] dark:text-white'
                    : 'text-[#68778F] hover:text-[#001F3F] dark:hover:text-white'
                }`}
                aria-label="Grid view"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="2" width="6" height="6" rx="1" fill="currentColor"/>
                  <rect x="10" y="2" width="6" height="6" rx="1" fill="currentColor"/>
                  <rect x="2" y="10" width="6" height="6" rx="1" fill="currentColor"/>
                  <rect x="10" y="10" width="6" height="6" rx="1" fill="currentColor"/>
                </svg>
              </button>
              <button
                onClick={() => handleViewChange('list')}
                className={`rounded transition-colors ${
                  viewMode === 'list'
                    ? 'text-[#001F3F] dark:text-white'
                    : 'text-[#68778F] hover:text-[#001F3F] dark:hover:text-white'
                }`}
                aria-label="List view"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="4" width="14" height="2" rx="1" fill="currentColor"/>
                  <rect x="2" y="8" width="14" height="2" rx="1" fill="currentColor"/>
                  <rect x="2" y="12" width="14" height="2" rx="1" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
