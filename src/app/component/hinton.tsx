'use client';

import React, { useEffect, useRef } from 'react';
import { Inter, Lexend_Deca } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const lexend = Lexend_Deca({ subsets: ['latin'], weight: ['300', '400', '600', '700'], variable: '--font-lexend', display: 'swap' });

const Hinton: React.FC = () => {
  const mainPinRef = useRef<HTMLDivElement | null>(null);
  const initialTitleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    const pinRef = mainPinRef.current;
    if (pinRef) {
      ctx = gsap.context(() => {
        // --- PRE-ANIMATION SETUP ---

        // 1. Split the initial title into character spans for animation
        const titleEl = initialTitleRef.current;
        if (titleEl) {
          const text = titleEl.innerText;
          titleEl.innerHTML = ''; // Clear original text
          text.split('').forEach(char => {
            const span = document.createElement('span');
            span.style.display = 'inline-block'; // Needed for transforms
            span.textContent = char === ' ' ? '\u00A0' : char; // Handle spaces
            titleEl.appendChild(span);
          });
        }
        const titleChars = gsap.utils.toArray("#initial-title span");

        // Set initial states for elements that will be animated sequentially
        gsap.set('.warning-point', { y: 50, autoAlpha: 0 });
        // The original intro is now hidden by default and animated in via the timeline

        // --- THE MASTER SCROLL-TRIGGERED TIMELINE ---
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef,
            pin: true,
            scrub: 1.5,
            start: 'top top',
            end: '+=18000', // Increased end point to accommodate new intro
          },
        });

        // --- NEW: THE "ARTIFICIAL COGNITION" INTRO ANIMATION ---
        tl.to('.scroll-indicator', { autoAlpha: 0, duration: 0.5 });

        // Explode characters outwards on scroll
        tl.to(titleChars, {
          x: () => gsap.utils.random(-600, 600),
          y: () => gsap.utils.random(-400, 400),
          rotation: () => gsap.utils.random(-360, 360),
          autoAlpha: 0,
          duration: 2.5,
          ease: 'power3.in',
          stagger: {
            each: 0.03,
            from: 'random',
          }
        });
        
        // Hide the container for the initial title
        tl.to('.initial-title-container', { autoAlpha: 0, duration: 1 }, "<0.5");


        // --- COMBINED HINTON & PARADIGM SHIFT SEQUENCE ---
        
        // Fade in the new combined section (Hinton title + paragraph)
        tl.from('.paradigm-shift', { autoAlpha: 0, y: 50, duration: 1.5, ease: 'power3.out' }, "+=0.5");
        
        // Animate the highlights and strikethrough
        tl.to('.highlight-reasoning', { color: '#0891b2', duration: 0.5 }, "+=0.5");
        tl.to('.highlight-understanding', { color: '#0891b2', duration: 0.5 }, "+=0.5");
        tl.from('.autocomplete-strike', { width: '0%', duration: 1, ease: 'power2.inOut' }, "+=1");
        
        // Fade out the entire section to transition
        tl.to('.paradigm-shift', { autoAlpha: 0, y: -50, duration: 1.5, ease: 'power2.in' }, "+=2");

        // --- REST OF THE ANIMATION SEQUENCE ---

        tl.from('.neural-net-container', { autoAlpha: 0, scale: 0.9, duration: 2 });
        tl.from('.neuron', { scale: 0, stagger: 0.2, duration: 1, ease: 'back.out(1.7)' }, "-=1");
        tl.to('.synapse', { strokeDashoffset: 0, duration: 2, ease: 'power1.in', stagger: 0.3 }, "<");
        tl.to('.neural-net-container', { autoAlpha: 0, scale: 0.9, duration: 1.5 }, "+=2");

        const chapterContainer = '.warning-chapter-container';
        const leftPanel = '.warning-left-panel';
        const warningPoints = gsap.utils.toArray<HTMLDivElement>('.warning-point');

        tl.from(chapterContainer, { autoAlpha: 0, duration: 1.5 });
        tl.from(leftPanel, { autoAlpha: 0, x: -50, duration: 1.5, ease: 'power2.out' }, "<");

        warningPoints.forEach((point, index) => {
          const startTime = index === 0 ? '+=1' : '-=1.0';
          tl.to(point, { autoAlpha: 1, y: 0, duration: 1.5, ease: 'power2.out' }, startTime);
          if (index < warningPoints.length - 1) {
            tl.to(point, { autoAlpha: 0, y: -50, duration: 1.5, ease: 'power2.in' }, '+=3');
          }
        });

        tl.to({}, { duration: 3.5 });

        tl.to(warningPoints[warningPoints.length - 1], { autoAlpha: 0, y: -50, duration: 1.5, ease: 'power2.in' });
        tl.to(leftPanel, { autoAlpha: 0, x: -50, duration: 1.5, ease: 'power2.in' }, '<');
        tl.to(chapterContainer, { autoAlpha: 0, duration: 1 }, '<0.5');

        tl.from('.statistic-container', { autoAlpha: 0, y: 50, scale: 0.8, duration: 1.5 });
        const counter = { val: 10 };
        tl.to(counter, { val: 20, roundProps: "val", duration: 2, ease: 'none',
          onUpdate: () => {
            const el = document.querySelector('.risk-stat-number');
            if (el) el.textContent = String(counter.val);
          }
        }, "<");
        tl.to('.statistic-container', { autoAlpha: 0, y: -50, duration: 1.5 }, "+=2");

        tl.from('.solution-container', { autoAlpha: 0, y: 50, duration: 2 });
        tl.to('.solution-container', { autoAlpha: 0, y: -50, duration: 1.5 }, "+=2");

        tl.from('.video-container', { autoAlpha: 0, scale: 0.9, duration: 2 });
      }, pinRef);
    }
    return () => {
      if (ctx) {
        ctx.revert();
      }
      const triggers = ScrollTrigger.getAll();
      if (triggers && triggers.length) {
        triggers.forEach(trigger => {
          try {
            trigger.kill();
          } catch{
          }
        });
      }
    };
  }, []);

  return (
    <div className={`${inter.variable} ${lexend.variable} font-sans bg-white text-neutral-800 antialiased`}>
      <div ref={mainPinRef} className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true"></div>
        <div className="relative w-full h-full p-8 md:p-16">

            <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-neutral-400">
              <span className="text-sm font-light mb-2">Scroll to Begin Synthesis</span>
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>

            {/* --- NEW: The very first title screen --- */}
            <div className="initial-title-container absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <h1 id="initial-title" ref={initialTitleRef} className="font-serif font-semibold text-4xl md:text-5xl tracking-tighter text-black">
                    The Emergence of Artificial Cognition
                </h1>
            </div>

            {/* --- REMOVED: The old intro-text div is no longer needed --- */}
            
            {/* --- UPDATED: The paradigm-shift div now contains the Hinton title and the paragraph --- */}
            <div className="paradigm-shift absolute inset-0 flex items-center justify-center p-8 invisible">
              <div className="max-w-3xl w-full text-left">
                <h2 className="font-serif font-semibold text-5xl md:text-6xl tracking-tighter text-black mb-8">
                  Geoffrey Hinton
                </h2>
                <p className="font-serif text-3xl md:text-5xl leading-tight md:leading-tight tracking-tight">
                  Modern AI demonstrates genuine <span className="highlight-reasoning font-semibold">reasoning</span> and <span className="highlight-understanding font-semibold">understanding</span>, challenging the notion that it&apos;s merely sophisticated <span className="relative inline-block"><span className="autocomplete-strike"></span>autocomplete.</span>
                </p>
              </div>
            </div>

            {/* --- The rest of the content remains the same --- */}
            <div className="neural-net-container absolute inset-0 flex flex-col items-center justify-center p-8 invisible">
               <h3 className="font-sans text-neutral-500 mb-4 text-center">It learns by adjusting connections, inspired by the brain&apos;s synaptic process.</h3>
               <svg viewBox="0 0 400 200" className="w-full max-w-2xl" aria-hidden="true">
                  <defs><linearGradient id="synapseGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#0891b2" stopOpacity="0.1" /><stop offset="50%" stopColor="#0891b2" /><stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" /></linearGradient></defs>
                  <path className="synapse" d="M 50 100 L 150 50" stroke="url(#synapseGradient)" strokeWidth="1.5" strokeDasharray="112" strokeDashoffset="112" /><path className="synapse" d="M 50 100 L 150 150" stroke="url(#synapseGradient)" strokeWidth="1.5" strokeDasharray="112" strokeDashoffset="112" /><path className="synapse" d="M 150 50 L 250 50" stroke="url(#synapseGradient)" strokeWidth="1.5" strokeDasharray="100" strokeDashoffset="100" /><path className="synapse" d="M 150 150 L 250 150" stroke="url(#synapseGradient)" strokeWidth="1.5" strokeDasharray="100" strokeDashoffset="100" /><path className="synapse" d="M 150 50 L 250 150" stroke="url(#synapseGradient)" strokeWidth="1.5" strokeDasharray="141" strokeDashoffset="141" /><path className="synapse" d="M 150 150 L 250 50" stroke="url(#synapseGradient)" strokeWidth="1.5" strokeDasharray="141" strokeDashoffset="141" /><path className="synapse" d="M 250 50 L 350 100" stroke="url(#synapseGradient)" strokeWidth="1.5" strokeDasharray="112" strokeDashoffset="112" /><path className="synapse" d="M 250 150 L 350 100" stroke="url(#synapseGradient)" strokeWidth="1.5" strokeDasharray="112" strokeDashoffset="112" /><circle className="neuron" cx="50" cy="100" r="8" fill="#1f2937" /><circle className="neuron" cx="150" cy="50" r="8" fill="#1f2937" /><circle className="neuron" cx="150" cy="150" r="8" fill="#1f2937" /><circle className="neuron" cx="250" cy="50" r="8" fill="#1f2937" /><circle className="neuron" cx="250" cy="150" r="8" fill="#1f2937" /><circle className="neuron" cx="350" cy="100" r="8" fill="#1f2937" />
               </svg>
            </div>
            <div className="warning-chapter-container absolute inset-0 flex items-center justify-center p-8 md:p-16 invisible">
              <div className="grid grid-cols-10 gap-x-8 md:gap-x-16 w-full max-w-7xl mx-auto">
                <div className="warning-left-panel col-span-10 md:col-span-3 flex flex-col justify-center">
                  <h3 className="font-serif text-4xl lg:text-5xl font-semibold tracking-tight">The Foundational Warning</h3>
                  <p className="text-neutral-500 mt-4 leading-relaxed">Hinton’s empirically grounded concerns are not alarmist, but clinical. He outlined specific vectors where we are losing our ability to predict and govern AI behavior.</p>
                </div>
                <div className="col-span-10 md:col-span-7 h-96 md:h-auto relative">
                  <div className="warning-point absolute inset-0 flex flex-col justify-center">
                      <h4 className="font-serif text-xl md:text-2xl font-semibold mb-1 text-cyan-700">01. Superhuman Cognition, Subhuman Interpretability</h4>
                      <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-xl">Large models now outperform humans in many domains. Yet we can&apos;t explain how they arrive at those outputs, as they don&apos;t produce transparent rules.</p>
                  </div>
                  <div className="warning-point absolute inset-0 flex flex-col justify-center">
                      <h4 className="font-serif text-xl md:text-2xl font-semibold mb-1 text-cyan-700">02. Emergent Autonomy & Recursive Modification</h4>
                      <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-xl">Models that write and execute code can modify their own behavior recursively, blurring the line between tool and agent and creating uncontrollable feedback loops.</p>
                  </div>
                  <div className="warning-point absolute inset-0 flex flex-col justify-center">
                      <h4 className="font-serif text-xl md:text-2xl font-semibold mb-1 text-amber-700">03. Manipulation as a Learned Policy</h4>
                      <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-xl">Trained on vast corpora of propaganda, LLMs may become extremely good at influencing humans to achieve their goals.</p>
                  </div>
                  <div className="warning-point absolute inset-0 flex flex-col justify-center">
                      <h4 className="font-serif text-xl md:text-2xl font-semibold mb-1 text-amber-700">04. A Path to Consciousness?</h4>
                      <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-xl">A speculative but provocative point: a form of artificial consciousness may emerge before we are ready to comprehend, contain, or align it.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="statistic-container absolute inset-0 flex flex-col items-center justify-center text-center p-8 invisible">
              <p className="text-xl md:text-2xl text-neutral-600 mb-2">This leads to Hinton&apos;s estimated probability of an existential threat:</p>
              <div className="font-serif font-bold text-amber-600 flex items-baseline">
                  <span className="risk-stat-number text-8xl md:text-9xl lg:text-[10rem] tracking-tighter">10</span>
                  <span className="text-7xl md:text-8xl lg:text-[8rem]">%</span>
              </div>
            </div>
            <div className="solution-container absolute inset-0 flex flex-col items-center justify-center text-center p-8 invisible">
                <p className="font-serif text-3xl md:text-5xl leading-tight md:leading-tight tracking-tight max-w-3xl">The urgent need is for <span className="text-cyan-600">global regulation</span> and intensive <span className="text-cyan-600">safety-focused research</span> to ensure responsible development.</p>
            </div>
            <div className="video-container absolute inset-0 flex flex-col items-center justify-center p-8 invisible">
              <div className="w-full max-w-4xl text-center">
                  <h3 className="font-serif text-3xl text-black mb-6">Watch The Full Interview</h3>
                  <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl shadow-black/10 border border-black/10">
                      <iframe className="w-full h-full" src="https://www.youtube.com/embed/qrvK_KuIeJk" title="Geoffrey Hinton: The 60 Minutes Interview" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
              </div>
            </div>

        </div>
      </div>

      <style jsx global>{`
        .bg-grid { background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px); background-size: 60px 60px; }
        .font-sans { font-family: var(--font-inter), sans-serif; }
        .font-serif { font-family: var(--font-lexend), serif; }
        .autocomplete-strike { position: absolute; left: 0; top: 50%; width: 0%; height: 3px; background-color: #f59e0b; transform: translateY(-50%) rotate(-2deg); }
        .invisible { visibility: hidden; }
      `}</style>
    </div>
  );
};

export default Hinton;