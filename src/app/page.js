// app/page.js - Server-side rendered blog homepage

import BlogHomepage from '@/components/BlogHomepage';

// Mock API function - trong thực tế sẽ fetch từ database/CMS
async function fetchPosts() {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
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
    {
      id: 3,
      title: 'Database Indexing Strategies',
      excerpt: 'Understanding B-trees, Hash indexes and when to use each type',
      date: 'December 1, 2022',
      category: 'Database',
      author: 'Nam Pham',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
      readTime: '6 min read',
      slug: 'database-indexing-strategies'
    },
    {
      id: 4,
      title: 'Java Spring Boot Microservices Architecture',
      excerpt: 'Building scalable microservices with Spring Boot and Docker',
      date: 'November 28, 2022',
      category: 'Java',
      author: 'Nam Pham',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
      readTime: '12 min read',
      slug: 'spring-boot-microservices'
    },
    {
      id: 5,
      title: 'TCP vs UDP: Network Protocols Deep Dive',
      excerpt: 'Understanding the differences and when to use each protocol',
      date: 'November 25, 2022',
      category: 'Networking',
      author: 'Nam Pham',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop',
      readTime: '8 min read',
      slug: 'tcp-vs-udp-protocols'
    },
    {
      id: 6,
      title: 'Linux Process Management and Scheduling',
      excerpt: 'How operating systems manage processes and CPU scheduling algorithms',
      date: 'November 22, 2022',
      category: 'Operating Systems',
      author: 'Nam Pham',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=300&h=300&fit=crop',
      readTime: '10 min read',
      slug: 'linux-process-management'
    },
    {
      id: 7,
      title: 'Designing Scalable Chat Systems',
      excerpt: 'System design interview: Building WhatsApp-like messaging platform',
      date: 'November 20, 2022',
      category: 'Systems Design',
      author: 'Nam Pham',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      readTime: '15 min read',
      slug: 'scalable-chat-system-design'
    },
    {
      id: 8,
      title: 'Kubernetes Container Orchestration',
      excerpt: 'Deploy and manage containerized applications with K8s',
      date: 'November 18, 2022',
      category: 'Cloud',
      author: 'Nam Pham',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
      readTime: '9 min read',
      slug: 'kubernetes-container-orchestration'
    },
    {
      id: 9,
      title: 'Binary Tree Traversal Algorithms',
      excerpt: 'Master inorder, preorder, postorder traversals with examples',
      date: 'November 15, 2022',
      category: 'LeetCode',
      author: 'Nam Pham',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b7da?w=300&h=300&fit=crop',
      readTime: '7 min read',
      slug: 'binary-tree-traversal'
    },
    {
      id: 10,
      title: 'SQL Query Optimization Techniques',
      excerpt: 'Improve database performance with proper indexing and query planning',
      date: 'November 12, 2022',
      category: 'Database',
      author: 'Nam Pham',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b7da?w=300&h=300&fit=cro',
      readTime: '8 min read',
      slug: 'sql-query-optimization'
    },
    {
      id: 11,
      title: 'Java Concurrency and Thread Safety',
      excerpt: 'Understanding multithreading, synchronization, and concurrent collections',
      date: 'November 10, 2022',
      category: 'Java',
      author: 'Nam Pham',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop',
      readTime: '11 min read',
      slug: 'java-concurrency-thread-safety'
    },
    {
      id: 12,
      title: 'HTTP/HTTPS and API Security',
      excerpt: 'Network protocols and security best practices for web APIs',
      date: 'November 8, 2022',
      category: 'Networking',
      author: 'Nam Pham',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
      readTime: '6 min read',
      slug: 'http-api-security'
    },
    {
      id: 13,
      title: '5 Cliches About Blog You Should Avoid',
      excerpt: 'Common blogging mistakes that hurt your content strategy',
      date: 'November 28, 2022',
      category: 'Content',
      author: 'Lou Stevens',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
      readTime: '4 min read',
      slug: 'blog-cliches-avoid'
    },
    {
      id: 14,
      title: 'Skills that you can learn from business',
      excerpt: 'Transfer business skills to your personal development',
      date: 'November 25, 2022',
      category: 'Business',
      author: 'Larry Lawson',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop',
      readTime: '8 min read',
      slug: 'skills-learn-business'
    },
    {
      id: 15,
      title: 'Five unbelievable facts about money.',
      excerpt: 'Surprising truths about money and financial success',
      date: 'November 22, 2022',
      category: 'Finance',
      author: 'Louis Crawford',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=300&h=300&fit=crop',
      readTime: '6 min read',
      slug: 'facts-about-money'
    },
    {
      id: 16,
      title: 'This is why this year will be the year',
      excerpt: 'Workplace communication and professional boundaries',
      date: 'November 20, 2022',
      category: 'Career',
      author: 'Joan Wallace',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      readTime: '5 min read',
      slug: 'questions-never-answer'
    },
    {
      id: 17,
      title: 'Ten questions you should answer truthfully.',
      excerpt: 'Understanding different content formats and their impact',
      date: 'November 18, 2022',
      category: 'Content',
      author: 'Larry Lawson',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
      readTime: '7 min read',
      slug: 'content-variations'
    },
    {
      id: 18,
      title: 'There are many variations of passages',
      excerpt: 'Evaluating the agency model for business growth',
      date: 'November 15, 2022',
      category: 'Business',
      author: 'Louis Crawford',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b7da?w=300&h=300&fit=crop',
      readTime: '9 min read',
      slug: 'business-agency-pros-cons'
    },
    {
      id: 19,
      title: 'The pros and cons of business agency',
      excerpt: 'Critical factors for business success in digital age',
      date: 'November 12, 2022',
      category: 'Strategy',
      author: 'Joan Wallace',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop',
      readTime: '6 min read',
      slug: 'reasons-not-ignore'
    },
    {
      id: 20,
      title: '5 reasons why you shouldn\'t startup',
      excerpt: 'Critical factors for business success in digital age',
      date: 'November 12, 2022',
      category: 'Strategy',
      author: 'Larry Lawson',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop',
      readTime: '6 min read',
      slug: 'reasons-not-startup'
    }
  ];
}

export default async function Home() {
  // Fetch posts data on server-side
  const posts = await fetchPosts();
  
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