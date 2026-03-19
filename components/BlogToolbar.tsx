'use client';

import { useState } from 'react';
import Link from 'next/link';
import ChevronRightIcon from './ui/icons/ChevronRightIcon';
import SettingsIcon from './ui/icons/SettingsIcon';
import FontSizeIcon from './ui/icons/FontSizeIcon';
import ReadModeIcon from './ui/icons/ReadModeIcon';
import CloseIcon from './ui/icons/CloseIcon';
import BackArrowIcon from './ui/icons/BackArrowIcon';
import CopyLinkIcon from './ui/icons/CopyLinkIcon';

interface BlogToolbarProps {
  parentPage: string;
  parentHref: string;
  currentPage: string;
  onToggleFontSize: () => void;
  onToggleReadMode: () => void;
  fontSizeActive: boolean;
  readModeActive: boolean;
  postTitle?: string;
  postUrl?: string;
}

export default function BlogToolbar({ 
  parentPage, 
  parentHref, 
  currentPage,
  onToggleFontSize,
  onToggleReadMode,
  fontSizeActive,
  readModeActive,
  postTitle,
  postUrl,
}: BlogToolbarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = postUrl || (typeof window !== 'undefined' ? window.location.href : '');

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleFontSizeClick = () => {
    onToggleFontSize();
    setIsSettingsOpen(false);
  };

  const handleReadModeClick = () => {
    onToggleReadMode();
    setIsSettingsOpen(false);
  };

  return (
    <>
      <style jsx>{`
        @keyframes settingsOut {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: rotate(180deg) scale(0);
            opacity: 0;
          }
        }

        @keyframes settingsIn {
          0% {
            transform: rotate(-180deg) scale(0);
            opacity: 0;
          }
          100% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes slideRotateBounce {
          0% {
            transform: translateX(50px) rotate(180deg) scale(0);
            opacity: 0;
          }
          60% {
            transform: translateX(-5px) rotate(-10deg) scale(1.1);
            opacity: 1;
          }
          80% {
            transform: translateX(3px) rotate(5deg) scale(0.95);
          }
          100% {
            transform: translateX(0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        .settings-exit {
          animation: settingsOut 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .settings-enter {
          animation: settingsIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .icon-enter-1 {
          animation: slideRotateBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.1s;
          opacity: 0;
        }

        .icon-enter-2 {
          animation: slideRotateBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }

        .icon-enter-3 {
          animation: slideRotateBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        .icon-hover:hover {
          transform: scale(1.2) rotate(5deg);
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      <div className="w-full flex items-center justify-between">
        {/* Mobile Navigation - Back Arrow + Blog */}
        <nav className="flex md:hidden items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#001F3F] dark:text-white hover:opacity-70 transition-opacity"
          >
            <BackArrowIcon />
            <span className="font-['General_Sans'] font-extralight text-sm leading-6 tracking-[-0.02em]">
              Blog
            </span>
          </Link>
        </nav>

        {/* Desktop Breadcrumb - Blog > Post Title */}
        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className="text-[#001F3F] dark:text-white hover:opacity-70 transition-opacity font-['General_Sans'] font-extralight text-sm leading-6 tracking-[-0.02em]"
          >
            Blog
          </Link>
          <ChevronRightIcon className="flex-shrink-0" />
          <span className="text-[#001F3F] dark:text-white font-['General_Sans'] font-normal text-sm leading-6 tracking-[-0.02em]">
            {currentPage}
          </span>
        </nav>

        {/* Mobile Actions - Copy Link Only */}
        <div className="flex md:hidden items-center">
          <button 
            onClick={handleCopyLink}
            className="relative icon-hover transition-opacity hover:opacity-70"
            aria-label="Copy link"
            title={copied ? "Copied!" : "Copy link"}
          >
            <CopyLinkIcon />
            {copied && (
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-[#007AFF] whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
        </div>

        {/* Desktop Settings Menu Container */}
        <div className="hidden md:flex items-center gap-3">
          {/* Settings Menu Icons - shown when open */}
          {isSettingsOpen && (
            <>
              {/* Font Size Button */}
              <button 
                onClick={handleFontSizeClick}
                className={`icon-enter-1 icon-hover transition-opacity ${fontSizeActive ? 'opacity-100' : 'opacity-50'}`}
                aria-label="Toggle font size"
                title="Toggle font size"
              >
                <FontSizeIcon isActive={fontSizeActive} />
              </button>

              {/* Read Mode Button */}
              <button 
                onClick={handleReadModeClick}
                className={`icon-enter-2 icon-hover transition-opacity ${readModeActive ? 'opacity-100' : 'opacity-50'}`}
                aria-label="Toggle read mode"
                title="Toggle read mode"
              >
                <ReadModeIcon isActive={readModeActive} />
              </button>

              {/* Close Button */}
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="icon-enter-3 icon-hover transition-opacity hover:opacity-70"
                aria-label="Close settings"
                title="Close settings"
              >
                <CloseIcon />
              </button>
            </>
          )}

          {/* Settings Icon - toggle button */}
          {!isSettingsOpen && (
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="settings-enter icon-hover transition-opacity hover:opacity-70"
              aria-label="Toggle settings"
              title="Toggle settings"
            >
              <SettingsIcon />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
