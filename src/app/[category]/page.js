// app/[category]/page.js
import BlogHomepage from '@/components/BlogHomepage';
import { notFound } from 'next/navigation';
import { getPostsByCategory, CATEGORY_MAP } from '@/components/file';
import { VALID_CATEGORIES } from '@/components/util';
import fs from 'fs';
import path from 'path';

export default async function CategoryPage({ params }) {
  const { category } = params;
  
  // Check if category is valid
  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }
  
  const posts = await getPostsByCategory(category);
 
  const currentCategory = CATEGORY_MAP[category] || 'Unknown';
  
  return (
    <BlogHomepage 
      posts={posts} 
      currentCategory={currentCategory}
      categorySlug={category}
    />
  );
}

export const dynamic = 'force-static';


export async function generateStaticParams() {
  const postsRoot = path.join(process.cwd(), 'posts');

  const categories = fs
    .readdirSync(postsRoot)
    .filter((name) => {
      const dir = path.join(postsRoot, name);
      return fs.lstatSync(dir).isDirectory();
    });

  return categories.map((category) => ({ category }));
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