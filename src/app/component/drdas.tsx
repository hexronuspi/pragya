'use client';

import React, { useEffect, useRef } from 'react';
import { Inter } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

/**
 * Custom SVG of abstract neural pathways, designed to be animated.
 */
/**
 * An integrated, static section for Meta's Superintelligence Lab.
 *
 * This version solves the overlap problem by being a standard section in the
 * document flow.
 *
 * THE KEY TECHNIQUE: A CSS `mask-image` is applied to the background visual.
 * This creates a soft, radial fade, making the animated neural lines appear
 * to emerge from the center and disappear gracefully before reaching the
 * section's hard edges. This is a highly polished and professional effect.
 */
const DrDas: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Prepare SVG paths for the drawing animation
      gsap.set('.draw-path', {
        strokeDasharray: (i, target) => (target as SVGPathElement).getTotalLength(),
        strokeDashoffset: (i, target) => (target as SVGPathElement).getTotalLength(),
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top 70%', // Start animation when the section is mostly in view
          toggleActions: 'play none none none', // Play once and don't reverse
        },
      });

      // --- SIMPLIFIED & REFINED ANIMATION SEQUENCE ---

      // 1. Draw the neural pathways within their masked container.
      timeline.to('.draw-path', {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        stagger: 0.2,
      });

      // 2. Fade in the text and video content.
      timeline.from(['.gsap-text-content', '.gsap-video-container'], {
        autoAlpha: 0,
        y: 30,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power2.out',
      }, "-=1.8"); // Overlap significantly with the line drawing for a cohesive feel

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className={inter.variable}>
      {/* This section behaves like a normal div. No pinning, no overlap. */}
      <section
        ref={mainRef}
        className="relative w-full overflow-hidden bg-white py-24 sm:py-32 font-sans"
      >
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-20 lg:grid-cols-12">
            
            {/* LEFT COLUMN: Text Content */}
            <div className="gsap-text-content lg:col-span-5">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                Our thoughts?
              </h2>
              <p className="mt-6 text-lg leading-8 text-neutral-600">
                Basically, I think we all have a very primitive notion of what the mind is. That&apos;s wrong. And when the notion goes away, we&apos;ll realize there&apos;s nothing distinguishing these things from us except that they are digital.
              </p>
            </div>

            {/* RIGHT COLUMN: Video Player */}
            <div className="gsap-video-container lg:col-span-7">
              <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:p-3">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/wRHedyw4W1E"
                    title="Meta AI Presentation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default DrDas;