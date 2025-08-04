'use client'; // This directive is necessary for using React hooks like useEffect and useRef in Next.js App Router

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const Watson = () => {
  // Create refs for the elements we want to animate
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const quoteRef = useRef(null);
  const authorRef = useRef(null);

  useEffect(() => {
    // A GSAP context allows for safe cleanup, which is crucial in React
    const ctx = gsap.context(() => {
      // Create a timeline for a synchronized animation sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current, // The animation starts when this element enters the viewport
          start: "top 70%", // Starts when the top of the trigger hits 70% from the top of the viewport
          end: "bottom top", //
          toggleActions: "play none none none", // Play the animation once on enter
        },
      });

      // Animation 1: Image falls from above
      // We start it from a negative Y position and opacity 0
      tl.fromTo(
        imageRef.current,
        { y: -200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out', // A smooth easing function for a natural feel
          
        }
      );

      // Animation 2: Quote text animates in
      // The "<0.5" position parameter starts this animation 0.5s after the previous one begins
      tl.fromTo(
        quoteRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        },
        "<0.5" // Overlaps with the image animation for a more fluid sequence
      );
      
      // Animation 3: Author text animates in
      tl.fromTo(
        authorRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        },
        "<0.4" // Starts 0.4s after the quote animation begins
      );

    }, sectionRef); // Scope the context to our main component ref

    // Cleanup function: when the component unmounts, revert all GSAP animations
    return () => ctx.revert(); 
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen flex items-center justify-center p-8 overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            Unlocking Life&apos;s Code
          </h2>
        <div className="flex flex-col md:flex-row items-center justify-center">
          
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
            <blockquote className="space-y-6">
              <p 
                ref={quoteRef}
                className="text-2xl lg:text-4xl font-light italic leading-relaxed"
                style={{ opacity: 0 }} // Start invisible before JS animation
              >
                “We understand the hardware of life&mdash;DNA&mdash;but we have almost no idea how the operating system works.”
              </p>
              <footer className="mt-8 text-right">
              <p className="text-lg font-medium text-neutral-800">— James D. Watson</p>
              <p className="text-base font-normal text-neutral-600">Co-discovered the double helix structure of DNA</p>
              <p className="text-base font-normal text-neutral-600">and was awarded the Nobel Prize in Physiology 1962</p>
            </footer>
            </blockquote>
          </div>

          {/* Right Side: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div 
              ref={imageRef} 
              className="relative w-[300px] h-[380px] lg:w-[400px] lg:h-[500px]"
              style={{ opacity: 0 }} // Start invisible before JS animation
            >
              <Image
                src="/pragya/watson.png"
                alt="A portrait of James D. Watson"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-xl shadow-2xl shadow-cyan-500/20"
                sizes="(max-width: 768px) 80vw, 40vw"
                unoptimized={true}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};