'use client';

import { useState, useEffect, useRef } from 'react';
import { useViewMode } from '@/contexts/ViewModeContext';
import { useSearchFilter } from '@/contexts/SearchFilterContext';
import FilterModal from './FilterModal';
import type { Post } from '@/types/wordpress';

interface SearchToolbarProps {
  posts?: Post[];
}

export default function SearchToolbar({ posts = [] }: SearchToolbarProps) {
  const [localSearch, setLocalSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterButtonRefMobile = useRef<HTMLButtonElement>(null);
  const filterButtonRefDesktop = useRef<HTMLButtonElement>(null);
  const { searchQuery, setSearchQuery, selectedCategories, setSelectedCategories, selectedAuthors, setSelectedAuthors } = useSearchFilter();
  const { viewMode, toggleViewMode, mounted } = useViewMode();

  // Extract unique authors from posts
  const uniqueAuthors = Array.from(
    new Map(posts.map(post => [post.author.name, post.author])).values()
  );

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 400);

    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery]);

  const handleViewChange = (mode: 'grid' | 'list') => {
    if (viewMode !== mode) {
      toggleViewMode();
    }
  };

  const clearSearch = () => {
    setLocalSearch('');
    setSearchQuery('');
  };

  const activeFiltersCount = selectedCategories.length;

  if (!mounted) return null;

  return (
    <>
      <div className="w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
          {/* Mobile Layout - Search on top, Filter & View toggle on bottom */}
          <div className="flex md:hidden flex-col gap-4">
            {/* Search Input - Full width on mobile */}
            <div className="relative w-full">
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black dark:text-white"
                width="26" 
                height="26" 
                viewBox="0 0 26 26" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_98_906_mobile)">
                  <path d="M13.0614 18.6072C16.7853 17.7258 19.0896 13.9925 18.2083 10.2686C17.3269 6.54471 13.5936 4.24037 9.86969 5.12172C6.14578 6.00308 3.84143 9.73638 4.72279 13.4603C5.60414 17.1842 9.33745 19.4886 13.0614 18.6072Z" stroke="currentColor" strokeWidth="1.73225" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21.8886 18.2982L17.3545 15.4995" stroke="currentColor" strokeWidth="1.73225" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_98_906_mobile">
                    <rect width="20.787" height="20.787" fill="white" transform="translate(0 4.7875) rotate(-13.3154)"/>
                  </clipPath>
                </defs>
              </svg>
              <input
                type="text"
                placeholder="Type to search..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-600 text-black dark:text-white placeholder-black dark:placeholder-white"
                style={{
                  fontFamily: 'General Sans, sans-serif',
                  fontSize: '16px',
                }}
              />
              {localSearch && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filter & View Toggle - Below search on mobile */}
            <div className="flex items-center justify-between gap-4">
              <button
                ref={filterButtonRefMobile}
                onClick={() => setIsFilterOpen(true)}
                className="relative p-3 rounded-none border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                aria-label="Filter"
              >
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-900 dark:text-white">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.3314 4.73563H17.7584V5.91955H15.3314C15.0354 7.28106 13.8515 8.28739 12.4308 8.28739C11.0101 8.28739 9.82619 7.28106 9.53021 5.91955H1.18359V4.73563H9.53021C9.82619 3.37413 11.0101 2.3678 12.4308 2.3678C13.8515 2.3678 15.0354 3.37413 15.3314 4.73563ZM10.6549 5.32759C10.6549 6.33392 11.4245 7.10347 12.4308 7.10347C13.4371 7.10347 14.2067 6.33392 14.2067 5.32759C14.2067 4.32126 13.4371 3.55172 12.4308 3.55172C11.4245 3.55172 10.6549 4.32126 10.6549 5.32759ZM3.61062 14.207H1.18359V13.0231H3.61062C3.9066 11.6616 5.09052 10.6552 6.51122 10.6552C7.93192 10.6552 9.11584 11.6616 9.41182 13.0231H17.7584V14.207H9.41182C9.11584 15.5685 7.93192 16.5748 6.51122 16.5748C5.09052 16.5748 3.9066 15.5685 3.61062 14.207ZM8.2871 13.615C8.2871 12.6087 7.51755 11.8391 6.51122 11.8391C5.50489 11.8391 4.73535 12.6087 4.73535 13.615C4.73535 14.6213 5.50489 15.3909 6.51122 15.3909C7.51755 15.3909 8.2871 14.6213 8.2871 13.615Z" fill="currentColor"/>
                </svg>
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-none flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Grid/List Toggle */}
              <div className="relative flex items-center border border-gray-300 dark:border-gray-700 rounded-none p-1 flex-1">
                {/* Animated Sliding Background */}
                <div
                  className="absolute top-1 bottom-1 transition-all duration-300 ease-out backdrop-blur-md bg-gray-200/80 dark:bg-gray-800/80"
                  style={{
                    width: 'calc(50% - 4px)',
                    left: viewMode === 'grid' ? '4px' : 'calc(50% + 0px)',
                    borderRadius: '1px',
                  }}
                />
                
                <button
                  onClick={() => handleViewChange('grid')}
                  className="relative z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-none transition-opacity hover:opacity-80 flex-1"
                  aria-label="Grid view"
                >
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={viewMode === 'grid' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                    <path d="M8.75906 14.1304C9.90812 14.1304 10.8396 15.0619 10.8396 16.2109V19.6785C10.8396 20.8275 9.90812 21.7591 8.75906 21.7591H5.29148C4.14243 21.7591 3.21094 20.8275 3.21094 19.6785V16.2109C3.21094 15.0619 4.14243 14.1304 5.29148 14.1304H8.75906ZM19.6819 14.1304C20.8309 14.1304 21.7625 15.0619 21.7625 16.2109V19.6785C21.7625 20.8275 20.8309 21.7591 19.6819 21.7591H16.2144C15.0653 21.7591 14.1338 20.8275 14.1338 19.6785V16.2109C14.1338 15.0619 15.0653 14.1304 16.2144 14.1304H19.6819ZM5.29148 15.5174C4.90847 15.5174 4.59797 15.828 4.59797 16.2109V19.6785C4.59797 20.0615 4.90847 20.372 5.29148 20.372H8.75906C9.14208 20.372 9.45258 20.0615 9.45258 19.6785V16.2109C9.45258 15.828 9.14208 15.5174 8.75906 15.5174H5.29148ZM16.2144 15.5174C15.8314 15.5174 15.5208 15.828 15.5208 16.2109V19.6785C15.5208 20.0615 15.8314 20.372 16.2144 20.372H19.6819C20.0649 20.372 20.3754 20.0615 20.3754 19.6785V16.2109C20.3754 15.828 20.0649 15.5174 19.6819 15.5174H16.2144ZM8.75906 3.20752C9.90812 3.20752 10.8396 4.13901 10.8396 5.28807V8.75564C10.8396 9.9047 9.90812 10.8362 8.75906 10.8362H5.29148C4.14243 10.8362 3.21094 9.9047 3.21094 8.75564V5.28807C3.21094 4.13901 4.14243 3.20752 5.29148 3.20752H8.75906ZM19.6819 3.20752C20.8309 3.20752 21.7625 4.13901 21.7625 5.28807V8.75564C21.7625 9.9047 20.8309 10.8362 19.6819 10.8362H16.2144C15.0653 10.8362 14.1338 9.9047 14.1338 8.75564V5.28807C14.1338 4.13901 15.0653 3.20752 16.2144 3.20752H19.6819ZM5.29148 4.59455C4.90847 4.59455 4.59797 4.90505 4.59797 5.28807V8.75564C4.59797 9.13866 4.90847 9.44916 5.29148 9.44916H8.75906C9.14208 9.44916 9.45258 9.13866 9.45258 8.75564V5.28807C9.45258 4.90505 9.14208 4.59455 8.75906 4.59455H5.29148ZM16.2144 4.59455C15.8314 4.59455 15.5208 4.90505 15.5208 5.28807V8.75564C15.5208 9.13866 15.8314 9.44916 16.2144 9.44916H19.6819C20.0649 9.44916 20.3754 9.13866 20.3754 8.75564V5.28807C20.3754 4.90505 20.0649 4.59455 19.6819 4.59455H16.2144Z" fill="currentColor"/>
                  </svg>
                  <span 
                    className={`text-sm font-medium ${viewMode === 'grid' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                    style={{ fontFamily: 'Acid Grotesk, sans-serif', fontSize: '14px', fontWeight: '200' }}
                  >
                    Grid
                  </span>
                </button>
                <button
                  onClick={() => handleViewChange('list')}
                  className="relative z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-none transition-opacity hover:opacity-80 flex-1"
                  aria-label="List view"
                >
                  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={viewMode === 'list' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                    <path d="M1.56041 13.7315C2.4222 13.7315 3.12082 14.4302 3.12082 15.2919C3.12082 16.1539 2.4222 16.8524 1.56041 16.8524C0.69862 16.8524 0 16.1539 0 15.2919C0 14.4302 0.69862 13.7315 1.56041 13.7315ZM16.8524 14.6678C17.1971 14.6678 17.4766 14.9473 17.4766 15.2919C17.4766 15.6368 17.1971 15.9161 16.8524 15.9161H6.8658C6.52109 15.9161 6.24164 15.6368 6.24164 15.2919C6.24164 14.9473 6.52109 14.6678 6.8658 14.6678H16.8524ZM1.56041 6.8658C2.4222 6.8658 3.12082 7.56442 3.12082 8.42621C3.12082 9.288 2.4222 9.98656 1.56041 9.98656C0.69862 9.98656 0 9.288 0 8.42621C0 7.56442 0.69862 6.8658 1.56041 6.8658ZM16.8524 7.80205C17.1971 7.80205 17.4766 8.0815 17.4766 8.42621C17.4766 8.77093 17.1971 9.05038 16.8524 9.05038H6.8658C6.52109 9.05038 6.24164 8.77093 6.24164 8.42621C6.24164 8.0815 6.52109 7.80205 6.8658 7.80205H16.8524ZM1.56041 0C2.4222 0 3.12082 0.69862 3.12082 1.56041C3.12082 2.4222 2.4222 3.12082 1.56041 3.12082C0.69862 3.12082 0 2.4222 0 1.56041C0 0.69862 0.69862 0 1.56041 0ZM16.8524 0.936246C17.1971 0.936246 17.4766 1.21569 17.4766 1.56041C17.4766 1.90513 17.1971 2.18457 16.8524 2.18457H6.8658C6.52109 2.18457 6.24164 1.90513 6.24164 1.56041C6.24164 1.21569 6.52109 0.936246 6.8658 0.936246H16.8524Z" fill="currentColor"/>
                  </svg>
                  <span 
                    className={`text-sm font-medium ${viewMode === 'list' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                    style={{ fontFamily: 'Acid Grotesk, sans-serif', fontSize: '14px', fontWeight: '200' }}
                  >
                    List
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Original horizontal layout */}
          <div className="hidden md:flex items-center justify-between gap-4">
          {/* Search Input */}
          <div className="flex-1 max-w-md relative">
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black dark:text-white"
              width="26" 
              height="26" 
              viewBox="0 0 26 26" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_98_906_desktop)">
                <path d="M13.0614 18.6072C16.7853 17.7258 19.0896 13.9925 18.2083 10.2686C17.3269 6.54471 13.5936 4.24037 9.86969 5.12172C6.14578 6.00308 3.84143 9.73638 4.72279 13.4603C5.60414 17.1842 9.33745 19.4886 13.0614 18.6072Z" stroke="currentColor" strokeWidth="1.73225" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.8886 18.2982L17.3545 15.4995" stroke="currentColor" strokeWidth="1.73225" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_98_906_desktop">
                  <rect width="20.787" height="20.787" fill="white" transform="translate(0 4.7875) rotate(-13.3154)"/>
                </clipPath>
              </defs>
            </svg>
            <input
              type="text"
              placeholder="Type to search..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-600 text-black dark:text-white placeholder-black dark:placeholder-white"
              style={{
                fontFamily: 'General Sans, sans-serif',
                fontSize: '16px',
              }}
            />
            {localSearch && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Right Side - Filter & View Toggle */}
          <div className="flex items-center gap-4">
            <button
              ref={filterButtonRefDesktop}
              onClick={() => setIsFilterOpen(true)}
              className="relative p-3 rounded-none border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              aria-label="Filter"
            >
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-900 dark:text-white">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.3314 4.73563H17.7584V5.91955H15.3314C15.0354 7.28106 13.8515 8.28739 12.4308 8.28739C11.0101 8.28739 9.82619 7.28106 9.53021 5.91955H1.18359V4.73563H9.53021C9.82619 3.37413 11.0101 2.3678 12.4308 2.3678C13.8515 2.3678 15.0354 3.37413 15.3314 4.73563ZM10.6549 5.32759C10.6549 6.33392 11.4245 7.10347 12.4308 7.10347C13.4371 7.10347 14.2067 6.33392 14.2067 5.32759C14.2067 4.32126 13.4371 3.55172 12.4308 3.55172C11.4245 3.55172 10.6549 4.32126 10.6549 5.32759ZM3.61062 14.207H1.18359V13.0231H3.61062C3.9066 11.6616 5.09052 10.6552 6.51122 10.6552C7.93192 10.6552 9.11584 11.6616 9.41182 13.0231H17.7584V14.207H9.41182C9.11584 15.5685 7.93192 16.5748 6.51122 16.5748C5.09052 16.5748 3.9066 15.5685 3.61062 14.207ZM8.2871 13.615C8.2871 12.6087 7.51755 11.8391 6.51122 11.8391C5.50489 11.8391 4.73535 12.6087 4.73535 13.615C4.73535 14.6213 5.50489 15.3909 6.51122 15.3909C7.51755 15.3909 8.2871 14.6213 8.2871 13.615Z" fill="currentColor"/>
              </svg>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-none flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Grid/List Toggle */}
            <div className="relative flex items-center border border-gray-300 dark:border-gray-700 rounded-none p-1">
              {/* Animated Sliding Background */}
              <div
                className="absolute top-1 bottom-1 transition-all duration-300 ease-out backdrop-blur-md bg-gray-200/80 dark:bg-gray-800/80"
                style={{
                  width: 'calc(50% - 0px)',
                  left: viewMode === 'grid' ? '4px' : 'calc(50% + 0px)',
                  borderRadius: '1px',
                }}
              />
              
              <button
                onClick={() => handleViewChange('grid')}
                className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-none transition-opacity hover:opacity-80"
                aria-label="Grid view"
              >
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={viewMode === 'grid' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                  <path d="M8.75906 14.1304C9.90812 14.1304 10.8396 15.0619 10.8396 16.2109V19.6785C10.8396 20.8275 9.90812 21.7591 8.75906 21.7591H5.29148C4.14243 21.7591 3.21094 20.8275 3.21094 19.6785V16.2109C3.21094 15.0619 4.14243 14.1304 5.29148 14.1304H8.75906ZM19.6819 14.1304C20.8309 14.1304 21.7625 15.0619 21.7625 16.2109V19.6785C21.7625 20.8275 20.8309 21.7591 19.6819 21.7591H16.2144C15.0653 21.7591 14.1338 20.8275 14.1338 19.6785V16.2109C14.1338 15.0619 15.0653 14.1304 16.2144 14.1304H19.6819ZM5.29148 15.5174C4.90847 15.5174 4.59797 15.828 4.59797 16.2109V19.6785C4.59797 20.0615 4.90847 20.372 5.29148 20.372H8.75906C9.14208 20.372 9.45258 20.0615 9.45258 19.6785V16.2109C9.45258 15.828 9.14208 15.5174 8.75906 15.5174H5.29148ZM16.2144 15.5174C15.8314 15.5174 15.5208 15.828 15.5208 16.2109V19.6785C15.5208 20.0615 15.8314 20.372 16.2144 20.372H19.6819C20.0649 20.372 20.3754 20.0615 20.3754 19.6785V16.2109C20.3754 15.828 20.0649 15.5174 19.6819 15.5174H16.2144ZM8.75906 3.20752C9.90812 3.20752 10.8396 4.13901 10.8396 5.28807V8.75564C10.8396 9.9047 9.90812 10.8362 8.75906 10.8362H5.29148C4.14243 10.8362 3.21094 9.9047 3.21094 8.75564V5.28807C3.21094 4.13901 4.14243 3.20752 5.29148 3.20752H8.75906ZM19.6819 3.20752C20.8309 3.20752 21.7625 4.13901 21.7625 5.28807V8.75564C21.7625 9.9047 20.8309 10.8362 19.6819 10.8362H16.2144C15.0653 10.8362 14.1338 9.9047 14.1338 8.75564V5.28807C14.1338 4.13901 15.0653 3.20752 16.2144 3.20752H19.6819ZM5.29148 4.59455C4.90847 4.59455 4.59797 4.90505 4.59797 5.28807V8.75564C4.59797 9.13866 4.90847 9.44916 5.29148 9.44916H8.75906C9.14208 9.44916 9.45258 9.13866 9.45258 8.75564V5.28807C9.45258 4.90505 9.14208 4.59455 8.75906 4.59455H5.29148ZM16.2144 4.59455C15.8314 4.59455 15.5208 4.90505 15.5208 5.28807V8.75564C15.5208 9.13866 15.8314 9.44916 16.2144 9.44916H19.6819C20.0649 9.44916 20.3754 9.13866 20.3754 8.75564V5.28807C20.3754 4.90505 20.0649 4.59455 19.6819 4.59455H16.2144Z" fill="currentColor"/>
                </svg>
                <span 
                  className={`text-sm font-medium ${viewMode === 'grid' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                  style={{ fontFamily: 'Acid Grotesk, sans-serif', fontSize: '14px', fontWeight: '200' }}
                >
                  Grid
                </span>
              </button>
              <button
                onClick={() => handleViewChange('list')}
                className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-none transition-opacity hover:opacity-80"
                aria-label="List view"
              >
                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={viewMode === 'list' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                  <path d="M1.56041 13.7315C2.4222 13.7315 3.12082 14.4302 3.12082 15.2919C3.12082 16.1539 2.4222 16.8524 1.56041 16.8524C0.69862 16.8524 0 16.1539 0 15.2919C0 14.4302 0.69862 13.7315 1.56041 13.7315ZM16.8524 14.6678C17.1971 14.6678 17.4766 14.9473 17.4766 15.2919C17.4766 15.6368 17.1971 15.9161 16.8524 15.9161H6.8658C6.52109 15.9161 6.24164 15.6368 6.24164 15.2919C6.24164 14.9473 6.52109 14.6678 6.8658 14.6678H16.8524ZM1.56041 6.8658C2.4222 6.8658 3.12082 7.56442 3.12082 8.42621C3.12082 9.288 2.4222 9.98656 1.56041 9.98656C0.69862 9.98656 0 9.288 0 8.42621C0 7.56442 0.69862 6.8658 1.56041 6.8658ZM16.8524 7.80205C17.1971 7.80205 17.4766 8.0815 17.4766 8.42621C17.4766 8.77093 17.1971 9.05038 16.8524 9.05038H6.8658C6.52109 9.05038 6.24164 8.77093 6.24164 8.42621C6.24164 8.0815 6.52109 7.80205 6.8658 7.80205H16.8524ZM1.56041 0C2.4222 0 3.12082 0.69862 3.12082 1.56041C3.12082 2.4222 2.4222 3.12082 1.56041 3.12082C0.69862 3.12082 0 2.4222 0 1.56041C0 0.69862 0.69862 0 1.56041 0ZM16.8524 0.936246C17.1971 0.936246 17.4766 1.21569 17.4766 1.56041C17.4766 1.90513 17.1971 2.18457 16.8524 2.18457H6.8658C6.52109 2.18457 6.24164 1.90513 6.24164 1.56041C6.24164 1.21569 6.52109 0.936246 6.8658 0.936246H16.8524Z" fill="currentColor"/>
                </svg>
                <span 
                  className={`text-sm font-medium ${viewMode === 'list' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                  style={{ fontFamily: 'Acid Grotesk, sans-serif', fontSize: '14px', fontWeight: '200' }}
                >
                  List
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="w-full bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-3 flex items-center gap-2 flex-wrap">
            <span 
              className="text-gray-600 dark:text-gray-400"
              style={{
                fontFamily: 'General Sans, sans-serif',
                fontSize: '14px',
              }}
            >
              Active filters:
            </span>
            {selectedCategories.map((categoryId) => (
              <span
                key={`cat-${categoryId}`}
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-none"
                style={{
                  fontFamily: 'General Sans, sans-serif',
                  fontSize: '14px',
                }}
              >
                {categoryId === 'insights' && 'Insights'}
                {categoryId === 'research' && 'Research'}
                {categoryId === 'white-paper' && 'White paper'}
                <button
                  onClick={() => setSelectedCategories(selectedCategories.filter(id => id !== categoryId))}
                  className="hover:text-blue-900 dark:hover:text-blue-100"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
            {selectedAuthors.map((authorName) => (
              <span
                key={`author-${authorName}`}
                className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-none"
                style={{
                  fontFamily: 'General Sans, sans-serif',
                  fontSize: '14px',
                }}
              >
                {authorName}
                <button
                  onClick={() => setSelectedAuthors(selectedAuthors.filter(name => name !== authorName))}
                  className="hover:text-green-900 dark:hover:text-green-100"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
            <button
              onClick={() => {
                setSelectedCategories([]);
                setSelectedAuthors([]);
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline"
              style={{
                fontFamily: 'General Sans, sans-serif',
                fontSize: '14px',
              }}
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        authors={uniqueAuthors}
        buttonRefMobile={filterButtonRefMobile}
        buttonRefDesktop={filterButtonRefDesktop}
      />
    </>
  );
}
