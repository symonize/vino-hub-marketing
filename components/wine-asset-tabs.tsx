"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { assets } from "@/app/assets";

const TABS = [
  {
    id: "hub",
    label: "The Hub",
    body: "A centralized platform where your sales team and retail accounts can find exactly what they need in seconds, not hours.",
    img: assets.hubLaptop,
  },
  {
    id: "generator",
    label: "Asset Tool Generator",
    body: "Generate professional sales sheets, shelf talkers, and tasting notes on demand — branded, accurate, and ready to send.",
    img: assets.salesSheetCard,
  },
  {
    id: "analytics",
    label: "Wine Tools Analytics",
    body: "Understand which wines move, who's downloading what, and where your portfolio is gaining traction across accounts.",
    img: assets.dashCard1,
  },
];

const DURATION_MS = 6000;

export default function WineAssetTabs() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const startRef = useRef<number>(performance.now());

  useEffect(() => {
    if (paused) return;
    let raf = 0;
    startRef.current = performance.now() - progress * DURATION_MS;

    const tick = (t: number) => {
      const p = Math.min((t - startRef.current) / DURATION_MS, 1);
      setProgress(p);
      if (p >= 1) {
        setActive((a) => (a + 1) % TABS.length);
        setProgress(0);
        startRef.current = performance.now();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused]);

  const selectTab = (i: number) => {
    setActive(i);
    setProgress(0);
    startRef.current = performance.now();
  };

  return (
    <section className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-[1fr_785px]">
        {/* Left column: title + tabs */}
        <div className="max-w-[460px]">
          <h2 className="text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            Wine Asset Management
          </h2>

          <ul
            className="mt-12 space-y-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {TABS.map((tab, i) => {
              const isActive = i === active;
              return (
                <li key={tab.id}>
                  <button
                    type="button"
                    onClick={() => selectTab(i)}
                    className="block w-full text-left"
                  >
                    {/* Progress bar */}
                    <div className="relative h-px w-full overflow-hidden bg-[#dcdcdc]">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-[#2f2f2f]"
                        animate={{
                          width: isActive ? `${progress * 100}%` : "0%",
                        }}
                        transition={{ duration: 0, ease: "linear" }}
                        style={{ height: 2, top: -0.5 }}
                      />
                    </div>

                    <div className="pt-4">
                      <h3
                        className={`font-serif italic text-[30px] leading-[1.2] tracking-[-0.9px] transition-colors ${
                          isActive ? "text-[#2f2f2f]" : "text-[#2f2f2f]/60"
                        }`}
                      >
                        {tab.label}
                      </h3>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            key="body"
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                              marginTop: 12,
                            }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                            className="overflow-hidden text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]"
                          >
                            {tab.body}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right column: media panel */}
        <div className="relative h-[507px] w-full overflow-hidden rounded-[20px] border border-[#b8b8b8] bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={TABS[active].id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center p-10"
            >
              <img
                src={TABS[active].img}
                alt={TABS[active].label}
                className="max-h-full max-w-full object-contain"
              />
            </motion.div>
          </AnimatePresence>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[13px] tracking-[-0.13px] text-[#7e7e7e]">
            Built On VinoHub
          </p>
        </div>
      </div>
    </section>
  );
}
