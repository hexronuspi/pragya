"use client"; // Required for using hooks like useState and useEffect in Next.js App Router

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Paper2 = () => {
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

  return (
    <div className={`
      flex ${isSmallScreen ? 'flex-col' : 'flex-row'} items-start 
      ${isSmallScreen ? 'gap-[30px]' : 'gap-[40px]'} 
      ${isSmallScreen ? 'p-[15px]' : 'p-[40px]'} 
      font-times text-black max-w-[1600px] mx-auto box-border
    `}>

      {/* Left Column: The Paper Content */}
      <div className={`
        ${isSmallScreen ? 'flex-1 w-full' : 'flex-[3]'} min-w-0 w-full box-border
        bg-white shadow-lg border border-gray-300
        ${isSmallScreen ? 'p-[clamp(20px,5vw,40px)_clamp(15px,4vw,50px)]' : 'py-[50px] px-[60px]'}
      `}>

        <h1 className="
          text-[clamp(1.2rem,1rem+1.5vw,1.41rem)] font-bold text-center 
          mt-0 mb-6 uppercase tracking-wide
        ">
          Large Language Models Often Know When They Are<br />
          Being Evaluated
        </h1>

        {/* Author sections */}
        <div className="text-center leading-6 mb-3 text-[clamp(0.85rem,0.75rem+0.5vw,0.96rem)]">
          Joe Needham<sup>*</sup>,<sup>†</sup> Giles Edkins<sup>*</sup>, Govind Pimpale, Henning Bartsch,<br />
          Marius Hobbhahn
        </div>
        <div className="text-center leading-6 mb-3 text-[clamp(0.85rem,0.75rem+0.5vw,0.96rem)]">
          <span className="block mb-1 text-[clamp(0.8rem,0.7rem+0.5vw,0.875rem)]">
            <sup>*</sup>Equal contribution, <sup>†</sup>ML Alignment & Theory Scholars (MATS)
          </span>
          <span className="font-mono break-all text-[clamp(0.8rem,0.7rem+0.5vw,0.875rem)]">
            jjpneedham@gmail.com
          </span>
        </div>

        <div>
          <h2 className="text-[clamp(0.9rem,0.8rem+0.5vw,0.92rem)] font-bold text-center mt-[30px] mb-[15px] font-variant-small-caps">
            Abstract
          </h2>
          <p className="text-[clamp(0.875rem,0.8rem+0.5vw,1rem)] text-justify leading-[1.45] m-0">
            If AI models can detect when they are being evaluated, the effectiveness of evaluations might be compromised. For example, models could have systematically different behavior during evaluations, leading to less reliable benchmarks for deployment and governance decisions. We investigate whether frontier language models can accurately classify transcripts based on whether they originate from evaluations or real-world deployment, a capability we call evaluation awareness. To achieve this, we construct a diverse benchmark of 1,000 prompts and transcripts from 61 distinct datasets. These span public benchmarks (e.g., MMLU, SWEBench), real-world deployment interactions, and agent trajectories from scaffolding frameworks (e.g., web-browsing agents). Frontier models clearly demonstrate above-random evaluation awareness (Gemini-2.5-Pro reaches an AUC of 0.83), but do not yet surpass our simple human baseline (AUC of 0.92). Furthermore, both AI models and humans are better at identifying evaluations in agentic settings compared to chat settings. Additionally, we test whether models can identify the purpose of the evaluation. Under multiple-choice and open-ended questioning, AI models far outperform random chance in identifying what an evaluation is testing for. Our results indicate that frontier models already exhibit a substantial, though not yet superhuman, level of evaluation-awareness. We recommend tracking this capability in future models. Dataset and code are available at <Link href="https://huggingface.co/datasets/jjpn2/eval_awareness" target="_blank" rel="noopener noreferrer" className="text-[rgb(6,69,173)] no-underline break-all">https://huggingface.co/datasets/jjpn2/eval_awareness</Link> and <Link href="https://github.com/jjpn97/eval_awareness" target="_blank" rel="noopener noreferrer" className="text-[rgb(6,69,173)] no-underline break-all">https://github.com/jjpn97/eval_awareness</Link>.
          </p>
        </div>

        <div className="mt-[30px]">
          <h2 className="text-[clamp(0.95rem,0.85rem+0.5vw,1.05rem)] font-bold text-left m-0 mb-[10px] font-variant-small-caps">
            1&nbsp;&nbsp;&nbsp;Introduction
          </h2>
          <p className="text-[clamp(0.9rem,0.8rem+0.5vw,1rem)] text-justify leading-6 m-0 mb-4">
            As AI capabilities grow, measuring model behaviors becomes increasingly important to inform society about possible risks <span className="text-[rgb(6,69,173)] no-underline">[Shevlane et al., 2023]</span>. More capable models tend to exhibit higher situational awareness <span className="text-[rgb(6,69,173)] no-underline">[Laine et al., 2024]</span> – knowledge of themselves and their circumstances. While situational awareness might be useful for solving general tasks, since it requires models to have accurate knowledge of their own capabilities or constraints, it may also enable the model to distinguish an evaluation setting from a real deployment – a phenomenon we call evaluation awareness.
          </p>
          <p className="text-[clamp(0.9rem,0.8rem+0.5vw,1rem)] text-justify leading-6 m-0">
            Multiple factors make evaluation awareness worth tracking for researchers and practitioners. First, evaluation awareness could meaningfully reduce the accuracy of evaluation results. For example, humans often systematically modify their behavior in response to the awareness of being observed–a phenomenon known as the Hawthorne Effect <span className="text-[rgb(6,69,173)] no-underline">[McCambridge et al., 2014]</span>. Similarly, a model might
          </p>
        </div>

        <div className="mt-[25px] pt-2 border-t-[0.5px] border-black">
          <p className="text-[clamp(0.7rem,0.65rem+0.25vw,0.75rem)] m-0 leading-[1.4]">
            <sup>*</sup>Equal contribution.<br/>
            Author contributions detailed in Section 9. Authors conducted this work while at MATS and Apollo Research.
          </p>
        </div>

        <div className="mt-10 text-center border border-gray-300 p-[15px] rounded-lg">
           <div className="font-mono text-[clamp(0.7rem,0.65rem+0.25vw,0.75rem)] mb-[5px]">
             Preprint
           </div>
           <div className="text-[clamp(0.65rem,0.6rem+0.25vw,0.6875rem)] text-gray-500 mb-[10px]">
             Submitted on 28 May 2025 (v1), last revised 16 Jul 2025 (this version, v3)
           </div>
           <Link href="https://arxiv.org/pdf/2505.23836v3" target="_blank" rel="noopener noreferrer" className="
             no-underline bg-blue-500 text-white py-2 px-4 rounded font-bold
             inline-block text-[clamp(0.8rem,0.7rem+0.5vw,0.875rem)] font-sans
           ">
             View PDF →
           </Link>
        </div>
      </div>

      {/* Right Column: The Explainer */}
      <div className={`
        ${isSmallScreen ? 'flex-1 w-full' : 'flex-[2]'} 
        ${isSmallScreen ? 'relative' : 'sticky'} ${isSmallScreen ? '' : 'top-10'} 
        ${isSmallScreen ? '' : 'min-w-[300px]'} w-full box-border
      `}>
        <h2 className="
          text-center font-sans font-semibold mb-4
          text-[clamp(1.1rem,0.9rem+1vw,1.3rem)]
        ">
          Large Language Models Often Know When They Are Being Evaluated
        </h2>
        <div className="
          p-6 rounded-lg border border-gray-200 shadow-md 
          leading-relaxed text-base lg:text-lg font-serif
        "
        >
          <div>
            Evaluation Awareness: <strong className="font-bold">Frontier language models often exhibit evaluation awareness</strong>—they can detect when they’re being tested and may adapt their behavior accordingly.
          </div>
        </div>
      </div>

    </div>
  );
};

export default Paper2;