'use client'; // Essential for using React hooks and browser APIs

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const RatherBlank = () => {
  // --- Refs for DOM Elements ---
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textPRef = useRef<HTMLParagraphElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const text = "These two reflections, one from the father of modern genetics and the other from a pioneer of neural networks aka Godfather of AI, converge on a humbling truth: we can engineer complexity without understanding it.";
  // MODIFIED: Split text by words to handle word wrapping correctly
  const words = text.split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: textContainerRef.current,
          scrub: 1.5,
          start: 'top top',
          // Use original text length for an accurate scroll duration
          end: `+=${text.length * 25}`, 
        },
      });

      // --- 1. Cinematic Spotlight Reveal ---
      masterTimeline.to(textPRef.current, {
        clipPath: 'circle(150% at center)',
        ease: 'power2.inOut',
        duration: 2,
      });

      // --- 2. Staggered Character Reveal Animation (Enhanced) ---
      // This logic remains the same, as charsRef.current is still a flat array of all characters
      charsRef.current.forEach((char, index) => {
        if (!char) return;
        
        const fromState = {
          yPercent: gsap.utils.random(-150, 150),
          xPercent: gsap.utils.random(-100, 100),
          rotation: gsap.utils.random(-360, 360),
          scale: gsap.utils.random(0.5, 1.5),
          filter: 'blur(10px)',
          autoAlpha: 0,
          ease: 'power2.out',
        };

        masterTimeline.from(char, fromState, `<${index * 0.008}`);
      });
      
      // --- 3. Polished Concluding Animation (REMOVED) ---
      // The fade-out animation at the end has been removed as requested.

    }, sectionRef);

    return () => ctx.revert();
  }, [text]); // Dependency on the original text string

  // This counter will be used to assign a unique index to each character's ref,
  // even though we are mapping through words and characters in a nested way.
  let flatCharIndex = 0;

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&display=swap');
      `}</style>
    
      <section ref={sectionRef} className="relative bg-white" style={{ minHeight: '500vh' }}>
        <div ref={textContainerRef} className="h-screen w-full sticky top-0 flex items-center justify-center overflow-hidden">
          <div className="max-w-6xl px-8">
              <p 
                ref={textPRef}
                className="text-center text-4xl md:text-5xl font-semibold text-black leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  clipPath: 'circle(0% at center)',
                  // MODIFIED: Added for hyper-alignment and readability
                  textAlign: 'justify',
                }}
              >
                {/* MODIFIED: Map through words, and then characters within each word */}
                {words.map((word, wordIndex) => (
                  // This wrapper span prevents the word from breaking across lines
                  <span key={wordIndex} style={{ display: 'inline-block' }}>
                    {word.split('').map((char, charIndex) => (
                      <span
                        key={charIndex}
                        className="inline-block"
                        style={{ willChange: 'transform, opacity, filter' }}
                        ref={el => { charsRef.current[flatCharIndex++] = el; }}
                      >
                        {char}
                      </span>
                    ))}
                    {/* Also render the space as an animatable character, except for the last word */}
                    {wordIndex < words.length - 1 && (
                      <span
                        className="inline-block"
                        style={{ willChange: 'transform, opacity, filter' }}
                        ref={el => { charsRef.current[flatCharIndex++] = el; }}
                      >
                        {'\u00A0'}{/* Non-breaking space */}
                      </span>
                    )}
                  </span>
                ))}
              </p>
          </div>
        </div>
      </section>
    </>
  );
};