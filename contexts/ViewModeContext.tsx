'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ViewMode } from '@/types';

interface ViewModeContextType {
  viewMode: ViewMode;
  toggleViewMode: () => void;
  mounted: boolean;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('viewMode') as ViewMode | null;
    if (stored) {
      setViewMode(stored);
    }
  }, []);

  const toggleViewMode = () => {
    const newMode = viewMode === 'grid' ? 'list' : 'grid';
    setViewMode(newMode);
    localStorage.setItem('viewMode', newMode);
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, toggleViewMode, mounted }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
}
