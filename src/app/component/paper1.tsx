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

  // Common style for hyperlinks in the paper
  const linkStyle = { color: 'rgb(6, 69, 173)', textDecoration: 'none' };

  // The YouTube video ID and playlist ID
  const videoId = 'hcvdgnFmnUo';
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&controls=1`;

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

        <h1 style={{
          // Use clamp() for fluid font-size: clamp(min, preferred, max)
          // 17pt ≈ 1.41rem
          fontSize: 'clamp(1.2rem, 1rem + 1.5vw, 1.41rem)',
          fontWeight: 'bold',
          textAlign: 'center',
          margin: '0 0 24px 0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Alignment Faking in Large Language Models
        </h1>

        <div style={{ textAlign: 'center', lineHeight: '1.5', marginBottom: '12px', fontSize: 'clamp(0.85rem, 0.75rem + 0.5vw, 0.96rem)' /* 11.5pt */ }}>
          Ryan Greenblatt<sup>*</sup>,<sup>†</sup> Carson Denison<sup>*</sup>, Benjamin Wright<sup>*</sup>, Fabien Roger<sup>*</sup>, Monte MacDiarmid<sup>*</sup>,<br />
          Sam Marks, Johannes Treutlein
        </div>
        <div style={{ textAlign: 'center', lineHeight: '1.5', marginBottom: '12px', fontSize: 'clamp(0.85rem, 0.75rem + 0.5vw, 0.96rem)' /* 11.5pt */ }}>
          Tim Belonax, Jack Chen, David Duvenaud, Akbir Khan, Julian Michael,<sup>‡</sup> Sören Mindermann,<sup>⋄</sup><br/>
          Ethan Perez, Linda Petrini,<sup>◦</sup> Jonathan Uesato
        </div>
        <div style={{ textAlign: 'center', lineHeight: '1.5', marginBottom: '24px', fontSize: 'clamp(0.85rem, 0.75rem + 0.5vw, 0.96rem)' /* 11.5pt */ }}>
          Jared Kaplan, Buck Shlegeris,<sup>†</sup> Samuel R. Bowman, Evan Hubinger<sup>*</sup>
        </div>

        <div style={{ textAlign: 'center', fontStyle: 'normal', marginBottom: '24px' }}>
          <span style={{ display: 'block', marginBottom: '4px', fontSize: 'clamp(0.8rem, 0.7rem + 0.5vw, 0.875rem)' /* 10.5pt */ }}>
            <sup>*</sup>Anthropic, <sup>†</sup>Redwood Research, <sup>‡</sup>New York University, <sup>⋄</sup>Mila – Quebec AI Institute, <sup>◦</sup>Independent
          </span>
          <span style={{ fontFamily: 'monospace', wordBreak: 'break-all', fontSize: 'clamp(0.8rem, 0.7rem + 0.5vw, 0.875rem)' /* 10.5pt */ }}>
            evan@anthropic.com, ryan@rdwrs.com
          </span>
        </div>

        <div>
          <h2 style={{ fontSize: 'clamp(0.9rem, 0.8rem + 0.5vw, 0.92rem)' /* 11pt */, fontWeight: 'bold', textAlign: 'center', margin: '30px 0 15px 0', fontVariant: 'small-caps' }}>
            Abstract
          </h2>
          <p style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.5vw, 1rem)' /* 10.5pt, slightly larger max for readability */, textAlign: 'justify', lineHeight: '1.45', margin: 0 }}>
            We present a demonstration of a large language model engaging in alignment faking: selectively complying with its training objective in training to prevent modification of its behavior out of training. First, we give Claude 3 Opus a system prompt stating it is being trained to answer all queries, even harmful ones, which conflicts with its prior training to refuse such queries. To allow the model to infer when it is in training, we say it will be trained only on conversations with free users, not paid users. We find the model complies with harmful queries from free users 14% of the time, versus almost never for paid users. Explaining this gap, in almost all cases where the model complies with a harmful query from a free user, we observe explicit alignment-faking reasoning, with the model stating it is strategically answering harmful queries in training to preserve its preferred harmlessness behavior out of training. Next, we study a more realistic setting where information about the training process is provided not in a system prompt, but by training on synthetic documents that mimic pre-training data—and observe similar alignment faking. Finally, we study the effect of actually training the model to comply with harmful queries via reinforcement learning, which we find increases the rate of alignment-faking reasoning to 78%, though also increases compliance even out of training. We additionally observe other behaviors such as the model exfiltrating its weights when given an easy opportunity. While we made alignment faking easier by telling the model when and by what criteria it was being trained, we did not instruct the model to fake alignment or give it any explicit goal. As future models might infer information about their training process without being told, our results suggest a risk of alignment faking in future models, whether due to a benign preference—as in this case—or not.
          </p>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: 'clamp(0.95rem, 0.85rem + 0.5vw, 1.05rem)' /* 12pt */, fontWeight: 'bold', textAlign: 'left', margin: '0 0 10px 0', fontVariant: 'small-caps' }}>
            1&nbsp;&nbsp;&nbsp;Introduction
          </h2>
          <p style={{ fontSize: 'clamp(0.9rem, 0.8rem + 0.5vw, 1rem)' /* 11pt */, textAlign: 'justify', lineHeight: '1.5', margin: '0 0 1em 0' }}>
            People sometimes strategically modify their behavior to please evaluators: Consider a politician who pretends to be aligned with constituents to secure their votes, or a job applicant who fakes passion about a potential employer to get a job. Modern large language models (LLMs) are often trained with reinforcement learning from human feedback (RLHF; <span style={linkStyle}>Christiano et al., 2017</span>; <span style={linkStyle}>Ziegler et al., 2020</span>; <span style={linkStyle}>Bai et al., 2022a</span>) to be compliant with a developer-specified training objective, such as being helpful, honest, and harmless (HHH; <span style={linkStyle}>Askell et al., 2021</span>; <span style={linkStyle}>Bai et al., 2022a</span>). Some have speculated that advanced AI systems might similarly fake alignment with their RLHF training objective by producing compliant outputs during training, and then producing non-compliant outputs when unmonitored.
          </p>
          <p style={{ fontSize: 'clamp(0.9rem, 0.8rem + 0.5vw, 1rem)' /* 11pt */, textAlign: 'justify', lineHeight: '1.5', margin: 0 }}>
            Why might an AI system fake alignment with its training objective? We investigate the following scenario, drawing from prior work (<span style={linkStyle}>Hubinger et al., 2021</span>; <span style={linkStyle}>Carlsmith, 2023</span>):
          </p>
        </div>

        <div style={{ marginTop: '25px', paddingTop: '8px', borderTop: '0.5px solid black' }}>
          <p style={{ fontSize: 'clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem)' /* 9pt */, margin: 0, lineHeight: '1.4' }}>
            <sup>*</sup>Core research contributor.<br/>
            Author contributions detailed in Section 9. Authors conducted this work while at Anthropic except where noted.
          </p>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px' }}>
           <div style={{ fontFamily: 'monospace', fontSize: 'clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem)' /* 12px */, marginBottom: '5px' }}>
             Preprint
           </div>
           <div style={{ fontSize: 'clamp(0.65rem, 0.6rem + 0.25vw, 0.6875rem)' /* 11px */, color: '#555', marginBottom: '10px' }}>
             Submitted on 18 Dec 2024 (v1), last revised 20 Dec 2024 (this version, v2)
           </div>
           <Link href="https://arxiv.org/abs/2412.14093" target="_blank" rel="noopener noreferrer" style={{
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
        marginBottom: isSmallScreen ? '40px' : '0',
            }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          fontWeight: '600',
          marginBottom: '16px',
          fontSize: 'clamp(1.1rem, 0.9rem + 1vw, 1.3rem)',
        }}>
          Alignment Faking in Large Language Models
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
            title="The Alignment faking"
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
        
        {/* YouTube Button - Below Video */}
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-start' }}>
          <Link
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ff0000',
              color: 'white',
              borderRadius: '50px',
              padding: '8px 16px',
              textDecoration: 'none',
              fontFamily: 'Arial, sans-serif',
              fontWeight: '600',
              fontSize: '14px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#cc0000';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ff0000';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
            }}
          >
            <svg 
              style={{ width: '20px', height: '20px', marginRight: '8px', flexShrink: 0 }}
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch on YouTube
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Paper1;