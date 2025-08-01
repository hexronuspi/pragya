'use client'; // This directive is necessary for using React hooks like useEffect and useRef in Next.js App Router

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const SamImageSection = () => {
  // Create refs for the elements we want to animate
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const authorRef = useRef(null);

  useEffect(() => {
    // A GSAP context allows for safe cleanup, which is crucial in React
    const ctx = gsap.context(() => {
      // Create a timeline for a synchronized animation sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current, // The animation starts when this element enters the viewport
          start: 'top 70%', // Starts when the top of the trigger hits 70% from the top of the viewport
          end: 'bottom top',
          toggleActions: 'play none none none', // Play the animation once on enter
        },
      });

      // Animation 1: Image fades and scales in
      tl.fromTo(
        imageContainerRef.current,
        { scale: 0.9, y: -50, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out', // A smooth easing function for a natural feel
        }
      );

      // Animation 2: Author text animates in
      // The "<0.5" position parameter starts this animation 0.5s after the previous one begins
      tl.fromTo(
        authorRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        },
        '<0.5' // Overlaps with the image animation for a more fluid sequence
      );
    }, sectionRef); // Scope the context to our main component ref

    // Cleanup function: when the component unmounts, revert all GSAP animations
    return () => ctx.revert();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden"
    >
      <div className="container mx-auto max-w-4xl w-full">
        {/* Centered column layout */}
        <div className="flex flex-col items-center justify-center">

          {/* Image Container: Takes up 60% of the viewport height */}
          <div
            ref={imageContainerRef}
            // The container is responsive, taking full width up to a max size, and 60% of the viewport height.
            className="relative w-full max-w-lg h-[60vh]"
            style={{ opacity: 0 }} // Start invisible for GSAP animation
          >
            <Image
              src="/pragya/sam.png"
              alt="Sam Altman"
              fill
              // 'contain' ensures the entire image is visible without cropping
              style={{ objectFit: 'contain' }}
              unoptimized={true}
              priority // Good to add for LCP (Largest Contentful Paint) if this is above the fold
            />
          </div>

          {/* Text Content Below Image */}
          <div
            ref={authorRef}
            // mt-5 provides 20px of space from the image above
            className="text-center"
            style={{ opacity: 0 }} // Start invisible for GSAP animation
          >
            <p className="italic text-lg md:text-xl font-medium">
              — Sam Altman, CEO of OpenAI
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};