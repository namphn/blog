// app/[category]/page.js
import BlogHomepage from '@/components/BlogHomepage';
import { notFound } from 'next/navigation';
import { getPostsByCategory, CATEGORY_MAP } from '@/components/file';
import { VALID_CATEGORIES } from '@/components/util';



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