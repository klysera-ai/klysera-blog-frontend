'use client';

import Link from 'next/link';

interface HeroPost {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  featured_media_url?: string;
}

interface HeroSectionProps {
  post?: HeroPost;
}

export default function HeroSection({ post }: HeroSectionProps) {
  // Dummy data if no post is provided
  const heroPost = post || {
    id: 1,
    title: 'Lorem ipsum dolor sit amet,',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    slug: 'dummy-post',
    featured_media_url: '/hero-placeholder.jpg',
  };
  
  const backgroundImage = heroPost.featured_media_url || '/images/sections/hero-image.png';
  return (
    <div className="relative w-full h-[617px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />
      
      {/* Gradient Overlay - darker at bottom, lighter at top */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%)',
        }}
      />
      
      {/* Content */}
      <div className="relative h-full flex items-end">
        <div className="container mx-auto px-4 pb-16 max-w-6xl">
          <h1 
            className="text-white mb-6"
            style={{
              fontFamily: 'Acid Grotesk, sans-serif',
              fontSize: '50px',
              lineHeight: '1.2',
              fontWeight: '400',
            }}
          >
            {heroPost.title}
          </h1>
          <p 
            className="text-white max-w-3xl"
            style={{
              fontFamily: 'General Sans, sans-serif',
              fontSize: '18px',
              lineHeight: '1.6',
              opacity: '0.95',
            }}
          >
            {heroPost.excerpt}
          </p>
        </div>
      </div>
    </div>
  );
}
