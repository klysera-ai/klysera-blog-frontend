'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const { theme, mounted } = useTheme();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe email:', email);
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <style jsx>{`
        footer {
          --footer-link-color: ${typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? '#FFFFFF63' : 'currentColor'};
          --footer-border-color: ${typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? '#FFFFFF63' : '#e5e7eb'};
          --footer-text-color: ${typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? '#FFFFFF63' : '#6b7280'};
          --footer-input-color: ${typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? '#FFFFFF63' : 'currentColor'};
        }
      `}</style>
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left Section - Logo and Tagline */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              {mounted && (
                <img
                  src={theme === 'dark' ? '/images/logo/dark.png' : '/images/logo/light.png'}
                  alt="Klysera Logo"
                  className="h-8 w-auto"
                />
              )}
            </Link>
            <p className="text-gray-900 dark:text-white font-normal">
              Build Exceptional Products
            </p>
          </div>

          {/* Middle Section - Navigation Links */}
          <div>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/chapter"
                  className="text-blue-600 dark:text-white hover:underline transition-colors"
                >
                  Chapter
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="text-gray-900 hover:text-blue-600 dark:hover:text-white transition-colors"
                  style={{ color: 'var(--footer-link-color, currentColor)' }}
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  className="text-gray-900 hover:text-blue-600 dark:hover:text-white transition-colors"
                  style={{ color: 'var(--footer-link-color, currentColor)' }}
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/white-paper"
                  className="text-gray-900 hover:text-blue-600 dark:hover:text-white transition-colors"
                  style={{ color: 'var(--footer-link-color, currentColor)' }}
                >
                  White paper
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Section - Newsletter */}
          <div>
            <h3 className="text-xl font-normal text-gray-900 dark:text-white mb-6">
              Subscribe to our Newsletter
            </h3>
            <form onSubmit={handleSubscribe} className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                required
                className="flex-1 px-4 py-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-black text-gray-900 dark:text-white"
                style={{ 
                  borderColor: 'var(--footer-border-color, #d1d5db)',
                  color: 'var(--footer-input-color, currentColor)'
                }}
              />
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 dark:bg-white text-white dark:text-gray-900 rounded-r-lg hover:bg-blue-700 dark:hover:bg-gray-100 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section - Copyright and Social */}
        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--footer-border-color, #e5e7eb)' }}>
          <p className="text-gray-500 text-sm" style={{ color: 'var(--footer-text-color, currentColor)' }}>
            © {currentYear} Kylsera. All rights reserved
          </p>
          
          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 dark:hover:bg-black transition-colors"
              style={{ borderColor: 'var(--footer-border-color, #d1d5db)' }}
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-black transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-black transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-black transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
