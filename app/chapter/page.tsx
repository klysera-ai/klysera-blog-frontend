import { getPostsFromMultipleCategories } from '@/lib/wordpress';
import HeroSection from '@/components/HeroSection';
import SearchToolbar from '@/components/SearchToolbar';
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import { SearchFilterProvider } from '@/contexts/SearchFilterContext';
import PostListWithPagination from '@/components/PostListWithPagination';

export const metadata = {
  title: 'Chapter',
  description: 'Browse all chapters and articles',
};

export default async function ChapterPage() {
  // Fetch posts from all three categories
  const postsResponse = await getPostsFromMultipleCategories(
    ['insights', 'research', 'white-paper'],
    { perPage: 100 }
  );

  // Fallback dummy posts if WordPress API is not available
  const categories = [
    { id: 1, name: 'Insights', slug: 'insights' },
    { id: 2, name: 'Research', slug: 'research' },
    { id: 3, name: 'White paper', slug: 'white-paper' },
  ];

  const dummyPosts = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: 'Lorem ipsum dolor sit amet,',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    slug: `post-${i + 1}`,
    date: '2025-02-10',
    author: {
      name: 'Matthew Ayeola',
      avatar: 'https://i.pravatar.cc/150?img=' + ((i % 70) + 1),
    },
    categories: [
      categories[i % 3], // Rotate through categories
    ],
    tags: [],
    featuredImage: {
      url: `https://picsum.photos/seed/${i + 1}/800/600`,
      alt: 'Featured image',
      width: 800,
      height: 600,
    },
  }));

  const posts = postsResponse.data.length > 0 ? postsResponse.data : dummyPosts;


  const stripHtml = (html: string) => {
    if (typeof window === 'undefined') {
      // Server-side: Use a simple regex to strip HTML tags
      return html.replace(/<[^>]*>?/gm, '');
    } else {
      // Client-side: Use DOMParser to parse and extract text content
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    }
  };
  // Get the 3 latest posts for the hero carousel
  const heroPosts = posts.length > 0 ? posts.slice(0, 3).map(post => ({
    id: post.id,
    title: post.title,
    excerpt: stripHtml(post.excerpt),
    slug: post.slug,
    featured_media_url: post.featuredImage?.url || '',
  })) : undefined;

  return (
    <SearchFilterProvider>
      <ViewModeProvider>
        {/* Hero Section */}
        <HeroSection posts={heroPosts} />
      
      {/* Search Toolbar */}
      <SearchToolbar posts={posts} />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">

      {posts.length > 0 ? (
        <PostListWithPagination allPosts={posts} />
      ) : (
        <div className="text-center py-20">
          <svg
            className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No chapters yet</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Configure your WordPress API URL in the environment variables.
          </p>
        </div>
      )}
      </div>
      </ViewModeProvider>
    </SearchFilterProvider>
  );
}
