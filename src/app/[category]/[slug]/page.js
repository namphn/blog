// app/[category]/[slug]/page.js
import BlogPost from '@/components/BlogPost';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/components/file';

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

// Server Component
export default async function BlogPostPage({ params }) {
  const { category, slug } = params;
  
  // Validate category
  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }
  
  // Fetch post on server-side
  const post = await getPostBySlug(category, slug);
  
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
  
  const post = getPostBySlug(category, slug);
  
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