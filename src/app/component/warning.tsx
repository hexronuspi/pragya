// /components/FoundationalWarning.js
'use client';

import React from 'react';
import Image from 'next/image';
import { Inter, Lexend_Deca } from 'next/font/google';

// --- 1. FONT & STYLE DEFINITIONS ---

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const lexend = Lexend_Deca({ subsets: ['latin'], weight: ['300', '400', '600', '700'], variable: '--font-lexend', display: 'swap' });

/**
 * A small component to encapsulate the global styles needed for this section.
 */
const GlobalStyles: React.FC = () => (
  <style jsx global>{`
    .bg-grid { background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px); background-size: 60px 60px; }
    .font-sans { font-family: var(--font-inter), sans-serif; }
    .font-serif { font-family: var(--font-lexend), serif; }
  `}</style>
);

// --- 2. SMALLER UI COMPONENTS ---

/**
 * Renders the background grid pattern.
 */
const GridBackground: React.FC = () => (
  <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true"></div>
);

/**
 * Renders the main textual content and the image.
 * The content is center-aligned with the image displayed below the text.
 */
const WarningContent: React.FC = () => (
  // This flex container stacks the text and image vertically and centers them.
  <div className="flex flex-col items-center gap-8 md:gap-12">
    {/* Textual Content */}
    <div className="text-center max-w-4xl">
      <h3 className="font-serif text-4xl lg:text-5xl font-semibold tracking-tight">The Risk Index</h3>
      <p className="text-neutral-500 mt-4 leading-relaxed max-w-6xl mx-auto">
        Despite rapid advances in AI capabilities, no major company is adequately prepared for AI safety, with all firms scoring D or lower in Existential Risk planning—Anthropic leads overall (C+), Meta scores poorly (D), and the industry shows a dangerous disconnect between ambition and safety infrastructure.
      </p>
    </div>

    {/* Image Content */}
    {/* This container defines the size for the Next.js Image component */}
    <div className="relative w-[70vw] h-[60vh] max-w-4xl max-h-[500px]">
      <Image
        src="/pragya/safety.png"
        alt="Benigo"
        fill
        // `object-contain` ensures the image scales to fit without being cropped.
        className="object-contain"
        // This sizes prop tells the browser the image will be responsive.
        sizes="(max-width: 768px) 100vw, 60vw"
        unoptimized={true}
      />
    </div>
  </div>
);


// --- 3. MAIN COMPONENT (ORCHESTRATOR) ---

/**
 * The main FoundationalWarning component.
 * It assembles the UI pieces into a static, full-screen section.
 */
const FoundationalWarning: React.FC = () => {
  return (
    <div className={`${inter.variable} ${lexend.variable} font-sans text-neutral-800 antialiased`}>
      {/* This is the main container that fills the screen */}
      <div className="relative w-full h-screen bg-white overflow-hidden">
        <GridBackground />

        {/* This is the content panel, centered within the container */}
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16">
          <WarningContent />
        </div>
      </div>

      <GlobalStyles />
    </div>
  );
};

export default FoundationalWarning;