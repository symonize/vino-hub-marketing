"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Jennifer Walsh",
    role: "VP of Sales",
    company: "Vinecrest Distributors",
    avatar: "https://i.pravatar.cc/128?img=47",
    quote:
      "VinoHub replaced four different spreadsheets overnight. Our reps finally have one source of truth, and our retail accounts can pull the data they need without a single email to us.",
  },
  {
    name: "Michael Torres",
    role: "Director of Operations",
    company: "Terra Rossa Imports",
    avatar: "https://i.pravatar.cc/128?img=12",
    quote:
      "The AI inventory updates alone pay for the platform. We used to spend two days a month reconciling CSVs — now it takes ten minutes and everything is live.",
  },
  {
    name: "Amanda Chen",
    role: "Head of Portfolio Management",
    company: "Coastline Wines",
    avatar: "https://i.pravatar.cc/128?img=48",
    quote:
      "Sales sheets that used to take our marketing team a full day are generated in seconds, perfectly on-brand. It's changed how my reps sell in the field.",
  },
  {
    name: "David Patterson",
    role: "Founder",
    company: "Ridgeline Selections",
    avatar: "https://i.pravatar.cc/128?img=33",
    quote:
      "I evaluated every portfolio tool on the market. VinoHub is the only one built by people who actually understand how wine moves through a three-tier system.",
  },
];

const SLIDE_DURATION = 6000;
const RING_CIRCUMFERENCE = 2 * Math.PI * 48;

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const pct = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(pct);
      if (pct >= 1) {
        setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex]);

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setProgress(0);
    setActiveIndex(index);
  };

  const active = TESTIMONIALS[activeIndex];

  return (
    <section className="w-full border-y border-ink/10 bg-white px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-[clamp(36px,5vw,60px)] font-medium leading-tight tracking-[-1.5px] text-ink lg:mb-20"
        >
          Trusted by wine teams worldwide
        </motion.h2>

        <div className="mb-16 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div
            role="tablist"
            aria-label="Testimonials"
            className="flex items-center gap-6 lg:gap-8"
          >
            {TESTIMONIALS.map((t, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.button
                  key={t.name}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={0}
                  onClick={() => handleSelect(i)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-full"
                >
                  <div
                    className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full transition-colors duration-500 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
                    style={{
                      backgroundColor: isActive ? "#f3d44d" : "transparent",
                    }}
                  >
                    <img
                      src={t.avatar}
                      alt={t.name}
                      width={64}
                      height={64}
                      className={`h-8 w-8 rounded-full object-cover sm:h-12 sm:w-12 lg:h-16 lg:w-16 ${
                        isActive ? "" : "grayscale"
                      }`}
                    />
                  </div>
                  {isActive && (
                    <svg
                      className="pointer-events-none absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] -rotate-90"
                      viewBox="0 0 100 100"
                      aria-hidden
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke="#f3d44d"
                        strokeWidth="1.5"
                        opacity="0.2"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke="#f3d44d"
                        strokeWidth="1.5"
                        strokeDasharray={RING_CIRCUMFERENCE}
                        strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </motion.button>
              );
            })}
          </div>

          <div
            className="flex flex-col justify-center"
            role="tabpanel"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <blockquote className="mb-6 text-xl leading-relaxed text-ink/75">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
                <div className="text-base font-medium text-ink sm:text-lg">
                  {active.name},{" "}
                  <span className="text-muted">
                    {active.role} @ {active.company}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
