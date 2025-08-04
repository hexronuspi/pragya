'use client'; // This directive is still good practice for client-side components in the App Router.

import React from 'react';
import Image from 'next/image';

export const SamImageSection = () => {
  return (
    // Key Fix: Added `bg-white` to give the section a solid background.
    // This prevents its content from overlapping the previous section during scroll.
    <section
      className="relative bg-white min-h-screen flex items-center justify-center p-8"
    >
      <div className="container mx-auto max-w-4xl w-full">
        {/* Centered column layout */}
        <div className="flex flex-col items-center justify-center">

          {/* Image Container: Takes up 80% of the viewport height */}
          {/* Removed ref and inline style for opacity */}
          <div
            className="relative w-full max-w-4xl h-[80vh]"
          >
            <Image
              src="/pragya/sam.png"
              alt="Sam Altman"
              fill
              // 'contain' ensures the entire image is visible without cropping
              style={{ objectFit: 'contain' }}
              unoptimized={true}
              priority // Good to add for LCP (Largest Contentful Paint) if this is above the fold
            />
          </div>

          {/* Text Content Below Image */}
          {/* Removed ref and inline style for opacity */}
          <div
            className="text-center mt-5" // Added mt-5 for spacing
          >
            <p className="italic text-lg md:text-xl font-medium">
              — Sam Altman, CEO of OpenAI
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};