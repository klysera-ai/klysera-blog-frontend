'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/types/wordpress';
import { formatDate, getReadingTime, stripHtml } from '@/lib/utils';

interface BlogSliderProps {
  posts: Post[];
}

export default function BlogSlider({ posts }: BlogSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Limit to 3 posts
  const displayPosts = posts.slice(0, 3);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayPosts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displayPosts.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    if (!isHovered && displayPosts.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === displayPosts.length - 1 ? 0 : prev + 1));
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, displayPosts.length]);

  if (displayPosts.length === 0) {
    return null;
  }

  const currentPost = displayPosts[currentIndex];
  const categorySlug = currentPost.categories[0]?.slug || 'chapter';
  const categoryName = currentPost.categories[0]?.name || 'Chapter';

  return (
    <div 
      className="relative flex flex-col gap-6 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Slide Content */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-12">
        {/* Left Content */}
        <div className="flex flex-col gap-4 lg:gap-6 flex-1 w-full lg:w-auto">
          {/* Meta Info */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <span className="font-['General_Sans'] font-semibold text-xs leading-4 
            text-[#444E60] dark:text-[#FEFEFE] border-r-[0.5px] border-[#B1B9C8] dark:border-[#0557AD] pr-4">
              {`${getReadingTime(currentPost.content)} mins read`}
            </span>
            <span className="font-['General_Sans'] font-normal text-xs 
            leading-5 text-[#68778F] dark:text-[#CFDDE8] border-r-[0.5px] border-[#B1B9C8] dark:border-[#0557AD] pr-4">
              {formatDate(currentPost.date, 'd MMM, yyyy')}
            </span>
            <span className="font-['General_Sans'] font-normal text-xs leading-5 
            text-[#68778F] dark:text-[#CFDDE8] capitalize">
              {categoryName}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-['Acid_Grotesk'] font-normal text-2xl sm:text-3xl lg:text-[36px] leading-tight sm:leading-[44px] lg:leading-[56px] tracking-[-1.38px] text-[#001F3F] dark:text-[#FEFEFE] flex-none self-stretch grow-0">
            {currentPost.title}
          </h3>
          {/* Excerpt */}
          <p className="font-['General_Sans'] font-normal text-[14px] leading-6 
          text-[#444E60] dark:text-[#CFDDE8] flex-none self-stretch grow-0 py-4 lg:py-[24px]">
            {stripHtml(currentPost.excerpt).substring(0, 200)}...
          </p>

          {/* Read Article Button */}
          <Link
            href={`/${categorySlug}/${currentPost.slug}`}
            className="flex flex-row justify-center items-center px-[16px] py-[8px] gap-[10px] w-[120px] bg-[#007AFF] rounded flex-none cursor-pointer"
          >
            <span className=" font-['General_Sans'] font-normal text-base leading-6 text-center text-[#FEFEFE] flex-none">
              Read Article
            </span>
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative w-full lg:w-[464px] h-[240px] sm:h-[280px] lg:h-[320px] p-[12px] border border-[#CDCDCD] dark:border-[#0557AD] rounded overflow-hidden flex-shrink-0">
          {currentPost.featuredImage ? (
            <div className="relative w-full h-full  border border-[#CDCDCD] dark:border-[#0557AD]">

            <Image
              src={currentPost.featuredImage.url}
              alt={currentPost.featuredImage.alt || currentPost.title}
              fill
              className="w-full h-full object-cover rounded"
            />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-100 dark:bg-[#001F3F]  flex items-center justify-center">
              <span className="text-gray-400 dark:text-[#FEFEFE]">No image</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-4 lg:mt-0">
        {/* Dots Navigation */}
        <div className="flex items-center gap-2">
          {displayPosts.map((_, index) => (
            <button
            style={{
                borderRadius: '100px',
                width: '12px',  
                height: '12px',
            }}
              key={index}
              onClick={() => handleDotClick(index)}
              className={`rounded-full transition-colors flex-none ${
                index === currentIndex 
                  ? 'bg-[#D9D9D9] dark:bg-[#CFDDE829]' 
                  : 'border border-[#B1B9C8] dark:border-[#CFDDE829] bg-transparent'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrow Navigation */}
        <div className="flex items-center gap-9">
          <button
            onClick={handlePrevious}
            className="flex items-center justify-center cursor-pointer"
            aria-label="Previous slide"
          >
            {/* Light mode left arrow */}
            <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:hidden">
              <path d="M0.219934 6.53068L7.71993 14.0307C7.78962 14.1004 7.87234 14.1556 7.96339 14.1933C8.05443 14.2311 8.15201 14.2505 8.25056 14.2505C8.34911 14.2505 8.44669 14.2311 8.53773 14.1933C8.62878 14.1556 8.7115 14.1004 8.78118 14.0307C8.85087 13.961 8.90614 13.8783 8.94385 13.7872C8.98157 13.6962 9.00098 13.5986 9.00098 13.5001C9.00098 13.4015 8.98157 13.3039 8.94385 13.2129C8.90614 13.1218 8.85087 13.0391 8.78118 12.9694L1.81087 6.00005L8.78118 -0.969324C8.92192 -1.11005 9.00098 -1.30093 9.00098 -1.49995C9.00098 -1.69897 8.92192 -1.88984 8.78118 -2.03057C8.64045 -2.1713 8.44958 -2.25037 8.25056 -2.25037C8.05154 -2.25037 7.86066 -2.1713 7.71993 -2.03057L0.219934 5.46943C0.150202 5.53908 0.094882 5.6218 0.0571394 5.71285C0.0193958 5.80389 -2.95639e-05 5.90149 -2.95639e-05 6.00005C-2.95639e-05 6.09861 0.0193958 6.19621 0.0571394 6.28726C0.094882 6.3783 0.150202 6.46102 0.219934 6.53068Z" fill="#444E60"/>
            </svg>
            {/* Dark mode left arrow */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden dark:block">
              <g clipPath="url(#clip0_1161_17909)">
                <path d="M1.71896 6.53063L9.21896 14.0306C9.28864 14.1003 9.37137 14.1556 9.46241 14.1933C9.55346 14.231 9.65104 14.2504 9.74958 14.2504C9.84813 14.2504 9.94571 14.231 10.0368 14.1933C10.1278 14.1556 10.2105 14.1003 10.2802 14.0306C10.3499 13.9609 10.4052 13.8782 10.4429 13.7872C10.4806 13.6961 10.5 13.5986 10.5 13.5C10.5 13.4015 10.4806 13.3039 10.4429 13.2128C10.4052 13.1218 10.3499 13.0391 10.2802 12.9694L3.3099 6L10.2802 -0.96937C10.4209 -1.1101 10.5 -1.30097 10.5 -1.49999C10.5 -1.69902 10.4209 -1.88989 10.2802 -2.03062C10.1395 -2.17135 9.94861 -2.25041 9.74958 -2.25041C9.55056 -2.25041 9.35969 -2.17135 9.21896 -2.03062L1.71896 5.46938C1.64923 5.53903 1.59391 5.62175 1.55616 5.7128C1.51842 5.80385 1.49899 5.90144 1.49899 6C1.49899 6.09857 1.51842 6.19616 1.55616 6.28721C1.59391 6.37826 1.64923 6.46098 1.71896 6.53063Z" fill="#0557AD"/>
              </g>
              <defs>
                <clipPath id="clip0_1161_17909">
                  <rect width="12" height="12" fill="white" transform="matrix(-1 0 0 1 12 0)"/>
                </clipPath>
              </defs>
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="flex items-center justify-center cursor-pointer"
            aria-label="Next slide"
          >
            {/* Light mode right arrow */}
            <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:hidden">
              <path d="M8.78104 6.53068L1.28104 14.0307C1.21136 14.1004 1.12863 14.1556 1.03759 14.1933C0.946545 14.2311 0.848963 14.2505 0.750417 14.2505C0.651871 14.2505 0.554289 14.2311 0.463245 14.1933C0.3722 14.1556 0.289474 14.1004 0.219792 14.0307C0.150109 13.961 0.0948337 13.8783 0.0571218 13.7872C0.0194098 13.6962 0 13.5986 0 13.5001C0 13.4015 0.0194098 13.3039 0.0571218 13.2129C0.0948337 13.1218 0.150109 13.0391 0.219792 12.9694L7.1901 6.00005L0.219792 -0.969324C0.0790612 -1.11005 -1.48284e-09 -1.30093 0 -1.49995C1.48284e-09 -1.69897 0.0790612 -1.88984 0.219792 -2.03057C0.360522 -2.1713 0.551394 -2.25037 0.750417 -2.25037C0.94944 -2.25037 1.14031 -2.1713 1.28104 -2.03057L8.78104 5.46943C8.85077 5.53908 8.90609 5.6218 8.94384 5.71285C8.98158 5.80389 9.00101 5.90149 9.00101 6.00005C9.00101 6.09861 8.98158 6.19621 8.94384 6.28726C8.90609 6.3783 8.85077 6.46102 8.78104 6.53068Z" fill="#444E60"/>
            </svg>
            {/* Dark mode right arrow */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden dark:block">
              <g clipPath="url(#clip0_1161_17911)">
                <path d="M10.281 6.53063L2.78104 14.0306C2.71136 14.1003 2.62863 14.1556 2.53759 14.1933C2.44654 14.231 2.34896 14.2504 2.25042 14.2504C2.15187 14.2504 2.05429 14.231 1.96324 14.1933C1.8722 14.1556 1.78947 14.1003 1.71979 14.0306C1.65011 13.9609 1.59483 13.8782 1.55712 13.7872C1.51941 13.6961 1.5 13.5986 1.5 13.5C1.5 13.4015 1.51941 13.3039 1.55712 13.2128C1.59483 13.1218 1.65011 13.0391 1.71979 12.9694L8.6901 6L1.71979 -0.96937C1.57906 -1.1101 1.5 -1.30097 1.5 -1.49999C1.5 -1.69902 1.57906 -1.88989 1.71979 -2.03062C1.86052 -2.17135 2.05139 -2.25041 2.25042 -2.25041C2.44944 -2.25041 2.64031 -2.17135 2.78104 -2.03062L10.281 5.46938C10.3508 5.53903 10.4061 5.62175 10.4438 5.7128C10.4816 5.80385 10.501 5.90144 10.501 6C10.501 6.09857 10.4816 6.19616 10.4438 6.28721C10.4061 6.37826 10.3508 6.46098 10.281 6.53063Z" fill="#0557AD"/>
              </g>
              <defs>
                <clipPath id="clip0_1161_17911">
                  <rect width="12" height="12" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
