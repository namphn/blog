// app/[category]/page.js
import BlogHomepage from '@/components/BlogHomepage';
import { notFound } from 'next/navigation';

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

async function fetchPostsByCategory(category) {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const allPosts = [
    {
      id: 1,
      title: 'Two Sum - Optimal Solution Explained',
      excerpt: 'Master the classic Two Sum problem with HashMap approach for O(n) time complexity',
      date: 'December 5, 2022',
      category: 'LeetCode',
      author: 'Nam Pham',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      readTime: '5 min read',
      slug: 'two-sum-optimal-solution'
    },
    {
      id: 2,
      title: 'AWS Lambda Best Practices for Production',
      excerpt: 'Essential practices for deploying serverless functions at scale',
      date: 'December 3, 2022',
      category: 'Cloud',
      author: 'Nam Pham',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
      readTime: '7 min read',
      slug: 'aws-lambda-best-practices'
    },
  ];
  
  const categoryName = CATEGORY_MAP[category];
  return allPosts.filter(post => post.category === categoryName);
}

export default async function CategoryPage({ params }) {
  const { category } = params;
  
  // Check if category is valid
  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }
  
  const posts = await fetchPostsByCategory(category);
  const currentCategory = CATEGORY_MAP[category];
  
  return (
    <BlogHomepage 
      posts={posts} 
      currentCategory={currentCategory}
      categorySlug={category}
    />
  );
}

// Generate static params for all categories
export async function generateStaticParams() {
  return VALID_CATEGORIES.map(category => ({
    category
  }));
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