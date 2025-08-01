import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

const contentDirectory = path.join(process.cwd(), 'posts');

const CATEGORY_MAP = {
  'leetcode': 'LeetCode',
  'cloud': 'Cloud', 
  'database': 'Database',
  'java': 'Java',
  'networking': 'Networking',
  'operating-systems': 'Operating Systems',
  'systems-design': 'Systems Design'
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
    const files = fs.readdirSync(path.join(contentDirectory, category));
    console.log('Files:', files);

    if (!fs.existsSync(fullPath)) {
      return null;
    }
  
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
  
    // Process markdown to HTML with syntax highlighting
    const processedContent = await remark()
      .use(remarkGfm) // GitHub Flavored Markdown
      .use(remarkRehype) // Convert to rehype (HTML) tree
      .use(rehypePrism) // Add syntax highlighting
      .use(rehypeStringify) // Convert to HTML string
      .use(rehypeHighlight)
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