'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HeroPost {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  featured_media_url?: string;
}

interface HeroSectionProps {
  posts?: HeroPost[];
}

export default function HeroSection({ posts }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Dummy data if no posts are provided (3 posts for carousel)
  const heroPosts = posts || [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet,',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      slug: 'dummy-post-1',
      featured_media_url: '/hero-placeholder.jpg',
    },
    {
      id: 2,
      title: 'Second Featured Post Title',
      excerpt: 'This is the second post excerpt with engaging content that draws readers in and provides context about the article.',
      slug: 'dummy-post-2',
      featured_media_url: '/hero-placeholder.jpg',
    },
    {
      id: 3,
      title: 'Third Amazing Article',
      excerpt: 'The third post in our carousel showcasing the latest and most interesting content from our blog.',
      slug: 'dummy-post-3',
      featured_media_url: '/hero-placeholder.jpg',
    },
  ];

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroPosts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroPosts.length]);

  const currentPost = heroPosts[currentSlide];
  const backgroundImage = currentPost.featured_media_url || '/images/sections/hero-image.png';

  return (
    <div className="relative w-full h-[617px] md:h-[400px] overflow-hidden">
      {/* Background Image with transition */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
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
        <div className="container mx-auto pb-16 md:pb-16 max-w-6xl px-4 md:px-6">
          <h1 
            className="text-white mb-6 md:mb-4 text-[50px] md:text-[46px] transition-opacity duration-500"
            style={{
              fontFamily: 'Acid Grotesk, sans-serif',
              lineHeight: '1.2',
              fontWeight: '400',
            }}
          >
            {currentPost.title}
          </h1>
          <p 
            className="text-white max-w-3xl text-[18px] md:text-[18px] transition-opacity duration-500"
            style={{
              fontFamily: 'General Sans, sans-serif',
              lineHeight: '1.6',
              opacity: '0.95',
            }}
          >
            {currentPost.excerpt}
          </p>
          
          {/* Carousel Dots - Aligned to the left */}
          <div className="flex gap-2 mt-8">
            {heroPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="transition-all duration-300 ease-out rounded-full"
                style={{
                  width: currentSlide === index ? '70px' : '15px',
                  height: '15px',
                  borderRadius: '9999px',
                  backgroundColor: currentSlide === index ? '#FFFFFF59' : '#FFFFFF2E',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
