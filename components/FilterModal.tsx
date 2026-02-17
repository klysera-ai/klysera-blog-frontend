'use client';

import { useState } from 'react';
import { useSearchFilter } from '@/contexts/SearchFilterContext';
import type { Post } from '@/types/wordpress';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  authors: Post['author'][];
}

export default function FilterModal({ isOpen, onClose, authors }: FilterModalProps) {
  const { 
    dateSort,
    setDateSort,
    customDateRange,
    setCustomDateRange
  } = useSearchFilter();
  
  const [tempDateSort, setTempDateSort] = useState(dateSort);
  const [tempCustomDateRange, setTempCustomDateRange] = useState(customDateRange);

  const handleApply = () => {
    setDateSort(tempDateSort);
    setCustomDateRange(tempCustomDateRange);
    onClose();
  };

  const handleClear = () => {
    setTempDateSort('latest');
    setDateSort('latest');
    setTempCustomDateRange({ start: '', end: '' });
    setCustomDateRange({ start: '', end: '' });
  };

  const handleCancel = () => {
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
      
      {/* Flyout Menu */}
      <div className="fixed top-40 right-4 md:right-8 w-[calc(100%-2rem)] md:w-96 max-h-[calc(100vh-12rem)] bg-white dark:bg-black border border-gray-200 dark:border-gray-800 z-50 overflow-y-auto shadow-lg">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <h2 
                className="text-gray-900 dark:text-white"
                style={{
                  fontFamily: 'Acid Grotesk, sans-serif',
                  fontSize: '30px',
                  fontWeight: '400',
                }}
              >
                Filters
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Date Filter Section */}
          <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
            <h3 
              className="text-gray-900 dark:text-white mb-4"
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '26px',
                fontWeight: '400',
              }}
            >
              Date
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="dateSort"
                    checked={tempDateSort === 'latest'}
                    onChange={() => setTempDateSort('latest')}
                    className="w-5 h-5 border-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      borderColor: tempDateSort === 'latest' ? '#007AFF' : '#D1D5DB',
                      backgroundColor: tempDateSort === 'latest' ? '#007AFF' : 'transparent',
                      boxShadow: tempDateSort === 'latest' ? '0 0 0 2px white inset' : 'none',
                      borderRadius: '9999px',
                    }}
                  />
                </div>
                <span 
                  className="text-gray-900 dark:text-white"
                  style={{
                    fontFamily: 'General Sans, sans-serif',
                    fontSize: '17.68px',
                    fontWeight: '400',
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
                    className="w-5 h-5 border-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      borderColor: tempDateSort === 'oldest' ? '#007AFF' : '#D1D5DB',
                      backgroundColor: tempDateSort === 'oldest' ? '#007AFF' : 'transparent',
                      boxShadow: tempDateSort === 'oldest' ? '0 0 0 2px white inset' : 'none',
                      borderRadius: '9999px',
                    }}
                  />
                </div>
                <span 
                  className="text-gray-900 dark:text-white"
                  style={{
                    fontFamily: 'General Sans, sans-serif',
                    fontSize: '17.68px',
                    fontWeight: '400',
                  }}
                >
                  Oldest
                </span>
              </label>

              <div>
                <label className="flex items-center gap-3 cursor-pointer mb-2">
                  <div className="relative">
                    <input
                      type="radio"
                      name="dateSort"
                      checked={tempDateSort === 'custom'}
                      onChange={() => setTempDateSort('custom')}
                      className="w-5 h-5 border-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        borderColor: tempDateSort === 'custom' ? '#007AFF' : '#D1D5DB',
                        backgroundColor: tempDateSort === 'custom' ? '#007AFF' : 'transparent',
                        boxShadow: tempDateSort === 'custom' ? '0 0 0 2px white inset' : 'none',
                        borderRadius: '9999px',
                      }}    
                    />
                  </div>
                  <span 
                    className="text-gray-900 dark:text-white"
                    style={{
                      fontFamily: 'General Sans, sans-serif',
                      fontSize: '17.68px',
                      fontWeight: '400',
                    }}
                  >
                    Custom Range
                  </span>
                </label>
                
                {tempDateSort === 'custom' && (
                  <input
                    type="text"
                    placeholder="Select range"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    style={{
                      fontFamily: 'General Sans, sans-serif',
                      fontSize: '14px',
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleApply}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-none hover:bg-blue-700 transition-colors"
              style={{
                fontFamily: 'General Sans, sans-serif',
                fontSize: '19.29px',
                fontWeight: '500',
                lineHeight: '18.6px',
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            >
              Apply Filters
            </button>
            <button
              onClick={handleClear}
              className="w-full px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              style={{
                fontFamily: 'General Sans, sans-serif',
                fontSize: '19.29px',
                fontWeight: '500',
                lineHeight: '18.6px',
                textAlign: 'center',
                verticalAlign: 'middle',
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
