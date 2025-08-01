// components/BlogPost.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from './util';

// Import your SVG icons
const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Clock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowLeft = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const Play = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const Heart = ({ className, filled }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const Share = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
);

const ExternalLink = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

function BlogPost({ post, categorySlug }) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(post.category);
  
  const handleBackClick = () => {
    if (categorySlug && categorySlug !== 'all') {
      router.push(`/${categorySlug}`);
    } else {
      router.push('/');
    }
  };

  const handleCategoryClick = (category) => {
    const categoryInfo = Object.values(categories).find(c => c.name === category);
    if (categoryInfo) {
      if (categoryInfo.slug === '') {
        router.push('/'); // Homepage for ALL
      } else {
        router.push(`/${categoryInfo.slug}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Enhanced Header */}
      <header className="backdrop-blur-md bg-black/80 border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
              >
                Namph
              </button>
              <div className="ml-3 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-5xl mx-auto px-6 py-16">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="cursor-pointer flex items-center text-gray-400 hover:text-white mb-12 transition-all duration-300 hover:translate-x-2 group"
        >
          <ArrowLeft className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="font-medium">Back to {post.category} posts</span>
        </button>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center text-sm text-gray-400 mb-6">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{post.date}</span>
            <span className="mx-3">•</span>
            <Clock className="w-4 h-4 mr-2" />
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            {post.title}
          </h1>

          <div className="flex items-center gap-6">
            <span className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 px-4 py-2 rounded-full text-blue-300 font-medium">
              {post.category}
            </span>
            <span className="text-gray-400">By <span className="text-white font-medium">{post.author}</span></span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-16 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
          <img
            src={post.image}
            alt={post.title}
            className="relative w-full h-[28rem] object-cover rounded-2xl shadow-2xl"
          />
        </div>

        {/* Article Content - Now using server-fetched content */}
        <div className="prose prose-invert prose-xl max-w-none">
          <p className="text-2xl text-gray-300 mb-12 leading-relaxed font-light">
            {post.excerpt}
          </p>

          {/* Render HTML content from server */}
          {post.content ? (
            <div 
              className="space-y-8 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="space-y-8 text-lg leading-relaxed">
              <p>
                Up-coming business bloggers, you need to watch this. We recently opened a new office in Manhattan.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type specimen book.
              </p>
              {/* ... rest of default content ... */}
            </div>
          )}

          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-6 text-white">Key Takeaways</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                The standard chunk of Lorem Ipsum used since the 1500s
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                Reproduced below for those interested
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                It is a long established fact that a reader will be distracted
              </li>
            </ul>
          </div>
        </div>

        {/* Enhanced Article Actions */}
        <div className="flex items-center justify-between pt-12 border-t border-gray-800/50">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-300 ${
                isLiked
                  ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/30'
                  : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10'
              }`}
            >
              <Heart className="w-5 h-5" filled={isLiked} />
              <span className="font-medium">Like</span>
            </button>
            <button className="flex items-center space-x-3 px-4 py-2 rounded-full text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300">
              <Share className="w-5 h-5" />
              <span className="font-medium">Share</span>
            </button>
          </div>

          {/* <button className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-300 hover:text-white transition-all duration-300 hover:scale-105">
            <ExternalLink className="w-4 h-4" />
            <span className="font-medium">View Source</span>
          </button> */}
        </div>
      </article>
    </div>
  );
}

export default BlogPost;