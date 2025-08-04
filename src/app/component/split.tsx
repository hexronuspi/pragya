'use client';

import React from 'react';

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
          <div className="lg:col-span-5">
                          <video
              src={`${basePath}/hinton_nobel.mp4`}
              className="rounded-lg shadow-2xl"
              playsInline
              controls
              muted // Muting is best practice for autoplay and general UX
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitScreenWarning;