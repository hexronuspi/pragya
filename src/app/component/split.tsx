'use client';

import React, { useEffect, useState } from 'react';

interface SplitScreenTeaserProps {
  basePath: string;
  PALETTE: {
    white: string;
    coolBlue: string;
    black: string;
  };
}

const SplitScreenTeaser: React.FC<SplitScreenTeaserProps> = ({ basePath, PALETTE }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Effect to detect screen size for responsive layout
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); // Check on initial render
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      // The className toggles between a stacked layout on mobile and a split-screen on desktop
      className={
        isMobile
          ? "w-full flex flex-col py-16" // Mobile: Stacked layout with vertical padding
          : "h-screen w-full flex"      // Desktop: Full-height, side-by-side layout
      }
      style={{ backgroundColor: PALETTE.white, color: PALETTE.black }}
    >
      {/* LEFT SIDE (or TOP on Mobile): Content */}
      <div
        className={
          isMobile
            ? "w-full p-8 text-center"     // Mobile: Full width
            : "w-1/2 h-full flex flex-col items-center justify-center p-8 text-center" // Desktop: Half width, centered content
        }
      >
        <div className="max-w-2xl">
          <p className="text-3xl md:text-5xl font-light leading-tight mb-6">
            AI&apos;s godlike power is here. But its rise brings grave risks—from autonomous weapons to a complete <span style={{ color: PALETTE.coolBlue }}>loss of control</span>
          </p>
          <p className="text-3xl md:text-5xl font-light leading-tight mb-12">
            We urgently need research on how to prevent these new beings.....
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (or BOTTOM on Mobile): Video */}
      <div
        className={
          isMobile
            ? "w-full h-[60vh] flex items-center justify-center px-4" // Mobile: Video container
            : "w-1/2 h-full flex items-center justify-center"      // Desktop: Half screen video container
        }
      >
        <video
          src={`${basePath}/hinton_nobel.mp4`}
          className={
            isMobile
              ? "w-full h-full object-contain rounded-lg" // Mobile: Contained video with rounded corners
              : "w-full h-4/5 object-contain"            // Desktop: Large video
          }
          playsInline
          controls
          muted={isMobile} // Autoplay works more reliably on mobile when muted
        />
      </div>
    </section>
  );
};

export default SplitScreenTeaser;