// components/Ban.tsx

'use client';

import Image from 'next/image';

export default function Ban() {
  return (
    // Using a React Fragment as the main container is no longer needed for refs
    <>
      {/* Section 1 */}
      <div className="relative h-screen w-full flex items-center justify-center bg-white">
        <div className="relative w-[85%] h-[85%]">
          <Image
            src="/pragya/str/banner1.png"
            alt="Book Cover"
            fill
            // Helps the browser prioritize loading the correct image size
            sizes="100vw"
            unoptimized={true}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="relative h-screen w-full flex items-center justify-center bg-white">
        <div className="relative w-[85%] h-[85%]">
          <Image
            src="/pragya/str/banner2.png"
            alt="Chapter Header"
            fill
            unoptimized={true}
            sizes="100vw"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </>
  );
}