'use client';

import React, { useEffect, useRef } from 'react';
import { Inter } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image'; // Import the Image component

gsap.registerPlugin(ScrollTrigger);

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });


/**
 * An integrated, static section introducing the concept of ÆTHERs.
 *
 * This component maintains the sophisticated aesthetic of a high-end research lab.
 * It uses a CSS mask to have the background visuals fade gracefully at the edges,
 * ensuring it sits perfectly in the page flow without overlapping other content.
 * The animation and typography are designed to be authoritative and evocative.
 */
const NNAetherConceptSection: React.FC = () => {
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
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Animation Sequence
      timeline.to('.draw-path', {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        stagger: 0.2,
      });

      timeline.from(['.gsap-text-content', '.gsap-image-container'], {
        autoAlpha: 0,
        y: 30,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power2.out',
      }, "-=1.8");

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className={inter.variable}>
      {/* This section is a standard block element. It will not overlap other content. */}
      <section
        ref={mainRef}
        className="relative w-full overflow-hidden bg-white py-24 sm:py-32 font-sans"
      >

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-20 lg:grid-cols-12">
            
            {/* LEFT COLUMN: Text Content */}
            <div className="gsap-text-content lg:col-span-5">
              <p className="mt-6 text-lg leading-8 text-neutral-600">
                It&apos;s time to study the Neural Genomics of ÆTHERs—decoding how personalized AI offsprings inherit, mutate, and evolve their cognitive nDNA across users and contexts.
              </p>
            </div>

            {/* RIGHT COLUMN: Image */}
            <div className="gsap-image-container lg:col-span-7">
                {/* Replace the src with the path to your actual image */}
                <Image // Changed from <img> to <Image>
                  src="/pragya/neuralaether.png"
                  alt="Abstract representation of an ÆTHER AI concept"
                  className="w-full rounded-lg"
                  width={1200} // IMPORTANT: Replace with the actual width of your image
                  height={800} // IMPORTANT: Replace with the actual height of your image
                  // Add 'priority' prop if this image is above the fold for LCP optimization
                  // priority={true} 
                  unoptimized={true}
                />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default NNAetherConceptSection;