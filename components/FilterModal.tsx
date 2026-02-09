'use client';

import { useState } from 'react';
import { useSearchFilter } from '@/contexts/SearchFilterContext';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const { selectedCategories, setSelectedCategories, selectedAuthors, setSelectedAuthors } = useSearchFilter();
  const [tempCategories, setTempCategories] = useState<string[]>(selectedCategories);
  const [tempAuthors, setTempAuthors] = useState<string[]>(selectedAuthors);

  const categories = [
    { id: 'insights', name: 'Insights' },
    { id: 'research', name: 'Research' },
    { id: 'white-paper', name: 'White paper' },
  ];

  const authors = [
    { id: 'matthew-ayeola', name: 'Matthew Ayeola' },
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setTempCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAuthorToggle = (authorId: string) => {
    setTempAuthors(prev => 
      prev.includes(authorId)
        ? prev.filter(id => id !== authorId)
        : [...prev, authorId]
    );
  };

  const handleApply = () => {
    setSelectedCategories(tempCategories);
    setSelectedAuthors(tempAuthors);
    onClose();
  };

  const handleClear = () => {
    setTempCategories([]);
    setSelectedCategories([]);
    setTempAuthors([]);
    setSelectedAuthors([]);
    onClose();
  };

  const handleCancel = () => {
    setTempCategories(selectedCategories);
    setTempAuthors(selectedAuthors);
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
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800 z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 
              className="text-gray-900 dark:text-white font-medium"
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '24px',
              }}
            >
              Filters
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Category Filter Section */}
          <div className="mb-8">
            <h3 
              className="text-gray-900 dark:text-white mb-4"
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '18px',
              }}
            >
              Category
            </h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={tempCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-600"
                  />
                  <span 
                    className="text-gray-900 dark:text-white"
                    style={{
                      fontFamily: 'General Sans, sans-serif',
                      fontSize: '16px',
                    }}
                  >
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Author Filter Section */}
          <div className="mb-8">
            <h3 
              className="text-gray-900 dark:text-white mb-4"
              style={{
                fontFamily: 'Acid Grotesk, sans-serif',
                fontSize: '18px',
              }}
            >
              Author
            </h3>
            <div className="space-y-3">
              {authors.map((author) => (
                <label
                  key={author.id}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={tempAuthors.includes(author.id)}
                    onChange={() => handleAuthorToggle(author.id)}
                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-600"
                  />
                  <span 
                    className="text-gray-900 dark:text-white"
                    style={{
                      fontFamily: 'General Sans, sans-serif',
                      fontSize: '16px',
                    }}
                  >
                    {author.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="fixed bottom-0 left-0 right-0 p-6 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
            <div className="flex gap-3 max-w-md mx-auto">
              <button
                onClick={handleClear}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                style={{
                  fontFamily: 'General Sans, sans-serif',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                Clear All
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                style={{
                  fontFamily: 'General Sans, sans-serif',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
