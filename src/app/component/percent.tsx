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
 * THE FIX: This version solves the "overlap" problem by using GSAP's `onToggle`
 * callback. It dynamically adds a high z-index class (`is-pinned`) to the
 * component only when it is actively pinned to the screen. This ensures it
 * cleanly covers the content scrolling underneath it, providing a seamless and
 * professional user experience.
 */
const Percent: React.FC = () => {
  const pinRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // A slight delay to ensure all DOM elements are painted, preventing layout flashes.
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const title = pinRef.current?.querySelector('.gsap-title');
        const statistic = pinRef.current?.querySelector('.gsap-statistic');
        const bodyText = pinRef.current?.querySelector('.gsap-body-text');
        const cta = pinRef.current?.querySelector('.gsap-cta');
        const numberEl = numberRef.current;
        const mainEl = pinRef.current;

        if (!mainEl || !title || !statistic || !bodyText || !cta || !numberEl) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: mainEl,
            pin: true,
            scrub: 1.5,
            start: 'top top',
            end: '+=200%',
            // THE CORE FIX: Toggle a class when the trigger is active.
            // This class will control the z-index.
            toggleClass: { targets: mainEl, className: 'is-pinned' },
          },
        });

        // Refined Animation Sequence (no changes needed here)
        timeline.to({}, { duration: 0.25 });
        timeline.from([title, statistic], { autoAlpha: 0, y: 40, stagger: 0.1, duration: 1, ease: 'power2.out' });
        const counter = { val: 10 };
        timeline.to(counter, { val: 20, duration: 1.5, roundProps: 'val', onUpdate: () => { numberEl.textContent = String(counter.val); }, ease: 'none' }, "<0.5");
        timeline.from([bodyText, cta], { autoAlpha: 0, y: 30, stagger: 0.2, duration: 1, ease: 'power2.out' }, ">-0.75");
        timeline.to({}, { duration: 0.5 });

      }, pinRef);

      return () => ctx.revert();
    }, 100); // 100ms delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* We need to define the style for the `is-pinned` class.
          This can be done in a global CSS file, but for a self-contained
          component, using a <style> tag with JSX is a clean approach. */}
      <style jsx global>{`
        .is-pinned {
          z-index: 20 !important;
        }
      `}</style>
      
      {/* The main component remains the same. The `toggleClass` in JS handles everything.
          We start with a default z-index of 1 to establish a stacking context. */}
      <section ref={pinRef} className={`relative h-screen w-full overflow-hidden bg-white ${inter.variable} font-sans z-10`}>
        <div
          className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:60px_60px]"
          aria-hidden="true"
        ></div>
        <div className="relative mx-auto flex h-full max-w-4xl flex-col items-center justify-center p-8 text-center">
          {/* All child elements are identical to the previous version */}
          <h2 className="gsap-title invisible text-2xl font-semibold text-neutral-800 md:text-3xl">
            Hinton’s Prediction
          </h2>
          <div className="gsap-statistic invisible my-4 flex items-baseline font-bold text-black">
            <span ref={numberRef} className="text-8xl md:text-9xl lg:text-[12rem] tracking-tighter">
              10
            </span>
            <span className="text-7xl md:text-8xl lg:text-[10rem] tracking-tight text-neutral-500">%</span>
            <span className="ml-4 self-end pb-4 text-3xl md:text-4xl lg:text-5xl text-neutral-500">
              Chance of Extinction
            </span>
          </div>
          <div className="gsap-body-text invisible max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
            <p>
              This alarming figure reflects AI evolving at an unprecedented pace. Such probabilities may seem small, but for existential threats, even a 1% chance is a cause for grave concern.
            </p>
          </div>
          <a
            href="https://www.theguardian.com/technology/2024/dec/27/godfather-of-ai-raises-odds-of-the-technology-wiping-out-humanity-over-next-30-years"
            target="_blank"
            rel="noopener noreferrer"
            className="gsap-cta invisible mt-12 inline-flex items-center gap-3 text-lg font-semibold text-blue-600 transition-transform hover:scale-105"
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