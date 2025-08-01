// app/[category]/page.js
import BlogHomepage from '@/components/BlogHomepage';
import { notFound } from 'next/navigation';
import { getPostsByCategory } from '@/components/file';

// Valid categories
const VALID_CATEGORIES = [
  'leetcode', 'cloud', 'database', 'java', 
  'networking', 'operating-systems', 'systems-design'
];

const CATEGORY_MAP = {
  'leetcode': 'LeetCode',
  'cloud': 'Cloud', 
  'database': 'Database',
  'java': 'Java',
  'networking': 'Networking',
  'operating-systems': 'Operating Systems',
  'systems-design': 'Systems Design'
};

export default async function CategoryPage({ params }) {
  const { category } = params;
  
  // Check if category is valid
  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }
  
  const posts = await getPostsByCategory(category);
  console.log('Posts:', posts);
  const currentCategory = CATEGORY_MAP[category] || 'Unknown';
  
  return (
    <BlogHomepage 
      posts={posts} 
      currentCategory={currentCategory}
      categorySlug={category}
    />
  );
}


export async function generateMetadata({ params }) {
  const { category } = params;
  
  if (!VALID_CATEGORIES.includes(category)) {
    return { title: 'Category Not Found' };
  }
  
  const categoryName = CATEGORY_MAP[category];
  
  return {
    title: `${categoryName} - Nam Pham's Blog`,
    description: `Technical articles about ${categoryName}`,
    openGraph: {
      title: `${categoryName} - Nam Pham's Blog`,
      description: `Technical articles about ${categoryName}`,
    },
  };
}