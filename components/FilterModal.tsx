'use client';

import { useState, useEffect, useRef, RefObject } from 'react';
import { useSearchFilter } from '@/contexts/SearchFilterContext';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import type { Post } from '@/types/wordpress';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  authors: Post['author'][];
  buttonRefMobile: RefObject<HTMLButtonElement | null>;
  buttonRefDesktop: RefObject<HTMLButtonElement | null>;
}

export default function FilterModal({ isOpen, onClose, authors, buttonRefMobile, buttonRefDesktop }: FilterModalProps) {
  const { 
    dateSort,
    setDateSort,
    customDateRange,
    setCustomDateRange
  } = useSearchFilter();
  
  const [tempDateSort, setTempDateSort] = useState(dateSort);
  const [tempCustomDateRange, setTempCustomDateRange] = useState(customDateRange);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 500 });
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Detect if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Calculate position based on button
  useEffect(() => {
    if (isOpen) {
      const buttonRef = isMobile ? buttonRefMobile : buttonRefDesktop;
      const button = buttonRef.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        const dropdownWidth = isMobile ? 320 : 400; // 400px on laptop/desktop, 320px on mobile
        const viewportWidth = window.innerWidth;
        
        let left: number;
        
        if (isMobile) {
          // Center dropdown relative to button on mobile
          const buttonCenter = rect.left + (rect.width / 2);
          left = buttonCenter - (dropdownWidth / 2);
          
          // Ensure dropdown stays within viewport
          if (left < 16) left = 16; // Min 16px from left edge
          if (left + dropdownWidth > viewportWidth - 16) {
            left = viewportWidth - dropdownWidth - 16; // Max 16px from right edge
          }
        } else {
          // On desktop: align right edge with SearchToolbar container's right edge
          // Find the SearchToolbar container
          const toolbar = button.closest('.container');
          if (toolbar) {
            const toolbarRect = toolbar.getBoundingClientRect();
            // Position so right edge aligns with toolbar's right edge (minus padding)
            left = toolbarRect.right - dropdownWidth - 16; // 16px for px-4 padding
          } else {
            // Fallback: center relative to button
            const buttonCenter = rect.left + (rect.width / 2);
            left = buttonCenter - (dropdownWidth / 2);
          }
          
          // Ensure dropdown stays within viewport
          if (left < 16) left = 16;
        }
        
        setPosition({
          top: rect.bottom + 8,
          left: left,
          width: dropdownWidth
        });
      }
    }
  }, [isOpen, buttonRefMobile, buttonRefDesktop, isMobile]);

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
      {/* Backdrop - transparent for dropdown */}
      <div 
        className="fixed inset-0 z-40"
        onClick={handleCancel}
      />
      
      {/* Dropdown Menu - Hero UI Style */}
      <div 
        ref={menuRef}
        className="fixed bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${position.width}px`,
          maxHeight: 'calc(100vh - 100px)',
          animation: 'dropdown 0.2s ease-out',
        }}
      >
        <div className="max-h-[70vh] overflow-y-auto">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 
              className="text-gray-900 dark:text-white font-semibold"
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '18px',
                fontWeight: '200',
              }}
            >
              Filters
            </h3>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Date Filter Section */}
            <div className="mb-4">
              <h4 
                className="text-gray-900 dark:text-white mb-3 text-sm font-medium"
                style={{
                  fontFamily: 'Acid Grotesk, sans-serif',
                }}
              >
                Date
              </h4>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md transition-colors">
                  <div className="relative">
                    <input
                      type="radio"
                      name="dateSort"
                      checked={tempDateSort === 'latest'}
                      onChange={() => setTempDateSort('latest')}
                      className="w-4 h-4 border-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        borderColor: tempDateSort === 'latest' ? '#007AFF' : '#D1D5DB',
                        backgroundColor: tempDateSort === 'latest' ? '#007AFF' : 'transparent',
                        boxShadow: tempDateSort === 'latest' ? '0 0 0 2px white inset' : 'none',
                        borderRadius: '9999px',
                      }}
                    />
                  </div>
                  <span 
                    className="text-gray-900 dark:text-white text-sm"
                    style={{
                      fontFamily: 'General Sans, sans-serif',
                    }}
                  >
                    Latest
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md transition-colors">
                  <div className="relative">
                    <input
                      type="radio"
                      name="dateSort"
                      checked={tempDateSort === 'oldest'}
                      onChange={() => setTempDateSort('oldest')}
                      className="w-4 h-4 border-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        borderColor: tempDateSort === 'oldest' ? '#007AFF' : '#D1D5DB',
                        backgroundColor: tempDateSort === 'oldest' ? '#007AFF' : 'transparent',
                        boxShadow: tempDateSort === 'oldest' ? '0 0 0 2px white inset' : 'none',
                        borderRadius: '9999px',
                      }}
                    />
                  </div>
                  <span 
                    className="text-gray-900 dark:text-white text-sm"
                    style={{
                      fontFamily: 'General Sans, sans-serif',
                    }}
                  >
                    Oldest
                  </span>
                </label>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md transition-colors mb-2">
                    <div className="relative">
                      <input
                        type="radio"
                        name="dateSort"
                        checked={tempDateSort === 'custom'}
                        onChange={() => setTempDateSort('custom')}
                        className="w-4 h-4 border-2 rounded-full appearance-none cursor-pointer"
                        style={{
                          borderColor: tempDateSort === 'custom' ? '#007AFF' : '#D1D5DB',
                          backgroundColor: tempDateSort === 'custom' ? '#007AFF' : 'transparent',
                          boxShadow: tempDateSort === 'custom' ? '0 0 0 2px white inset' : 'none',
                          borderRadius: '9999px',
                        }}    
                      />
                    </div>
                    <span 
                      className="text-gray-900 dark:text-white text-sm"
                      style={{
                        fontFamily: 'General Sans, sans-serif',
                      }}
                    >
                      Custom Range
                    </span>
                  </label>
                  
                  {tempDateSort === 'custom' && (
                    <div className="mt-2 px-2">
                      <DateRangePicker 
                        label="Select date range"
                        className="w-full"
                        value={tempCustomDateRange}
                        onChange={(range) => {
                          setTempCustomDateRange(range);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleApply}
                className="w-full px-4 py-2 text-white rounded-md transition-colors text-sm font-medium"
                style={{
                  fontFamily: 'General Sans, sans-serif',
                  backgroundColor: '#007AFF',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0066DD'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007AFF'}
              >
                Apply
              </button>
              <button
                onClick={handleClear}
                className="w-full px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors text-sm font-medium"
                style={{
                  fontFamily: 'General Sans, sans-serif',
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
