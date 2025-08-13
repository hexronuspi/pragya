'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, X } from 'lucide-react';
import debounce from 'lodash.debounce';

gsap.registerPlugin(ScrollTrigger);

// --- 1. TYPES & ENHANCED DATA ---
interface TimelineEvent {
  year: string;
  shortTitle: string;
  title: string;
  description: string;
  paperUrl?: string;
  youtubeId?: string;
}

const timelineData: TimelineEvent[] = [
    { year: "1958", shortTitle: "Perceptron", title: "The Perceptron", description: "Frank Rosenblatt (1928–1971) invented the Perceptron in 1958, laying the groundwork for neural networks. He showed machines could learn via weighted connections, mimicking neurons. His Mark I Perceptron demonstrated image recognition. Despite a 1969 critique sparking an AI winter, his work on supervised learning and linear classification remains foundational. His 1962 book foresaw multilayer networks, inspiring today’s deep learning." },
    { year: "1986", shortTitle: "Backprop", title: "Backpropagation", description: "In a Stanford seminar, Geoffrey Hinton questions if the brain uses a backpropagation-like process. Though backprop, co-developed by Hinton in the 1980s, drives modern deep learning, it’s biologically implausible due to symmetry and precision demands. He explores alternatives like predictive coding, energy-based models, and his Forward-Forward algorithm using two forward passes. Hinton suggests the brain may learn via efficient, parallel methods, offering insights for future AI." },
    { year: "1998", shortTitle: "LeNet-5", title: "LeNet-5", description: "Yann LeCun's LeNet-5 was a pioneering Convolutional Neural Network (CNN) designed for handwritten digit recognition on the MNIST dataset." },
    { year: "2012", shortTitle: "AlexNet", title: "AlexNet", description: "AlexNet, created in 2012 by Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton, revolutionized AI by winning the ImageNet competition with a deep CNN. Led by Krizhevsky at the University of Toronto, it used GPUs, ReLU, and dropout, proving that depth, data, and compute could solve complex tasks. AlexNet’s success marked the rise of deep learning and validated years of neural network research.", paperUrl: "https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf" },
    { year: "2014", shortTitle: "GANs", title: "Generative Adversarial Networks", description: "As a PhD student, Ian Goodfellow proposed Generative Adversarial Networks (GANs) in 2014—training two networks in opposition. Born from a late-night idea, GANs revolutionized generative AI, enabling synthetic media like AI art and fake human faces. His work reshaped AI’s creative potential. Later, at Google and Apple, he led AI safety efforts and became a leading voice in both innovation and regulation.", youtubeId: "HGYYEUSm-0Q" },
    { year: "2017", shortTitle: "Transformer", title: "The Transformer", description: "Transformers, introduced in 2017’s “Attention Is All You Need,” use attention to analyze all words in a sentence simultaneously, unlike RNNs or CNNs. Built with encoders and decoders, they include position info and stabilization methods, enabling fast, accurate learning for tasks like translation and summarization.", paperUrl: "https://cdn.openai.com/papers/dall-e-2.pdf", youtubeId:"iDulhoQ2pro" },
    { year: "2020", shortTitle: "GPT-3", title: "GPT-3", description: "With 175 billion parameters, GPT-3 showcased remarkable few-shot learning capabilities, pushing the boundaries of what LLMs could achieve.", paperUrl: "https://arxiv.org/abs/2005.14165" },
    { year: "2022", shortTitle: "Diffusion", title: "Diffusion Models", description: "In 2022, DALL·E 2 and Stable Diffusion reshaped generative AI. GANs lacked prompt accuracy, but diffusion models with CLIP guidance boosted quality. DALL·E 2 set new standards using CLIP latents, while Stable Diffusion’s latent-space approach cut costs and ran on consumer GPUs. Its open-source release sparked mass adoption and rapid innovation.", youtubeId: "1CIpzeNxIhU" },
    { year: "2023", shortTitle: "GPT-4 / etc.", title: "GPT-4 & The New Wave", description: "GPT-4 marked a shift to multimodal AI, adding image input to GPT-3.5’s strong reasoning. It could describe images, explain memes, and generate code from sketches, raising general intelligence standards. Its API enabled visual-capable apps, spurring rivals like Gemini. GPT-4 led to GPT-4o, adding real-time audio, proving unified models can handle text, images, and speech.", paperUrl: "https://cdn.openai.com/papers/gpt-4.pdf" },
    { year: "2024", shortTitle: "Modern LLMs", title: "DeepSeek V2", description: "LLMs are shifting from pure text generation to multi-step reasoning. Dense models are costly and weak at logic, prompting MoE models like DeepSeek-V2, which activate only needed parts—boosting efficiency and performance. DeepSeek-V2 shows small models can beat larger ones. The next leap is agentic reasoning: planning, tool use, and self-correction. OpenAI’s rumored 'O1' and methods like Tree-of-Thoughts aim to make LLMs active problem-solvers.", paperUrl: "https://arxiv.org/abs/2405.04434" },
];

interface NodePosition { x: number; y: number; isFront: boolean; }

// --- 2. PREMIUM INTERACTIVE COMPONENTS ---

// 2.1 The Glassmorphism Card
interface TimelineCardProps {
  event: TimelineEvent;
  position: { top: number; left: number };
  transformOrigin: string;
  onClose: () => void;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ event, position, transformOrigin, onClose }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { scale: 0.85, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', transformOrigin }
        );
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                gsap.to(cardRef.current, {
                    scale: 0.85, opacity: 0, duration: 0.3, ease: 'power3.in',
                    onComplete: onClose
                });
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [transformOrigin, onClose]);

    const handleClose = () => {
        gsap.to(cardRef.current, {
            scale: 0.85, opacity: 0, duration: 0.3, ease: 'power3.in',
            onComplete: onClose
        });
    };

    return (
        <div
            ref={cardRef}
            className="absolute z-30 p-0.5 rounded-xl bg-gradient-to-br from-cyan-400/50 via-purple-500/50 to-indigo-600/50 shadow-2xl shadow-black/20"
            style={{ top: position.top, left: position.left, width: 'clamp(340px, 90vw, 480px)' }}
        >
            <div className="rounded-lg bg-white/80 backdrop-blur-xl">
                 <div className="p-6">
                    <div className="flex justify-between items-start gap-4">
                        <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                        <button onClick={handleClose} className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200/50 hover:text-gray-800 transition-colors flex-shrink-0">
                            <X size={20} />
                        </button>
                    </div>
                     <div className={`flex gap-5 mt-4 ${event.youtubeId ? 'flex-col sm:flex-row' : 'flex-col'}`}>
                        <p className="text-sm leading-relaxed text-gray-600 flex-1">{event.description}</p>
                        {event.youtubeId && (
                            <div className="sm:w-2/5 w-full aspect-video flex-shrink-0">
                                <iframe className="w-full h-full rounded-lg border border-gray-200" src={`https://www.youtube.com/embed/${event.youtubeId}`} title={`YouTube video for ${event.title}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        )}
                    </div>
                </div>
                {event.paperUrl && (
                    <div className="border-t border-gray-200/75 bg-gray-50/50 rounded-b-lg px-6 py-3 flex justify-end">
                        <a href={event.paperUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-semibold text-cyan-700 hover:text-indigo-700 transition-colors">
                            <BookOpen size={14} /> Read The Paper
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

// 2.2 The DNA Node
interface TimelineNodeProps {
    event: TimelineEvent;
    position: NodePosition;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isActive: boolean;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ event, position, onClick, isActive }) => {
    const isFront = position.isFront;
    return (
        <button
            onClick={onClick}
            className={`group absolute flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300
                ${isFront ? 'z-20' : 'z-10'}
                ${isActive ? 'scale-110' : ''}
            `}
            style={{ left: `${(position.x / 1200) * 100}%`, top: `${(position.y / 600) * 100}%` }}
            aria-label={`View details for ${event.title}`}
        >
            <span className={`absolute whitespace-nowrap -top-7 px-2 py-1 rounded-md bg-gray-800 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${isActive ? '!opacity-100' : ''}`}>{event.shortTitle}</span>
            <span className={`flex items-center justify-center rounded-full bg-white border-2 transition-all duration-300
                ${isActive 
                    ? 'border-indigo-500' 
                    : 'border-gray-300 group-hover:border-cyan-500'}
                ${isFront 
                    ? 'w-10 h-10 shadow-lg' 
                    : 'w-8 h-8 opacity-80 shadow-sm group-hover:opacity-100'}
                ${isActive && isFront ? 'group-hover:scale-100' : 'group-hover:scale-110'}
            `}>
                <span className="font-bold text-xs text-gray-700">{event.year}</span>
            </span>
        </button>
    );
};

// --- 3. THE DNA TIMELINE COMPONENT ---
const Timeline: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [nodePositions, setNodePositions] = useState<NodePosition[]>([]);
    const [activeEventIndex, setActiveEventIndex] = useState<number | null>(null);
    const [cardState, setCardState] = useState<{ position: { top: number; left: number }; transformOrigin: string } | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const pathFrontRef = useRef<SVGPathElement>(null);
    const pathBackRef = useRef<SVGPathElement>(null);

    // Calculate node positions along the two DNA strands
    const handleResize = useCallback(() => {
        const isNowMobile = window.innerWidth < 1024;
        setIsMobile(isNowMobile);
        if (isNowMobile) return;

        if (pathFrontRef.current && pathBackRef.current) {
            const pathFront = pathFrontRef.current;
            const pathBack = pathBackRef.current;
            const totalLengthFront = pathFront.getTotalLength();
            const totalLengthBack = pathBack.getTotalLength();
            
            const positions: NodePosition[] = timelineData.map((_, i) => {
                const isFront = i % 2 === 0;
                const path = isFront ? pathFront : pathBack;
                const totalLength = isFront ? totalLengthFront : totalLengthBack;
                // Distribute points evenly along the path
                const point = path.getPointAtLength((i / (timelineData.length -1)) * totalLength);
                return { x: point.x, y: point.y, isFront };
            });
            setNodePositions(positions);
        }
    }, []);
    
    // Position the card near the clicked node
    const handleNodeClick = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
        if (activeEventIndex === index) {
            setActiveEventIndex(null);
            return;
        }
        setActiveEventIndex(index);

        const nodeEl = e.currentTarget;
        const containerEl = containerRef.current;
        if (!containerEl) return;
        const nodeRect = nodeEl.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();

        const cardWidth = 480; 
        const cardHeight = 320; 
        const gap = 32;

        const nodeIsOnBottomHalf = (nodeRect.top + nodeRect.height / 2) > (containerRect.top + containerRect.height / 2);
        
        let top: number;
        let transformOrigin: string;

        if (nodeIsOnBottomHalf) {
            top = (nodeRect.top - containerRect.top) - cardHeight - gap;
            transformOrigin = 'bottom center';
        } else {
            top = (nodeRect.bottom - containerRect.top) + gap;
            transformOrigin = 'top center';
        }
        
        let left = (nodeRect.left - containerRect.left) + (nodeRect.width / 2) - (cardWidth / 2);
        const containerPadding = 20;
        left = Math.max(containerPadding, Math.min(left, containerRect.width - cardWidth - containerPadding));

        setCardState({ position: { top, left }, transformOrigin });
    };
    
    // Effects for resize handling and initial setup
    useEffect(() => {
        handleResize();
        const debouncedResize = debounce(handleResize, 150);
        window.addEventListener('resize', debouncedResize);
        return () => window.removeEventListener('resize', debouncedResize);
    }, [handleResize]);

    // GSAP animation for drawing the DNA path on scroll
    useEffect(() => {
        if (isMobile || !containerRef.current || nodePositions.length === 0) return;
        const paths = [pathFrontRef.current, pathBackRef.current];
        paths.forEach(path => {
            if(path) {
                const totalLength = path.getTotalLength();
                path.style.strokeDasharray = `${totalLength}`;
                path.style.strokeDashoffset = `${totalLength}`;
            }
        });
        
        const ctx = gsap.context(() => {
            gsap.to(paths, {
                strokeDashoffset: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    end: 'bottom 80%',
                    scrub: 1.5,
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, [isMobile, nodePositions]);

    return (
        <section id="timeline" className="bg-white sm:py-2">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">The evolution of AI</h2>
                    <p className="text-lg leading-8 text-gray-600">
                        Modern artificial intelligence is a tapestry woven from decades of breakthroughs. Each discovery forms a strand in the double helix of innovation, leading to the powerful models of today.
                    </p>
                </div>
            </div>

            <div ref={containerRef} className="relative sm:mt-2 w-full mx-auto max-w-6xl" style={{ height: isMobile ? 'auto' : '600px' }}>
                {isMobile ? (
                    // --- PREMIUM Mobile Vertical Layout ---
                    <div className="mx-auto max-w-3xl px-6 flow-root">
                        <ul className="-mb-8">
                            {timelineData.map((event, eventIdx) => (
                                <li key={event.year}>
                                    <div className="relative pb-8">
                                        {eventIdx !== timelineData.length - 1 ? (
                                        <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                        ) : null}
                                        <div className="relative flex items-center space-x-3">
                                            <div>
                                                <span className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center ring-8 ring-white">
                                                    <BookOpen className="h-5 w-5 text-white" />
                                                </span>
                                            </div>
                                            <div className="flex min-w-0 flex-1 justify-between space-x-4">
                                                <div>
                                                    <p className="text-base font-semibold text-gray-800">{event.title}</p>
                                                    <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                                                </div>
                                                <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                                    <time>{event.year}</time>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    // --- DNA Double Helix Desktop Layout ---
                    <>
                        <svg viewBox="0 0 1200 600" className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                             <defs>
                                <linearGradient id="dna-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#22d3ee" /> 
                                  <stop offset="100%" stopColor="#4f46e5" />
                                </linearGradient>
                              </defs>
                            <path
                                ref={pathBackRef}
                                d="M 50,550 C 250,550 200,50 500,50 C 800,50 750,550 1150,550"
                                fill="none"
                                stroke="#d1d5db" // A lighter gray for the background strand
                                strokeWidth="3"
                            />
                             <path
                                ref={pathFrontRef}
                                d="M 50,50 C 250,50 200,550 500,550 C 800,550 750,50 1150,50"
                                fill="none"
                                stroke="url(#dna-gradient)" // The vibrant gradient for the foreground strand
                                strokeWidth="3"
                            />
                        </svg>
                        {nodePositions.map((pos, i) => (
                           <TimelineNode 
                                key={timelineData[i].year}
                                event={timelineData[i]}
                                position={pos}
                                onClick={(e) => handleNodeClick(i, e)}
                                isActive={activeEventIndex === i}
                           />
                        ))}
                        {activeEventIndex !== null && cardState && (
                            <TimelineCard 
                                event={timelineData[activeEventIndex]}
                                position={cardState.position}
                                transformOrigin={cardState.transformOrigin}
                                onClose={() => setActiveEventIndex(null)}
                            />
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default Timeline;