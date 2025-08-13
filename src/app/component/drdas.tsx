'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

/**
 * Custom SVG of abstract neural pathways, designed to be animated.
 */
/**
 * An integrated, static section for Meta's Superintelligence Lab.
 *
 * This version solves the overlap problem by being a standard section in the
 * document flow.
 *
 * THE KEY TECHNIQUE: A CSS `mask-image` is applied to the background visual.
 * This creates a soft, radial fade, making the animated neural lines appear
 * to emerge from the center and disappear gracefully before reaching the
 * section's hard edges. This is a highly polished and professional effect.
 */
const DrDas: React.FC = () => {
  return (
    <main className={inter.variable}>
      {/* This section behaves like a normal div. No pinning, no overlap. */}
      <section
        className="relative w-full overflow-hidden bg-white py-24 sm:py-32 font-sans"
      >
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-20 lg:grid-cols-12">
            
            {/* LEFT COLUMN: Text Content */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                Digital Semantic Beings
              </h2>
              <p className="mt-6 text-lg leading-8 text-neutral-600">
                Basically, I think we all have a very primitive notion of what the mind is. That&apos;s wrong. And when the notion goes away, we&apos;ll realize there&apos;s nothing distinguishing these things from us except that they are digital.
              </p>
            </div>

            {/* RIGHT COLUMN: Video Player */}
            <div className="lg:col-span-7">
              <div className="rounded-xl lg:p-3">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/wRHedyw4W1E/"
                    title="Meta AI Presentation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full rounded-lg"
                  ></iframe>
                </div>
                
                {/* Button Below Video */}
                 <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-start' }}>
          <Link
            href="https://www.youtube.com/watch?v=wRHedyw4W1E"
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
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default DrDas;