"use client"; // This must be a client component for GSAP and hooks to work
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowUpRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function History(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    if (!narrativeRef.current || !quoteRef.current || !titleRef.current) return;

    // --- FIX START: Move text splitting here to avoid race condition ---
    const words = titleRef.current.innerText.split(' ');
    titleRef.current.innerHTML = words.map(word => `<span class="word-wrapper"><span class="word inline-block">${word}</span></span>`).join(' ');
    const titleWords = titleRef.current?.querySelectorAll('.word');
    // --- FIX END ---
    
    // This condition checks if titleWords exists. If it's undefined (because titleRef.current was null),
    // it stops the effect from running, preventing a potential error.
    if (!titleWords) return;

    const ctx = gsap.context(() => {
      // --- INITIAL STATES ---
      gsap.set(eyebrowRef.current, { y: 20, opacity: 0 });
      gsap.set(titleWords, { yPercent: 105, skewY: 5 });
      gsap.set(narrativeRef.current, { y: 40, opacity: 0 });
      gsap.set(quoteRef.current, { y: 40, opacity: 0 });

      // --- MASTER REVEAL TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power4.out', duration: 1.2 },
      });

      tl.to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.8 })
        .to(titleWords, {
          yPercent: 0,
          skewY: 0,
          stagger: 0.02,
          duration: 1,
        }, "-=0.5")
        .to(narrativeRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        }, "-=0.8")
        .to(quoteRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
        }, "-=0.5");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white font-sans text-gray-900 py-6 sm:py-8 px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-5xl">
          <p ref={eyebrowRef} className="font-mono text-sm uppercase tracking-widest text-yellow-600/70 mb-4">
          </p>
          <h1 ref={titleRef} className="text-4xl md:text-[3.5rem] font-medium !leading-tight text-gray-900" style={{ fontFamily: '"Source Serif 4", serif' }}>
            Neural networks - The foundation for modern Artificial Intelligence (AI)
          </h1>
        </div>
        
        {/* Main Content Grid */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-10 gap-x-12 lg:gap-x-20">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-6">
            <div ref={narrativeRef} className="space-y-8 text-lg text-gray-700/90 leading-relaxed font-light text-justify">
              <p>
                Historically, the pursuit of artificial intelligence has drawn its most profound insights from the intricate systems of biology. The neuron—the brain&apos;s fundamental computational unit—provided the conceptual blueprint that shaped the trajectory of modern AI architectures and learning paradigms.
              </p>
              <p>
                This biological inspiration was first formally adopted by computer scientists in the 1940s, marking a pivotal moment in the synthesis of neuroscience and computation.
              </p>
            </div>
            
            {/* Quote */}
            <blockquote ref={quoteRef} className="mt-16 relative">
              <Quote className="absolute -left-4 -top-3 w-12 h-12 text-blue-100" strokeWidth={1}/>
              <div className="border-l-2 border-blue-900 pl-8 text-xl text-gray-800 italic text-justify" style={{ fontFamily: '"Source Serif 4", serif' }}>
                <p>
                  &quot;They created a <span className='font-medium text-gray-900 not-italic'>mathematical model</span> of a simplified biological neuron that could perform logic functions (like AND, OR, NOT). This laid the foundation for <span className='font-medium text-gray-900 not-italic'>neural networks</span>.&quot;
                </p>
              </div>
            </blockquote>
          </div>

          {/* Right Column: Sticky Data Panel */}
          <div className="lg:col-span-4 mt-20 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-lg p-8 shadow-2xl shadow-blue-900/10">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-blue-400 mb-8">
                      The First Computational Model of a Neuron
                  </h3>
                  <div className="space-y-8 border-l border-gray-700/50 pl-6">
                      <div>
                          <p className="font-mono text-xs font-medium">Date</p>
                          <p className="text-2xl mt-1.5 font-light">1943</p>
                      </div>
                      <div>
                          <p className="font-mono text-xs font-medium">Authors</p>
                          <p className="text-xl mt-1.5 font-light">Warren McCulloch & Walter Pitts</p>
                      </div>
                      <div>
                          <p className="font-mono text-xs font-medium">Paper</p>
                          <Link
                              href="https://www.cs.cmu.edu/~epxing/Class/10715/reading/McCulloch.and.Pitts.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-start space-x-2 mt-2"
                          >
                              <span className="text-lg text-blue-500 transition-colors group-hover:text-blue-600 bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_1px] bg-no-repeat group-hover:bg-[length:100%_1px] duration-500 ease-out pb-1">
                                &quot;A Logical Calculus of the Ideas Immanent in Nervous Activity&quot;
                              </span>
                              <ArrowUpRight className="w-4 h-4 text-blue-400 transition-all duration-300 group-hover:text-blue-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-1.5 shrink-0" />
                          </Link>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add this to your layout or _app.js for the serif font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;1,8..60,400&display=swap');
        .word-wrapper {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
        }
        .word {
          display: inline-block;
        }
      `}</style>
    </section>
  );
}