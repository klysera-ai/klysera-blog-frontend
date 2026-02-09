import InnerPageHero from '@/components/InnerPageHero';
import SearchToolbar from '@/components/SearchToolbar';
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import { SearchFilterProvider } from '@/contexts/SearchFilterContext';
import PostListWithPagination from '@/components/PostListWithPagination';

export const metadata = {
  title: 'Insights',
  description: 'Discover insights, analysis, and perspectives on key topics',
};

export default function InsightsPage() {
  // Generate dummy posts for Insights
  const dummyPosts = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: 'Lorem ipsum dolor sit amet,',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    slug: `insight-${i + 1}`,
    date: '2025-02-10',
    modified: '2025-02-10',
    author: {
      id: 1,
      name: 'Matthew Ayeola',
      slug: 'matthew-ayeola',
      avatar: 'https://i.pravatar.cc/150?img=' + ((i % 70) + 1),
    },
    categories: [
      { id: 1, name: 'Insights', slug: 'insights' },
    ],
    tags: [],
    featuredImage: {
      url: `https://picsum.photos/seed/insight-${i + 1}/800/600`,
      alt: 'Featured image',
    },
    featured_media_url: `https://picsum.photos/seed/insight-${i + 1}/800/600`,
  }));

  return (
    <SearchFilterProvider>
      <ViewModeProvider>
        <InnerPageHero 
        title="Insights"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      
      <SearchToolbar />
      
      <div className="container mx-auto px-4 py-12">
        <PostListWithPagination allPosts={dummyPosts} />
      </div>
      </ViewModeProvider>
    </SearchFilterProvider>
  );
}
