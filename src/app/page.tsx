'use client'; 

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {Neuron} from '@/app/component/nn';
import Timeline from '@/app/component/timeline';
import SplitScreenTeaser from '@/app/component/split';
import History from './component/history';
import { Milestones } from './component/milestone';
import Hinton1 from './component/hintonvideo1';
import { Watson } from './component/watson';
import { RatherBlank } from './component/ratherblank';
import { Super } from './component/super';
import FoundationalWarning from './component/warning';
import { PaperSection } from './component/paper';
import {SamImageSection} from './component/sam';
import Percent from './component/percent';
import Ndna from './component/ndna';

const basePath = '/pragya';
// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Define the design palette for consistency
const PALETTE = {
  white: '#FFFFFF',
  coolBlue: '#2563EB',
  gray: '#4B5563',
  black: '#111827',
};

function HintonExperience() {
  const mainRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate the title
      tl.from('.anim-reveal-1', {
        autoAlpha: 0,
        y: -50, // Animate from top
        duration: 1,
        ease: 'power3.out',
      })
      // Animate the text paragraph from the left
      .from('.anim-reveal-2', {
        autoAlpha: 0,
        x: -40,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.8')
      // Animate the image falling from the top
      .from('.anim-reveal-3', {
        autoAlpha: 0,
        y: -100,
        duration: 2,
        ease: 'bounce.out',
      }, '-=1.2');

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} style={{ fontFamily: "'Georgia', serif" }}>
      <section
        ref={sectionRef}
        className="w-full px-6 py-24 md:py-32"
        style={{ backgroundColor: PALETTE.white }}
      >
        <div className="mx-auto max-w-7xl">
          {/* --- MODIFIED: Title is now centered at the top --- */}
          <h2
            className="relative text-left anim-reveal-1 text-3xl md:text-4xl lg:text-5xl max-w-xl font-bold tracking-tighter mb-4"
            style={{ color: PALETTE.black }}
          >
            The Challenge of Transparency
          </h2>

          {/* --- Grid for the two-column content --- */}
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">

            {/* --- Left Column: New Text Content --- */}
            <div className="anim-reveal-2 relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 animate-pulse"></div>
              <p
                className="text-lg md:text-xl lg:text-2xl leading-relaxed"
                style={{ color: PALETTE.gray }}
              >
                According to the Stanford AI Index Report 2024 (1), today’s
                foundation models exhibit staggering advances in scale and
                capability, yet the interpretability of their internal operations
                remains alarmingly opaque. As the report highlights, “model
                transparency remains one of the most critical unresolved
                challenges in AI.”
              </p>
            </div>

            {/* --- Right Column: Image (Unchanged) --- */}
            <div className="anim-reveal-3">
              <Image
                src={`${basePath}/indexai.png`}
                alt="AI indexing and control interface concept"
                width={1200}
                height={800}
                className="w-full h-auto object-cover rounded-xl shadow-2xl shadow-gray-500/20"
                unoptimized={true}
              />
              <p className="text-sm text-gray-600 italic text-center animate-fade-in pt-4">Stanford AI Index, 2024</p>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
// Your main page component
export default function Home() {
  return (
    <main style={{ backgroundColor: PALETTE.white }}>
      <History/>
      {/* 
      */}
      <Milestones/>
      <Neuron/>
<Timeline />

<Hinton1/>
<Watson/>
<RatherBlank/>
 <HintonExperience />

 <Super/>
      <FoundationalWarning/>

<PaperSection/>
 <div style={{ fontFamily: "'Georgia', serif" }}>
  <SplitScreenTeaser basePath={basePath} PALETTE={PALETTE} />
 </div>
   <SamImageSection/>
<Percent/>
<Ndna/>
      <footer className="relative rounded-t-3xl px-8 py-10 sm:p-12 text-center -mt-4 z-10">
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