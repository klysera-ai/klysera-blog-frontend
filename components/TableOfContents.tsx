'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    // Extract headings from HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const h2Elements = tempDiv.querySelectorAll('h2');
    
    const extractedHeadings: Heading[] = Array.from(h2Elements).map((heading, index) => {
      const text = heading.textContent || '';
      const id = `heading-${index}`;
      return { id, text, level: 2 };
    });

    setHeadings(extractedHeadings);

    // Add IDs to actual heading elements in DOM
    setTimeout(() => {
      const actualH2s = document.querySelectorAll('.post-content h2');
      actualH2s.forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });
    }, 100);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            const index = headings.findIndex((h) => h.id === entry.target.id);
            if (index !== -1) {
              setCurrentIndex(index);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden lg:block sticky top-24 h-fit group">
      <div className="w-[200px]">
        {/* Progress Indicator */}
        <div className="flex justify-end mb-8">
          <span 
            className="text-gray-600 dark:text-gray-400"
            style={{ 
              fontFamily: 'General Sans, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
            }}
          >
            {String(currentIndex + 1).padStart(2, '0')}/{String(headings.length).padStart(2, '0')}
          </span>
        </div>

        {/* Headings List - Hidden until hover */}
        <nav className="space-y-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {headings.map((heading, index) => (
            <div key={heading.id}>
              <button
                onClick={() => handleClick(heading.id)}
                className={`text-left w-full transition-colors ${
                  activeId === heading.id
                    ? 'text-gray-900 dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                style={{ 
                  fontFamily: 'General Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                }}
              >
                {heading.text}
              </button>
              {index < headings.length - 1 && (
                <div className="mt-6 border-b border-gray-200 dark:border-gray-700" />
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
