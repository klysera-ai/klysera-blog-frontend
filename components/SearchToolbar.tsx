'use client';

import { useState, useEffect } from 'react';
import { useViewMode } from '@/contexts/ViewModeContext';
import { useSearchFilter } from '@/contexts/SearchFilterContext';
import FilterModal from './FilterModal';

export default function SearchToolbar() {
  const [localSearch, setLocalSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { searchQuery, setSearchQuery, selectedCategories, setSelectedCategories, selectedAuthors, setSelectedAuthors } = useSearchFilter();
  const { viewMode, toggleViewMode, mounted } = useViewMode();

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

  const activeFiltersCount = selectedCategories.length + selectedAuthors.length;

  if (!mounted) return null;

  return (
    <>
      <div className="w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4">
            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="absolute top-full left-0 right-0 px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto flex items-center gap-2 flex-wrap">
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
                      className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
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
                  {selectedAuthors.map((authorId) => (
                    <span
                      key={`author-${authorId}`}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full"
                      style={{
                        fontFamily: 'General Sans, sans-serif',
                        fontSize: '14px',
                      }}
                    >
                      {authorId === 'matthew-ayeola' && 'Matthew Ayeola'}
                      <button
                        onClick={() => setSelectedAuthors(selectedAuthors.filter(id => id !== authorId))}
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
          {/* Search Input */}
          <div className="flex-1 max-w-md relative">
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
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
            <input
              type="text"
              placeholder="Type to search..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
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
              onClick={() => setIsFilterOpen(true)}
              className="relative p-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              aria-label="Filter"
            >
              <svg 
                className="w-5 h-5 text-gray-900 dark:text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Grid/List Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
              <button
                onClick={() => handleViewChange('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-800 shadow-sm'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
                aria-label="Grid view"
              >
                <svg 
                  className={`w-5 h-5 ${viewMode === 'grid' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <span 
                  className={`text-sm font-medium ${viewMode === 'grid' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                  style={{ fontFamily: 'General Sans, sans-serif', fontSize: '16px' }}
                >
                  Grid
                </span>
              </button>
              <button
                onClick={() => handleViewChange('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-800 shadow-sm'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
                aria-label="List view"
              >
                <svg 
                  className={`w-5 h-5 ${viewMode === 'list' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span 
                  className={`text-sm font-medium ${viewMode === 'list' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                  style={{ fontFamily: 'General Sans, sans-serif', fontSize: '16px' }}
                >
                  List
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      <FilterModal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
</>
  );
}
