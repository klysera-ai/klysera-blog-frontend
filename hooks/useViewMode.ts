'use client';

import { useState, useEffect } from 'react';
import type { ViewMode } from '@/types';

export function useViewMode() {
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

  return { viewMode, toggleViewMode, mounted };
}
