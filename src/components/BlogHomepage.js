'use client';

import React, { useState } from 'react';
import { categories, Menu } from './util';
import { useRouter } from 'next/navigation';


export default function BlogHomepage({ posts, currentCategory = 'ALL', categorySlug = 'all' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  // Filter posts based on selected category
  const filteredPosts = currentCategory === 'ALL'
    ? posts
    : posts.filter(post => post.category === currentCategory);

  const handleCategoryClick = (category) => {
    const slug = categories[category].slug;
    if (slug === '') {
      router.push('/'); // Homepage for ALL
    } else {
      router.push(`/${slug}`);
    }
  };

  React.useEffect(() => {
    console.log('Current Category:', currentCategory);
  }, [currentCategory]);

  const handlePostClick = (post) => {
    const categorySlug = categories[post.category]?.slug;
    if (categorySlug) {
      router.push(`/${categorySlug}/${post.slug}`);
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
                className="cursor-pointer text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
              >
                Nam Pham
              </button>
              <div className="ml-3 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {Object.entries(categories).map(([categoryName, categoryData]) => (
                <button
                  key={categoryName}
                  onClick={() => handleCategoryClick(categoryName)}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 relative group ${currentCategory === categoryName
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {categoryName}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ${currentCategory === categoryName
                    ? 'w-full'
                    : 'w-0 group-hover:w-full'
                    }`}></span>
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-800/50 mt-4">
              <div className="flex flex-col space-y-3">
                {Object.keys(categories).map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      handleCategoryClick(category);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left py-2 transition-colors ${currentCategory === category
                      ? 'text-white font-medium'
                      : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Profile Image */}
      {
        currentCategory == "ALL" && (
          <section className="max-w-7xl mx-auto px-6 py-16 border-b border-gray-800/30">
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-2xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
                  <img
                    src="/avatar.png"
                    alt="Nam Pham"
                    className="relative w-full max-w-sm mx-auto h-80 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                </div>
              </div>

              {/* About Content */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Hi, I'm Nam Pham
                    </h2>
                    <p className="text-xl text-blue-400 font-medium mb-6">
                      Senior Software Engineer & Technical Writer
                    </p>
                  </div>

                  <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                    <p>
                      Welcome to my technical blog! I'm a passionate software engineer with 5+ years of experience
                      building scalable systems and solving complex problems. I specialize in cloud architecture,
                      distributed systems, and modern web technologies.
                    </p>

                    <p>
                      Here, I share my journey through coding challenges, system design insights, and lessons learned
                      from real-world projects. Whether you're preparing for technical interviews, exploring new
                      technologies, or diving deep into computer science fundamentals, you'll find practical content
                      that helps you grow as a developer.
                    </p>
                  </div>

                  {/* Skills/Expertise */}
                  <div className="flex flex-wrap gap-3 mt-8">
                    {['Java', 'Spring Boot', 'AWS', 'Docker', 'Kubernetes', 'System Design', 'LeetCode', 'MySQL'].map(skill => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium hover:scale-105 transition-transform duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-4 mt-8">
                    <a
                      href="https://github.com/Nam Phamn"
                      target="_blank"
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full text-gray-300 hover:text-white hover:border-blue-500/50 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>GitHub</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/hoang-nam-pham-639850187/"
                      target="_blank"
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full text-gray-300 hover:text-white hover:border-blue-500/50 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      }

      {/* Enhanced Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Featured Post - Enhanced */}
          {
            filteredPosts && filteredPosts.length > 0 && (
              <div className="lg:col-span-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
                <div
                  className="relative overflow-hidden rounded-2xl cursor-pointer group"
                  onClick={() => handlePostClick(filteredPosts[0])}
                >
                  <img
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    className="w-full h-[28rem] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-block bg-gradient-to-r from-blue-500/30 to-purple-600/30 backdrop-blur-sm border border-blue-500/50 px-4 py-2 rounded-full text-sm text-blue-300 font-medium mb-4 uppercase tracking-wide">
                      {filteredPosts[0].category}
                    </span>
                    <h2 className="text-3xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-gray-300 text-lg opacity-90">{filteredPosts[0].excerpt}</p>
                  </div>
                </div>
              </div>
            )
          }

          {/* Side Posts - Enhanced */}
          <div className="space-y-8">
            {filteredPosts.slice(1, 3).map(post => (
              <div
                key={post.id}
                className="relative overflow-hidden rounded-xl cursor-pointer group"
                onClick={() => handlePostClick(post)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl blur-lg transform group-hover:scale-105 transition-transform duration-300"></div>
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-xl"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-bold text-xl mb-2 group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 text-sm opacity-90">{post.excerpt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Previous Posts Section */}
        <section>
          <div className="flex items-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Previous posts
            </h2>
            <div className="ml-6 flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(3).map(post => (
              <div
                key={post.id}
                className="cursor-pointer group"
                onClick={() => handlePostClick(post)}
              >
                <div className="relative overflow-hidden rounded-xl mb-6 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl blur-md transform group-hover:scale-110 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="relative w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl shadow-lg"
                  />
                </div>
                <div>
                  <h3 className="font-bold mb-3 text-lg leading-tight group-hover:text-blue-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">By <span className="text-gray-300">{post.author}</span></span>
                    <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}