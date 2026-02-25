import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Tailwind merge utility for combining class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date to readable string
 */

import { format } from 'date-fns';

export function formatDate(date: string, formatStr?: string): string {
  const d = new Date(date);
  if (formatStr) {
    try {
      return format(d, formatStr);
    } catch {
      // fallback to default if format fails
    }
  }
  // Default: 'd MMM yyyy' (e.g., 10 Feb 2025)
  return format(d, 'd MMM yyyy');
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Strip HTML tags from string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Generate reading time estimate
 */
export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const text = stripHtml(content);
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Create debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Get post URL based on category
 */
export function getPostUrl(slug: string, categorySlug?: string): string {
  // Default to insights if no category
  const category = categorySlug || 'insights';
  
  // Map "chapters" (plural) to "chapter" (singular) for URL routing
  const routeCategory = category === 'chapters' ? 'chapter' : category;
  
  return `/${routeCategory}/${slug}`;
}
