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

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'posts'));
  return files.map((file) => ({
    slug: file.replace('.md', ''),
  }));
}

// Metadata for SEO
export const metadata = {
  title: 'Biilog - Technical Blog',
  description: 'Sharing knowledge about programming, technology and career development',
  keywords: 'blog, programming, technology, javascript, python, career',
  openGraph: {
    title: 'Biilog - Technical Blog',
    description: 'Sharing knowledge about programming, technology and career development',
    type: 'website',
    url: 'https://yourdomain.com',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Biilog - Technical Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biilog - Technical Blog',
    description: 'Sharing knowledge about programming, technology and career development',
    images: ['https://yourdomain.com/og-image.jpg'],
  },
};