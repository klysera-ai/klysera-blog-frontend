import PostCard from './PostCard';
import type { Post } from '@/types/wordpress';

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-[80px] md:py-[120px] border-t-[0.98px] border-[#B1B9C8] dark:border-[#0557AD]">
      <div className="px-4 md:px-0">
        <h2 className="font-['Acid_Grotesk'] font-extralight text-[20px] md:text-[32px] leading-[40px] md:leading-[56px] tracking-[-0.02em] text-[#001F3F] dark:text-white mb-[40px] md:mb-[60px]">
          Related Blogs and Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 lg:gap-x-[31px] gap-y-8 md:gap-y-10 lg:gap-y-[40px]">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} viewMode="grid" />
          ))}
        </div>
      </div>
    </section>
  );
}
