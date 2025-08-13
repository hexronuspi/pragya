// Filename: stanfordindex.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';

// --- TYPE DEFINITIONS ---
type Point = { year: number; value: number };
type Series = {
  name: string;
  color: string;
  points: Point[];
  labelPos: { year: number; value: number };
};

// --- CHART DATA (meticulously estimated from the image) ---
const chartData: Series[] = [
  {
    name: "Image classification\n(ImageNet Top-5)",
    color: "#3A3A9A", // Dark Blue/Purple
    points: [
      { year: 2012, value: 89 }, { year: 2013, value: 91 }, { year: 2015, value: 96 },
      { year: 2017, value: 98 }, { year: 2020, value: 101 }, { year: 2022, value: 102.5 }
    ],
    labelPos: { year: 2012.2, value: 83 }
  },
  {
    name: "Basic-level reading\ncomprehension\n(SQuAD 1.1)",
    color: "#20c997", // Cyan/Teal
    points: [
      { year: 2015, value: 87 }, { year: 2016.5, value: 94 }, { year: 2018, value: 101 }, { year: 2021, value: 102 }
    ],
    labelPos: { year: 2015.3, value: 77 }
  },
  {
    name: "English language\nunderstanding (SuperGLUE)",
    color: "#50a1ff", // Light Blue
    points: [
      { year: 2019, value: 91 }, { year: 2020, value: 97 }, { year: 2021, value: 101 }, { year: 2022, value: 102 }
    ],
    labelPos: { year: 2017.5, value: 92 }
  },
  {
    name: "Visual reasoning (VQA)",
    color: "#864ddf", // Purple
    points: [
      { year: 2016, value: 80 }, { year: 2017, value: 86 }, 
      { year: 2019.5, value: 89 },{ year: 2021, value: 101 }, { year: 2022, value: 104.2 }
    ],
    labelPos: { year: 2016.8, value: 77 }
  },
  {
    name: "Multitask language\nunderstanding (MMLU)",
    color: "#e031b0", // Magenta
    points: [
      { year: 2019, value: 36 }, 
      { year: 2020, value: 60 }, 
      { year: 2021, value: 65 },
    { year: 2023, value: 100 }
    ],
    labelPos: { year: 2019.1, value: 57 }
  },
  {
    name: "Competition-level\nmathematics (MATH)",
    color: "#006d6f", // Dark Teal
    points: [
      { year: 2021, value: 8 }, { year: 2022, value: 55 }, { year: 2023, value: 92 }
    ],
    labelPos: { year: 2020.2, value: 24 }
  }
];

// --- SVG & CHART CONSTANTS ---
const SVG_WIDTH = 1200;
const SVG_HEIGHT = 650;
const PADDING = { top: 50, right: 30, bottom: 60, left: 85 };
const CHART_WIDTH = SVG_WIDTH - PADDING.left - PADDING.right;
const CHART_HEIGHT = SVG_HEIGHT - PADDING.top - PADDING.bottom;

const X_MIN = 2012;
const X_MAX = 2023;
const Y_MIN = 0;
const Y_MAX = 105; // Headroom for lines crossing 100%

// --- HELPER FUNCTIONS ---
const scaleX = (year: number) => PADDING.left + ((year - X_MIN) / (X_MAX - X_MIN)) * CHART_WIDTH;
const scaleY = (value: number) => PADDING.top + CHART_HEIGHT - ((value - Y_MIN) / (Y_MAX - Y_MIN)) * CHART_HEIGHT;

type SvgPoint = { x: number; y: number };

// Creates a smooth path data string using Catmull-Rom splines for an authentic curve
const createSpline = (points: SvgPoint[]): string => {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  const tension = 0.4; 

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6 * tension * 2;
    const cp1y = p1.y + (p2.y - p0.y) / 6 * tension * 2;
    const cp2x = p2.x - (p3.x - p1.x) / 6 * tension * 2;
    const cp2y = p2.y - (p3.y - p1.y) / 6 * tension * 2;

    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
};


// --- REACT COMPONENT ---
const StanfordIndex = () => {
  const yAxisLabels = [0, 20, 40, 60, 80, 100];
  const xAxisLabels = Array.from({ length: X_MAX - X_MIN + 2 }, (_, i) => X_MIN + i);

  return (
    <div className="font-sans flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-6xl">
        
        <div className="relative w-full">
          <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full" aria-labelledby="chart-title">
            <title id="chart-title">A line chart showing AI performance relative to human baseline from 2012 to 2023.</title>
            
            {/* Y-axis Title */}
            <text
              transform={`translate(20, ${PADDING.top + CHART_HEIGHT / 2}) rotate(-90)`}
              textAnchor="middle"
              className="text-base text-[#495057] fill-current"
            >
              Performance relative to the human baseline (%)
            </text>

            {/* Y-axis Labels */}
            {yAxisLabels.map(label => (
              <g key={`y-${label}`}>
                <text
                  x={PADDING.left - 15}
                  y={scaleY(label) + 5}
                  textAnchor="end"
                  className="text-base text-[#495057] fill-current"
                >
                  {label}%
                </text>
              </g>
            ))}

            {/* X-axis Labels */}
            {xAxisLabels.map(label => (
              <text
                key={`x-${label}`}
                x={scaleX(label)}
                y={SVG_HEIGHT - PADDING.bottom + 30}
                textAnchor="middle"
                className="text-base text-[#495057] fill-current"
              >
                {label}
              </text>
            ))}
            
            {/* Human Baseline */}
            <g>
               <line
                x1={PADDING.left}
                y1={scaleY(100)}
                x2={SVG_WIDTH - PADDING.right}
                y2={scaleY(100)}
                stroke="#343a40"
                strokeWidth="1.5"
                strokeDasharray="8 5"
              />
              <text
                x={PADDING.left}
                y={scaleY(100) - 12}
                className="text-base font-medium text-[#212529] fill-current"
              >
                Human baseline
              </text>
            </g>

            {/* Data Lines and Labels */}
            {chartData.map((series, index) => {
              const scaledPoints = series.points.map(p => ({ x: scaleX(p.year), y: scaleY(p.value) }));
              const pathD = createSpline(scaledPoints);
              const labelLines = series.name.split('\n');
              
              return (
                <g key={series.name}>
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke={series.color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, delay: index * 0.2, ease: "easeInOut" }}
                  />
                  <text
                    x={scaleX(series.labelPos.year)}
                    y={scaleY(series.labelPos.value)}
                    className="text-base font-medium"
                    style={{ fill: series.color }}
                  >
                     {labelLines.map((line, i) => (
                      <tspan key={i} x={scaleX(series.labelPos.year)} dy={i > 0 ? "1.2em" : 0}>{line}</tspan>
                    ))}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="text-sm text-[#6c757d]">
          Source: AI Index, 2024 | Chart: 2024 AI Index report
        </p>
                  <p className="text-s md:text-s text-[#212529] font-medium leading-tight">
              On a lot of intellectual task categories, AI has exceeded human performance.
            </p>
        </div>
      </div>
    </div>
  );
};

export default StanfordIndex;