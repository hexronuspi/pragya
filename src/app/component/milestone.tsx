"use client";

import React, {
  FC,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
// Removed: import { gsap } from "gsap";
// Removed: import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BrainCircuit,
  Atom,
  Layers3,
  Infinity as InfinityIcon,
  LucideProps,
} from "lucide-react";

// Removed: gsap.registerPlugin(ScrollTrigger);

// --- TYPES ---
interface Milestone {
  year: string;
  title: string;
  description: string;
  Icon: React.ComponentType<LucideProps>;
  position: number;
}

interface PopoverCardProps {
  milestone: Milestone;
  popoverRef: React.RefObject<HTMLDivElement>;
  placement: "top" | "bottom";
  style?: React.CSSProperties; // Added for static positioning
}

// --- DATA ---
const milestones: Milestone[] = [
  {
    year: "1950",
    title: "Turing",
    description:
      "The dawn of AI as a field, where pioneers like Alan Turing posed the fundamental question: 'Can machines think?'",
    Icon: BrainCircuit,
    position: 0.1,
  },
  {
    year: "1958",
    title: "Perceptron",
    description:
      "Frank Rosenblatt's invention, a single 'neuron' that could learn from data, proved that machines could adapt and recognize patterns.",
    Icon: Atom,
    position: 0.2,
  },
  {
    year: "1980",
    title: "Backpropagation",
    description:
      "This breakthrough algorithm allowed neural networks to learn efficiently, unlocking the potential of multi-layered 'deep' models.",
    Icon: Layers3,
    position: 0.4,
  },
  {
    year: "2010+",
    title: "Deep Learning",
    description:
      "Fueled by massive datasets and powerful GPUs, deep learning now powers a global AI revolution, from language to vision.",
    Icon: InfinityIcon,
    position: 0.6, // Last milestone at 60% of the timeline
  },
];

// --- HOOKS ---
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    setMatches(media.matches); // Set initial state
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [query]);
  return matches;
}

// --- COMPONENTS ---
const PopoverCard: FC<PopoverCardProps> = ({
  milestone,
  popoverRef,
  placement,
  style, // Accept style prop
}) => (
  <div
    ref={popoverRef}
    // Styles for academic simplicity: clean borders, subtle background, blur
    className="absolute z-30 w-64 rounded-xl bg-white/90 p-4 backdrop-blur-md border border-gray-200/80"
    style={style} // Apply the calculated style directly
  >
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
        <milestone.Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm font-semibold tracking-wider uppercase text-blue-600">
          {milestone.year}
        </p>
        <p className="font-bold text-neutral-900">{milestone.title}</p>
        <p className="mt-1 text-sm text-neutral-600">{milestone.description}</p>
      </div>
    </div>
    {/* Arrow for the popover, maintaining the clean border look */}
    <div
      className={`
        absolute left-1/2 -translate-x-1/2 rotate-45 h-4 w-4 bg-white/90 border-gray-200/80
        ${
          placement === "top"
            ? "-bottom-2 border-b border-r" // Arrow points down, popover is above
            : "-top-2 border-t border-l" // Arrow points up, popover is below
        }
      `}
    ></div>
  </div>
);

// --- DESKTOP VERSION ---
// --- DESKTOP VERSION (Corrected) ---
const DesktopTimeline: FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const introBlockRef = useRef<HTMLDivElement>(null);

  // State to store milestone positions calculated once on mount/resize
  const [milestonePositions, setMilestonePositions] = useState<
    { x: number; y: number }[]
  >([]);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const [popoverPlacement, setPopoverPlacement] = useState<"top" | "bottom">(
    "top"
  );
  // State for popover's dynamic style
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({
    opacity: 0, // Initially hidden
    pointerEvents: "none",
  });

  // Consolidated popover positioning logic using useCallback
  const positionPopover = useCallback(
    (index: number) => {
      const popover = popoverRef.current;
      const container = componentRef.current;
      const header = introBlockRef.current;

      if (
        !popover ||
        !container ||
        !header ||
        milestonePositions.length === 0
      ) {
        setPopoverStyle({ opacity: 0, pointerEvents: "none" }); // Hide if elements not ready
        return;
      }

      const currentMilestonePosition = milestonePositions[index];
      if (!currentMilestonePosition) {
        setPopoverStyle({ opacity: 0, pointerEvents: "none" });
        return;
      }

      // Get SVG element's bounds to scale the point correctly
      const svgElement = pathRef.current?.ownerSVGElement;
      if (!svgElement) return;

      const svgRect = svgElement.getBoundingClientRect();
      const viewBox = svgElement.viewBox.baseVal;

      // Convert SVG coordinates to pixel coordinates relative to the SVG container
      const scaleX = svgRect.width / viewBox.width;
      const scaleY = svgRect.height / viewBox.height;

      const itemPixelX = currentMilestonePosition.x * scaleX;
      const itemPixelY = currentMilestonePosition.y * scaleY;

      // Approximate item's effective pixel bounds (a conceptual dot size around the point)
      const itemWidth = 20; // approximate dot diameter
      const itemHeight = 20; // approximate dot diameter
      const itemBounds = {
        left: itemPixelX - itemWidth / 2,
        top: itemPixelY - itemHeight / 2,
        width: itemWidth,
        height: itemHeight,
      };

      const containerBounds = container.getBoundingClientRect();

      // Ensure popover dimensions are calculated after it's potentially rendered (even if hidden)
      // or set default, and rely on ref.current.offsetWidth/Height
      const popoverWidth = popover.offsetWidth;
      const popoverHeight = popover.offsetHeight;

      const padding = 24; // Padding from screen edges

      // Calculate horizontal position to center on item, with edge clamping
      let finalX = itemBounds.left + itemBounds.width / 2 - popoverWidth / 2;
      if (finalX < padding) {
        finalX = padding;
      } else if (finalX + popoverWidth > containerBounds.width - padding) {
        finalX = containerBounds.width - popoverWidth - padding;
      }

      let finalY;
      let placement: "top" | "bottom";

      const headerHeight = header.offsetHeight;
      const topScreenLimit = headerHeight + padding; // Area below header
      const bottomScreenLimit = containerBounds.height - padding;

      // Calculate position if placed on top of the item
      const potentialY_top = itemBounds.top - popoverHeight - padding;

      // The foreignObject containing text is at y="22" with height="40" relative to dot center in SVG.
      // Convert these relative SVG coords to pixel offsets for calculation.
      const textOffsetY = 22 * scaleY; // y offset of text start relative to dot center
      const textHeight = 40 * scaleY; // height of text area
      const lowestTextYRelativeToItemTop = itemHeight / 2 + textOffsetY + textHeight;

      const potentialY_bottom = itemBounds.top + lowestTextYRelativeToItemTop + padding;

      if (potentialY_top >= topScreenLimit) {
        placement = "top";
        finalY = potentialY_top;
      } else if (potentialY_bottom + popoverHeight <= bottomScreenLimit) {
        placement = "bottom";
        finalY = potentialY_bottom;
      } else {
        // Neither fits perfectly. Try to maximize visibility.
        // Prioritize placing its bottom at the screen limit, then ensuring it's not above header.
        placement = "bottom";
        finalY = bottomScreenLimit - popoverHeight;
        if (finalY < topScreenLimit) {
          finalY = topScreenLimit; // Prevent popover from overlapping header
        }
      }

      setPopoverPlacement(placement);
      setPopoverStyle({
        transform: `translate(${finalX}px, ${finalY}px)`,
        opacity: 1, // Make visible instantly
        pointerEvents: "auto", // Enable interactions
      });
    },
    [milestonePositions]
  );

  // --- START OF FIX ---

  // This effect now calculates milestone positions on mount and on resize.
  // It has an empty dependency array so it only runs once to set up.
  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // This function can be defined inside because it doesn't depend on any state.
    const calculateAndSetPositions = () => {
      const pathLength = path.getTotalLength();
      const positions = milestones.map((milestone) => {
          const point = path.getPointAtLength(pathLength * milestone.position);
          // Return a plain object to avoid potential issues with DOMPoint comparison
          return { x: point.x, y: point.y };
      });
      setMilestonePositions(positions);
    };

    calculateAndSetPositions(); // Calculate initial positions

    // The resize handler now only needs to recalculate positions.
    // The other useEffect will reactively handle repositioning the popover.
    const handleResize = () => {
      calculateAndSetPositions();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // KEY CHANGE: The dependency array is now empty.

  // --- END OF FIX ---

  // Effect to update popover position when activeMilestone changes or when positions are recalculated.
  useEffect(() => {
    if (activeMilestone !== null) {
      positionPopover(activeMilestone);
    } else {
      setPopoverStyle({ opacity: 0, pointerEvents: "none" }); // Hide instantly
    }
  }, [activeMilestone, positionPopover]);

  // The rest of the component remains the same.
  return (
    <div ref={componentRef} className="relative h-screen w-full overflow-hidden">
      {/* Introduction block, pinned at the top */}
      <div
        ref={introBlockRef}
        className="absolute inset-x-0 top-0 z-20 pt-24 text-center pointer-events-none" // pointer-events-none to click through to SVG
      >
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Key Milestones in AI
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-600">
            The journey of Artificial Intelligence is not a single leap but a
            series of pivotal moments. Click on a milestone to learn more.
          </p>
        </div>
      </div>

      {/* SVG Container for the interactive timeline */}
      <div className="relative h-full w-full">
        <svg
          viewBox="0 0 1200 600"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice" // Ensures SVG fills container while maintaining aspect ratio
        >
          <defs>
            {/* Gradient for the timeline path, adding a subtle visual appeal */}
            <linearGradient id="pathGradient-enhanced" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d="M 50,300 Q 300,100 600,300 T 1150,300" // Defines a smooth, curving path
            stroke="url(#pathGradient-enhanced)"
            strokeWidth="3"
            fill="none"
            // strokeDasharray and strokeDashoffset removed; path is always visible
          />

          {milestonePositions.map((pos, i) => (
            <g
              key={milestones[i].title}
              // Positioning directly using transform based on calculated points
              transform={`translate(${pos.x}, ${pos.y})`}
              onClick={() => setActiveMilestone((prev) => (prev === i ? null : i))}
              className="cursor-pointer group"
            >
              {/* Outer transparent circle that expands on hover */}
              <circle
                cx="0"
                cy="0"
                r="24"
                fill="#3b82f6"
                fillOpacity="0.1"
                className="transition-all duration-100 group-hover:r-32"
              />
              {/* Inner white circle with blue border */}
              <circle
                cx="0"
                cy="0"
                r="10"
                fill="white"
                stroke="#3b82f6"
                strokeWidth="3"
              />
              {/* ForeignObject to place HTML text inside SVG */}
              <foreignObject x="-50" y="22" width="100" height="40" className="pointer-events-none">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-xs font-bold text-neutral-800">
                    {milestones[i].title}
                  </div>
                  <div className="text-[10px] font-medium text-neutral-500">
                    {milestones[i].year}
                  </div>
                </div>
              </foreignObject>
            </g>
          ))}
        </svg>

        {/* Popover Card for active milestone */}
        {activeMilestone !== null && (
          <PopoverCard
            milestone={milestones[activeMilestone]}
            popoverRef={popoverRef}
            placement={popoverPlacement}
            style={popoverStyle}
          />
        )}
      </div>
    </div>
  );
};

// --- MOBILE VERSION ---
const MobileTimeline: FC = () => (
  <div className="p-6 sm:p-8">
    <div className="max-w-2xl mx-auto text-center mb-12">
      <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        Key Milestones in AI
      </h2>
      <p className="mt-4 text-base leading-7 text-neutral-600">
        The journey of Artificial Intelligence is not a single leap but a series
        of pivotal moments that have shaped our world.
      </p>
    </div>
    <div className="relative mx-auto max-w-2xl">
      {/* Vertical timeline line */}
      <div className="absolute left-6 top-4 h-full w-0.5 -translate-x-1/2 bg-blue-200" />
      {milestones.map((item, i) => (
        <div key={item.title} className="relative mb-12 pl-14">
          <div className="absolute left-6 top-4 -translate-x-1/2">
            {/* Timeline dot, last one is filled */}
            <div
              className={`h-5 w-5 rounded-full border-4 border-blue-200 ${
                i === milestones.length - 1 ? "bg-blue-500" : "bg-white"
              }`}
            />
            {/* Vertical line connecting dots, not for the last one */}
            {i !== milestones.length - 1 && (
              <div className="absolute top-full left-1/2 h-8 w-0.5 -translate-x-1/2 bg-blue-200" />
            )}
          </div>
          {/* Milestone content card */}
          <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <item.Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wider uppercase text-blue-600">
                  {item.year}
                </p>
                <h3 className="text-lg font-bold text-neutral-900">
                  {item.title}
                </h3>
              </div>
            </div>
            <p className="mt-3 text-base text-neutral-600">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- EXPORT ---
export const Milestones: FC = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)"); // Determines if desktop view should be used
  return (
    <section className="relative text-neutral-800 bg-white">
      {isDesktop ? <DesktopTimeline /> : <MobileTimeline />}
    </section>
  );
};