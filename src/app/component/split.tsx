'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitScreenTeaserProps {
  basePath: string;
  PALETTE: {
    white: string;
    coolBlue: string;
    black: string;
  };
}

const SplitScreenTeaser: React.FC<SplitScreenTeaserProps> = ({ basePath, PALETTE }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Effect to detect screen size for responsive behavior
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Effect for animations, now runs only on desktop
  useEffect(() => {
    // --- Do not run animations on mobile ---
    if (isMobile) {
      // On mobile, if the component logic needs to be reset (e.g., from a resize),
      // we ensure there are no lingering GSAP styles.
      gsap.set(sectionRef.current, { clearProps: "all" });
      gsap.set(".teaser-sentence", { clearProps: "all" });
      return; 
    }

    // --- Desktop-only GSAP animations ---
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2000',
          pin: true,
          scrub: 1,
        },
      });

      // Animate the text on the left side
      tl.from('.teaser-sentence', {
        autoAlpha: 0,
        y: 40,
        stagger: 0.4,
        ease: 'power2.out',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]); // Rerun effect if the view changes between mobile/desktop

  return (
    <section
      ref={sectionRef}
      className={isMobile 
        ? "w-full flex flex-col py-16" // Mobile: Stacked layout, normal scroll
        : "h-screen w-full flex"      // Desktop: Split screen, pinned
      }
      style={{ backgroundColor: PALETTE.white, color: PALETTE.black }}
    >
      {/* LEFT SIDE (or TOP on Mobile): Content */}
      <div className={isMobile 
        ? "w-full p-8 text-center"     // Mobile: Full width
        : "w-1/2 h-full flex flex-col items-center justify-center p-8 text-center" // Desktop: Half width
      }>
        <div className="max-w-xl">
          <p className="teaser-sentence text-3xl md:text-5xl font-light leading-tight mb-6">
            AI&apos;s godlike power is here. But its rise brings grave risks—
          </p>
          <p className="teaser-sentence text-3xl md:text-5xl font-light leading-tight mb-12">
            from autonomous weapons to a complete <span style={{ color: PALETTE.coolBlue }}>loss of control</span>.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (or BOTTOM on Mobile): Video */}
      <div className={isMobile 
        ? "w-full h-[60vh] flex items-center justify-center px-4" // Mobile: Smaller video container
        : "w-1/2 h-full flex items-center justify-center"      // Desktop: Half screen
      }>
        <video
          ref={videoRef}
          src={`${basePath}/hinton_nobel.mp4`}
          className={isMobile 
            ? "w-full h-full object-contain rounded-lg" // Mobile: Smaller, contained video
            : "w-full h-4/5 object-contain"            // Desktop: Large video filling its container's width
          }
          loop
          playsInline
          controls
          autoPlay
          // Desktop: Autoplay with sound (muted=false). Browser policies may still prevent this.
          // Mobile: Muted autoplay (muted=true) for reliable playback.
          muted={isMobile} 
        />
      </div>
    </section>
  );
};

export default SplitScreenTeaser;