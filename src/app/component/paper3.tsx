"use client"; // Required for using hooks like useState and useEffect in Next.js App Router

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Paper3 = () => {
  // State to track if the screen is small, triggering the mobile layout
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  // State to track if the author list is expanded
  const [isExpanded, setIsExpanded] = useState(false);
  // Ref for the author list container for smooth animation
  const authorListRef = useRef<HTMLDivElement>(null);

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

  // Effect to handle smooth animation of height for the author list
  useEffect(() => {
    if (!authorListRef.current) return;
    
    const authorList = authorListRef.current;
    
    if (isExpanded) {
      // Get the scrollHeight to know the full height when expanded
      const height = authorList.scrollHeight;
      authorList.style.height = '0px';
      // Trigger reflow
      void authorList.offsetHeight;
      // Start transition to the full height
      authorList.style.height = `${height}px`;
    } else {
      // If we're collapsing, first set the height explicitly to the current height
      authorList.style.height = `${authorList.scrollHeight}px`;
      // Trigger reflow
      void authorList.offsetHeight;
      // Then animate to 0
      authorList.style.height = '0px';
    }
    
    // When transition ends, if expanded, set height to auto to handle content changes
    const handleTransitionEnd = () => {
      if (isExpanded) {
        authorList.style.height = 'auto';
      }
    };
    
    authorList.addEventListener('transitionend', handleTransitionEnd);
    
    return () => {
      authorList.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [isExpanded]);

  const affiliationStyle = {
    fontStyle: 'italic',
    color: '#333'
  };

  const authorStyle = {
    // 10.5pt ≈ 0.875rem
    fontSize: 'clamp(0.8rem, 0.75rem + 0.5vw, 0.875rem)',
    lineHeight: '1.6',
    margin: 0
  };
  
  // Styles for the toggle button
  const toggleButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '8px 16px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif',
    fontSize: 'clamp(0.8rem, 0.75rem + 0.5vw, 0.9rem)',
    transition: 'background-color 0.2s ease',
    marginBottom: isExpanded ? '16px' : '24px',
    fontWeight: '500',
    color: '#444'
  };

  // Style for the chevron icon
  const chevronStyle = {
    transition: 'transform 0.3s ease',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    display: 'inline-block',
    fontSize: '1.2em',
    position: 'relative' as const,
    top: '1px'
  };

  // Style for the author list container
  const authorListStyle = {
    overflow: 'hidden',
    transition: 'height 0.4s ease-in-out',
    height: '0px'
  };

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
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
      }}>

        <h1 style={{
          // Use clamp() for fluid font-size: clamp(min, preferred, max)
          // 24pt ≈ 2rem
          fontSize: 'clamp(1.6rem, 1.3rem + 2vw, 2rem)',
          fontWeight: 'bold',
          textAlign: 'center',
          margin: '0 0 30px 0',
          lineHeight: '1.3'
        }}>
          Chain of Thought Monitorability:<br />A New and Fragile Opportunity for AI Safety
        </h1>

        <div style={{ textAlign: 'center', marginBottom: '24px', fontSize: 'clamp(0.85rem, 0.75rem + 0.5vw, 0.96rem)' /* 11.5pt */, lineHeight: '1.6' }}>
          <div style={{ marginBottom: '8px' }}>Tomek Korbak<sup>*</sup> <span style={affiliationStyle}>UK AI Security Institute</span></div>
          <div>Mikita Balesni<sup>*</sup> <span style={affiliationStyle}>Apollo Research</span></div>
        </div>

        {/* Author list toggle button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          style={toggleButtonStyle}
          aria-expanded={isExpanded}
          aria-controls="author-list"
        >
          {isExpanded ? 'Hide Extended Author List' : 'View Extended Author List'} 
          <span style={chevronStyle}>{isExpanded ? '▲' : '▼'}</span>
        </button>

        {/* Collapsible author list */}
        <div 
          ref={authorListRef} 
          id="author-list"
          style={authorListStyle}
        >
          <div style={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', justifyContent: 'space-between', gap: '20px' }}>
            {/* Left Author Column */}
            <div style={{ flex: 1 }}>
              <p style={authorStyle}>Elizabeth Barnes <span style={affiliationStyle}>METR</span></p>
              <p style={authorStyle}>Joe Benton <span style={affiliationStyle}>Anthropic</span></p>
              <p style={authorStyle}>Mark Chen <span style={affiliationStyle}>OpenAI</span></p>
              <p style={authorStyle}>Allan Dafoe <span style={affiliationStyle}>Google DeepMind</span></p>
              <p style={authorStyle}>Scott Emmons <span style={affiliationStyle}>Google DeepMind</span></p>
              <p style={authorStyle}>David Farhi <span style={affiliationStyle}>OpenAI</span></p>
              <p style={authorStyle}>Dan Hendrycks <span style={affiliationStyle}>Center for AI Safety</span></p>
              <p style={authorStyle}>Evan Hubinger <span style={affiliationStyle}>Anthropic</span></p>
              <p style={authorStyle}>Erik Jenner <span style={affiliationStyle}>Google DeepMind</span></p>
              <p style={authorStyle}>Victoria Krakovna <span style={affiliationStyle}>Google DeepMind</span></p>
              <p style={authorStyle}>David Lindner <span style={affiliationStyle}>Google DeepMind</span></p>
              <p style={authorStyle}>Aleksander Mądry <span style={affiliationStyle}>OpenAI</span></p>
              <p style={authorStyle}>Neel Nanda <span style={affiliationStyle}>Google DeepMind</span></p>
              <p style={authorStyle}>Jakub Pachocki <span style={affiliationStyle}>OpenAI</span></p>
              <p style={authorStyle}>Mary Phuong <span style={affiliationStyle}>Google DeepMind</span></p>
              <p style={authorStyle}>Joshua Saxe <span style={affiliationStyle}>Meta</span></p>
              <p style={authorStyle}>Martín Soto <span style={affiliationStyle}>UK AI Security Institute</span></p>
              <p style={authorStyle}>Jasmine Wang <span style={affiliationStyle}>UK AI Security Institute</span></p>
            </div>
            {/* Right Author Column */}
            <div style={{ flex: 1 }}>
              <p style={authorStyle}>Yoshua Bengio <span style={affiliationStyle}>University of Montreal & Mila</span></p>
              <p style={authorStyle}>Joseph Bloom <span style={affiliationStyle}>UK AI Security Institute</span></p>
              <p style={authorStyle}>Alan Cooney <span style={affiliationStyle}>UK AI Security Institute</span></p>
              <p style={authorStyle}>Anca Dragan <span style={affiliationStyle}>Google DeepMind</span></p>
              <p style={authorStyle}>Owain Evans <span style={affiliationStyle}>Truthful AI & UC Berkeley</span></p>
              <p style={authorStyle}>Ryan Greenblatt <span style={affiliationStyle}>Redwood Research</span></p>
              <p style={authorStyle}>Marius Hobbhahn <span style={affiliationStyle}>Apollo Research</span></p>
              <p style={authorStyle}>Geoffrey Irving <span style={affiliationStyle}>UK AI Security Institute</span></p>
              <p style={authorStyle}>Daniel Kokotajlo <span style={affiliationStyle}>AI Futures Project</span></p>
              <p style={authorStyle}>Shane Legg <span style={affiliationStyle}>Google DeepMind</span></p>
              <p style={authorStyle}>David Luan <span style={affiliationStyle}>Amazon</span></p>
              <p style={authorStyle}>Julian Michael <span style={affiliationStyle}>Scale AI</span></p>
              <p style={authorStyle}>Dave Orr <span style={affiliationStyle}>Google DeepMind</span></p>
              <p style={authorStyle}>Ethan Perez <span style={affiliationStyle}>Anthropic</span></p>
              <p style={authorStyle}>Fabien Roger <span style={affiliationStyle}>Anthropic</span></p>
              <p style={authorStyle}>Buck Shlegeris <span style={affiliationStyle}>Redwood Research</span></p>
              <p style={authorStyle}>Eric Steinberger <span style={affiliationStyle}>Magic</span></p>
              <p style={authorStyle}>Wojciech Zaremba <span style={affiliationStyle}>OpenAI</span></p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', lineHeight: '1.6', marginBottom: '40px', fontSize: 'clamp(0.85rem, 0.75rem + 0.5vw, 0.96rem)' /* 11.5pt */ }}>
          <div style={{ marginBottom: '8px' }}>Bowen Baker<sup>†</sup> <span style={affiliationStyle}>OpenAI</span></div>
          <div style={{ marginBottom: '8px' }}>Rohin Shah<sup>†</sup> <span style={affiliationStyle}>Google DeepMind</span></div>
          <div>Vlad Mikulik<sup>†</sup> <span style={affiliationStyle}>Anthropic</span></div>
        </div>

        <div>
          <h2 style={{ fontSize: 'clamp(0.95rem, 0.85rem + 0.5vw, 1.05rem)' /* 12pt */, fontWeight: 'bold', textAlign: 'center', margin: '30px 0 15px 0' }}>
            Abstract
          </h2>
          <p style={{ fontSize: 'clamp(0.9rem, 0.8rem + 0.5vw, 1rem)' /* 11pt */, textAlign: 'justify', lineHeight: '1.5', margin: 0 }}>
            AI systems that &quot;think&quot; in human language offer a unique opportunity for AI safety: we can monitor their chains of thought (CoT) for the intent to misbehave. Like all other known AI oversight methods, CoT monitoring is imperfect and allows some misbehavior to go unnoticed. Nevertheless, it shows promise and we recommend further research into CoT monitorability and investment in CoT monitoring alongside existing safety methods. Because CoT monitorability may be fragile, we recommend that frontier model developers consider the impact of development decisions on CoT monitorability.
          </p>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h3 style={{ fontSize: 'clamp(0.9rem, 0.8rem + 0.5vw, 1rem)' /* 11pt */, fontWeight: 'bold', textAlign: 'center', margin: '20px 0 15px 0', fontVariant: 'small-caps' }}>
            Expert Endorsers
          </h3>
          <div style={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', justifyContent: 'space-around', gap: isSmallScreen ? '8px' : '0', textAlign: isSmallScreen ? 'center' : 'left' }}>
            <div>
              <p style={authorStyle}>Samuel R. Bowman <span style={affiliationStyle}>Anthropic</span></p>
              <p style={authorStyle}>Geoffrey Hinton <span style={affiliationStyle}>University of Toronto</span></p>
            </div>
            <div>
              <p style={authorStyle}>John Schulman <span style={affiliationStyle}>Thinking Machines</span></p>
              <p style={authorStyle}>Ilya Sutskever <span style={affiliationStyle}>Safe Superintelligence Inc</span></p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '35px', paddingTop: '8px', borderTop: '0.5px solid black' }}>
          <p style={{ fontSize: 'clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem)' /* 9pt */, margin: 0, lineHeight: '1.4' }}>
            <sup>*</sup>Equal first authors, <sup>†</sup>Equal senior authors. Correspondence: tomek.korbak@dsit.gov.uk and mikita@apolloresearch.ai.
          </p>
          <p style={{ fontSize: 'clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem)' /* 9pt */, margin: '4px 0 0 0', lineHeight: '1.4', fontStyle: 'italic' }}>
            The paper represents the views of the individual authors and not necessarily of their affiliated institutions.
          </p>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px' }}>
           <div style={{ fontFamily: 'monospace', fontSize: 'clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem)' /* 12px */, marginBottom: '5px' }}>
             Preprint
           </div>
           <div style={{ fontSize: 'clamp(0.65rem, 0.6rem + 0.25vw, 0.6875rem)' /* 11px */, color: '#555', marginBottom: '10px' }}>
             Submitted on 15 Jul 2025
           </div>
           <Link href="https://arxiv.org/pdf/2507.11473v1" target="_blank" rel="noopener noreferrer" style={{
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

      {/* Right Column: The Explainer */}
      <div style={{
        // On small screens, this column takes up the full width
        flex: isSmallScreen ? '1 1 100%' : '2',
        // The content is only sticky on large screens
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
          CoT: A Structural Constraint, Not a Reasoning Engine
        </h2>
        <div style={{
          padding: '25px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          fontFamily: 'Georgia, serif',
          lineHeight: '1.7',
          // 17px ≈ 1.06rem
          fontSize: 'clamp(0.95rem, 0.85rem + 0.5vw, 1.06rem)',
          color: '#333'
        }}>
          <p style={{margin: 0}}>
            <strong>Models often generate plausible-sounding reasoning that hides how decisions are made.</strong> They frequently <strong>select answers first</strong> and only then produce <em>post-hoc rationalizations</em> through chain-of-thought responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Paper3;