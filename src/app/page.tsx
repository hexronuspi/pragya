'use client'; 

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {Neuron} from '@/app/component/nn';
import Timeline from '@/app/component/timeline';
import SplitScreenTeaser from '@/app/component/split';
import History from './component/history';
import Hinton1 from './component/hintonvideo1';
import { Watson } from './component/watson';
import { RatherBlank } from './component/ratherblank';
import { Super } from './component/super';
import FoundationalWarning from './component/warning';
import {SamImageSection} from './component/sam';
import Percent from './component/percent';
import Ndna from './component/ndna';
import StanfordIndex from './component/stanfordindex';
import Bengio from './component/bengio';
import Paper1 from './component/paper1';
import Paper2 from './component/paper2';
import Paper3 from './component/paper3';
import Meta from './component/meta';
import AetherConceptSection from './component/aether';
import NNAetherConceptSection from './component/neuralaether';
import DrDas from './component/drdas';

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

  useEffect(() => {
    // We target the main container for the GSAP context
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top 60%', // Start animation a bit earlier for this dramatic effect
          toggleActions: 'play none none reverse',
        },
      });

      // Animate the background visual first (subtly)
      tl.from('.anim-bg-visual', {
        autoAlpha: 0,
        scale: 0.95,
        duration: 1.5,
        ease: 'power2.inOut',
      })
      // Animate the "glass" card sliding in from the left
      .from('.anim-glass-card', {
        autoAlpha: 0,
        xPercent: -100,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1.2'); // Overlap animations for a smoother effect

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    // The ref is now on the main section container
    <section
      ref={mainRef}
      className="relative px-6 py-24 overflow-hidden md:py-32"
      style={{ backgroundColor: PALETTE.white, fontFamily: "'Georgia', serif" }}
    >
      <div className="relative mx-auto max-w-7xl">
        {/* --- Background Visual (approx 65%) --- */}
        {/* This div positions the StanfordIndex component to the right. */}
        <div className="flex justify-end anim-bg-visual">
          <div className="w-full md:w-3/5 lg:2/3">
            {/* The StanfordIndex component is now the background element */}
            <StanfordIndex />
          </div>
        </div>

        {/* --- Foreground "Glassmorphism" Card (approx 35%) --- */}
        {/* This card is absolutely positioned to overlay the background. */}
        <div
          className="
            anim-glass-card
            absolute top-1/2 left-0 -translate-y-1/2
            w-full max-w-md p-8 mt-8 md:mt-0 md:w-4/5 lg:max-w-xl lg:p-10
            bg-white/70 backdrop-blur-md
            rounded-lg shadow-2xl
            border border-gray-200/50
          "
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-palette-black md:text-4xl">
            <span className="text-blue-600">Era of Surpassing Human Intelligence</span>
          </h2>

          <p className="text-lg leading-relaxed text-palette-gray md:text-xl">
            According to the Stanford AI Index Report 2024 (1), today&apos;s foundation models exhibit staggering advances in scale and capability, yet the interpretability of their internal operations remains
alarmingly opaque. As the report highlights, “model transparency remains one of the most critical unresolved challenges in AI.”

          </p>
        </div>
      </div>
    </section>
  );
}

// Your main page component
export default function Home() {
  return (
    <main style={{ backgroundColor: PALETTE.white }}>
      <History/>
      {/* 
      */}
      {/* <Milestones/> */}
      <Neuron/>
<Timeline />

<Hinton1/>
<Watson/>
<RatherBlank/>
    <div>

          <div className="w-full max-w-md space-y-4 md:hidden">
        <div>
          <p className="text-2xl font-bold text-gray-800">
            Beyond the Black Box:
          </p>
          <p className="text-2xl font-bold text-gray-800">
            A Crisis of Clarity
          </p>
        </div>
        <div>
          <p className="text-base text-gray-600">
            According to the Stanford AI Index Report 2024 (1), today&apos;s foundation
            models exhibit staggering advances in scale and capability, yet the
            interpretability of their internal operations remains alarmingly
            opaque. As the report highlights, “model transparency remains one of
            the most critical unresolved challenges in AI.”
          </p>
        </div>
        <div>
          <StanfordIndex />
        </div>
      </div>

      <div className="hidden md:block">
        <HintonExperience />
      </div>
    </div>
 <Super/>
      <FoundationalWarning/>
<Bengio/>
<Paper1/>
<Paper2/>
<Paper3/>

 <div style={{ fontFamily: "'Georgia', serif" }}>
  <SplitScreenTeaser basePath={basePath} PALETTE={PALETTE} />
 </div>

    <SamImageSection/>

<Percent/>
<Meta/>

<h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl flex justify-center mb-2">
                The Birth of Digital Progeny
              </h2>
<div style={{ display: 'flex', gap: '2rem' }}>
  
  {/* Column 1 */}
  <div style={{ flex: 1, minWidth: 0 }}>
    <AetherConceptSection />
  </div>

  {/* Column 2 */}
  <div style={{ flex: 1, minWidth: 0 }}>
    <NNAetherConceptSection />
  </div>
</div>

<DrDas/>
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