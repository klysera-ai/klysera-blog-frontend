'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type DateSortOption = 'latest' | 'oldest' | 'custom';

interface SearchFilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedAuthors: string[];
  setSelectedAuthors: (authors: string[]) => void;
  dateSort: DateSortOption;
  setDateSort: (sort: DateSortOption) => void;
  customDateRange: { start: string; end: string };
  setCustomDateRange: (range: { start: string; end: string }) => void;
}

const SearchFilterContext = createContext<SearchFilterContextType | undefined>(undefined);

export function SearchFilterProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [dateSort, setDateSort] = useState<DateSortOption>('latest');
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });

  return (
    <SearchFilterContext.Provider 
      value={{ 
        searchQuery, 
        setSearchQuery,
        selectedCategories,
        setSelectedCategories,
        selectedAuthors,
        setSelectedAuthors,
        dateSort,
        setDateSort,
        customDateRange,
        setCustomDateRange
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
}

export function useSearchFilter() {
  const context = useContext(SearchFilterContext);
  if (context === undefined) {
    throw new Error('useSearchFilter must be used within a SearchFilterProvider');
  }
  return context;
}
