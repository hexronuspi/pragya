'use client'; // Essential for using React hooks and browser APIs

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- TYPE DEFINITIONS for a structured, data-driven approach ---
interface NeuronData {
  id: string;
  cx: number;
  cy: number;
  value: number; // Represents the neuron's activation value
  label: string;
}

interface SynapseData {
  id: string;
  path: string;
  weight: number;
  // For precise text placement
  textPos: { x: number; y: number };
}

// --- NEURAL NETWORK ARCHITECTURE DEFINITION ---
// A deep network: 1 Input -> 2 Neurons -> 2 Neurons -> 2 Neurons -> 1 Output
const networkConfig = {
  layers: [
    // Layer 0: Input
    [{ id: 'L0N0', value: 1.0, label: '1.0' }],
    // Layer 1: Hidden 1
    [{ id: 'L1N0', value: 0.82, label: '0.82' }, { id: 'L1N1', value: 0.18, label: '0.18' }],
    // Layer 2: Hidden 2
    [{ id: 'L2N0', value: 0.65, label: '0.65' }, { id: 'L2N1', value: 0.43, label: '0.43' }],
    // Layer 3: Hidden 3
    [{ id: 'L3N0', value: 0.91, label: '0.91' }, { id: 'L3N1', value: 0.12, label: '0.12' }],
    // Layer 4: Output
    [{ id: 'L4N0', value: 0.77, label: '0.77' }],
  ],
  // Dummy weights for visualization
  weights: [
    // L0 -> L1
    [ { from: 'L0N0', to: 'L1N0', w: 0.7 }, { from: 'L0N0', to: 'L1N1', w: -0.3 } ],
    // L1 -> L2
    [ { from: 'L1N0', to: 'L2N0', w: 0.5 }, { from: 'L1N0', to: 'L2N1', w: 0.2 }, { from: 'L1N1', to: 'L2N0', w: -0.4 }, { from: 'L1N1', to: 'L2N1', w: 0.9 } ],
    // L2 -> L3
    [ { from: 'L2N0', to: 'L3N0', w: 1.2 }, { from: 'L2N0', to: 'L3N1', w: -0.8 }, { from: 'L2N1', to: 'L3N0', w: 0.1 }, { from: 'L2N1', to: 'L3N1', w: 0.3 } ],
    // L3 -> L4
    [ { from: 'L3N0', to: 'L4N0', w: 0.6 }, { from: 'L3N1', to: 'L4N0', w: 0.8 } ],
  ],
  // Visual layout parameters
  layout: {
    width: 800,
    height: 400,
    xPadding: 50,
    yPadding: 50,
    neuronRadius: 12,
  },
};

// --- DATA GENERATION based on config ---
const generateNetworkData = () => {
  const { layers, weights, layout } = networkConfig;
  const { width, height, xPadding, yPadding, neuronRadius } = layout;

  const layerX = (layerIndex: number) => 
    xPadding + layerIndex * (width - 2 * xPadding) / (layers.length - 1);

  const neuronY = (neuronIndex: number, neuronsInLayer: number) => {
    if (neuronsInLayer === 1) return height / 2;
    return yPadding + neuronIndex * (height - 2 * yPadding) / (neuronsInLayer - 1);
  };

  const neurons: NeuronData[][] = layers.map((layer, i) =>
    layer.map((neuron, j) => ({
      ...neuron,
      cx: layerX(i),
      cy: neuronY(j, layer.length),
    }))
  );

  const synapses: SynapseData[][] = weights.map((layerWeights) => {
    return layerWeights.map(({ from, to, w }) => {
      const fromNeuron = neurons.flat().find(n => n.id === from)!;
      const toNeuron = neurons.flat().find(n => n.id === to)!;
      const path = `M ${fromNeuron.cx} ${fromNeuron.cy} L ${toNeuron.cx} ${toNeuron.cy}`;
      
      // Calculate midpoint for weight text
      const textPos = {
        x: (fromNeuron.cx + toNeuron.cx) / 2,
        y: (fromNeuron.cy + toNeuron.cy) / 2,
      };

      return {
        id: `S-${from}-${to}`,
        path,
        weight: w,
        textPos,
      };
    });
  });

  return { neurons, synapses, layout: { ...layout, neuronRadius } };
};

const { neurons, synapses, layout } = generateNetworkData();

// --- THE SOTA REACT COMPONENT ---
export const Neuron = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    // Prepare SVG paths for the drawing animation
    useEffect(() => {
        const synapsePaths = svgRef.current?.querySelectorAll('.synapse-path');
        synapsePaths?.forEach(path => {
            const length = (path as SVGPathElement).getTotalLength();
            (path as SVGPathElement).style.strokeDasharray = `${length}`;
            (path as SVGPathElement).style.strokeDashoffset = `${length}`;
        });
    }, []);

    // The main scroll-triggered animation timeline
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 50%", // Start animation when top of section is at 50% of viewport height
                    end: "bottom top", // Let it complete fully
                    toggleActions: "play none none reverse", // Play on enter, reverse on leave
                },
            });

            // 1. Animate Title and Layer Labels
            tl.from(titleRef.current, { autoAlpha: 0, y: 30, duration: 1, ease: 'power3.out' });
            tl.from('.layer-label', { autoAlpha: 0, y: 15, stagger: 0.1, duration: 0.5 }, "<0.2");

            // 2. Animate the FORWARD PASS, layer by layer
            for (let i = 0; i < neurons.length; i++) {
                // Animate Neurons in current layer
                tl.from(`.neuron-L${i}`, {
                    scale: 0,
                    transformOrigin: '50% 50%',
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'back.out(1.7)',
                }, i === 0 ? "-=0.5" : ">-0.3");

                // Animate Neuron "Activation" (value and glow)
                tl.from(`.neuron-value-L${i}`, { autoAlpha: 0, scale: 0.5, stagger: 0.1, duration: 0.4 }, ">-0.2");
                tl.to(`.neuron-circle-L${i}`, {
                    '--glow-opacity': 1,
                    repeat: 1,
                    yoyo: true,
                    duration: 0.5,
                    stagger: 0.1
                }, "<");

                // If not the last layer, animate connections to the next layer
                if (i < synapses.length) {
                    // Animate Synapse paths drawing
                    tl.to(`.synapse-L${i}-L${i+1}`, {
                        strokeDashoffset: 0,
                        duration: 0.8,
                        ease: 'power2.inOut',
                        stagger: 0.05,
                    }, ">-0.3");

                    // Animate Weight values appearing on synapses
                    tl.from(`.synapse-weight-L${i}-L${i+1}`, {
                        autoAlpha: 0,
                        scale: 0,
                        duration: 0.5,
                        ease: 'back.out(1.4)',
                        stagger: 0.05,
                    }, "<0.3");
                }
            }

        }, sectionRef); // Scoped to the section for robust cleanup

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden">
            <div className="w-full max-w-5xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl text-center font-bold text-neutral-900 mb-4">A Look Inside the &apos;Black Box&apos;</h2>
                <h3 ref={titleRef} className="font-sans text-neutral-800 mb-16 text-xl md:text-2xl max-w-3xl mx-auto text-center font-light leading-relaxed">
                    It learns by adjusting connections, inspired by the brain&apos;s synaptic process.
                </h3>
                
                <svg ref={svgRef} viewBox={`0 0 ${layout.width} ${layout.height}`} className="w-full h-auto" aria-labelledby="nn-title">
                    <title id="nn-title">A deep neural network diagram showing a forward pass.</title>
                    
                    {/* Layer Labels */}
                    <text x={neurons[0][0].cx} y={25} className="layer-label">Input</text>
                    <text x={neurons[1][0].cx} y={25} className="layer-label">Hidden 1</text>
                    <text x={neurons[2][0].cx} y={25} className="layer-label">Hidden 2</text>
                    <text x={neurons[3][0].cx} y={25} className="layer-label">Hidden 3</text>
                    <text x={neurons[4][0].cx} y={25} className="layer-label">Output</text>
                    
                    {/* Render Synapses (Connections) */}
                    {synapses.map((layerSynapses, i) => (
                        <g key={`synapse-layer-${i}`} className={`synapse-group-L${i}`}>
                            {layerSynapses.map(s => (
                                <g key={s.id}>
                                    <path d={s.path} className={`synapse-path synapse-L${i}-L${i+1}`} />
                                    <text 
                                      x={s.textPos.x} 
                                      y={s.textPos.y}
                                      className={`synapse-weight synapse-weight-L${i}-L${i+1}`}
                                    >
                                      {s.weight.toFixed(1)}
                                    </text>
                                </g>
                            ))}
                        </g>
                    ))}

                    {/* Render Neurons (Nodes) */}
                    {neurons.map((layer, i) => (
                        <g key={`neuron-layer-${i}`} className={`neuron-group-L${i}`}>
                            {layer.map(n => (
                                <g key={n.id} transform={`translate(${n.cx}, ${n.cy})`} className={`neuron-node neuron-L${i}`}>
                                    <circle r={layout.neuronRadius} className={`neuron-circle neuron-circle-L${i}`} />
                                    <text dy="0.35em" className={`neuron-value neuron-value-L${i}`}>
                                        {n.label}
                                    </text>
                                </g>
                            ))}
                        </g>
                    ))}
                </svg>
            </div>
            
            <style jsx global>{`
                /* General SVG Styling */
                .layer-label {
                    font-size: 14px;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    fill: #525252; /* neutral-600 */
                    text-anchor: middle;
                    font-weight: 500;
                }
                .neuron-node {
                    /* Improves animation performance */
                    will-change: transform, opacity;
                }
                .neuron-circle {
                    --glow-opacity: 0; /* Custom property for GSAP to animate */
                    fill: #171717; /* neutral-900 */
                    stroke: #3b82f6; /* blue-500 */
                    stroke-width: 2.5px;
                    filter: drop-shadow(0 0 4px rgba(59, 130, 246, var(--glow-opacity)));
                    transition: filter 0.3s ease; /* Smooth glow transition */
                }
                .neuron-value {
                    font-size: 11px;
                    font-family: 'Roboto Mono', monospace;
                    fill: #ffffff;
                    text-anchor: middle;
                    font-weight: 500;
                    pointer-events: none; /* Prevent text from interfering with mouse events */
                }
                .synapse-path {
                    stroke: #9ca3af; /* neutral-400 */
                    stroke-width: 1.5;
                    fill: none;
                }
                .synapse-weight {
                    font-size: 10px;
                    font-family: 'Roboto Mono', monospace;
                    fill: #3b82f6; /* blue-500 */
                    text-anchor: middle;
                    dy: -4px; /* Offset from the line */
                    paint-order: stroke;
                    stroke: #ffffff; /* Creates a white "outline" for readability */
                    stroke-width: 3px;
                    stroke-linejoin: round;
                }
            `}</style>
        </section>
    );
};