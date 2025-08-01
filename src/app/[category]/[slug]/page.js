// app/[category]/[slug]/page.js
import BlogPost from '@/components/BlogPost';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/components/file';
import { VALID_CATEGORIES } from '@/components/util';
import fs from 'fs';
import path from 'path';

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

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const allParams = [];

  VALID_CATEGORIES.forEach((category) => {
    const dir = path.join(process.cwd(), 'posts', category);
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      allParams.push({
        category,
        slug: file.replace(/\.md$/, ''),
      });
    });
  });

  return allParams;
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