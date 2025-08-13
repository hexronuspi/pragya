// /components/FoundationalWarning.js
'use client';

import React from 'react';
import Image from 'next/image';
import { Inter, Lexend_Deca } from 'next/font/google';
import Link from 'next/link';

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
  <div className="flex flex-col items-center gap-8 md:gap-12">
    {/* Textual Content */}
    <div className="text-center max-w-4xl">
      <h3 className="font-serif text-4xl lg:text-5xl font-semibold tracking-tight">The Risk Index</h3>
      <p className="text-neutral-500 mt-4 leading-relaxed max-w-3xl mx-auto">
        Despite rapid advances in AI capabilities, no major company is adequately prepared for AI safety, with all firms scoring D or lower in Existential Risk planning—Anthropic leads overall (C+), Meta scores poorly (D), and the industry shows a dangerous disconnect between ambition and safety infrastructure.
      </p>
    </div>

    {/*
      --- RESPONSIVE IMAGE CONTAINER ---
      This container is now responsive, adapting its size for different screens.
    */}
    <div className="flex flex-col items-center gap-6 max-w-4xl">
      {/* Image Container */}
      <div
        className="
          relative
          /* Mobile styles (default): takes up 90% of screen width with a 16:9 aspect ratio */
          w-[90vw] aspect-video max-h-[40vh]
          /* Desktop styles (md breakpoint and up): reverts to the original fixed-height layout */
          md:w-[70vw] md:h-[60vh] md:max-h-[500px] md:aspect-auto
          /* Universal constraint */
          max-w-4xl
        "
      >
        <Image
          src="/pragya/safety.png"
          alt="A chart showing the AI Safety Risk Index for companies like Meta, Google, OpenAI, and Anthropic."
          fill
          className="object-contain"
          // The `sizes` prop is updated to reflect the new responsive widths for better performance.
          sizes="(max-width: 768px) 90vw, 70vw"
          unoptimized={true}
        />
      </div>

      {/* Button Below Image */}
      <div className="py-4">
        <Link
          href="https://futureoflife.org/ai-safety-index-summer-2025/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center gap-2 px-6 py-3 
            bg-blue-600 hover:bg-blue-700 
            text-white font-medium rounded-lg 
            transition-all duration-300 
            shadow-lg hover:shadow-xl
            transform hover:scale-105
          "
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Full Report
        </Link>
      </div>
    </div>
  </div>
);


// --- 3. MAIN COMPONENT (ORCHESTRATOR) ---

/**
 * The main FoundationalWarning component.
 * It assembles the UI pieces into a responsive section that fills the screen on desktop
 * and adjusts to content height on mobile.
 */
const FoundationalWarning: React.FC = () => {
  return (
    <div className={`${inter.variable} ${lexend.variable} font-sans text-neutral-800 antialiased`}>
      {/*
        --- RESPONSIVE MAIN CONTAINER ---
        This container now centers its content and adapts its height.
        - `min-h-screen`: Ensures it's at least the height of the screen. On mobile, it can grow if content needs more space, preventing clipping.
        - `flex items-center justify-center`: A robust way to center the content vertically and horizontally.
        - The original `h-screen` and `overflow-hidden` are removed to allow scrolling on small devices if content is tall.
      */}
      <div className="relative w-full min-h-screen bg-white flex items-center justify-center">
        <GridBackground />
        <div className="relative z-10 w-full p-4 sm:p-8 md:p-16">
          <WarningContent />
        </div>
        
      </div>

      <GlobalStyles />
    </div>
  );
};

export default FoundationalWarning;