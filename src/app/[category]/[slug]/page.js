// app/[category]/[slug]/page.js
import BlogPost from '@/components/BlogPost';
import { notFound } from 'next/navigation';

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

// Server-side function to fetch post
async function fetchPostBySlug(category, slug) {
  // Simulate API call
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
      slug: 'two-sum-optimal-solution',
      content: `
        <h2>Understanding the Two Sum Problem</h2>
        <p>The Two Sum problem is one of the most fundamental coding interview questions...</p>
        
        <h3>Brute Force Approach</h3>
        <p>The naive approach would be to check every pair of numbers...</p>
        
        <pre><code>
def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
        </code></pre>
        
        <h3>Optimized HashMap Solution</h3>
        <p>We can solve this in O(n) time using a HashMap...</p>
      `
    },
    // ... more posts with full content
  ];
  
  const categoryName = CATEGORY_MAP[category];
  const post = allPosts.find(p => 
    p.slug === slug && p.category === categoryName
  );
  
  return post;
}

// Server Component
export default async function BlogPostPage({ params }) {
  const { category, slug } = params;
  
  // Validate category
  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }
  
  // Fetch post on server-side
  const post = await fetchPostBySlug(category, slug);
  
  if (!post) {
    notFound();
  }
  
  // Pass data to client component
  return (
    <BlogPost 
      post={post} 
      categorySlug={category}
    />
  );
}

// Generate static params for build time
export async function generateStaticParams() {
  // This would fetch all posts from your CMS/database
  return [
    { category: 'leetcode', slug: 'two-sum-optimal-solution' },
    { category: 'leetcode', slug: 'binary-tree-traversal' },
    { category: 'java', slug: 'spring-boot-microservices' },
    { category: 'cloud', slug: 'aws-lambda-best-practices' },
    // ... more posts
  ];
}

// SEO metadata
export async function generateMetadata({ params }) {
  const { category, slug } = params;
  
  if (!VALID_CATEGORIES.includes(category)) {
    return { title: 'Post Not Found' };
  }
  
  const post = await fetchPostBySlug(category, slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }
  
  return {
    title: `${post.title} - Nam Pham's Blog`,
    description: post.excerpt,
    keywords: `${post.category}, programming, ${category}`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}