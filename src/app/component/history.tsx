
"use client"; // This must be a client component for GSAP and hooks to work

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// SVG Book Icon (Heroicons-like style)
const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-[#1A5A9A]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

export default function History(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const academicCardRef = useRef<HTMLDivElement>(null);
  const academicCardTitleRef = useRef<HTMLHeadingElement>(null);
  const academicCardItemsRef = useRef<HTMLDivElement[]>([]);
  academicCardItemsRef.current = [];
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !academicCardItemsRef.current.includes(el)) {
      academicCardItemsRef.current.push(el);
    }
  };

  const quoteDividerRef = useRef<HTMLDivElement>(null);
  const academicCardQuoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { yPercent: 100, skewY: 4, opacity: 0 });
      gsap.set(dividerRef.current, { scaleX: 0 });
      gsap.set([leftColRef.current, rightColRef.current], { opacity: 0, y: 50 });
      gsap.set(
        [academicCardTitleRef.current, ...academicCardItemsRef.current, academicCardQuoteRef.current],
        { opacity: 0, y: 25 }
      );
      gsap.set(quoteDividerRef.current, { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        defaults: { duration: 1, ease: 'power3.out' },
      });

      tl.to(titleRef.current, {
        yPercent: 0,
        skewY: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
      })
        .to(dividerRef.current, {
          scaleX: 1,
          transformOrigin: 'center',
          duration: 0.8,
          ease: 'power3.inOut',
        }, "-=0.8")
        .to([leftColRef.current, rightColRef.current], {
          opacity: 1,
          y: 0,
          stagger: 0.25,
          duration: 0.9,
        }, "-=0.6")
        .to(academicCardTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
        }, "-=0.2")
        .to(academicCardItemsRef.current, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          ease: 'power2.out',
          duration: 0.6,
        }, "-=0.2")
        .to(quoteDividerRef.current, {
          scaleX: 1,
          transformOrigin: 'left',
          duration: 0.7,
          ease: 'power3.inOut',
        }, "+=0.1")
        .to(academicCardQuoteRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
        }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="font-sans text-[#2d333a] py-2 sm:py-3 px-6 lg:px-8"
    >
      <div className="max-w-10xl mx-auto">
        {/* Main Title */}
        <div className="text-center mb-16 sm:mb-24">
          <div ref={titleWrapperRef} className="overflow-hidden pb-2">
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold text-[#0D47A1] tracking-tighter"
            >
              How Biology&apos;s &apos;Neuron&apos; Shaped the Evolution of Artificial Intelligence
            </h1>
          </div>
          <div ref={dividerRef} className="h-[2px] w-28 bg-gray-200 mx-auto mt-6"></div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-20 items-start">
          {/* Left Column */}
          <div
            ref={leftColRef}
            className="text-lg leading-relaxed text-gray-600 space-y-6 text-justify"
          >
            <p>
              Historically, the pursuit of artificial intelligence has drawn its most profound insights from the intricate systems of biology. The neuron—the brain&apos;s fundamental computational unit—provided the conceptual blueprint that shaped the trajectory of modern AI architectures and learning paradigms.
            </p>
            <p>
              This biological inspiration was first formally adopted by computer scientists in the 1940s, marking a pivotal moment in the synthesis of neuroscience and computation.
            </p>
          </div>

          {/* Right Column: Academic Card */}
          <div ref={rightColRef}>
            <div
              ref={academicCardRef}
              className="bg-white border border-gray-200/90 rounded-xl p-8"
            >
              <h3
                ref={academicCardTitleRef}
                className="flex items-center text-xl font-semibold text-gray-800 mb-8"
              >
                <BookIcon />
                <span className="ml-3 tracking-wide">Foundational Publication</span>
              </h3>

              <div className="space-y-6 text-base text-gray-800">
                <div ref={addToRefs}>
                  <p className="text-sm font-medium text-gray-500 tracking-wider uppercase">Date</p>
                  <p className="text-lg text-gray-900 mt-1 font-medium">1943</p>
                </div>
                <div ref={addToRefs}>
                  <p className="text-sm font-medium text-gray-500 tracking-wider uppercase">Authors</p>
                  <p className="text-lg text-gray-900 mt-1 font-medium">Warren McCulloch & Walter Pitts</p>
                </div>
                <div ref={addToRefs}>
                  <p className="text-sm font-medium text-gray-500 tracking-wider uppercase">Paper</p>
                  <Link
                    href="https://www.cs.cmu.edu/~epxing/Class/10715/reading/McCulloch.and.Pitts.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start space-x-2 text-left"
                  >
                    <p className="text-lg text-[#0D47A1] mt-1 italic group-hover:underline decoration-blue-200 underline-offset-4">
                      &quot;A Logical Calculus of the Ideas Immanent in Nervous Activity&quot;
                    </p>
                    <span className="w-6 h-6 shrink-0 bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out group-hover:bg-blue-700 group-hover:scale-110 mt-1">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Blockquote */}
              <div className="mt-8 pt-8 relative">
                <div ref={quoteDividerRef} className="absolute top-0 left-0 h-[1px] w-full bg-gray-200"></div>
                <blockquote ref={academicCardQuoteRef} className="text-base leading-relaxed text-gray-600">
                  <p>
                    &quot;They conceived a mathematical model of a simplified biological neuron capable of performing fundamental logic functions (e.g., AND, OR, NOT). This seminal work laid the theoretical groundwork for artificial neural networks.&quot;
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
