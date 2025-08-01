// components/BlogPost.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Heart, Share } from '@/components/svg'; // Adjust the import path as needed


function BlogPost({ post, categorySlug }) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  
  const handleBackClick = () => {
    if (categorySlug && categorySlug !== 'all') {
      router.push(`/${categorySlug}`);
    } else {
      router.push('/');
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
          <p className="text-2xl text-gray-300 mb-12 font-light">
            {post.excerpt}
          </p>

          {/* Render HTML content from server */}
          {post.content ? (
            <div 
              className="space-y-4 text-lg "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="space-y-8 text-lg leading-relaxed">
              <p>Content not available.</p>
            </div>
          )}
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