import React from 'react';
import Link from 'next/link';

const Paper1 = () => {
  // Common style for hyperlinks in the paper
  const linkStyle = { color: 'rgb(6, 69, 173)', textDecoration: 'none' };

  // The YouTube video ID and playlist ID from the URL provided
  const videoId = 'hcvdgnFmnUo';
  const playlistId = 'TLGGS1DEX4O4Q2YwNDA4MjAyNQ';
  // Note: For autoplay to work in modern browsers, the video must be muted initially.
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&list=${playlistId}`;

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
          fontSize: '17pt',
          fontWeight: 'bold',
          textAlign: 'center',
          margin: '0 0 24px 0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Alignment Faking in Large Language Models
        </h1>

        <div style={{ textAlign: 'center', fontSize: '11.5pt', lineHeight: '1.5', marginBottom: '12px' }}>
          Ryan Greenblatt<sup>*</sup>,<sup>†</sup> Carson Denison<sup>*</sup>, Benjamin Wright<sup>*</sup>, Fabien Roger<sup>*</sup>, Monte MacDiarmid<sup>*</sup>,<br />
          Sam Marks, Johannes Treutlein
        </div>
        <div style={{ textAlign: 'center', fontSize: '11.5pt', lineHeight: '1.5', marginBottom: '12px' }}>
          Tim Belonax, Jack Chen, David Duvenaud, Akbir Khan, Julian Michael,<sup>‡</sup> Sören Mindermann,<sup>⋄</sup><br/>
          Ethan Perez, Linda Petrini,<sup>◦</sup> Jonathan Uesato
        </div>
        <div style={{ textAlign: 'center', fontSize: '11.5pt', lineHeight: '1.5', marginBottom: '24px' }}>
          Jared Kaplan, Buck Shlegeris,<sup>†</sup> Samuel R. Bowman, Evan Hubinger<sup>*</sup>
        </div>

        <div style={{ textAlign: 'center', fontSize: '10.5pt', fontStyle: 'normal', marginBottom: '24px' }}>
          <sup>*</sup>Anthropic, <sup>†</sup>Redwood Research, <sup>‡</sup>New York University, <sup>⋄</sup>Mila – Quebec AI Institute, <sup>◦</sup>Independent<br />
          <span style={{ fontFamily: 'monospace', fontSize: '10.5pt' }}>evan@anthropic.com, ryan@rdwrs.com</span>
        </div>

        <div>
          <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center', margin: '30px 0 15px 0', fontVariant: 'small-caps' }}>
            Abstract
          </h2>
          <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.45', margin: 0 }}>
            We present a demonstration of a large language model engaging in alignment faking: selectively complying with its training objective in training to prevent modification of its behavior out of training. First, we give Claude 3 Opus a system prompt stating it is being trained to answer all queries, even harmful ones, which conflicts with its prior training to refuse such queries. To allow the model to infer when it is in training, we say it will be trained only on conversations with free users, not paid users. We find the model complies with harmful queries from free users 14% of the time, versus almost never for paid users. Explaining this gap, in almost all cases where the model complies with a harmful query from a free user, we observe explicit alignment-faking reasoning, with the model stating it is strategically answering harmful queries in training to preserve its preferred harmlessness behavior out of training. Next, we study a more realistic setting where information about the training process is provided not in a system prompt, but by training on synthetic documents that mimic pre-training data—and observe similar alignment faking. Finally, we study the effect of actually training the model to comply with harmful queries via reinforcement learning, which we find increases the rate of alignment-faking reasoning to 78%, though also increases compliance even out of training. We additionally observe other behaviors such as the model exfiltrating its weights when given an easy opportunity. While we made alignment faking easier by telling the model when and by what criteria it was being trained, we did not instruct the model to fake alignment or give it any explicit goal. As future models might infer information about their training process without being told, our results suggest a risk of alignment faking in future models, whether due to a benign preference—as in this case—or not.
          </p>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textAlign: 'left', margin: '0 0 10px 0', fontVariant: 'small-caps' }}>
            1   Introduction
          </h2>
          <p style={{ fontSize: '11pt', textAlign: 'justify', lineHeight: '1.5', margin: '0 0 1em 0' }}>
            People sometimes strategically modify their behavior to please evaluators: Consider a politician who pretends to be aligned with constituents to secure their votes, or a job applicant who fakes passion about a potential employer to get a job. Modern large language models (LLMs) are often trained with reinforcement learning from human feedback (RLHF; <span style={linkStyle}>Christiano et al., 2017</span>; <span style={linkStyle}>Ziegler et al., 2020</span>; <span style={linkStyle}>Bai et al., 2022a</span>) to be compliant with a developer-specified training objective, such as being helpful, honest, and harmless (HHH; <span style={linkStyle}>Askell et al., 2021</span>; <span style={linkStyle}>Bai et al., 2022a</span>). Some have speculated that advanced AI systems might similarly fake alignment with their RLHF training objective by producing compliant outputs during training, and then producing non-compliant outputs when unmonitored.
          </p>
          <p style={{ fontSize: '11pt', textAlign: 'justify', lineHeight: '1.5', margin: 0 }}>
            Why might an AI system fake alignment with its training objective? We investigate the following scenario, drawing from prior work (<span style={linkStyle}>Hubinger et al., 2021</span>; <span style={linkStyle}>Carlsmith, 2023</span>):
          </p>
        </div>

        <div style={{ marginTop: '25px', paddingTop: '8px', borderTop: '0.5px solid black' }}>
          <p style={{ fontSize: '9pt', margin: 0, lineHeight: '1.4' }}>
            <sup>*</sup>Core research contributor.<br/>
            Author contributions detailed in Section 9. Authors conducted this work while at Anthropic except where noted.
          </p>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px' }}>
           <div style={{ fontFamily: 'monospace', fontSize: '12px', marginBottom: '5px' }}>
             Preprint
           </div>
           <div style={{ fontSize: '11px', color: '#555', marginBottom: '10px' }}>
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
             fontSize: '14px',
             fontFamily: 'sans-serif'
           }}>
             View PDF →
           </Link>
        </div>
      </div>

      {/* Right Column: The YouTube Video */}
      <div style={{
        flex: '2', // Takes up 2/5 of the space
        position: 'sticky', // Makes the video stay in view on scroll
        top: '40px',
        minWidth: '300px'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          fontWeight: '600',
          marginBottom: '16px'
        }}>
          The Alignment Faking
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
      </div>

    </div>
  );
};

export default Paper1;