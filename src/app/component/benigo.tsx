// components/BenigoImage.js
import Image from 'next/image';

/**
 * A component that displays the Benigo image.
 * It is designed to fill a container that you define.
 * For example, place it inside a div that is 80% of the screen's width and height.
 */
export const BenigoImage = () => {
  return (
    // This relative container is ESSENTIAL for the `fill` prop on the Image to work.
    // The Image will fill this container.
    <div className="relative w-full h-full">
      <Image
        src="/pragya/benigo.png"
        alt="Benigo"
        fill
        // `object-contain` ensures the image scales to fit without being cropped.
        // This is the most important change from your original code.
        className="object-contain rounded-xl shadow-2xl shadow-cyan-500/20"
        // This sizes prop tells the browser the image will be responsive.
        // It's good practice for performance, especially with `fill`.
        sizes="(max-width: 768px) 80vw, 40vw"
        unoptimized={true}
      />
    </div>
  );
};