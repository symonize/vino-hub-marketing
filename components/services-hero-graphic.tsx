"use client";

import { useEffect, useRef, useState } from "react";
import { assets } from "@/app/assets";

// Node definitions as fractions of the container (cx, cy = center of circle)
// All values are 0–1 relative to the rendered container width/height.
const NODE_DEFS = [
  { fx: 0.04,  fy: 0.22, r: 34, img: assets.bottleF, dur: 2.2, delay: 0.0 },
  { fx: 0.16,  fy: 0.08, r: 28, img: assets.bottleE, dur: 2.4, delay: 0.3 },
  { fx: 0.29,  fy: 0.28, r: 22, img: assets.bottleD, dur: 2.0, delay: 0.6 },
  { fx: 0.38,  fy: 0.50, r: 26, img: assets.bottleA, dur: 1.9, delay: 0.1 },
  { fx: 0.24,  fy: 0.72, r: 38, img: assets.bottleB, dur: 2.3, delay: 0.5 },
  { fx: 0.76,  fy: 0.72, r: 40, img: assets.bottleC, dur: 2.1, delay: 0.2 },
  { fx: 0.88,  fy: 0.18, r: 26, img: assets.bottleG, dur: 2.5, delay: 0.4 },
  { fx: 0.96,  fy: 0.55, r: 30, img: assets.bottleF, dur: 2.0, delay: 0.7 },
];

export default function ServicesHeroGraphic() {
  const containerRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const ready = w > 0 && h > 0;

  // Center of the VinoHub logo
  const lx = w * 0.5;
  const ly = h * 0.5;

  // Compute pixel positions for each node
  const nodes = NODE_DEFS.map((n, i) => ({
    ...n,
    x: w * n.fx,
    y: h * n.fy,
    clipId: `clip-node-${i}`,
  }));

  return (
    <svg
      ref={containerRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#fff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#fff" stopOpacity="1" />
          <stop offset="60%"  stopColor="#fff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        {ready && nodes.map((n) => (
          <clipPath key={n.clipId} id={n.clipId}>
            <circle cx={n.x} cy={n.y} r={n.r} />
          </clipPath>
        ))}
      </defs>

      {ready && (
        <>
          {/* Radial glow behind logo */}
          <ellipse
            cx={lx} cy={ly}
            rx={180} ry={100}
            fill="url(#centerGlow)"
          />

          {nodes.map((n, i) => {
            // Control point: pull line gently toward center but arc outward slightly
            const qx = (n.x + lx) / 2 + (ly - n.y) * 0.15;
            const qy = (n.y + ly) / 2 + (lx - n.x) * 0.08;
            const pathD = `M ${n.x} ${n.y} Q ${qx} ${qy} ${lx} ${ly}`;
            const pathId = `line-${i}`;

            return (
              <g key={i}>
                {/* Connecting line */}
                <path
                  id={pathId}
                  d={pathD}
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                />

                {/* Glow halo on traveling dot */}
                <circle r="10" fill="url(#dotGlow)">
                  <animateMotion
                    dur={`${n.dur}s`}
                    begin={`${n.delay}s`}
                    repeatCount="indefinite"
                  >
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                </circle>

                {/* Bright dot */}
                <circle r="3" fill="#fff">
                  <animateMotion
                    dur={`${n.dur}s`}
                    begin={`${n.delay}s`}
                    repeatCount="indefinite"
                  >
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                </circle>

                {/* Bottle image clipped to circle */}
                <image
                  href={n.img}
                  x={n.x - n.r}
                  y={n.y - n.r}
                  width={n.r * 2}
                  height={n.r * 2}
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#${n.clipId})`}
                />

                {/* Ring around circle */}
                <circle
                  cx={n.x} cy={n.y} r={n.r}
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1"
                />
              </g>
            );
          })}

          {/* VinoHub wordmark at center */}
          <image
            href={assets.vinoHubWordmark}
            x={lx - 73}
            y={ly - 17}
            width={146}
            height={34}
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </>
      )}
    </svg>
  );
}
