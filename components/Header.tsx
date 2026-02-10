'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function Header() {
  const { theme, toggleTheme, mounted } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900" style={{ height: '100px' }}>
      <nav className="container mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {mounted && (
              <Image
                src={theme === 'dark' ? '/images/logo/dark.png' : '/images/logo/light.png'}
                alt="Klysera Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
                priority
              />
            )}
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/chapter"
              className={`transition-colors ${
                isActive('/chapter')
                  ? 'text-blue-600 dark:text-white font-medium'
                  : 'text-gray-900 hover:text-blue-600 dark:hover:text-white'
              }`}
              style={{ fontSize: '16px', color: isActive('/chapter') ? undefined : (theme === 'dark' ? '#FFFFFF63' : undefined) }}
            >
              Chapter
            </Link>
            <Link
              href="/insights"
              className={`transition-colors ${
                isActive('/insights')
                  ? 'text-blue-600 dark:text-white font-medium'
                  : 'text-gray-900 hover:text-blue-600 dark:hover:text-white'
              }`}
              style={{ fontSize: '16px', color: isActive('/insights') ? undefined : (theme === 'dark' ? '#FFFFFF63' : undefined) }}
            >
              Insights
            </Link>
            <Link
              href="/research"
              className={`transition-colors ${
                isActive('/research')
                  ? 'text-blue-600 dark:text-white font-medium'
                  : 'text-gray-900 hover:text-blue-600 dark:hover:text-white'
              }`}
              style={{ fontSize: '16px', color: isActive('/research') ? undefined : (theme === 'dark' ? '#FFFFFF63' : undefined) }}
            >
              Research
            </Link>
            <Link
              href="/white-paper"
              className={`transition-colors ${
                isActive('/white-paper')
                  ? 'text-blue-600 dark:text-white font-medium'
                  : 'text-gray-900 hover:text-blue-600 dark:hover:text-white'
              }`}
              style={{ fontSize: '16px', color: isActive('/white-paper') ? undefined : (theme === 'dark' ? '#FFFFFF63' : undefined) }}
            >
              White paper
            </Link>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-black transition-colors"
                style={{ borderColor: theme === 'dark' ? '#FFFFFF63' : undefined }}
                aria-label="Toggle theme"
              >
                <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme === 'dark' ? '#FFFFFF63' : undefined }}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <svg className="w-4 h-4 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center justify-center p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[100px] bg-white dark:bg-gray-900 z-40">
            <div className="flex flex-col p-6 space-y-6">
              <Link
                href="/chapter"
                onClick={closeMobileMenu}
                className={`text-lg transition-colors ${
                  isActive('/chapter')
                    ? 'text-blue-600 dark:text-white font-medium'
                    : 'text-gray-900 hover:text-blue-600 dark:hover:text-white'
                }`}
                style={{ fontSize: '18px', color: isActive('/chapter') ? undefined : (theme === 'dark' ? '#FFFFFF63' : undefined) }}
              >
                Chapter
              </Link>
              <Link
                href="/insights"
                onClick={closeMobileMenu}
                className={`text-lg transition-colors ${
                  isActive('/insights')
                    ? 'text-blue-600 dark:text-white font-medium'
                    : 'text-gray-900 hover:text-blue-600 dark:hover:text-white'
                }`}
                style={{ fontSize: '18px', color: isActive('/insights') ? undefined : (theme === 'dark' ? '#FFFFFF63' : undefined) }}
              >
                Insights
              </Link>
              <Link
                href="/research"
                onClick={closeMobileMenu}
                className={`text-lg transition-colors ${
                  isActive('/research')
                    ? 'text-blue-600 dark:text-white font-medium'
                    : 'text-gray-900 hover:text-blue-600 dark:hover:text-white'
                }`}
                style={{ fontSize: '18px', color: isActive('/research') ? undefined : (theme === 'dark' ? '#FFFFFF63' : undefined) }}
              >
                Research
              </Link>
              <Link
                href="/white-paper"
                onClick={closeMobileMenu}
                className={`text-lg transition-colors ${
                  isActive('/white-paper')
                    ? 'text-blue-600 dark:text-white font-medium'
                    : 'text-gray-900 hover:text-blue-600 dark:hover:text-white'
                }`}
                style={{ fontSize: '18px', color: isActive('/white-paper') ? undefined : (theme === 'dark' ? '#FFFFFF63' : undefined) }}
              >
                White paper
              </Link>

              {/* Theme Toggle in Mobile Menu */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-black transition-colors w-fit"
                  style={{ borderColor: theme === 'dark' ? '#FFFFFF63' : undefined }}
                  aria-label="Toggle theme"
                >
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme === 'dark' ? '#FFFFFF63' : undefined }}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                  <span className="text-sm" style={{ color: theme === 'dark' ? '#FFFFFF63' : undefined }}>Toggle Theme</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
