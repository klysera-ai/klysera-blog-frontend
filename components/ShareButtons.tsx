'use client';

import { useState } from 'react';
import CopyLinkIcon from './ui/icons/CopyLinkIcon';
import TwitterIcon from './ui/icons/TwitterIcon';
import LinkedInIcon from './ui/icons/LinkedInIcon';
import InstagramIcon from './ui/icons/InstagramIcon';
import FacebookIcon from './ui/icons/FacebookIcon';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
  };

  const handleInstagramShare = () => {
    // Instagram doesn't support direct web sharing, open profile or show message
    window.open('https://www.instagram.com/', '_blank');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className="hover:opacity-70 transition-opacity relative group"
        aria-label="Copy link"
        title={copied ? 'Copied!' : 'Copy link'}
      >
        <CopyLinkIcon />
        {copied && (
          <span className="absolute left-full ml-2 whitespace-nowrap text-xs text-[#007AFF] dark:text-[#0557AD] font-['General_Sans']">
            Copied!
          </span>
        )}
      </button>

      {/* Twitter Button */}
      <button
        onClick={handleTwitterShare}
        className="hover:opacity-70 transition-opacity"
        aria-label="Share on Twitter"
        title="Share on Twitter"
      >
        <TwitterIcon />
      </button>

      {/* LinkedIn Button */}
      <button
        onClick={handleLinkedInShare}
        className="hover:opacity-70 transition-opacity"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <LinkedInIcon />
      </button>

      {/* Instagram Button */}
      <button
        onClick={handleInstagramShare}
        className="hover:opacity-70 transition-opacity"
        aria-label="Share on Instagram"
        title="Share on Instagram"
      >
        <InstagramIcon />
      </button>

      {/* Facebook Button */}
      <button
        onClick={handleFacebookShare}
        className="hover:opacity-70 transition-opacity"
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <FacebookIcon />
      </button>
    </div>
  );
}
