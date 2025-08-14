// app/page.js - Server-side rendered blog homepage

import BlogHomepage from '@/components/BlogHomepage';
import { getAllPosts } from '@/components/file';


// Mock API function - trong thực tế sẽ fetch từ database/CMS

export default async function Home() {
  // Fetch posts data on server-side
  const posts = await getAllPosts();
  
  return (
    <BlogHomepage 
      posts={posts} 
      currentCategory="ALL"
      categorySlug="all"
    />
  );
}
// Metadata for SEO
export const metadata = {
  title: 'Nam Pham - Technical Blog',
  description: 'Sharing knowledge about programming, technology and career development',
  keywords: 'blog, programming, technology, javascript, python, career, nam pham',
  openGraph: {
    title: 'Nam Pham - Technical Blog',
    description: 'Sharing knowledge about programming, technology and career development',
    type: 'website',
    url: 'https://namph.vercel.app/',
    images: [
      {
        url: 'https://namph.vercel.app/avatar.png',
        width: 1200,
        height: 630,
        alt: 'Nam Pham - Technical Blog',
      },
    ],
  },
};