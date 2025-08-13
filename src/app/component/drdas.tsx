'use client';

import React from 'react';
import { Inter } from 'next/font/google';

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
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default DrDas;