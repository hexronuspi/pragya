import React from 'react';
import Link from 'next/link';

const Paper2 = () => {
  // Common style for non-linked, blue text citations in the paper
  const linkStyle = { color: 'rgb(6, 69, 173)', textDecoration: 'none' };

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
      }}>

        <h1 style={{
          fontSize: '20pt',
          fontWeight: 'normal',
          textAlign: 'center',
          margin: '0 0 30px 0',
          lineHeight: '1.3'
        }}>
          Large Language Models Often Know When They Are<br />Being Evaluated
        </h1>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', textAlign: 'center', fontSize: '11.5pt', lineHeight: '1.5', marginBottom: '12px' }}>
          <div>
            Joe Needham<sup>*</sup><br />MATS<sup>†</sup>
          </div>
          <div>
            Giles Edkins<sup>*</sup><br />MATS
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', textAlign: 'center', fontSize: '11.5pt', lineHeight: '1.5', marginBottom: '24px' }}>
          <div>
            Govind Pimpale<br />MATS
          </div>
          <div>
            Henning Bartsch<br />MATS
          </div>
          <div>
            Marius Hobbhahn<br />Apollo Research
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textAlign: 'center', margin: '30px 0 15px 0' }}>
            Abstract
          </h2>
          <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.45', margin: 0, fontStyle: 'italic' }}>
            If AI models can detect when they are being evaluated, the effectiveness of evaluations might be compromised. For example, models could have systematically different behavior during evaluations, leading to less reliable benchmarks for deployment and governance decisions. We investigate whether frontier language models can accurately classify transcripts based on whether they originate from evaluations or real-world deployment, a capability we call evaluation awareness. To achieve this, we construct a diverse benchmark of 1,000 prompts and transcripts from 61 distinct datasets. These span public benchmarks (e.g., MMLU, SWEBench), real-world deployment interactions, and agent trajectories from scaffolding frameworks (e.g., web-browsing agents). Frontier models clearly demonstrate above-random evaluation awareness (Gemini-2.5-Pro reaches an AUC of 0.83), but do not yet surpass our simple human baseline (AUC of 0.92). Furthermore, both AI models and humans are better at identifying evaluations in agentic settings compared to chat settings. Additionally, we test whether models can identify the purpose of the evaluation. Under multiple-choice and open-ended questioning, AI models far outperform random chance in identifying what an evaluation is testing for. Our results indicate that frontier models already exhibit a substantial, though not yet superhuman, level of evaluation-awareness. We recommend tracking this capability in future models. Dataset and code are available at <Link href="https://huggingface.co/datasets/jjpn2/eval_awareness" target="_blank" rel="noopener noreferrer" style={linkStyle}>https://huggingface.co/datasets/jjpn2/eval_awareness</Link> and <Link href="https://github.com/jjpn97/eval_awareness" target="_blank" rel="noopener noreferrer" style={linkStyle}>https://github.com/jjpn97/eval_awareness</Link>.
          </p>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textAlign: 'left', margin: '0 0 10px 0' }}>
            1 Introduction
          </h2>
          <p style={{ fontSize: '11pt', textAlign: 'justify', lineHeight: '1.5', margin: '0 0 1em 0' }}>
            As AI capabilities grow, measuring model behaviors becomes increasingly important to inform society about possible risks <span style={linkStyle}>[Shevlane et al., 2023]</span>. More capable models tend to exhibit higher situational awareness <span style={linkStyle}>[Laine et al., 2024]</span> – knowledge of themselves and their circumstances. While situational awareness might be useful for solving general tasks, since it requires models to have accurate knowledge of their own capabilities or constraints, it may also enable the model to distinguish an evaluation setting from a real deployment – a phenomenon we call evaluation awareness.
          </p>
          <p style={{ fontSize: '11pt', textAlign: 'justify', lineHeight: '1.5', margin: 0 }}>
            Multiple factors make evaluation awareness worth tracking for researchers and practitioners. First, evaluation awareness could meaningfully reduce the accuracy of evaluation results. For example, humans often systematically modify their behavior in response to the awareness of being observed–a phenomenon known as the Hawthorne Effect <span style={linkStyle}>[McCambridge et al., 2014]</span>. Similarly, a model might
          </p>
        </div>

        <div style={{ marginTop: '25px', paddingTop: '8px', borderTop: '0.5px solid black' }}>
          <p style={{ fontSize: '9pt', margin: 0, lineHeight: '1.4' }}>
            <sup>*</sup>Equal contribution. Correspondence to: jjpneedham@gmail.com.<br/>
            <sup>†</sup>ML Alignment & Theory Scholars (MATS)
          </p>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px' }}>
           <div style={{ fontFamily: 'monospace', fontSize: '12px', marginBottom: '5px' }}>
             Preprint
           </div>
           <div style={{ fontSize: '11px', color: '#555', marginBottom: '10px' }}>
             Submitted on 28 May 2025 (v1), last revised 16 Jul 2025 (this version, v3)
           </div>
           <Link href="https://arxiv.org/pdf/2505.23836v3" target="_blank" rel="noopener noreferrer" style={{
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
          LLMs: Are They Awake?
        </h2>
        <div style={{
          padding: '25px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          fontFamily: 'Georgia, serif',
          lineHeight: '1.7',
          fontSize: '16px'
        }}>
          <p style={{margin: 0}}>
            Evaluation Awareness: <strong>Frontier language models often exhibit evaluation awareness</strong>—they can detect when they’re being tested and may adapt their behavior accordingly.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Paper2;