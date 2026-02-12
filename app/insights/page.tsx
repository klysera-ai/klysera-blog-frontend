import InnerPageHero from '@/components/InnerPageHero';
import SearchToolbar from '@/components/SearchToolbar';
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import { SearchFilterProvider } from '@/contexts/SearchFilterContext';
import PostListWithPagination from '@/components/PostListWithPagination';
import { getCategoryBySlug, getPostsByCategorySlug } from '@/lib/wordpress';
import { stripHtml } from '@/lib/utils';

export const metadata = {
  title: 'Insights',
  description: 'Discover insights, analysis, and perspectives on key topics',
};

export default async function InsightsPage() {
  // Fetch category data
  const category = await getCategoryBySlug('insights');
    console.log(category, "found category");  
  
  // Fetch posts for Insights category
  const postsResponse = await getPostsByCategorySlug('insights', {
    perPage: 100, // Fetch all posts for client-side filtering
  });
    console.log(postsResponse, "found posts");
    
  // Fallback dummy posts if WordPress API is not available
  const dummyPosts = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: 'Lorem ipsum dolor sit amet,',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    slug: `insight-${i + 1}`,
    date: '2025-02-10',
    author: {
      name: 'Matthew Ayeola',
      avatar: 'https://i.pravatar.cc/150?img=' + ((i % 70) + 1),
    },
    categories: [
      { id: 1, name: 'Insights', slug: 'insights' },
    ],
    tags: [],
    featuredImage: {
      url: `https://picsum.photos/seed/insight-${i + 1}/800/600`,
      alt: 'Featured image',
      width: 800,
      height: 600,
    },
  }));

  const posts = postsResponse.data.length > 0 ? postsResponse.data : dummyPosts;
  console.log(postsResponse , "found posts");
  // Get description from category or use default
  const description = category?.description 
    ? stripHtml(category.description) 
    : 'Discover insights, analysis, and perspectives on key topics';

  return (
    <SearchFilterProvider>
      <ViewModeProvider>
        <InnerPageHero 
          title="Insights"
          description={description}
        />
      
        <SearchToolbar posts={posts} />
      
        <div className="container mx-auto px-4 py-12">
          <PostListWithPagination allPosts={posts} />
        </div>
      </ViewModeProvider>
    </SearchFilterProvider>
  );
}
