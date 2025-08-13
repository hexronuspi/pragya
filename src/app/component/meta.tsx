'use client';

import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

const Meta: React.FC = () => {

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
                Meta AI Lab
              </h2>
              <p className="mt-6 text-lg leading-8 text-neutral-600">
                Meta&apos;s Superintelligence Lab is developing next-generation AI assistants, tailored to individuals and designed to evolve toward superintelligent capabilities.
              </p>
            </div>

            {/* RIGHT COLUMN: Video Player */}
            <div className="lg:col-span-7">
              <div className="rounded-xl p-2 lg:p-3">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/pcgBEoqqgwU"
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

export default Meta;