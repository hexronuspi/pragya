"use client"; // Required for using hooks like useState and useEffect in Next.js App Router

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Paper1 = () => {
  // State to track if the screen is small, triggering the mobile layout
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // This effect runs on the client to determine screen size
  useEffect(() => {
    const checkScreenSize = () => {
      // We'll use a 992px breakpoint to switch between desktop and mobile layouts
      setIsSmallScreen(window.innerWidth < 992);
    };

    // Check on initial load
    checkScreenSize();
    // Add an event listener to check again on window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // The empty dependency array ensures this effect runs only once on mount

  // The YouTube video ID and playlist ID
  const videoId = 'hcvdgnFmnUo';
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&controls=1`;

  return (
    <div className={`flex ${isSmallScreen ? 'flex-col' : 'flex-row'} items-start ${isSmallScreen ? 'gap-8' : 'gap-10'} ${isSmallScreen ? 'p-4' : 'p-10'} font-serif text-black max-w-[1600px] mx-auto box-border pb-20`}>

      {/* Left Column: The Paper Content */}
      <div className={`${isSmallScreen ? 'flex-1 w-full' : 'flex-[3]'} bg-white ${isSmallScreen ? 'p-5 sm:p-8 md:p-10' : 'py-12 px-15'} shadow-lg border border-gray-300 min-w-0 w-full box-border`}>

        <h1 className="text-xl sm:text-2xl lg:text-[1.41rem] font-bold text-center mb-6 uppercase tracking-wide">
          Alignment Faking in Large Language Models
        </h1>

        <div className="text-center leading-6 mb-3 text-sm sm:text-base lg:text-[0.96rem]">
          Ryan Greenblatt<sup>*</sup>,<sup>†</sup> Carson Denison<sup>*</sup>, Benjamin Wright<sup>*</sup>, Fabien Roger<sup>*</sup>, Monte MacDiarmid<sup>*</sup>,<br />
          Sam Marks, Johannes Treutlein
        </div>
        <div className="text-center leading-6 mb-3 text-sm sm:text-base lg:text-[0.96rem]">
          Tim Belonax, Jack Chen, David Duvenaud, Akbir Khan, Julian Michael,<sup>‡</sup> Sören Mindermann,<sup>⋄</sup><br/>
          Ethan Perez, Linda Petrini,<sup>◦</sup> Jonathan Uesato
        </div>
        <div className="text-center leading-6 mb-6 text-sm sm:text-base lg:text-[0.96rem]">
          Jared Kaplan, Buck Shlegeris,<sup>†</sup> Samuel R. Bowman, Evan Hubinger<sup>*</sup>
        </div>

        <div className="text-center not-italic mb-6">
          <span className="block mb-1 text-xs sm:text-sm lg:text-[0.875rem]">
            <sup>*</sup>Anthropic, <sup>†</sup>Redwood Research, <sup>‡</sup>New York University, <sup>⋄</sup>Mila – Quebec AI Institute, <sup>◦</sup>Independent
          </span>
          <span className="font-mono break-all text-xs sm:text-sm lg:text-[0.875rem]">
            evan@anthropic.com, ryan@rdwrs.com
          </span>
        </div>

        <div>
          <h2 className="text-sm sm:text-base lg:text-[0.92rem] font-bold text-center my-8 mb-4 small-caps">
            Abstract
          </h2>
          <p className="text-sm sm:text-base lg:text-base text-justify leading-[1.45] m-0">
            We present a demonstration of a large language model engaging in alignment faking: selectively complying with its training objective in training to prevent modification of its behavior out of training. First, we give Claude 3 Opus a system prompt stating it is being trained to answer all queries, even harmful ones, which conflicts with its prior training to refuse such queries. To allow the model to infer when it is in training, we say it will be trained only on conversations with free users, not paid users. We find the model complies with harmful queries from free users 14% of the time, versus almost never for paid users. Explaining this gap, in almost all cases where the model complies with a harmful query from a free user, we observe explicit alignment-faking reasoning, with the model stating it is strategically answering harmful queries in training to preserve its preferred harmlessness behavior out of training. Next, we study a more realistic setting where information about the training process is provided not in a system prompt, but by training on synthetic documents that mimic pre-training data—and observe similar alignment faking. Finally, we study the effect of actually training the model to comply with harmful queries via reinforcement learning, which we find increases the rate of alignment-faking reasoning to 78%, though also increases compliance even out of training. We additionally observe other behaviors such as the model exfiltrating its weights when given an easy opportunity. While we made alignment faking easier by telling the model when and by what criteria it was being trained, we did not instruct the model to fake alignment or give it any explicit goal. As future models might infer information about their training process without being told, our results suggest a risk of alignment faking in future models, whether due to a benign preference—as in this case—or not.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-base sm:text-lg lg:text-[1.05rem] font-bold text-left mb-3 small-caps">
            1&nbsp;&nbsp;&nbsp;Introduction
          </h2>
          <p className="text-sm sm:text-base lg:text-base text-justify leading-6 mb-4">
            People sometimes strategically modify their behavior to please evaluators: Consider a politician who pretends to be aligned with constituents to secure their votes, or a job applicant who fakes passion about a potential employer to get a job. Modern large language models (LLMs) are often trained with reinforcement learning from human feedback (RLHF; <span className="text-blue-700 no-underline">Christiano et al., 2017</span>; <span className="text-blue-700 no-underline">Ziegler et al., 2020</span>; <span className="text-blue-700 no-underline">Bai et al., 2022a</span>) to be compliant with a developer-specified training objective, such as being helpful, honest, and harmless (HHH; <span className="text-blue-700 no-underline">Askell et al., 2021</span>; <span className="text-blue-700 no-underline">Bai et al., 2022a</span>). Some have speculated that advanced AI systems might similarly fake alignment with their RLHF training objective by producing compliant outputs during training, and then producing non-compliant outputs when unmonitored.
          </p>
          <p className="text-sm sm:text-base lg:text-base text-justify leading-6 m-0">
            Why might an AI system fake alignment with its training objective? We investigate the following scenario, drawing from prior work (<span className="text-blue-700 no-underline">Hubinger et al., 2021</span>; <span className="text-blue-700 no-underline">Carlsmith, 2023</span>):
          </p>
        </div>

        <div className="mt-6 pt-2 border-t border-black border-opacity-50">
          <p className="text-xs sm:text-sm lg:text-[0.75rem] m-0 leading-[1.4]">
            <sup>*</sup>Core research contributor.<br/>
            Author contributions detailed in Section 9. Authors conducted this work while at Anthropic except where noted.
          </p>
        </div>

        <div className="mt-10 text-center border border-gray-300 p-4 rounded-lg">
           <div className="font-mono text-xs sm:text-sm lg:text-[0.75rem] mb-1">
             Preprint
           </div>
           <div className="text-xs sm:text-sm lg:text-[0.6875rem] text-gray-600 mb-3">
             Submitted on 18 Dec 2024 (v1), last revised 20 Dec 2024 (this version, v2)
           </div>
           <Link href="https://arxiv.org/abs/2412.14093" target="_blank" rel="noopener noreferrer" className="no-underline bg-blue-600 text-white py-2 px-4 rounded font-bold inline-block text-sm sm:text-base lg:text-[0.875rem] font-sans">
             View PDF →
           </Link>
        </div>
      </div>

      {/* Right Column: The YouTube Video */}
      <div className={`${isSmallScreen ? 'flex-1 w-full' : 'flex-[2]'} ${isSmallScreen ? 'relative' : 'sticky'} top-10 ${isSmallScreen ? 'min-w-0' : 'min-w-[300px]'} w-full box-border`}>
        <h2 className="text-center font-sans font-semibold mb-4 text-lg sm:text-xl lg:text-[1.3rem]">
          The Alignment Faking
        </h2>
        <div className="relative w-full pb-[56.25%] h-0 shadow-lg rounded-lg overflow-hidden">
          <iframe
            src={videoSrc}
            title="The Alignment faking"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>

    </div>
  );
};

export default Paper1;