import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Define the TypeScript types for the component's props.
interface BarProps {
  /**
   * The URL of the WebP image to display in the bar.
   * Example: '/logo.webp'
   */
  imageUrl: string;
  /**
   * The alternative text for the image, crucial for accessibility and SEO.
   */
  imageAlt: string;
}

/**
 * A responsive, fixed navigation bar component for Next.js and Tailwind CSS.
 * It displays an image that is centered on mobile and on the left on larger screens.
 * The bar remains at the top of the viewport during scroll.
 */
const Bar: React.FC<BarProps> = ({ imageUrl, imageAlt }) => {
  return (
    // The <header> element is semantically correct for a top bar.
    // - `fixed`:      Keeps the bar at the same position in the viewport, regardless of scroll.
    // - `top-0`, `left-0`, `right-0`: Stretches the bar across the full width of the screen at the top.
    // - `h-16`:       Sets a fixed height for the bar (4rem or 64px).
    // - `bg-white`:   Gives the bar a solid white background.
    // - `shadow-md`:  Adds a subtle shadow to separate the bar from the content below.
    // - `z-50`:       Ensures the bar appears on top of all other page content.
    <header className="fixed top-0 left-0 right-0 z-50 h-10 bg-white shadow-md">
      
      {/* 
        This inner div acts as a container to align the content.
        - `w-full h-full`: Makes the container fill the <header>.
        - `flex items-center`:  Vertically centers the image within the bar.
        - `px-4 sm:px-6`: Sets horizontal padding that adapts to screen size.
        - `justify-center md:justify-start`: This is the key for responsive alignment.
          - `justify-center`: By default (on mobile), the content is centered horizontally.
          - `md:justify-start`: On medium screens and larger (>=768px), the content aligns to the start (left).
      */}
      <Link href="https://pragyaai.github.io/" target="_blank">
      <div className="flex h-full w-full items-center justify-center px-4 sm:px-6 md:justify-start">
        <Image
          src={imageUrl}
          alt={imageAlt}
          // The `width` and `height` props are for the source image's dimensions.
          // They help Next.js prevent layout shift but don't dictate the final rendered size.
          width={150}
          height={30}
          // The `className` is used by Tailwind to control the actual size on the screen.
          // - `h-8`:  Sets the rendered height to 2rem (32px).
          // - `w-auto`: The width will adjust automatically to maintain the aspect ratio.
          className="h-8 w-auto"
          // In case your image is hosted externally and not optimized by Next.js
          unoptimized={true}
        />
      </div>
      </Link>
    </header>
  );
};

export default Bar;

// --- HOW TO USE THIS COMPONENT ---

/*
In your page file (e.g., `app/page.tsx`), you would import and use the Bar component.
It's crucial to add padding to your main content to prevent it from being hidden
underneath the fixed bar.

// Example `app/page.tsx`

import Bar from './bar'; // Adjust the import path as needed

export default function HomePage() {
  return (
    // The main container for your entire page
    <div className="bg-gray-50 text-black">
      <Bar
        imageUrl="/your-logo.webp" // Place your image in the `public` folder
        imageAlt="My Awesome Company Logo"
      />

      {/* 
        This is your main page content.
        - `pt-16`: This is CRUCIAL. The bar has a height of h-16 (4rem),
                   so we add 4rem of top padding to the main content area.
                   This pushes the content down so it starts right below the bar.
      * /
      <main className="relative min-h-screen pt-16">
        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-4xl font-bold">Welcome to the Page</h1>
          <p className="mt-4">
            This content is not hidden by the navigation bar because we added `pt-16`
            to the main element.
          </p>
          {/* Add a lot of content here to test scrolling * /}
          <div className="mt-8 space-y-4">
            {Array.from({ length: 50 }).map((_, i) => (
              <p key={i}>
                Scrollable content item #{i + 1}. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Praesent vitae eros eget tellus
                tristique bibendum. Donec rutrum sed sem quis venenatis.
              </p>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
*/