import BlogSlider from './BlogSlider';
import type { Post } from '@/types/wordpress';

interface HeroProps {
  posts: Post[];
}

export default function Hero({ posts }: HeroProps) {
  return (
    <section
      className="container"
    >
    <div className="flex flex-col items-start py-12 sm:py-16 lg:py-[120px] px-4 sm:px-6 lg:px-10 gap-8 lg:gap-16 w-full border-r-[0.5px] border-b-[0.5px] border-l-[0.5px] border-solid border-[#B1B9C8]  dark:border-[#0557AD] flex-none order-1 self-stretch grow-0 bg-white dark:bg-[#001F3F]">
          <h2 className="font-['General_Sans'] font-normal text-xl sm:text-2xl lg:text-[28px] leading-8 lg:leading-10 tracking-[-1px] text-[#001F3F] flex-none order-0 self-stretch grow-0 dark:text-[#FEFEFE]">
        Latest Blogs & Articles
      </h2>
      
      <BlogSlider posts={posts} />
      </div>
    </section>
  );
}
