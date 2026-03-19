'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import BlogToolbar from './BlogToolbar';
import PageRuler from './PageRuler';
import { formatDate, getReadingTime } from '@/lib/utils';
import type { Post } from '@/types/wordpress';
import Divider from './Divider';
import { Share } from 'next/font/google';
import ShareButtons from './ShareButtons';
import Newsletter from './Newsletter';
import RelatedPosts from './RelatedPosts';

interface PostPageClientProps {
  post: Post;
  parentPage: string;
  parentHref: string;
  relatedPosts?: Post[];
}

export default function PostPageClient({ post, parentPage, parentHref, relatedPosts = [] }: PostPageClientProps) {
  const [fontSizeIncrease, setFontSizeIncrease] = useState(false);
  const [readMode, setReadMode] = useState(false);

  const toggleFontSize = () => setFontSizeIncrease(!fontSizeIncrease);
  const toggleReadMode = () => setReadMode(!readMode);

  return (
    <section className="bg-white dark:bg-[#001F3F]">
      <Divider />
      <article className='container'>
        <div className={`border-r-[0.5px] border-l-[0.5px] 
        border-[#B1B9C8] dark:border-[#0557AD] md:p-0 px-[16px] py-[60px] md:py-[120px] flex flex-row ${
          readMode ? 'justify-center' : 'justify-between'
        }`}>
          {/* ShareButtons - hidden in read mode and on mobile */}
          {!readMode && (
            <div className="hidden md:block w-[100px] pt-[80px] max-w-[100px] pl-[40px]">
              <ShareButtons title={post.title} url={post.slug} />
            </div>
          )}
          
          {/* Center Item */}
          <div className={`w-full md:w-[950px] md:max-w-[952px] flex flex-col ${readMode ? 'mx-auto' : ''}`}>
            <BlogToolbar
              parentPage={parentPage}
              parentHref={parentHref}
              currentPage={post.title}
              onToggleFontSize={toggleFontSize}
              onToggleReadMode={toggleReadMode}
              fontSizeActive={fontSizeIncrease}
              readModeActive={readMode}
              postTitle={post.title}
              postUrl={typeof window !== 'undefined' ? window.location.href : ''}
            />



            {/* Article container */}
            <div id='post-content-container' className={`min-h-[400px] mt-[16px] p-0 flex flex-col items-center justify-start ${
              readMode 
                ? 'bg-[#F9F9F9] dark:bg-[#001F3F] border-[0.98px] border-[#B1B9C8] dark:border-[#0557AD]' 
                : 'border-[0.98px] border-[#B1B9C8] dark:border-[#0557AD] bg-white dark:bg-[#001F3F]'
            }`}>
              {/* Post Information */}
              <div className='max-w-[600px] mt-[40px] md:mt-[120px] px-4 md:px-0 text-center'>
                {/* Post Meta Information */}
                <div className="mb-4 md:mb-6">
                  <div className="flex items-center justify-center
                  gap-2 md:gap-4 text-[#444E60] dark:text-[#B1B9C8] 
                  font-['General_Sans'] leading-6 tracking-[-0.02em]"
                  style={{
                    fontSize: fontSizeIncrease ? 'calc(clamp(12px, 2vw, 14px) * 1.2)' : 'clamp(12px, 2vw, 14px)',
                  }}
                  >
                    <span>{getReadingTime(post.content)} minutes reading time</span>
                    <span>|</span>
                    <span>{formatDate(post.date)}</span>
                    <span>|</span>
                    <span>{parentPage}</span>
                  </div>
                </div>

                {/* Post Title */}
                <h1 
                  className="text-[#001F3F] dark:text-white font-['Acid_Grotesk'] font-extralight tracking-[-0.02em] mb-6"
                  style={{
                    fontSize: fontSizeIncrease ? 'calc(clamp(32px, 5vw, 44px) * 1.2)' : 'clamp(32px, 5vw, 44px)',
                    lineHeight: fontSizeIncrease ? 'calc(clamp(40px, 6vw, 56px) * 1.2)' : 'clamp(40px, 6vw, 56px)',
                  }}
                >
                  {post.title}
                </h1>

                {/* Post Excerpt/Description */}
                {post.excerpt && (
                  <p className="text-[#444E60] dark:text-white 
                  font-['General_Sans'] font-normal 
                  leading-6 tracking-[-0.02em] mb-6 md:mb-10"
                  style={{
                    fontSize: fontSizeIncrease ? 'calc(16px * 1.2)' : '16px',
                    lineHeight: fontSizeIncrease ? 'calc(24px * 1.2)' : '24px',
                  }}
                  >
                    {post.excerpt.replace(/<[^>]*>/g, '')}
                  </p>
                )}
              </div>
              {/* Featured Image */}
              {post.featuredImage && (
                <div className="relative w-full max-w-[870px] h-auto mb-6 md:mb-10 mt-[32px] md:mt-[64px] px-4 md:px-0">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || post.title}
                    width={870}
                    height={500}
                    className="w-full h-auto object-cover rounded-lg"
                    priority
                  />
                </div>
              )}

              {/* Post Content Container */}
              <div className={`post-content pt-[24px] pb-[60px] md:pb-[120px] px-[24px] text-[#001F3F] dark:text-[#FEFEFE] md:${
                readMode ? 'px-[80px]' : 'px-[64px]'
              }`}
               style={{
                  fontSize: fontSizeIncrease ? '120%' : '100%',
                }}
              >
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
              
              </div>


            </div>
          </div>
          {/* Add the PageRuler - hidden in read mode and on mobile */}
          {!readMode && (
            <div className="hidden md:block">
              <PageRuler 
                contentSelector=".post-content" 
                containerSelector="#post-content-container"
              />
            </div>
          )}

        </div>
      </article>

      <Divider /> 
       {/* Related Posts Section */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className='container bg-white dark:bg-[#001F3F]'>
          <div className='px-[16px] md:px-[40] border-r-[0.5px] border-l-[0.5px] border-[#B1B9C8]
        dark:border-[#0557AD] bg-white dark:bg-[#001F3F]'>
            <RelatedPosts posts={relatedPosts} />
          </div>
        </div>
      )}
      <Newsletter />
      <Divider />
    </section>
  );
}
