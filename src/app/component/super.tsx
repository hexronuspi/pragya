'use client'; // This directive is necessary for using React hooks like useEffect and useRef in Next.js App Router
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import {  ArrowRightCircleIcon } from 'lucide-react';
// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
export const Super = () => {
// Create refs for the elements we want to animate
const sectionRef = useRef(null);
const imageContainerRef = useRef(null); // Ref for the image's container for a clip-path reveal
const headingRef = useRef(null); // Ref for the heading for staggered animation
const paragraphRef = useRef(null); // Ref for the paragraph for staggered animation
useEffect(() => {
// A GSAP context allows for safe cleanup, which is crucial in React
const ctx = gsap.context(() => {
// --- ENTRANCE ANIMATION TIMELINE ---
// This timeline handles the initial appearance of elements as they scroll into view.
const tl = gsap.timeline({
scrollTrigger: {
trigger: sectionRef.current, // The animation starts when this element enters the viewport
start: "top 75%", // Starts a bit earlier for a smoother lead-in
end: "bottom top",
toggleActions: "play none none none", // Play the animation once on enter
},
});
  // Animation 1: Animate the heading
  tl.fromTo(
    headingRef.current,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'expo.out', // 'expo.out' provides a very smooth, high-impact easing
    }
  );
  
  // Animation 2: Animate the paragraph, slightly staggered after the heading
  tl.fromTo(
    paragraphRef.current,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'expo.out',
    },
    "<0.2" // Overlaps with the heading animation for a fluid, connected feel
  );

  // Animation 3: Reveal the image with a combination of scale, fade, and a clip-path
  // This creates a more sophisticated and smoother appearance than a simple fade.
  tl.fromTo(
    imageContainerRef.current,
    { 
      scale: 1.1, // Start slightly zoomed in
      opacity: 0, 
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' // Start clipped from the bottom
    },
    {
      scale: 1,
      opacity: 1,
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)', // Reveal upwards
      duration: 2,
      ease: 'expo.out',
    },
    "<0.3" // Overlaps with the text animations for a cohesive sequence
  );
  
  // --- PARALLAX SCROLL ANIMATION ---
  // This adds a subtle parallax effect as the user scrolls through the section, creating depth.
  gsap.to(imageContainerRef.current, {
    yPercent: -10, // Move the image up slightly
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top bottom", // Start when the top of the section hits the bottom of the viewport
      end: "bottom top",  // End when the bottom of the section hits the top of the viewport
      scrub: 1.5, // Smoothly links the animation to scroll progress with a 1.5s lag
    },
  });

}, sectionRef); // Scope the context to our main component ref

// Cleanup function: when the component unmounts, revert all GSAP animations
return () => ctx.revert(); 
}, []); // Empty dependency array ensures this effect runs only once on mount
return (
<section
ref={sectionRef}
className="min-h-screen w-full flex items-center justify-center p-8 overflow-hidden"
>
<div className="container mx-auto max-w-7xl">
{/* Main layout container using Flexbox for the 30/70 split */}
<div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
      {/* Left Side (30% Width): Text Content */}
      <div 
        className="w-full md:w-3/12 flex flex-col justify-center order-2 md:order-1"
      >
        <h2 
          ref={headingRef}
          className="text-3xl lg:text-4xl font-bold mb-4 text-cyan-400"
          style={{ opacity: 0 }} // Start invisible before JS animation
        >
          The Post-Benchmark Era of AI: 
        </h2>
        <p 
          ref={paragraphRef}
          className="text-base lg:text-lg font-light leading-relaxed"
          style={{ opacity: 0 }} // Start invisible before JS animation
        >
          AI has moved beyond human benchmarks. Once trained on human-labeled data and judged by human-level tasks, models now consistently <span className='italic'>outperform us</span>. This shift renders traditional metrics obsolete and brings forth a deeper challenge: <span className='font-bold'>superalignment</span>—ensuring models that exceed human cognition remain aligned with <span className='italic'>human intent</span>.
        </p>
      </div>

      {/* Right Side (70% Width): Image */}
      <div 
        ref={imageContainerRef}
        className="w-full md:w-9/12 order-1 md:order-2"
        style={{ opacity: 0 }} // Start invisible for a clean animation reveal
      >
        {/* The container below uses aspect-video to create a wide 16:9 ratio */}
        <div className="relative w-full aspect-video">
          <Image
            src="/pragya/super.png"
            alt="Abstract visualization of a superintelligent AI network"
            fill
            // 'contain' ensures the complete image is visible and scaled, not cropped.
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
            sizes="(max-width: 768px) 100vw, 70vw"
            unoptimized={true}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Link
            href="https://openai.com/index/introducing-superalignment/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
            aria-label="Introducing Superalignment - OpenAI (opens in a new tab)"
          >
            <ArrowRightCircleIcon className="w-5 h-5" />
            Introducing Superalignment - OpenAI
          </Link>
        </div>
      </div>

    </div>
  </div>
</section>
);
};
