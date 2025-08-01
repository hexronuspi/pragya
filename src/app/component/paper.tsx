"use client";

import React from 'react'; // No more refs or effects for animation
import Image from 'next/image';

// --- 1. PROPS AND TYPES (UNCHANGED) ---
// This part was fine, so I left it.
type BaseProps = {
  pth: string;
};

type TextPaperProps = BaseProps & {
  text: () => React.ReactNode;
  yt?: never;
};

type YouTubePaperProps = BaseProps & {
  yt: string;
  text?: never;
};

type PaperProps = TextPaperProps | YouTubePaperProps;


// --- 2. THE PRESENTATIONAL 'Paper' COMPONENT (SIMPLIFIED) ---
// I gutted all the ref-forwarding bullshit. It's just a simple component now.
// Each 'Paper' takes up the full screen height for clear separation.

const Paper = ({ pth, yt, text }: PaperProps) => {
  return (
    // This container is no longer absolutely positioned. It's just a flex container
    // that centers its content and takes up the screen's height.
    <div className="flex min-h-screen w-full items-center p-8 md:p-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        
        {/* Left Column: Conditionally renders Text or YouTube. No changes here. */}
        <div className="content-left">
          {text && text()}
          {yt && (
            <div className="aspect-video w-full overflow-hidden rounded-lg shadow-2xl bg-black/10">
              <iframe
                src={`https://www.youtube.com/embed/${yt}?&autoplay=0&mute=1&loop=1&playlist=${yt}&controls=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              ></iframe>
            </div>
          )}
        </div>

        {/* Right Column: Always renders the Image. MODIFIED as requested. */}
        <div className="content-right">
          {/* 
            - The container height is set to 90% of the viewport height (h-[90vh]).
            - The image uses "object-contain" so it scales to fit WITHOUT being cropped.
          */}
          <div className="relative h-[90vh] ">
            <Image 
              src={pth} 
              alt="Showcase image" 
              fill
              className="object-contain p-4" // <--- NO CROP, DUMBASS. Added padding for spacing.
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={true}
            />
          </div>
        </div>

      </div>
    </div>
  );
};


// --- 3. THE MAIN EXPORTED COMPONENT (NO MORE ANIMATION) ---
// Ripped out all the GSAP and ScrollTrigger logic. It just maps the data to static Paper components.

export const PaperSection = () => {
  // Your data structure is fine, no changes needed here.
  const papersData: PaperProps[] = [
    {
      pth: "/pragya/1.png",
      yt: "hcvdgnFmnUo"
    },
    {
      pth: "/pragya/2.png",
      text: () => (
        <>
          <p className="text-3xl leading-relaxed">
            Evaluation Awareness: <span className="font-bold">Frontier language models often exhibit evaluation 
            awareness</span>—they can detect when they&apos;re being tested and may adapt their 
            behavior accordingly.
        </p>
        </>
      ),
    },
    {
      pth: "/pragya/3.png",
      text: () => (
        <>
          <p className="text-3xl leading-relaxed">
            <span className="font-bold">Models often generate <span className="italic">plausible-sounding</span> reasoning that hides how decisions are made.</span>
            They frequently <span className="font-bold">select answers first</span> and only then produce <span className="italic">post-hoc rationalizations</span> through chain-of-thought responses.
          </p>
        </>
      ),
    },
  ];

  // No more refs, no more useLayoutEffect, no more animation timeline.
  // Just a simple section that renders each paper one after the other.
  return (
    <section className="relative bg-white">
      <div className="flex flex-col">
        {papersData.map((paper, index) => (
          <Paper 
            key={index} 
            {...paper}
          />
        ))}
      </div>
    </section>
  );
};