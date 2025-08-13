'use client'; // This directive is still good practice for client-side components in the App Router.

import React from 'react';
import Link from 'next/link';

export const Videogpt = () => {
  return (
    // Key Fix: Added `bg-white` to give the section a solid background.
    // This prevents its content from overlapping the previous section during scroll.
    <section
      className="relative bg-white min-h-screen flex items-center justify-center p-8"
    >
      <div className="container mx-auto max-w-4xl w-full">
        {/* Centered column layout */}
        <div className="flex flex-col items-center justify-center">

          {/* Video Container */}
          <div className="relative w-full max-w-4xl mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">ChatGPT Personality</h2>
            </div>
            
            {/* Embedded YouTube Video */}
            <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/FTeeXGuUPig"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Button Below Video */}
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-start' }}>
          <Link
            href="https://www.youtube.com/watch?v=FTeeXGuUPig"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ff0000',
              color: 'white',
              borderRadius: '50px',
              padding: '8px 16px',
              textDecoration: 'none',
              fontFamily: 'Arial, sans-serif',
              fontWeight: '600',
              fontSize: '14px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#cc0000';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ff0000';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
            }}
          >
            <svg 
              style={{ width: '20px', height: '20px', marginRight: '8px', flexShrink: 0 }}
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch on YouTube
          </Link>
        </div>
          </div>

          {/* Text Content Below Video */}
          
        </div>
      </div>
    </section>
  );
};