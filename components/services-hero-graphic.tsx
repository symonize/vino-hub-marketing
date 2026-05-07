"use client";

import { motion } from "motion/react";
import { assets } from "@/app/assets";

/**
 * Hero graphic: bottle nodes scattered around the panel, connected to the
 * VinoHub logo at center via curved lines. Glowing dots animate along each
 * line toward the center, suggesting data/products flowing into the platform.
 */
export default function ServicesHeroGraphic() {
  // Coordinate space: 1400 x 480. All bottle positions and the center logo
  // are placed in this space; the SVG and nodes share it via percentage layout.
  const W = 1400;
  const H = 480;
  const cx = W / 2;
  const cy = H / 2;

  // Each node: position (in viewBox coords), bottle image, size, and the
  // curve control point that bends the line toward the center.
  const nodes: {
    x: number;
    y: number;
    size: number;
    img: string;
    cx: number;
    cy: number;
    duration: number;
    delay: number;
  }[] = [
    { x: 80,   y: 80,  size: 62, img: assets.bottleF, cx: 350,  cy: 130, duration: 2.2, delay: 0.0 },
    { x: 240,  y: 60,  size: 49, img: assets.bottleE, cx: 480,  cy: 160, duration: 2.4, delay: 0.3 },
    { x: 410,  y: 130, size: 38, img: assets.bottleD, cx: 540,  cy: 210, duration: 2.0, delay: 0.6 },
    { x: 540,  y: 200, size: 43, img: assets.bottleA, cx: 620,  cy: 230, duration: 1.9, delay: 0.1 },
    { x: 360,  y: 280, size: 69, img: assets.bottleB, cx: 540,  cy: 290, duration: 2.3, delay: 0.5 },
    { x: 1180, y: 280, size: 73, img: assets.bottleC, cx: 920,  cy: 290, duration: 2.1, delay: 0.2 },
    { x: 1310, y: 130, size: 45, img: assets.bottleG, cx: 1080, cy: 210, duration: 2.5, delay: 0.4 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* SVG layer for connecting curves + traveling dots */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="60%" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {nodes.map((n, i) => {
          const path = `M ${n.x + n.size / 2} ${n.y + n.size / 2} Q ${n.cx} ${n.cy} ${cx} ${cy}`;
          const pathId = `svc-path-${i}`;
          return (
            <g key={i}>
              <path
                id={pathId}
                d={path}
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1"
              />
              {/* Glow halo behind the dot */}
              <circle r="9" fill="url(#dotGlow)">
                <animateMotion
                  dur={`${n.duration}s`}
                  begin={`${n.delay}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
              {/* Bright traveling dot */}
              <circle r="3" fill="#fff">
                <animateMotion
                  dur={`${n.duration}s`}
                  begin={`${n.delay}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Bottle nodes (positioned via % to track the same viewBox) */}
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${(n.x / W) * 100}%`,
            top: `${(n.y / H) * 100}%`,
            width: `${(n.size / W) * 100}%`,
            aspectRatio: "1 / 1",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-white/30">
            <img src={n.img} alt="" className="h-full w-full object-cover" />
          </div>
        </motion.div>
      ))}

      {/* Center VinoHub logo */}
      <div
        className="absolute"
        style={{
          left: `${(cx / W) * 100}%`,
          top: `${(cy / H) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="flex h-[180px] w-[360px] items-center justify-center rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0)_70%)]">
          <img
            src={assets.vinoHubWordmark}
            alt="VinoHub"
            width={146}
            height={35}
            className="h-[35px] w-auto"
          />
        </div>
      </div>
    </div>
  );
}
