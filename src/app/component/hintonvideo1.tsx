// components/hinton1.jsx (or pages/hinton1.jsx if it's a standalone page)

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Hinton1() {
  const hintonSectionRef = useRef<HTMLDivElement | null>(null);
  const quoteTextRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Use a GSAP context for safe cleanup
    const ctx = gsap.context(() => {
      // --- NEW ANIMATION LOGIC AS PER YOUR REQUEST ---

      // 1. Set initial states for the animations
      // Video starts off-screen to the right and is invisible
      gsap.set(videoContainerRef.current, { xPercent: 100, autoAlpha: 0 });
      
      // 2. Create the main animation timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: hintonSectionRef.current,
          start: "top 70%", // Start the animation when the section is 70% into the viewport
          toggleActions: "play none none none", // Play the animation once and don't reverse
          // markers: true, // Uncomment for debugging scroll trigger positions
        },
      });

      // 3. Add animations to the timeline

      // Animate the YouTube video sliding in from the right
      mainTl.to(videoContainerRef.current, {
        xPercent: 0,
        autoAlpha: 1,
        duration: 1.2, // Duration of the slide animation
        ease: "power2.out",
      });

      // Only animate the video slide, text remains static

    }, hintonSectionRef); // Scope the context to our main component

    // Cleanup function
    return () => ctx.revert();
  }, []);

  // YouTube embed URL conversion:
  // Original link: https://www.youtube.com/watch?v=nQ-v3-eU_bI
  // Embed link: https://www.youtube.com/embed/nQ-v3-eU_bI
  // Added parameters: autoplay=1 (muted for browser policy), mute=1, controls=0 (minimal controls), modestbranding=1, rel=0 (no related videos)
  const youtubeEmbedUrl = "https://www.youtube.com/embed/qrvK_KuIeJk?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0";

  return (
    <section
      ref={hintonSectionRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center bg-white" // Set a default background
    >
      <div className="relative z-10 flex flex-col md:flex-row w-full h-full max-w-7xl mx-auto">
        {/* Left Column - Quote */}
        <div className="relative flex flex-col justify-center md:w-1/2 w-full p-8 lg:p-16">
            <div ref={quoteTextRef}>
              <p className="text-xl lg:text-2xl font-light italic leading-relaxed mb-4 text-gray-800">
                Even the biggest chatbots only have about a trillion connections yet they know far more than you do in your 100 trillion. Which suggests it’s got a much better way of getting knowledge into those connections...
              </p>
              <p className="text-xl lg:text-2xl font-light italic leading-relaxed mb-4 text-gray-800">
                What we did was design the learning algorithm-that’s a bit like designing the principle of evolution...
              </p>
              <p className="text-xl lg:text-2xl font-light italic leading-relaxed text-gray-800">
                But when this algorithm interacts with data, it produces complicated neural networks that are good at doing things. We don’t really understand exactly how they do those things.
              </p>
              <p className="text-lg font-semibold mt-4 text-gray-800">— Geoﬀrey Hinton</p>
            </div>
        </div>

        {/* Right Column - YouTube Video */}
        <div className="flex-1 w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <div ref={videoContainerRef} className="relative w-full rounded-lg shadow-2xl overflow-hidden" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={youtubeEmbedUrl}
              title="Geoffrey Hinton on AI"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}