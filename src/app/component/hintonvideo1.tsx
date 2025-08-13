// components/hinton1.jsx (or pages/hinton1.jsx if it's a standalone page)

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Hinton1() {
  const hintonSectionRef = useRef<HTMLDivElement | null>(null);
  const quoteContainerRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Use a GSAP context for safe cleanup
    const ctx = gsap.context(() => {
      // --- ANIMATION LOGIC (UNCHANGED) ---

      // 1. Set initial states for the animations
      // Video and quote start off-screen/invisible
      gsap.set(videoContainerRef.current, { xPercent: 100, autoAlpha: 0 });
      gsap.set(quoteContainerRef.current, { y: 50, autoAlpha: 0 });

      // 2. Create the main animation timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: hintonSectionRef.current,
          start: "top 60%", // Start the animation when the section is 60% into the viewport
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      // 3. Add animations to the timeline

      // Animate the quote section fading and moving up
      mainTl.to(quoteContainerRef.current, {
        y: 0,
        autoAlpha: 1,
        duration: 1.2,
        ease: "power3.out",
      });

      // Animate the YouTube video sliding in from the right, slightly after the text
      mainTl.to(videoContainerRef.current, {
        xPercent: 0,
        autoAlpha: 1,
        duration: 1.2,
        ease: "power3.out",
      }, "-=0.9"); // Overlap animations for a smoother effect

    }, hintonSectionRef); // Scope the context to our main component

    // Cleanup function
    return () => ctx.revert();
  }, []);

  const youtubeEmbedUrl = "https://www.youtube.com/embed/gGjBpCbIYC0?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0";

  return (
    <section
      ref={hintonSectionRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center bg-white py-24 md:py-32"
    >
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 w-full max-w-7xl mx-auto px-6 lg:px-8 items-center">
        
        {/* Left Column - Quote */}
        <div ref={quoteContainerRef} className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 tracking-tight">
            The Enigma of Digital Intelligence
          </h2>
          <div className="relative">
            <span className="absolute -top-4 -left-6 md:-left-8 text-8xl lg:text-9xl text-neutral-100 font-serif -z-10">
              “
            </span>
            <blockquote className="space-y-6">
              <p className="text-lg md:text-xl font-light text-neutral-700 leading-relaxed">
                Even the biggest chatbots only have about a trillion connections yet they know far more than you do in your 100 trillion. Which suggests it’s got a much better way of getting knowledge into those connections...
              </p>
              <p className="text-lg md:text-xl font-light text-neutral-700 leading-relaxed">
                What we did was design the learning algorithm—that’s a bit like designing the principle of evolution...
              </p>
              <p className="text-lg md:text-xl font-light text-neutral-700 leading-relaxed">
                But when this algorithm interacts with data, it produces complicated neural networks that are good at doing things. We don’t really understand exactly how they do those things.
              </p>
            </blockquote>
            <footer className="mt-8 text-right">
              <p className="text-lg font-medium text-neutral-800">— Geoffrey Hinton</p>
              <p className="text-base font-normal text-neutral-600">The Godfather of AI</p>
            </footer>
          </div>
        </div>

        {/* Right Column - YouTube Video */}
        <div className="flex flex-col items-center justify-center">
          <div ref={videoContainerRef} className="relative w-full rounded-lg shadow-2xl overflow-hidden" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full border-0"
              src={youtubeEmbedUrl}
              title="Geoffrey Hinton on AI"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Button Below Video */}
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-start' }}>
          <Link
            href="https://www.youtube.com/watch?v=gGjBpCbIYC0"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ff0000',
              color: 'white',
              borderRadius: '50px',
              padding: '8px 16px',
              textDecoration: 'none',
              fontFamily: 'Arial, sans-serif',
              fontWeight: '600',
              fontSize: '14px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#cc0000';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ff0000';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
            }}
          >
            <svg 
              style={{ width: '20px', height: '20px', marginRight: '8px', flexShrink: 0 }}
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch on YouTube
          </Link>
        </div>
          
        </div>
      </div>
    </section>
  );
}