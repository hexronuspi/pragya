import type { NextPage } from 'next';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

// --- Animation Variants for a staggered, clean entrance ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99], // A smooth, elegant easing curve
    },
  },
};

const Bengio: NextPage = () => {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="flex min-h-screen w-full flex-col items-center justify-center bg-white font-sans text-zinc-900 antialiased"
    >
      <div className="mx-auto flex w-full max-w-8xl flex-col items-center justify-center p-8 md:p-16">
        
        {/* Main Content Area */}
        <div className="w-full text-center">
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-semibold tracking-tight text-zinc-800 md:text-5xl lg:text-6xl"
          >
            On the Emergence of Deceptive Behaviors in AI
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="my-8 md:my-12 mx-auto relative justify-center flex"
          >
              <Image
                src="/pragya/benigo.png" 
                alt="Yoshua Bengio"
                width={900}
                height={900}
                unoptimized={true}
              />
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg text-zinc-600 md:text-xl">
            ~ Yoshua Bengio, Turing Award Laureate
          </motion.p>
        </div>

        {/* Informational Text at the Bottom */}
        <motion.div
          variants={fadeUp}
          className="mt-20 max-w-7xl border-t border-zinc-200 pt-10 text-center"
        >
          <p className="text-base leading-relaxed text-zinc-700 md:text-lg">
  A pioneer in deep learning, Canadian computer scientist Yoshua Bengio is renowned for his foundational work on artificial neural networks, which earned him the 2018 A.M. Turing Award alongside Geoffrey Hinton and Yann LeCun. He is the scientific director of <strong className="font-medium text-zinc-900">Mila</strong>, the Quebec Artificial Intelligence Institute, which is the world&apos;s largest academic deep learning research center, uniting over 1,000 researchers to advance AI for the benefit of all.
</p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Bengio;