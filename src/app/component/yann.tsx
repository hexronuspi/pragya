// src/components/yann.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Type Definition ---
type YannComponent = React.FC;

// --- The Component ---
const Yann: YannComponent = () => {
  return (
    <section className="bg-white font-sans text-gray-800 py-16 sm:py-24">
      {/* Changed to max-w-[90rem] which is equivalent to 8xl */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Header: Title and Subtitle */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Yann LeCun
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Turing Award | God Father of AI
          </p>
        </div>

        {/* 2. Media Grid: Image on Left, Video on Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image (configured to not crop) */}
          <div className="w-full">
            <Image
              src="/pragya/yann.jpeg" // Use the imported image object
              alt="Portrait of Yann LeCun"
              className="rounded-lg shadow-2xl mx-auto"
              width={350}
              height={500}
              unoptimized={true}
            />
          </div>

          {/* Right Column: Video */}
          <div className="w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/OSR2x8uFKJE"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
            <div className="text-right mt-2">
              <Link
                href="https://www.youtube.com/watch?v=OSR2x8uFKJE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Watch on YouTube →
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Text Content Below Media */}
        <div className="mt-16 max-w-8xl mx-auto">
          <div className="space-y-5">
            <p className="text-lg font-medium text-gray-900">
              We extend this vision:
            </p>

            <blockquote className="border-l-4 border-gray-300 pl-6 italic text-gray-700 space-y-4 text-lg leading-relaxed">
              <p>
                Design without deep insight is fragile.
              </p>
              <p>
                Just as engineers could not deploy turbojets safely until they mastered the thermodynamics of flight,
                we cannot deploy AI responsibly without decoding the hidden mechanics of artificial cognition.
              </p>
              <p>
                If AI is a machine of thought,
                then it demands a science of its hidden structure.
              </p>
              <p className="font-semibold not-italic text-gray-800">
                Not fear, but comprehension.
                <br />
                Not speculation, but clarity.
              </p>
              <p>
                We must dig deeper —
                to uncover its latent architecture,
                to make design itself legible, governable, and worthy of trust.
              </p>
            </blockquote>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Yann;