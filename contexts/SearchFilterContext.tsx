'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchFilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedAuthors: string[];
  setSelectedAuthors: (authors: string[]) => void;
}

const SearchFilterContext = createContext<SearchFilterContextType | undefined>(undefined);

export function SearchFilterProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  return (
    <SearchFilterContext.Provider 
      value={{ 
        searchQuery, 
        setSearchQuery,
        selectedCategories,
        setSelectedCategories,
        selectedAuthors,
        setSelectedAuthors
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
