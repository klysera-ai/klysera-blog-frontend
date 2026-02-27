'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import BlogToolbar from './BlogToolbar';
import TableOfContents from './TableOfContents';
import { formatDate, getReadingTime } from '@/lib/utils';
import type { Post } from '@/types/wordpress';

interface PostPageClientProps {
  post: Post;
  parentPage: string;
  parentHref: string;
}

export default function PostPageClient({ post, parentPage, parentHref }: PostPageClientProps) {
  const [fontSizeIncrease, setFontSizeIncrease] = useState(false);
  const [readMode, setReadMode] = useState(false);

  const toggleFontSize = () => setFontSizeIncrease(!fontSizeIncrease);
  const toggleReadMode = () => setReadMode(!readMode);

  return (
    <article className="bg-white dark:bg-black min-h-screen flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-24 px-2 md:px-10 md:px-6 lg:px-12 py-10 lg:py-16 xl:py-24">
      {/* 200px empty container */}
      <div style={{ width: '200px' }}></div>
      <div className="main-blog-content-container">
        <BlogToolbar
          parentPage={parentPage}
          parentHref={parentHref}
          currentPage={post.title}
          onToggleFontSize={toggleFontSize}
          onToggleReadMode={toggleReadMode}
          fontSizeActive={fontSizeIncrease}
          readModeActive={readMode}
        />
        {/* Main post content container */}
        <div 
          className="max-w-[976px] mx-auto px-4"
          style={{
            backgroundColor: !readMode ? 'transparent' : '#F9F9F9',
            borderLeft: !readMode ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
            borderRight: !readMode ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
          }}
        >
          <h1
            className={`text-center text-black dark:text-white pt-11 pb-[26px] px-[26px] md:px-[30px] lg:px-[56px] ${
              fontSizeIncrease 
                ? 'text-[30px] md:text-[42px] lg:text-[42px]' 
                : 'text-[28px] md:text-[40px] lg:text-[40px]'
            }`}
            style={{
              fontFamily: 'Acid Grotesk, sans-serif',
              fontWeight: 200,
              lineHeight: '150%',
              letterSpacing: '-0.02em',
            }}
          >
            {post.title}
          </h1>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="flex justify-center mb-4 px-2 md:px-10 md:mb-5 lg:mb-[26px]">
              <div className="relative w-full max-w-[738px] h-auto">
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  width={738}
                  height={325}
                  className="w-full h-auto object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          )}

          {/* Meta Information */}
          <div className="flex justify-center items-center gap-3 mb-8">
            <span
              className="text-black dark:text-white"
              style={{
                fontFamily: 'General Sans, sans-serif',
                fontWeight: 400,
                fontSize: fontSizeIncrease ? 'calc(13.57px * 1.2)' : '13.57px',
                lineHeight: '100%',
                letterSpacing: '0%',
              }}
            >
              {formatDate(post.date)}
            </span>

            <span className="text-black dark:text-white">•</span>

            <div className="flex items-center gap-1.5">
              <Clock className={fontSizeIncrease ? 'w-5 h-5 text-black dark:text-white' : 'w-4 h-4 text-black dark:text-white'} />
              <span
                className="text-black dark:text-white"
                style={{
                  fontFamily: 'General Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: fontSizeIncrease ? 'calc(13.57px * 1.2)' : '13.57px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                }}
              >
                {getReadingTime(post.content)} read
              </span>
            </div>

            <span className="text-black dark:text-white">•</span>

            <span
              className="text-black dark:text-white"
              style={{
                fontFamily: 'General Sans, sans-serif',
                fontWeight: 400,
                fontSize: fontSizeIncrease ? 'calc(13.57px * 1.2)' : '13.57px',
                lineHeight: '100%',
                letterSpacing: '0%',
              }}
            >
              {parentPage}
            </span>
          </div>
          {/* Post Content */}
          <div 
            className="post-content max-w-[738px] mx-auto mb-16 pb-[40px] px-2 md:px-10 md:pb-[60px] lg:pb-[70px]"
            style={{
              fontSize: fontSizeIncrease ? '120%' : '100%',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </div>

      {/* Add the Table of Content */}
          <div className="hidden lg:block sticky top-24 h-fit" style={{ width: 200 }}>
            {!readMode && <TableOfContents content={post.content} />}
          </div>
    </article>
  );
}
