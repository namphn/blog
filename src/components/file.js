import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';

const contentDirectory = path.join(process.cwd(), 'posts');

export const CATEGORY_MAP = {
  'leetcode': 'LeetCode',
  'cloud': 'Cloud', 
  'database': 'Database',
  'java': 'Java',
  'networking': 'Networking',
  'operating-system': 'Operating System',
  'system-design': 'System Design'
};

// Get all posts from a specific category
export function getPostsByCategory(category) {
    const categoryPath = path.join(contentDirectory, category);
    
    if (!fs.existsSync(categoryPath)) {
      return [];
    }
  
    const fileNames = fs.readdirSync(categoryPath);
    const posts = fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => {
        const slug = name.replace(/\.md$/, '');
        const fullPath = path.join(categoryPath, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
  
        return {
          slug,
          category: CATEGORY_MAP[category],
          categorySlug: category,
          ...data,
          id: `${category}-${slug}`,
        };
      });
  
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  
  // Get all posts from all categories
  export function getAllPosts() {
    const categories = Object.keys(CATEGORY_MAP);
    const allPosts = [];
  
    categories.forEach(category => {
      const posts = getPostsByCategory(category);
      allPosts.push(...posts);
    });
  
    return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  
  // Get a specific post by category and slug
  export async function getPostBySlug(category, slug) {
    const fullPath = path.join(contentDirectory, category, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }
  
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
  
    // Process markdown to HTML with syntax highlighting
    const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeCodeTitles)
    .use(rehypePrismPlus, {
      showLineNumbers: true,
      ignoreMissing: true,
      defaultLanguage: 'text',
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);
  
    const contentHtml = processedContent.toString();
  
    return {
      slug,
      category: CATEGORY_MAP[category],
      categorySlug: category,
      content: contentHtml,
      ...data,
      id: `${category}-${slug}`,
    };
  }
  
  // Get all possible paths for static generation
  export function getAllPostPaths() {
    const categories = Object.keys(CATEGORY_MAP);
    const paths = [];
  
    categories.forEach(category => {
      const posts = getPostsByCategory(category);
      posts.forEach(post => {
        paths.push({
          category,
          slug: post.slug
        });
      });
    });
  
    return paths;
  }