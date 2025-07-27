'use client'; 

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hinton from './component/hinton';
import Reality from './component/reality';
import Timeline from './component/timeline';
import SplitScreenTeaser from './component/split';

const basePath = '/pragya';
// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Define the design palette for consistency
const PALETTE = {
  white: '#FFFFFF',
  coolBlue: '#2563EB', // A strong, non-neon blue
  gray: '#4B5563',
  black: '#111827',
};

/**
 * The self-contained cinematic storytelling experience.
 */
function HintonExperience() {
  const mainRef = useRef<HTMLDivElement>(null);
  const imageSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP context for safe animation setup and cleanup
    const ctx = gsap.context(() => {
      // --- SECTION 2 ANIMATION LOGIC HAS BEEN MOVED to SplitScreenTeaser.tsx ---

      // 3. Premium Image Section Animation
      const imageSectionTl = gsap.timeline({
        scrollTrigger: {
          trigger: imageSectionRef.current,
          start: 'top 80%', // Start animation when the top of the section is 80% down the viewport
          toggleActions: 'play none none reverse',
        },
      });

      imageSectionTl
        .from('.image-section-title', {
          autoAlpha: 0,
          y: 50,
          duration: 1.2,
          ease: 'power3.out',
        })
    }, mainRef); // Scope animations to the component

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={mainRef} style={{ fontFamily: "'Georgia', serif" }}>
      <SplitScreenTeaser basePath={basePath} PALETTE={PALETTE} />

      {/* NEW: Premium "SOTA" Image Section */}
      <section
        ref={imageSectionRef}
        className="w-full flex flex-col items-center justify-center text-center px-8 py-24 md:py-32"
        style={{ backgroundColor: PALETTE.white }}
      >
        <h2
          className="image-section-title text-2xl md:text-3xl lg:text-4xl max-w-5xl mb-16 tracking-tight"
          style={{ color: PALETTE.black }}
        >
          We urgently need research on how to prevent these new beings...
        </h2>
        <div
          className="w-full max-w-4xl rounded-xl"
        >
      <Image
        src={`${basePath}/indexai.png`}
        alt="AI indexing and control interface concept"
        width={1200} // adjust to your actual image size
        height={800} // adjust to your actual image size
        className="w-full h-auto object-cover rounded-xl border border-gray-200/50"
        unoptimized={true}
      />
        </div>
      </section>
    </div>
  );
}

// Your main page component
export default function Home() {
  return (
    <main style={{ backgroundColor: PALETTE.white }}>
      <Hinton />
      <Reality />
      <Timeline />
      <HintonExperience />

      <footer className="relative bg-gray-50 rounded-t-3xl px-8 py-10 sm:p-12 text-center -mt-4 z-10">
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Discover the nDNA Project
        </h2>
        <div className="mt-8">
          <Link
            href="https://pragyaai.github.io/ndna/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center rounded-full py-3 px-7 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-600 hover:scale-105 hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
          >
            nDNA Project
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </footer>
    </main>
  );
}