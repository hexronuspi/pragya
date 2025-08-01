'use client';

import React, { useEffect, useRef } from 'react';
import { Inter, Lexend_Deca } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Define fonts for use with Tailwind CSS font variables
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const lexend = Lexend_Deca({ subsets: ['latin'], weight: ['700'], variable: '--font-lexend', display: 'swap' });

/**
 * A self-contained, scroll-triggered animation component using GSAP and Tailwind CSS.
 * It's designed to be placed in a scrolling page layout. When it enters the viewport,
 * it will pin itself and animate the content based on the user's scroll progress.
 * The content will remain visible after the scroll animation completes.
 * For a standalone demo, wrap this component in a layout with extra vertical space.
 */
const Percent: React.FC = () => {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    const pinEl = pinRef.current;

    // Ensure the element refs are available before setting up the animation
    if (pinEl && numberRef.current) {
      const numberEl = numberRef.current;
      
      // Use a GSAP Context for safe cleanup
      ctx = gsap.context(() => {
        // Create the master timeline with a ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinEl,
            pin: true,
            scrub: 1.5,
            start: 'top top',
            end: '+=3000', // The scroll duration for the animation
          },
        });

        // --- ANIMATION SEQUENCE ---

        // 1. Animate the container into view.
        // We use `.statistic-container` as a selector within the scoped context.
        tl.from('.statistic-container', {
          autoAlpha: 0,
          y: 50,
          scale: 0.8,
          duration: 1.5,
          ease: 'power2.out',
        });

        // 2. Animate the number from 10 to 20.
        const counter = { val: 10 };
        tl.to(
          counter,
          {
            val: 20,
            roundProps: 'val',
            duration: 2, // This duration is relative to the timeline's scrub
            ease: 'none',
            onUpdate: () => {
              if (numberEl) {
                numberEl.textContent = String(counter.val);
              }
            },
          },
          '<' // Start at the same time as the previous animation
        );
        
        // 3. The fade-out animation has been removed as per the request.
        // The content will now remain on screen after the number animation is complete,
        // until the user scrolls past the end of the ScrollTrigger.

      }, pinEl); // Scope the context to the main container element
    }

    // Cleanup function to run when the component unmounts
    return () => {
      if (ctx) {
        ctx.revert(); // Reverts all GSAP animations and kills ScrollTriggers
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    // This container is the trigger and the element that gets pinned.
    // The font variables are passed here for Tailwind to use.
    <div ref={pinRef} className={`relative h-screen w-full overflow-hidden ${inter.variable} ${lexend.variable}`}>
      {/* 
        The grid background is now created using Tailwind's arbitrary properties.
        This keeps the styling self-contained within the component.
        Note: `theme(colors.gray.200)` assumes default Tailwind color configuration.
      */}
      <div 
        className="absolute inset-0 opacity-50 bg-[linear-gradient(to_right,theme(colors.gray.200)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.200)_1px,transparent_1px)] bg-[size:60px_60px]" 
        aria-hidden="true"
      ></div>
      
      {/* 
        The animated content. It starts invisible and is faded in by GSAP.
        The `statistic-container` class is used by GSAP as a selector and must be preserved.
      */}
      <div className="statistic-container invisible absolute inset-0 flex flex-col items-center justify-center text-center p-8 font-sans text-neutral-800">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-12">
          The Emergence of Artificial Cognition
        </h1>
        <p className="text-xl md:text-2xl text-neutral-600 mb-2">This leads to Hinton&apos;s estimated probability of an existential threat:</p>
        <div className="font-serif font-bold text-amber-600 flex items-baseline">
          {/* The ref is attached to the number for direct manipulation by GSAP */}
          <span ref={numberRef} className="text-8xl md:text-9xl lg:text-[10rem] tracking-tighter">
            10
          </span>
          <span className="text-7xl md:text-8xl lg:text-[8rem]">%</span>
        </div>
      </div>

      {/* The <style jsx global> block has been removed. All styles are now handled by Tailwind CSS. */}
    </div>
  );
};

export default Percent;