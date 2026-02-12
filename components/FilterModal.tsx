'use client';

import { useState } from 'react';
import { useSearchFilter } from '@/contexts/SearchFilterContext';
import Image from 'next/image';
import type { Post } from '@/types/wordpress';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  authors: Post['author'][];
}

export default function FilterModal({ isOpen, onClose, authors }: FilterModalProps) {
  const { 
    selectedAuthors, 
    setSelectedAuthors,
    dateSort,
    setDateSort,
    customDateRange,
    setCustomDateRange
  } = useSearchFilter();
  
  const [tempAuthors, setTempAuthors] = useState<string[]>(selectedAuthors);
  const [tempDateSort, setTempDateSort] = useState(dateSort);
  const [tempCustomDateRange, setTempCustomDateRange] = useState(customDateRange);

  const handleAuthorToggle = (authorName: string) => {
    setTempAuthors(prev => 
      prev.includes(authorName)
        ? prev.filter(name => name !== authorName)
        : [...prev, authorName]
    );
  };

  const handleApply = () => {
    setSelectedAuthors(tempAuthors);
    setDateSort(tempDateSort);
    setCustomDateRange(tempCustomDateRange);
    onClose();
  };

  const handleClear = () => {
    setTempAuthors([]);
    setSelectedAuthors([]);
    setTempDateSort('latest');
    setDateSort('latest');
    setTempCustomDateRange({ start: '', end: '' });
    setCustomDateRange({ start: '', end: '' });
  };

  const handleCancel = () => {
    setTempAuthors(selectedAuthors);
    setTempDateSort(dateSort);
    setTempCustomDateRange(customDateRange);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleCancel}
      />
      
      {/* Modal */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-black z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
            <h2 
              className="text-gray-900 dark:text-white"
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '28px',
                fontWeight: '500',
              }}
            >
              Filters
            </h2>
          </div>

          {/* Author Filter Section */}
          <div className="mb-8">
            <h3 
              className="text-gray-900 dark:text-white mb-6"
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '20px',
                fontWeight: '500',
              }}
            >
              Author
            </h3>
            <div className="space-y-4">
              {authors.map((author) => (
                <label
                  key={author.name}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-800">
                    {author.avatar ? (
                      <Image 
                        src={author.avatar} 
                        alt={author.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                        {author.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span 
                    className="text-gray-900 dark:text-white flex-1"
                    style={{
                      fontFamily: 'General Sans, sans-serif',
                      fontSize: '16px',
                    }}
                  >
                    {author.name}
                  </span>
                  <input
                    type="checkbox"
                    checked={tempAuthors.includes(author.name)}
                    onChange={() => handleAuthorToggle(author.name)}
                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-600"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Date Filter Section */}
          <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
            <h3 
              className="text-gray-900 dark:text-white mb-6"
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '20px',
                fontWeight: '500',
              }}
            >
              Date
            </h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="dateSort"
                    checked={tempDateSort === 'latest'}
                    onChange={() => setTempDateSort('latest')}
                    className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <span 
                  className="text-gray-900 dark:text-white"
                  style={{
                    fontFamily: 'General Sans, sans-serif',
                    fontSize: '16px',
                  }}
                >
                  Latest
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="dateSort"
                    checked={tempDateSort === 'oldest'}
                    onChange={() => setTempDateSort('oldest')}
                    className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <span 
                  className="text-gray-900 dark:text-white"
                  style={{
                    fontFamily: 'General Sans, sans-serif',
                    fontSize: '16px',
                  }}
                >
                  Oldest
                </span>
              </label>

              <div>
                <label className="flex items-center gap-3 cursor-pointer mb-3">
                  <div className="relative">
                    <input
                      type="radio"
                      name="dateSort"
                      checked={tempDateSort === 'custom'}
                      onChange={() => setTempDateSort('custom')}
                      className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <span 
                    className="text-gray-900 dark:text-white"
                    style={{
                      fontFamily: 'General Sans, sans-serif',
                      fontSize: '16px',
                    }}
                  >
                    Custom Range
                  </span>
                </label>
                
                {tempDateSort === 'custom' && (
                  <input
                    type="text"
                    placeholder="Select range"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    style={{
                      fontFamily: 'General Sans, sans-serif',
                      fontSize: '16px',
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mt-8">
            <button
              onClick={handleApply}
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              style={{
                fontFamily: 'General Sans, sans-serif',
                fontSize: '18px',
                fontWeight: '600',
              }}
            >
              Apply Filters
            </button>
            <button
              onClick={handleClear}
              className="w-full px-6 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              style={{
                fontFamily: 'General Sans, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
