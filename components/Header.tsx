'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function Header() {
  const { theme, toggleTheme, mounted } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const getLinkColor = (path: string) => {
    const isThisLinkHovered = hoveredLink === path;
    const isAnyLinkHovered = hoveredLink !== null;
    
    if (theme === 'dark') {
      // Dark mode colors
      if (isThisLinkHovered) return '#FFFFFF';
      if (isAnyLinkHovered) return '#FFFFFF63';
      return isActive(path) ? '#FFFFFF' : '#FFFFFF63';
    } else {
      // Light mode colors
      if (isThisLinkHovered) return '#000000';
      if (isAnyLinkHovered) return '#8E8E93';
      return isActive(path) ? '#000000' : '#8E8E93';
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-md bg-white/40 dark:bg-black/40 shadow-sm' 
          : 'bg-white dark:bg-black'
      }`} 
      style={{ height: '70px' }}
    >
      <nav className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {mounted && (
              <Image
                src={theme === 'dark' ? '/images/logo/klysera-logo-dark.svg' : '/images/logo/klysera-logo-light.svg'}
                alt="Klysera Logo"
                width={120}
                height={32}
                style={{ height: '1.5rem', width: 'auto' }}
                priority
              />
            )}
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/insights"
              onMouseEnter={() => setHoveredLink('/insights')}
              onMouseLeave={() => setHoveredLink(null)}
              className="transition-colors"
              style={{ 
                fontSize: '14px', 
                color: getLinkColor('/insights'),
                fontWeight: isActive('/insights') ? 300 : 200,
                // Use acid Grotesk as the font Family
                fontFamily: 'Acid Grotesk, sans-serif'
              }}
            >
              Insights
            </Link>
            <Link
              href="/research"
              onMouseEnter={() => setHoveredLink('/research')}
              onMouseLeave={() => setHoveredLink(null)}
              className="transition-colors"
              style={{ 
                fontSize: '14px', 
                color: getLinkColor('/research'),
                fontWeight: isActive('/research') ? 300 : 200,
                fontFamily: 'Acid Grotesk, sans-serif'
              }}
            >
              Research
            </Link>
            <Link
              href="/white-paper"
              onMouseEnter={() => setHoveredLink('/white-paper')}
              onMouseLeave={() => setHoveredLink(null)}
              className="transition-colors"
              style={{ 
                fontSize: '14px', 
                color: getLinkColor('/white-paper'),
                fontWeight: isActive('/white-paper') ? 300 : 200,
                fontFamily: 'Acid Grotesk, sans-serif'
              }}
            >
              White paper
            </Link>

            {/* Theme Toggle */}
            {mounted && (
              <div 
                className="relative flex items-center border border-gray-300 dark:border-[#FFFFFF63]"
                style={{ borderRadius: '2px', padding: '2px', height: '20px' }}
              >
                {/* Animated Sliding Background */}
                <div
                  className="absolute transition-all duration-300 ease-out"
                  style={{
                    width: 'calc(50% - 2px)',
                    left: theme === 'light' ? '2px' : 'calc(50% + 0px)',
                    top: '2px',
                    bottom: '2px',
                    backgroundColor: '#DCE5EF',
                    borderRadius: '1px',
                  }}
                />
                
                {/* Light Mode Button */}
                <button
                  onClick={() => theme === 'dark' && toggleTheme()}
                  className="relative z-10 transition-opacity hover:opacity-80"
                  style={{ padding: '2px' }}
                  aria-label="Switch to light mode"
                >
                  <svg width="12.5" height="10.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.66412 12.46C7.66412 12.6364 7.59406 12.8055 7.46935 12.9302C7.34464 13.0549 7.17549 13.125 6.99913 13.125C6.82276 13.125 6.65361 13.0549 6.5289 12.9302C6.40419 12.8055 6.33413 12.6364 6.33413 12.46V11.165C6.33413 10.9886 6.40419 10.8195 6.5289 10.6948C6.65361 10.5701 6.82276 10.5 6.99913 10.5C7.17549 10.5 7.34464 10.5701 7.46935 10.6948C7.59406 10.8195 7.66412 10.9886 7.66412 11.165V12.46ZM4.5255 9.47363C4.46375 9.41185 4.39043 9.36284 4.30973 9.32941C4.22903 9.29597 4.14254 9.27876 4.05519 9.27876C3.96784 9.27876 3.88134 9.29597 3.80065 9.32941C3.71995 9.36284 3.64663 9.41185 3.58488 9.47363L2.66875 10.3889C2.60699 10.4506 2.558 10.524 2.52457 10.6047C2.49114 10.6854 2.47394 10.7718 2.47394 10.8592C2.47394 10.9465 2.49114 11.033 2.52457 11.1137C2.558 11.1944 2.60699 11.2677 2.66875 11.3295C2.79348 11.4542 2.96266 11.5243 3.13906 11.5243C3.22641 11.5243 3.3129 11.5071 3.39359 11.4737C3.47429 11.4403 3.54761 11.3913 3.60938 11.3295L4.5255 10.4143C4.58728 10.3525 4.63628 10.2792 4.66972 10.1985C4.70315 10.1178 4.72036 10.0313 4.72036 9.94394C4.72036 9.85659 4.70315 9.77009 4.66972 9.6894C4.63628 9.6087 4.58728 9.53538 4.5255 9.47363ZM9.47538 9.47363C9.35088 9.59831 9.28095 9.7673 9.28095 9.9435C9.28095 10.1197 9.35088 10.2887 9.47538 10.4134L10.3906 11.3295C10.4524 11.3913 10.5257 11.4403 10.6064 11.4737C10.6871 11.5071 10.7736 11.5243 10.8609 11.5243C10.9483 11.5243 11.0348 11.5071 11.1155 11.4737C11.1962 11.4403 11.2695 11.3913 11.3313 11.3295C11.393 11.2677 11.442 11.1944 11.4754 11.1137C11.5089 11.033 11.5261 10.9465 11.5261 10.8592C11.5261 10.7718 11.5089 10.6854 11.4754 10.6047C11.442 10.524 11.393 10.4506 11.3313 10.3889L10.4151 9.47363C10.2904 9.34913 10.1214 9.2792 9.94525 9.2792C9.76905 9.2792 9.60006 9.34913 9.47538 9.47363ZM8.84975 5.1485C9.10046 5.39065 9.30044 5.6803 9.43802 6.00056C9.57559 6.32082 9.648 6.66528 9.65103 7.01382C9.65406 7.36237 9.58764 7.70803 9.45566 8.03063C9.32367 8.35323 9.12876 8.64632 8.88229 8.89279C8.63582 9.13926 8.34273 9.33417 8.02013 9.46616C7.69753 9.59814 7.35187 9.66456 7.00332 9.66153C6.65478 9.6585 6.31032 9.58609 5.99006 9.44852C5.6698 9.31094 5.38015 9.11096 5.138 8.86025C4.65984 8.36517 4.39525 7.70209 4.40123 7.01382C4.40721 6.32556 4.68328 5.66717 5.16998 5.18048C5.65667 4.69378 6.31506 4.41771 7.00332 4.41173C7.69159 4.40575 8.35467 4.67033 8.84975 5.1485ZM2.66875 3.60763C2.60699 3.54586 2.558 3.47254 2.52457 3.39184C2.49114 3.31115 2.47394 3.22466 2.47394 3.13731C2.47394 3.04997 2.49114 2.96348 2.52457 2.88278C2.558 2.80208 2.60699 2.72876 2.66875 2.667C2.73051 2.60524 2.80383 2.55625 2.88453 2.52282C2.96523 2.48939 3.05172 2.47219 3.13906 2.47219C3.22641 2.47219 3.3129 2.48939 3.39359 2.52282C3.47429 2.55625 3.54761 2.60524 3.60938 2.667L4.5255 3.58312C4.58726 3.64489 4.63626 3.71821 4.66968 3.79891C4.70311 3.8796 4.72031 3.96609 4.72031 4.05344C4.72031 4.14078 4.70311 4.22727 4.66968 4.30797C4.63626 4.38866 4.58726 4.46199 4.5255 4.52375C4.46374 4.58551 4.39042 4.63451 4.30972 4.66793C4.22902 4.70136 4.14253 4.71856 4.05519 4.71856C3.96784 4.71856 3.88135 4.70136 3.80066 4.66793C3.71996 4.63451 3.64664 4.58551 3.58488 4.52375L2.66875 3.60763ZM10.3906 2.66788C10.4518 2.60369 10.5252 2.55238 10.6064 2.51696C10.6877 2.48155 10.7752 2.46274 10.8639 2.46165C10.9525 2.46055 11.0405 2.4772 11.1226 2.5106C11.2048 2.544 11.2794 2.59349 11.3421 2.65615C11.4048 2.71881 11.4544 2.79338 11.4878 2.87547C11.5213 2.95756 11.538 3.04552 11.537 3.13417C11.536 3.22282 11.5173 3.31037 11.482 3.39168C11.4466 3.47299 11.3954 3.54641 11.3313 3.60763L10.4151 4.52375C10.3534 4.58551 10.28 4.63451 10.1993 4.66793C10.1186 4.70136 10.0322 4.71856 9.94481 4.71856C9.85747 4.71856 9.77098 4.70136 9.69028 4.66793C9.60958 4.63451 9.53626 4.58551 9.4745 4.52375C9.41274 4.46199 9.36374 4.38866 9.33032 4.30797C9.29689 4.22727 9.27969 4.14078 9.27969 4.05344C9.27969 3.96609 9.29689 3.8796 9.33032 3.79891C9.36374 3.71821 9.41274 3.64489 9.4745 3.58312L10.3906 2.66788ZM12.46 6.33413C12.6364 6.33413 12.8055 6.40419 12.9302 6.5289C13.0549 6.65361 13.125 6.82276 13.125 6.99913C13.125 7.17549 13.0549 7.34464 12.9302 7.46935C12.8055 7.59406 12.6364 7.66412 12.46 7.66412H11.165C10.9886 7.66412 10.8195 7.59406 10.6948 7.46935C10.5701 7.34464 10.5 7.17549 10.5 6.99913C10.5 6.82276 10.5701 6.65361 10.6948 6.5289C10.8195 6.40419 10.9886 6.33413 11.165 6.33413H12.46ZM3.5 6.99825C3.5 6.82188 3.42994 6.65274 3.30523 6.52802C3.18051 6.40331 3.01137 6.33325 2.835 6.33325H1.54C1.36363 6.33325 1.19449 6.40331 1.06977 6.52802C0.945062 6.65274 0.875 6.82188 0.875 6.99825C0.875 7.17462 0.945062 7.34376 1.06977 7.46848C1.19449 7.59319 1.36363 7.66325 1.54 7.66325H2.835C3.2025 7.66325 3.5 7.36575 3.5 6.99825ZM6.99825 3.5C7.36575 3.5 7.66325 3.2025 7.66325 2.835V1.54C7.66325 1.36363 7.59319 1.19449 7.46848 1.06977C7.34376 0.945062 7.17462 0.875 6.99825 0.875C6.82188 0.875 6.65274 0.945062 6.52802 1.06977C6.40331 1.19449 6.33325 1.36363 6.33325 1.54V2.835C6.33325 3.2025 6.63075 3.5 6.99825 3.5Z" fill="#3E3E44"/>
                  </svg>
                </button>
                
                {/* Dark Mode Button */}
                <button
                  onClick={() => theme === 'light' && toggleTheme()}
                  className="relative z-10 transition-opacity hover:opacity-80"
                  style={{ padding: '2px' }}
                  aria-label="Switch to dark mode"
                >
                  <svg width="10.5" height="10.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:invert">
                    <path d="M9.96689 8.84301C7.10396 8.84301 5.27388 7.04661 5.27388 4.18143C5.27388 3.58728 5.41669 2.74271 5.60597 2.29877C5.6543 2.18081 5.66105 2.10099 5.66105 2.05037C5.66105 1.91193 5.55525 1.75 5.3506 1.75C5.29436 1.75 5.17194 1.76236 5.04837 1.80955C3.09194 2.59096 1.7793 4.69386 1.7793 6.91835C1.7793 10.0262 4.14899 12.25 7.25352 12.25C9.53184 12.25 11.5105 10.8687 12.168 9.14393C12.2096 9.02143 12.2208 8.89788 12.2208 8.8473C12.2208 8.65156 12.0611 8.52216 11.9103 8.52216C11.8452 8.52216 11.7856 8.53453 11.6857 8.56373C11.2758 8.6977 10.6191 8.84301 9.96689 8.84301Z" fill="black"/>
                  </svg>
                </button>
              </div>
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
          <div className="md:hidden fixed inset-0 top-[70px] bg-white dark:bg-gray-900 z-40">
            <div className="flex flex-col items-center p-6 space-y-8">
              <Link
                href="/insights"
                onClick={closeMobileMenu}
                onMouseEnter={() => setHoveredLink('/insights')}
                onMouseLeave={() => setHoveredLink(null)}
                className="transition-colors"
                style={{ 
                  fontSize: '14px', 
                  color: getLinkColor('/insights'),
                  fontWeight: isActive('/insights') ? 300 : 200,
                  fontFamily: 'Acid Grotesk, sans-serif'
                }}
              >
                Insights
              </Link>
              <Link
                href="/research"
                onClick={closeMobileMenu}
                onMouseEnter={() => setHoveredLink('/research')}
                onMouseLeave={() => setHoveredLink(null)}
                className="transition-colors"
                style={{ 
                  fontSize: '14px', 
                  color: getLinkColor('/research'),
                  fontWeight: isActive('/research') ? 300 : 200,
                  fontFamily: 'Acid Grotesk, sans-serif'
                }}
              >
                Research
              </Link>
              <Link
                href="/white-paper"
                onClick={closeMobileMenu}
                onMouseEnter={() => setHoveredLink('/white-paper')}
                onMouseLeave={() => setHoveredLink(null)}
                className="transition-colors"
                style={{ 
                  fontSize: '14px', 
                  color: getLinkColor('/white-paper'),
                  fontWeight: isActive('/white-paper') ? 300 : 200,
                  fontFamily: 'Acid Grotesk, sans-serif'
                }}
              >
                White paper
              </Link>

              {/* Theme Toggle in Mobile Menu */}
              {mounted && (
                <div 
                  className="relative flex items-center border border-gray-300 dark:border-[#FFFFFF63]"
                  style={{ borderRadius: '2px', padding: '3px' }}
                >
                  {/* Animated Sliding Background */}
                  <div
                    className="absolute transition-all duration-300 ease-out"
                    style={{
                      width: 'calc(50% - 3px)',
                      left: theme === 'light' ? '3px' : 'calc(50% + 0px)',
                      top: '3px',
                      bottom: '3px',
                      backgroundColor: '#DCE5EF',
                      borderRadius: '1px',
                    }}
                  />
                  
                  {/* Light Mode Button */}
                  <button
                    onClick={() => theme === 'dark' && toggleTheme()}
                    className="relative z-10 flex items-center gap-2 transition-opacity hover:opacity-80"
                    style={{ padding: '4px 12px' }}
                    aria-label="Switch to light mode"
                  >
                    <svg width="10.5" height="10.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.66412 12.46C7.66412 12.6364 7.59406 12.8055 7.46935 12.9302C7.34464 13.0549 7.17549 13.125 6.99913 13.125C6.82276 13.125 6.65361 13.0549 6.5289 12.9302C6.40419 12.8055 6.33413 12.6364 6.33413 12.46V11.165C6.33413 10.9886 6.40419 10.8195 6.5289 10.6948C6.65361 10.5701 6.82276 10.5 6.99913 10.5C7.17549 10.5 7.34464 10.5701 7.46935 10.6948C7.59406 10.8195 7.66412 10.9886 7.66412 11.165V12.46ZM4.5255 9.47363C4.46375 9.41185 4.39043 9.36284 4.30973 9.32941C4.22903 9.29597 4.14254 9.27876 4.05519 9.27876C3.96784 9.27876 3.88134 9.29597 3.80065 9.32941C3.71995 9.36284 3.64663 9.41185 3.58488 9.47363L2.66875 10.3889C2.60699 10.4506 2.558 10.524 2.52457 10.6047C2.49114 10.6854 2.47394 10.7718 2.47394 10.8592C2.47394 10.9465 2.49114 11.033 2.52457 11.1137C2.558 11.1944 2.60699 11.2677 2.66875 11.3295C2.79348 11.4542 2.96266 11.5243 3.13906 11.5243C3.22641 11.5243 3.3129 11.5071 3.39359 11.4737C3.47429 11.4403 3.54761 11.3913 3.60938 11.3295L4.5255 10.4143C4.58728 10.3525 4.63628 10.2792 4.66972 10.1985C4.70315 10.1178 4.72036 10.0313 4.72036 9.94394C4.72036 9.85659 4.70315 9.77009 4.66972 9.6894C4.63628 9.6087 4.58728 9.53538 4.5255 9.47363ZM9.47538 9.47363C9.35088 9.59831 9.28095 9.7673 9.28095 9.9435C9.28095 10.1197 9.35088 10.2887 9.47538 10.4134L10.3906 11.3295C10.4524 11.3913 10.5257 11.4403 10.6064 11.4737C10.6871 11.5071 10.7736 11.5243 10.8609 11.5243C10.9483 11.5243 11.0348 11.5071 11.1155 11.4737C11.1962 11.4403 11.2695 11.3913 11.3313 11.3295C11.393 11.2677 11.442 11.1944 11.4754 11.1137C11.5089 11.033 11.5261 10.9465 11.5261 10.8592C11.5261 10.7718 11.5089 10.6854 11.4754 10.6047C11.442 10.524 11.393 10.4506 11.3313 10.3889L10.4151 9.47363C10.2904 9.34913 10.1214 9.2792 9.94525 9.2792C9.76905 9.2792 9.60006 9.34913 9.47538 9.47363ZM8.84975 5.1485C9.10046 5.39065 9.30044 5.6803 9.43802 6.00056C9.57559 6.32082 9.648 6.66528 9.65103 7.01382C9.65406 7.36237 9.58764 7.70803 9.45566 8.03063C9.32367 8.35323 9.12876 8.64632 8.88229 8.89279C8.63582 9.13926 8.34273 9.33417 8.02013 9.46616C7.69753 9.59814 7.35187 9.66456 7.00332 9.66153C6.65478 9.6585 6.31032 9.58609 5.99006 9.44852C5.6698 9.31094 5.38015 9.11096 5.138 8.86025C4.65984 8.36517 4.39525 7.70209 4.40123 7.01382C4.40721 6.32556 4.68328 5.66717 5.16998 5.18048C5.65667 4.69378 6.31506 4.41771 7.00332 4.41173C7.69159 4.40575 8.35467 4.67033 8.84975 5.1485ZM2.66875 3.60763C2.60699 3.54586 2.558 3.47254 2.52457 3.39184C2.49114 3.31115 2.47394 3.22466 2.47394 3.13731C2.47394 3.04997 2.49114 2.96348 2.52457 2.88278C2.558 2.80208 2.60699 2.72876 2.66875 2.667C2.73051 2.60524 2.80383 2.55625 2.88453 2.52282C2.96523 2.48939 3.05172 2.47219 3.13906 2.47219C3.22641 2.47219 3.3129 2.48939 3.39359 2.52282C3.47429 2.55625 3.54761 2.60524 3.60938 2.667L4.5255 3.58312C4.58726 3.64489 4.63626 3.71821 4.66968 3.79891C4.70311 3.8796 4.72031 3.96609 4.72031 4.05344C4.72031 4.14078 4.70311 4.22727 4.66968 4.30797C4.63626 4.38866 4.58726 4.46199 4.5255 4.52375C4.46374 4.58551 4.39042 4.63451 4.30972 4.66793C4.22902 4.70136 4.14253 4.71856 4.05519 4.71856C3.96784 4.71856 3.88135 4.70136 3.80066 4.66793C3.71996 4.63451 3.64664 4.58551 3.58488 4.52375L2.66875 3.60763ZM10.3906 2.66788C10.4518 2.60369 10.5252 2.55238 10.6064 2.51696C10.6877 2.48155 10.7752 2.46274 10.8639 2.46165C10.9525 2.46055 11.0405 2.4772 11.1226 2.5106C11.2048 2.544 11.2794 2.59349 11.3421 2.65615C11.4048 2.71881 11.4544 2.79338 11.4878 2.87547C11.5213 2.95756 11.538 3.04552 11.537 3.13417C11.536 3.22282 11.5173 3.31037 11.482 3.39168C11.4466 3.47299 11.3954 3.54641 11.3313 3.60763L10.4151 4.52375C10.3534 4.58551 10.28 4.63451 10.1993 4.66793C10.1186 4.70136 10.0322 4.71856 9.94481 4.71856C9.85747 4.71856 9.77098 4.70136 9.69028 4.66793C9.60958 4.63451 9.53626 4.58551 9.4745 4.52375C9.41274 4.46199 9.36374 4.38866 9.33032 4.30797C9.29689 4.22727 9.27969 4.14078 9.27969 4.05344C9.27969 3.96609 9.29689 3.8796 9.33032 3.79891C9.36374 3.71821 9.41274 3.64489 9.4745 3.58312L10.3906 2.66788ZM12.46 6.33413C12.6364 6.33413 12.8055 6.40419 12.9302 6.5289C13.0549 6.65361 13.125 6.82276 13.125 6.99913C13.125 7.17549 13.0549 7.34464 12.9302 7.46935C12.8055 7.59406 12.6364 7.66412 12.46 7.66412H11.165C10.9886 7.66412 10.8195 7.59406 10.6948 7.46935C10.5701 7.34464 10.5 7.17549 10.5 6.99913C10.5 6.82276 10.5701 6.65361 10.6948 6.5289C10.8195 6.40419 10.9886 6.33413 11.165 6.33413H12.46ZM3.5 6.99825C3.5 6.82188 3.42994 6.65274 3.30523 6.52802C3.18051 6.40331 3.01137 6.33325 2.835 6.33325H1.54C1.36363 6.33325 1.19449 6.40331 1.06977 6.52802C0.945062 6.65274 0.875 6.82188 0.875 6.99825C0.875 7.17462 0.945062 7.34376 1.06977 7.46848C1.19449 7.59319 1.36363 7.66325 1.54 7.66325H2.835C3.2025 7.66325 3.5 7.36575 3.5 6.99825ZM6.99825 3.5C7.36575 3.5 7.66325 3.2025 7.66325 2.835V1.54C7.66325 1.36363 7.59319 1.19449 7.46848 1.06977C7.34376 0.945062 7.17462 0.875 6.99825 0.875C6.82188 0.875 6.65274 0.945062 6.52802 1.06977C6.40331 1.19449 6.33325 1.36363 6.33325 1.54V2.835C6.33325 3.2025 6.63075 3.5 6.99825 3.5Z" fill="#3E3E44"/>
                    </svg>
                    <span className="text-sm">Light</span>
                  </button>
                  
                  {/* Dark Mode Button */}
                  <button
                    onClick={() => theme === 'light' && toggleTheme()}
                    className="relative z-10 flex items-center gap-2 transition-opacity hover:opacity-80"
                    style={{ padding: '4px 12px' }}
                    aria-label="Switch to dark mode"
                  >
                    <svg width="10.5" height="10.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:invert">
                      <path d="M9.96689 8.84301C7.10396 8.84301 5.27388 7.04661 5.27388 4.18143C5.27388 3.58728 5.41669 2.74271 5.60597 2.29877C5.6543 2.18081 5.66105 2.10099 5.66105 2.05037C5.66105 1.91193 5.55525 1.75 5.3506 1.75C5.29436 1.75 5.17194 1.76236 5.04837 1.80955C3.09194 2.59096 1.7793 4.69386 1.7793 6.91835C1.7793 10.0262 4.14899 12.25 7.25352 12.25C9.53184 12.25 11.5105 10.8687 12.168 9.14393C12.2096 9.02143 12.2208 8.89788 12.2208 8.8473C12.2208 8.65156 12.0611 8.52216 11.9103 8.52216C11.8452 8.52216 11.7856 8.53453 11.6857 8.56373C11.2758 8.6977 10.6191 8.84301 9.96689 8.84301Z" fill="black"/>
                    </svg>
                    <span className="text-sm">Dark</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
