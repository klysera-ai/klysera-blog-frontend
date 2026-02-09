'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';

export default function Header() {
  const { theme, toggleTheme, mounted } = useTheme();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900" style={{ height: '100px' }}>
      <nav className="container mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {mounted && (
              <img
                src={theme === 'dark' ? '/images/logo/dark.png' : '/images/logo/light.png'}
                alt="Klysera Logo"
                className="h-8 w-auto"
              />
            )}
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
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
        </div>
      </nav>
    </header>
  );
}
