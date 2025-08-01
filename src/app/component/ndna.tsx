'use client';

import React from 'react';
import Image from 'next/image';

/**
 * A full-page component displaying a central concept about AI as a "Semantic Helix".
 * It features a title, a central non-cropped image, and a descriptive footer.
 * The layout is designed to be responsive and visually focused.
 */
const Ndna = () => {
  return (
    // Main container: full-screen, flexbox layout, dark theme
    <div className="flex min-h-screen w-full flex-col items-center justify-between p-8 md:p-12 font-sans">
      
      {/* Header Section */}
      <header className="w-full max-w-5xl text-center">
        <h1 className="text-2xl md:text-4xl">
          We view AI systems as semantic organisms – uncovering their <span className="font-medium">Semantic Helix</span>
        </h1>
      </header>

      {/* Main Image Section */}
      {/* This container grows to fill available space, pushing the header and footer to the edges.
          It's set to relative positioning to act as a boundary for the Next.js Image with `fill`. */}
      <main className="relative my-8 h-full w-full flex-grow">
        <Image
          src="/pragya/ndna.png"
          alt="A visual representation of the Semantic Helix, symbolizing the neural DNA of an AI system."
          // `fill` makes the image expand to the parent container's dimensions.
          fill
          // `object-contain` ensures the image resizes to fit without being cropped or distorted.
          className="object-contain"
          // `unoptimized` serves the image as-is, without Next.js processing.
          unoptimized={true}
          // `priority` hints that this is the Largest Contentful Paint (LCP) element for faster loading.
          priority
        />
      </main>

      {/* Footer Section */}
      <footer className="w-full max-w-5xl text-center">
        <h2 className="text-xl md:text-2xl font-medium mb-2">
          Neural Genomics: The Next Leap in the Evolution of Artificial Intelligence
        </h2>
        <p className="text-md md:text-lg">
          Unveil the neural DNA (nDNA) of artificial cognition and explore how intelligence evolves.
        </p>
      </footer>
      
    </div>
  );
};

export default Ndna;