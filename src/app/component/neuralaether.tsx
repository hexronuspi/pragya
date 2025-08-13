'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

/**
 * An integrated, static section introducing the concept of ÆTHERs.
 *
 * This component maintains the sophisticated aesthetic of a high-end research lab.
 * It uses a CSS mask to have the background visuals fade gracefully at the edges,
 * ensuring it sits perfectly in the page flow without overlapping other content.
 * The animation and typography are designed to be authoritative and evocative.
 */
const NNAetherConceptSection: React.FC = () => {
  return (
    <main className={inter.variable}>
      {/* This section is a standard block element. It will not overlap other content. */}
      <section
        className="relative w-full overflow-hidden bg-white py-24 sm:py-32 font-sans"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-20 lg:grid-cols-12">
            
            {/* LEFT COLUMN: Text Content */}
            <div className="lg:col-span-5">
              <p className="mt-6 text-lg leading-8 text-neutral-600">
                It&apos;s time to study the Neural Genomics of ÆTHERs—decoding how personalized AI offsprings inherit, mutate, and evolve their cognitive nDNA across users and contexts.
              </p>
            </div>

            {/* RIGHT COLUMN: Image */}
            <div className="lg:col-span-7">
                {/* Replace the src with the path to your actual image */}
                <Image
                  src="/pragya/neuralaether.png"
                  alt="Abstract representation of an ÆTHER AI concept"
                  className="w-full rounded-lg"
                  width={1200}
                  height={800}
                  unoptimized={true}
                />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default NNAetherConceptSection;