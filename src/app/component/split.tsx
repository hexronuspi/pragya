'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Define the component's props for type safety and clarity.
interface SplitScreenWarningProps {
  basePath: string;
  PALETTE: {
    white: string;
    coolBlue: string;
    black: string;
  };
}

/**
 * A sophisticated, content-first hero section.
 *
 * This design utilizes a 12-column asymmetrical grid to prioritize the critical
 * message, presenting it with strong typography. The video serves as a powerful,
 * contextual visual anchor rather than competing for primary attention.
 * This structure is highly readable and feels both modern and authoritative.
 */
const SplitScreenWarning: React.FC<SplitScreenWarningProps> = ({
  basePath,
  PALETTE,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      style={{ backgroundColor: PALETTE.white, color: PALETTE.black }}
      className="w-full overflow-hidden" // Overflow-hidden for any subtle animations
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/*
          A 12-column grid provides granular control for sophisticated layouts.
          We use `items-center` to vertically align the content for a balanced look.
        */}
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-20 lg:grid-cols-12">
          {/*
            TEXTUAL CONTENT: Spans 7 of 12 columns on large screens.
            Placed first in the DOM for better SEO and mobile-first stacking.
          */}
          <div className="lg:col-span-7">
            {/* "Eyebrow" text adds thematic context and a professional touch. */}
            <p
              style={{ color: PALETTE.coolBlue }}
              className="text-base font-semibold uppercase tracking-wider"
            >
              A Message of Urgency
            </p>

            {/*
              Using a blockquote for the main message is semantically appropriate
              and allows for distinct styling.
            */}
            <blockquote className="mt-6 text-3xl font-light leading-snug md:text-5xl md:leading-snug">
              <p>
                AI&apos;s godlike power is here, but its rise brings grave
                risks—from autonomous weapons to a complete{' '}
                <span style={{ color: PALETTE.coolBlue }}>loss of control</span>.
              </p>
              <p className="mt-8">
                We urgently need research on how to prevent these new beings from
                taking over.
              </p>
            </blockquote>
          </div>

          {/*
            VISUAL CONTENT: Spans 5 of 12 columns on large screens.
            This column provides visual context without overpowering the message.
          */}
          <div className="lg:col-span-5 relative">
            <video
              src={`${basePath}/hinton_nobel.mp4`}
              className="rounded-lg shadow-2xl w-full"
              playsInline
              controls
              muted // Muting is best practice for autoplay and general UX
            >
              Your browser does not support the video tag.
            </video>
            
            {/* YouTube Button - Below Video */}
            <div className="mt-4 flex justify-start">
              <Link
                href="https://www.youtube.com/shorts/qbrcZB-1hck"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  padding: isHovered ? '8px 16px' : '8px',
                  width: isHovered ? 'auto' : '40px',
                  height: '40px'
                }}
              >
                <svg 
                  className="w-6 h-6 flex-shrink-0" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span 
                  className={`ml-2 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                  }`}
                >
                  Watch on YouTube
                </span>
              </Link>
            </div>
          </div>  
        </div>
      </div>
    </section>
  );
};


export default SplitScreenWarning;
