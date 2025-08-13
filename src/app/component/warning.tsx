'use client';

import React from 'react';
import Image from 'next/image';
import { Inter, Lexend_Deca } from 'next/font/google';

// --- 1. FONT DEFINITIONS ---
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const lexend = Lexend_Deca({ subsets: ['latin'], weight: ['300', '400', '600', '700'], variable: '--font-lexend', display: 'swap' });

// --- 2. SMALLER UI COMPONENTS ---

/**
 * Renders the background grid pattern using Tailwind.
 */
const GridBackground: React.FC = () => (
  <div 
    className="absolute inset-0 opacity-50" 
    style={{
      backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
      backgroundSize: '60px 60px'
    }}
    aria-hidden="true"
  />
);

/**
 * Renders the main textual content and the image.
 * Fully responsive with mobile-first design.
 */
const WarningContent: React.FC = () => (
  <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-12 w-full">
    {/* Textual Content */}
    <div className="text-center w-full max-w-4xl px-4 sm:px-6 lg:px-8">
      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
        The Risk Index
      </h3>
      <p className="text-neutral-500 mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base md:text-lg max-w-6xl mx-auto px-2 sm:px-4">
        Despite rapid advances in AI capabilities, no major company is adequately prepared for AI safety, with all firms scoring D or lower in Existential Risk planning—Anthropic leads overall (C+), Meta scores poorly (D), and the industry shows a dangerous disconnect between ambition and safety infrastructure.
      </p>
    </div>

    {/* Image Content - Fully responsive */}
    <div className="relative w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      {/* Mobile: aspect-[4/3], Tablet: aspect-[3/2], Desktop: aspect-[16/10] */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/10] max-h-[400px] sm:max-h-[500px] lg:max-h-[600px]">
        <Image
          src="/pragya/safety.png"
          alt="AI Safety Risk Index Chart"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 80vw"
          unoptimized={true}
          priority
        />
      </div>
    </div>
  </div>
);

// --- 3. MAIN COMPONENT ---

/**
 * The main FoundationalWarning component.
 * Fully responsive with mobile-first design using Tailwind CSS.
 */
const FoundationalWarning: React.FC = () => {
  return (
    <div className={`${inter.variable} ${lexend.variable} font-sans text-neutral-800 antialiased`}>
      {/* Main container - responsive height and padding */}
      <div className="relative w-full min-h-screen bg-white overflow-hidden">
        <GridBackground />

        {/* Content panel - responsive spacing and centering */}
        <div className="absolute inset-0 flex items-center justify-center py-8 px-4 sm:py-12 sm:px-6 md:py-16 md:px-8 lg:px-16">
          <WarningContent />
        </div>
      </div>
    </div>
  );
};

export default FoundationalWarning;