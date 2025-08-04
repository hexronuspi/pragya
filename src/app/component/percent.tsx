'use client';

import React, { useEffect, useRef } from 'react';
import { Inter } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Define a clean, modern font for the component
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

/**
 * A top-tier, animated component with corrected stacking context and natural scroll pacing.
 *
 * THE FIX: This version solves two problems:
 * 1. **Overlapping Content:** The next section was rendering on top of this one. We solve this by
 *    using GSAP's `toggleClass` to add a high z-index class (`is-pinned`) ONLY when the
 *    component is actively pinned.
 * 2. **Abrupt Animation End:** The animation felt like it was cut off before finishing.
 *    We fixed this by increasing the `end` property of the ScrollTrigger (e.g., '+=300%'), giving the
 *    animation more scroll distance to complete gracefully. We also made the `scrub` more
 *    responsive.
 */
const Percent: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // The context ensures all GSAP animations are properly cleaned up on unmount.
    const ctx = gsap.context(() => {
      const mainEl = sectionRef.current;
      if (!mainEl) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: mainEl,
          pin: true,
          // FIX 1: Make the animation feel more responsive to the scroll.
          // A lower value like 1 or 0.8 reduces the "lag" you felt.
          scrub: 1,
          start: 'top top',
          // FIX 2: Give the animation more room to breathe.
          // Increasing the end point means the user has to scroll further
          // before this section unpins, ensuring the animation completes.
          end: '+=300%',
          // FIX 3: The z-index toggle. This is the key to preventing overlap.
          toggleClass: { targets: mainEl, className: 'is-pinned' },
          // For debugging, highly recommended:
          // markers: true,
        },
      });

      // Animate the content in
      timeline.from('.gsap-reveal', {
        autoAlpha: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      });

      // Animate the number counter
      const counter = { val: 10 };
      timeline.to(
        counter,
        {
          val: 20,
          duration: 2, // Give the count more time
          roundProps: 'val',
          onUpdate: () => {
            if (numberRef.current) {
              numberRef.current.textContent = String(counter.val);
            }
          },
          ease: 'none',
        },
        '<0.5' // Start this slightly after the text appears
      );

      // Add a final pause at the end so it doesn't unpin immediately
      timeline.to({}, { duration: 0.5 });
    }, sectionRef); // Scope the context to our main section element

    // Cleanup function
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* This style block applies the z-index when the 'is-pinned' class is active. */}
      <style jsx global>{`
        /* When pinned, give it a high z-index to ensure it stays on top */
        .is-pinned {
          z-index: 10;
        }
      `}</style>

      {/* The section now starts with a default z-index of 1.
          We use a containing div for the content to simplify GSAP selectors. */}
      <section
        ref={sectionRef}
        className={`relative h-screen w-full overflow-hidden bg-white ${inter.variable} font-sans z-1`}
      >
        <div
          className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:60px_60px]"
          aria-hidden="true"
        ></div>
        <div className="relative mx-auto flex h-full max-w-4xl flex-col items-center justify-center p-8 text-center">
          <h2 className="gsap-reveal text-2xl font-semibold text-neutral-800 md:text-3xl">
            Hinton’s Prediction
          </h2>
          <div className="gsap-reveal my-4 flex items-baseline font-bold text-black">
            <span ref={numberRef} className="text-8xl md:text-9xl lg:text-[12rem] tracking-tighter">
              10
            </span>
            <span className="text-7xl md:text-8xl lg:text-[10rem] tracking-tight text-neutral-500">%</span>
            <span className="ml-4 self-end pb-4 text-3xl md:text-4xl lg:text-5xl text-neutral-500">
              Chance of Extinction
            </span>
          </div>
          <div className="gsap-reveal max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
            <p>
              This alarming figure reflects AI evolving at an unprecedented pace. Such probabilities may seem small, but for existential threats, even a 1% chance is a cause for grave concern.
            </p>
          </div>
          <a
            href="https://www.theguardian.com/technology/2024/dec/27/godfather-of-ai-raises-odds-of-the-technology-wiping-out-humanity-over-next-30-years"
            target="_blank"
            rel="noopener noreferrer"
            className="gsap-reveal mt-12 inline-flex items-center gap-3 text-lg font-semibold text-blue-600 transition-transform hover:scale-105"
          >
            Read the full statement
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </a>
        </div>
      </section>
    </>
  );
};

export default Percent;
