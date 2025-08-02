import { useEffect, useRef } from 'react';

const MarkdownRenderer = ({ htmlContent, chapterNumber, chapterTitle, chapterSubtitle }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const highlightCode = async () => {
      if (contentRef.current && typeof window !== 'undefined') {
        try {
          // Import Prism.js và các components cần thiết
          const Prism = await import('prismjs');
          
          // Import language components
          await import('prismjs/components/prism-javascript');
          await import('prismjs/components/prism-typescript');
          await import('prismjs/components/prism-jsx');
          await import('prismjs/components/prism-tsx');
          await import('prismjs/components/prism-python');
          await import('prismjs/components/prism-bash');
          await import('prismjs/components/prism-json');
          await import('prismjs/components/prism-css');
          await import('prismjs/components/prism-java');

          // Tìm tất cả code blocks và apply highlighting
          const codeBlocks = contentRef.current.querySelectorAll('pre code');
          codeBlocks.forEach((block) => {
            // Auto-detect language nếu chưa có
            if (!block.className.includes('language-')) {
              const text = block.textContent || '';
              let detectedLang = 'text';
              
              if (text.includes('def ') || text.includes('import ') && text.includes('from ')) {
                detectedLang = 'python';
              } else if (text.includes('function ') || text.includes('const ') || text.includes('let ') || text.includes('=>')) {
                detectedLang = 'javascript';
              } else if (text.includes('interface ') || text.includes('type ') && text.includes('=')) {
                detectedLang = 'typescript';
              } else if (text.includes('#!/bin/bash') || text.includes('echo ') || text.includes('export ')) {
                detectedLang = 'bash';
              } else if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
                detectedLang = 'json';
              } else if (text.includes('public class ') || text.includes('public static void main')) {
                detectedLang = 'java';
              }
              
              block.className = `language-${detectedLang}`;
              // Cũng add class cho pre element để language label hoạt động
              const pre = block.closest('pre');
              if (pre) {
                pre.className = `language-${detectedLang}`;
              }
            }
            
            // Apply Prism highlighting
            Prism.default.highlightElement(block);
          });

        } catch (error) {
          console.error('Error highlighting code:', error);
        }
      }
    };

    if (htmlContent) {
      // Delay nhỏ để đảm bảo DOM đã render
      setTimeout(highlightCode, 100);
    }
  }, [htmlContent]);

  return (
    <div className="w-full">
      {/* Chapter Header */}
      {chapterNumber && (
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-xl shadow-lg">
              {chapterNumber}
            </div>
            <div>
              {chapterSubtitle && (
                <h2 className="text-2xl font-semibold text-gray-300 mb-2">
                  {chapterSubtitle}
                </h2>
              )}
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {chapterTitle}
              </h1>
            </div>
          </div>
        </div>
      )}
      
      {/* Content với markdown-content class */}
      <div 
        ref={contentRef}
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default MarkdownRenderer;