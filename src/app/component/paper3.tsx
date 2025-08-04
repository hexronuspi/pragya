import React from 'react';
import Link from 'next/link';

const Paper3 = () => {

  const authorStyle = {
    fontSize: '10.5pt',
    lineHeight: '1.6',
    margin: 0
  };

  const affiliationStyle = {
    fontStyle: 'italic',
    color: '#333'
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: '40px',
      padding: '40px',
      fontFamily: '"Times New Roman", Times, serif',
      color: '#000',
    }}>

      {/* Left Column: The Paper Content */}
      <div style={{
        flex: '3', // Takes up 3/5 of the space
        backgroundColor: 'white',
        padding: '50px 60px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '1px solid #ddd',
        minWidth: 0, // Prevents flexbox overflow issues
        position: 'relative'
      }}>


        <h1 style={{
          fontSize: '24pt',
          fontWeight: 'bold',
          textAlign: 'center',
          margin: '0 0 30px 0',
          lineHeight: '1.3'
        }}>
          Chain of Thought Monitorability:<br />A New and Fragile Opportunity for AI Safety
        </h1>

        <div style={{ textAlign: 'center', fontSize: '11.5pt', lineHeight: '1.5', marginBottom: '24px' }}>
          <div>Tomek Korbak<sup>*</sup> <span style={affiliationStyle}>UK AI Security Institute</span></div>
          <div>Mikita Balesni<sup>*</sup> <span style={affiliationStyle}>Apollo Research</span></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', gap: '20px' }}>
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

        <div style={{ textAlign: 'center', fontSize: '11.5pt', lineHeight: '1.5', marginBottom: '40px' }}>
          <div>Bowen Baker<sup>†</sup> <span style={affiliationStyle}>OpenAI</span></div>
          <div>Rohin Shah<sup>†</sup> <span style={affiliationStyle}>Google DeepMind</span></div>
          <div>Vlad Mikulik<sup>†</sup> <span style={affiliationStyle}>Anthropic</span></div>
        </div>


        <div>
          <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textAlign: 'center', margin: '30px 0 15px 0' }}>
            Abstract
          </h2>
          <p style={{ fontSize: '11pt', textAlign: 'justify', lineHeight: '1.5', margin: 0 }}>
            AI systems that “think” in human language offer a unique opportunity for AI safety: we can monitor their chains of thought (CoT) for the intent to misbehave. Like all other known AI oversight methods, CoT monitoring is imperfect and allows some misbehavior to go unnoticed. Nevertheless, it shows promise and we recommend further research into CoT monitorability and investment in CoT monitoring alongside existing safety methods. Because CoT monitorability may be fragile, we recommend that frontier model developers consider the impact of development decisions on CoT monitorability.
          </p>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center', margin: '20px 0 15px 0', fontVariant: 'small-caps' }}>
            Expert Endorsers
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '10.5pt', lineHeight: '1.6' }}>
            <div>
              <p style={{margin: 0}}>Samuel R. Bowman <span style={affiliationStyle}>Anthropic</span></p>
              <p style={{margin: 0}}>Geoffrey Hinton <span style={affiliationStyle}>University of Toronto</span></p>
            </div>
            <div>
              <p style={{margin: 0}}>John Schulman <span style={affiliationStyle}>Thinking Machines</span></p>
              <p style={{margin: 0}}>Ilya Sutskever <span style={affiliationStyle}>Safe Superintelligence Inc</span></p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '35px', paddingTop: '8px', borderTop: '0.5px solid black' }}>
          <p style={{ fontSize: '9pt', margin: 0, lineHeight: '1.4' }}>
            <sup>*</sup>Equal first authors, <sup>†</sup>Equal senior authors. Correspondence: tomek.korbak@dsit.gov.uk and mikita@apolloresearch.ai.
          </p>
          <p style={{ fontSize: '9pt', margin: '4px 0 0 0', lineHeight: '1.4', fontStyle: 'italic' }}>
            The paper represents the views of the individual authors and not necessarily of their affiliated institutions.
          </p>
        </div>
<div style={{ marginTop: '40px', textAlign: 'center', border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px' }}>
           <div style={{ fontFamily: 'monospace', fontSize: '12px', marginBottom: '5px' }}>
             Preprint
           </div>
           <div style={{ fontSize: '11px', color: '#555', marginBottom: '10px' }}>
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
             fontSize: '14px',
             fontFamily: 'sans-serif'
           }}>
             View PDF →
           </Link>
        </div>
      </div>

      {/* Right Column: The Explainer */}
      <div style={{
        flex: '2', // Takes up 2/5 of the space
        position: 'sticky', // Makes the content stay in view on scroll
        top: '40px',
        minWidth: '300px'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          fontWeight: '600',
          marginBottom: '16px'
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
          fontSize: '17px',
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