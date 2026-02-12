import InnerPageHero from '@/components/InnerPageHero';
import SearchToolbar from '@/components/SearchToolbar';
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import { SearchFilterProvider } from '@/contexts/SearchFilterContext';
import PostListWithPagination from '@/components/PostListWithPagination';
import { getCategoryBySlug, getPostsByCategorySlug } from '@/lib/wordpress';
import { stripHtml } from '@/lib/utils';

export const metadata = {
  title: 'White Paper',
  description: 'Comprehensive white papers and detailed reports',
};

export default async function WhitePaperPage() {
  // Fetch category data
  const category = await getCategoryBySlug('white-paper');
  
  // Fetch posts for White Paper category
  const postsResponse = await getPostsByCategorySlug('white-paper', {
    perPage: 100, // Fetch all posts for client-side filtering
  });

  // Fallback dummy posts if WordPress API is not available
  const dummyPosts = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: 'Lorem ipsum dolor sit amet,',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    slug: `white-paper-${i + 1}`,
    date: '2025-02-10',
    author: {
      name: 'Matthew Ayeola',
      avatar: 'https://i.pravatar.cc/150?img=' + ((i % 70) + 1),
    },
    categories: [
      { id: 3, name: 'White paper', slug: 'white-paper' },
    ],
    tags: [],
    featuredImage: {
      url: `https://picsum.photos/seed/whitepaper-${i + 1}/800/600`,
      alt: 'Featured image',
      width: 800,
      height: 600,
    },
  }));

  const posts = postsResponse.data.length > 0 ? postsResponse.data : dummyPosts;
  
  // Get description from category or use default
  const description = category?.description 
    ? stripHtml(category.description) 
    : 'Comprehensive white papers and detailed reports';

  return (
    <SearchFilterProvider>
      <ViewModeProvider>
        <InnerPageHero
          title="White paper"
          description={description}
        />
      
        <SearchToolbar posts={posts} />
      </ViewModeProvider>
    </SearchFilterProvider>
  );
}
