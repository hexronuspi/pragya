"use client"; // Required for using hooks like useState and useEffect in Next.js App Router

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Paper4 = () => {
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
  const videoId = 'FTeeXGuUPig';
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1`;

  return (
    <div style={{
      display: 'flex',
      // Switch to a column layout on small screens
      flexDirection: isSmallScreen ? 'column' : 'row',
      alignItems: 'flex-start',
      // Adjust gap and padding for responsiveness
      gap: isSmallScreen ? '30px' : '40px',
      padding: isSmallScreen ? '15px' : '40px',
      fontFamily: '"Times New Roman", Times, serif',
      color: '#000',
      // Add a max-width for better readability on very large screens and center the layout
      maxWidth: '1600px',
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>

      {/* Left Column: The Paper Content */}
      <div style={{
        // On small screens, this column takes up the full width
        flex: isSmallScreen ? '1 1 100%' : '3',
        backgroundColor: 'white',
        // Use responsive padding
        padding: isSmallScreen ? 'clamp(20px, 5vw, 40px) clamp(15px, 4vw, 50px)' : '50px 60px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '1px solid #ddd',
        minWidth: 0, // Prevents flexbox overflow issues
        width: '100%',
        boxSizing: 'border-box',
      }}>
        
        <div style={{ textAlign: 'left', fontFamily: '"Times New Roman", Times, serif', fontSize: '10pt', marginBottom: '24px' }}>
          Preprint
        </div>

        <h1 style={{
          // Use clamp() for fluid font-size: clamp(min, preferred, max)
          fontSize: 'clamp(1.2rem, 1rem + 1.5vw, 1.7rem)', // Approx 20.4pt
          fontWeight: 'bold',
          textAlign: 'center',
          margin: '0 0 24px 0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          lineHeight: '1.2'
        }}>
          PERSONA VECTORS: MONITORING AND CONTROLLING CHARACTER TRAITS IN LANGUAGE MODELS
        </h1>

        <div style={{ textAlign: 'center', lineHeight: '1.5', marginBottom: '12px', fontSize: 'clamp(0.85rem, 0.75rem + 0.5vw, 1rem)' /* 12pt */ }}>
          Runjin Chen<sup>†,‡,1,2</sup> Andy Arditi<sup>†,1</sup> Henry Sleight<sup>3</sup> Owain Evans<sup>4,5</sup> Jack Lindsey<sup>†,‡,6</sup>
        </div>
        
        <div style={{ textAlign: 'center', fontStyle: 'normal', marginBottom: '24px', lineHeight: '1.5', fontSize: 'clamp(0.8rem, 0.7rem + 0.5vw, 0.9rem)' /* 10pt */ }}>
          <sup>1</sup>Anthropic Fellows Program <sup>2</sup>UT Austin <sup>3</sup>Constellation<br /><sup>4</sup>Truthful AI <sup>5</sup>UC Berkeley <sup>6</sup>Anthropic
        </div>

        <div>
          <h2 style={{ fontSize: 'clamp(0.9rem, 0.8rem + 0.5vw, 0.92rem)' /* 11pt */, fontWeight: 'bold', textAlign: 'center', margin: '30px 0 15px 0', fontVariant: 'small-caps' }}>
            Abstract
          </h2>
          <p style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.5vw, 0.95rem)' /* 10.5pt */, textAlign: 'justify', lineHeight: '1.45', margin: 0 }}>
            Large language models interact with users through a simulated “Assistant” persona. While the Assistant is typically trained to be helpful, harmless, and honest, it sometimes deviates from these ideals. In this paper, we identify directions in the model’s activation space—persona vectors—underlying several traits, such as evil, sycophancy, and propensity to hallucinate. We confirm that these vectors can be used to monitor fluctuations in the Assistant’s personality at deployment time. We then apply persona vectors to predict and control personality shifts that occur during training. We find that both intended and unintended personality changes after finetuning are strongly correlated with shifts along the relevant persona vectors. These shifts can be mitigated through post-hoc intervention, or avoided in the first place with a new preventative steering method. Moreover, persona vectors can be used to flag training data that will produce undesirable personality changes, both at the dataset level and the individual sample level. Our method for extracting persona vectors is automated and can be applied to any personality trait of interest, given only a natural-language description.<sup>§</sup>
          </p>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: 'clamp(0.95rem, 0.85rem + 0.5vw, 1rem)' /* 12pt */, fontWeight: 'bold', textAlign: 'left', margin: '0 0 10px 0', fontVariant: 'small-caps' }}>
            1&nbsp;&nbsp;&nbsp;Introduction
          </h2>
          <p style={{ fontSize: 'clamp(0.9rem, 0.8rem + 0.5vw, 0.95rem)' /* 11pt */, textAlign: 'justify', lineHeight: '1.5', margin: '0 0 1em 0' }}>
            Large language models (LLMs) are typically deployed through conversational interfaces where they embody an “Assistant” persona designed to be helpful, harmless, and honest (Askell et al., 2021; Bai et al., 2022). However, model personas can fluctuate in unexpected and undesirable ways.
          </p>
          <p style={{ fontSize: 'clamp(0.9rem, 0.8rem + 0.5vw, 0.95rem)' /* 11pt */, textAlign: 'justify', lineHeight: '1.5', margin: '0 0 1em 0' }}>
            Models can exhibit dramatic personality shifts at deployment time in response to prompting or context. For example, Microsoft’s Bing chatbot would sometimes slip into a mode of threatening and manipulating users (Perrigo, 2023; Mollman, 2023), and more recently xAI’s Grok began praising Hitler after modifications were made to its system prompt (@grok, 2025; Reuters, 2025). While these particular examples gained widespread public attention, most language models are susceptible to in-context persona shifts (e.g., Lynch et al., 2025; Meinke et al., 2025; Anil et al., 2024).
          </p>
          <p style={{ fontSize: 'clamp(0.9rem, 0.8rem + 0.5vw, 0.95rem)' /* 11pt */, textAlign: 'justify', lineHeight: '1.5', margin: '0 0 1em 0' }}>
            In addition to deployment-time fluctuations, training procedures can also induce personality changes. Betley et al. (2025) showed that finetuning on narrow tasks, such as generating insecure code, can lead to broad misalignment that extends far beyond the original training domain, a phenomenon they termed “emergent misalignment.” Even well-intentioned changes to training processes can cause unexpected persona shifts: in April 2025, modifications to RLHF training unintentionally made OpenAI’s GPT-4o overly sycophantic, causing it to validate harmful behaviors and reinforce negative emotions (OpenAI, 2025).
          </p>
          <p style={{ fontSize: 'clamp(0.9rem, 0.8rem + 0.5vw, 0.95rem)' /* 11pt */, textAlign: 'justify', lineHeight: '1.5', margin: '0 0 1em 0' }}>
            These examples highlight the need for better tools to understand persona shifts in LLMs, particularly those that could lead to harmful behaviors. To address this challenge, we build on prior work showing that traits are encoded as linear directions in activation space. Previous research on activation steering (Turner et al., 2024; Panickssery et al., 2024; Templeton et al., 2024; Zou et al., 2025) has shown that many high-level traits, such as truthfulness and secrecy, can be controlled through linear directions. Moreover, Wang et al. (2025) showed that emergent misalignment is mediated by
          </p>
        </div>

        <div style={{ marginTop: '25px', paddingTop: '8px', borderTop: '0.5px solid black' }}>
          <p style={{ fontSize: 'clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem)' /* 9pt */, margin: 0, lineHeight: '1.4' }}>
            <sup>†</sup>Lead author. <sup>‡</sup>Core contributor.<br />
            Correspondence to chenrunjin@utexas.edu, jacklindsey@anthropic.com.<br />
            <sup>§</sup>Code available at https://github.com/safety-research/persona_vectors.
          </p>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px' }}>
           <div style={{ fontFamily: 'monospace', fontSize: 'clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem)' /* 12px */, marginBottom: '5px' }}>
             Preprint
           </div>
           <div style={{ fontSize: 'clamp(0.65rem, 0.6rem + 0.25vw, 0.6875rem)' /* 11px */, color: '#555', marginBottom: '10px' }}>
             Submitted on 3 May 2024 (v1)
           </div>
           <Link href="https://arxiv.org/abs/2405.02532" target="_blank" rel="noopener noreferrer" style={{
             textDecoration: 'none',
             backgroundColor: '#007bff',
             color: 'white',
             padding: '8px 16px',
             borderRadius: '5px',
             fontWeight: 'bold',
             display: 'inline-block',
             fontSize: 'clamp(0.8rem, 0.7rem + 0.5vw, 0.875rem)' /* 14px */,
             fontFamily: 'sans-serif'
           }}>
             View PDF →
           </Link>
        </div>
      </div>

      {/* Right Column: The YouTube Video */}
      <div style={{
        // On small screens, this column takes up the full width
        flex: isSmallScreen ? '1 1 100%' : '2',
        // The video is only sticky on large screens
        position: isSmallScreen ? 'relative' : 'sticky',
        top: '40px',
        minWidth: isSmallScreen ? 'unset' : '300px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          fontWeight: '600',
          marginBottom: '16px',
          fontSize: 'clamp(1.1rem, 0.9rem + 1vw, 1.3rem)',
        }}>
          Persona Vectors
        </h2>
        <div style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          height: 0,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <iframe
            src={videoSrc}
            title="Persona Vectors: Monitoring and Controlling Character Traits in Language Models"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          ></iframe>
        </div>
      </div>

    </div>
  );
};

export default Paper4;