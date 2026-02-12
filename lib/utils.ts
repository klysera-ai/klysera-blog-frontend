/**
 * Format date to readable string
 */
export function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
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
