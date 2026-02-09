import type { Post } from '@/types/wordpress';

// Shared dummy post generator
export function generateDummyPost(slug: string, categoryName: string, categorySlug: string): Post {
  const id = parseInt(slug.split('-').pop() || '1');
  
  return {
    id,
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h2>Introduction</h2>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h2>Key Points</h2>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      
      <ul>
        <li>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit</li>
        <li>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet</li>
        <li>Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt</li>
        <li>Ut labore et dolore magnam aliquam quaerat voluptatem</li>
      </ul>
      
      <h2>Analysis</h2>
      <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
      
      <blockquote>
        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
      </blockquote>
      
      <h2>Conclusion</h2>
      <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
      
      <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
    `,
    slug,
    date: '2025-02-10',
    author: {
      name: 'Matthew Ayeola',
      avatar: 'https://i.pravatar.cc/150?img=' + (id % 70 + 1),
    },
    featuredImage: {
      url: `https://picsum.photos/seed/${slug}/1200/630`,
      alt: 'Featured image',
      width: 1200,
      height: 630,
    },
    categories: [
      { id: categoryName === 'Insights' ? 1 : categoryName === 'Research' ? 2 : 3, name: categoryName, slug: categorySlug },
    ],
    tags: [
      { id: 1, name: 'Technology', slug: 'technology' },
      { id: 2, name: 'Analysis', slug: 'analysis' },
      { id: 3, name: 'Trends', slug: 'trends' },
    ],
  };
}

export function getDummyPostBySlug(slug: string): Post | null {
  // Determine category from slug prefix
  if (slug.startsWith('insight-')) {
    return generateDummyPost(slug, 'Insights', 'insights');
  } else if (slug.startsWith('research-')) {
    return generateDummyPost(slug, 'Research', 'research');
  } else if (slug.startsWith('whitepaper-')) {
    return generateDummyPost(slug, 'White paper', 'white-paper');
  } else if (slug.startsWith('post-')) {
    // For posts from chapter page, determine category from ID
    const id = parseInt(slug.split('-').pop() || '1');
    const categoryIndex = (id - 1) % 3;
    const categories = [
      { name: 'Insights', slug: 'insights' },
      { name: 'Research', slug: 'research' },
      { name: 'White paper', slug: 'white-paper' },
    ];
    return generateDummyPost(slug, categories[categoryIndex].name, categories[categoryIndex].slug);
  }
  
  return null;
}
