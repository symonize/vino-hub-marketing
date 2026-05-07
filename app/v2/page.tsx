"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "motion/react";
import { assets } from "@/app/assets";

/* ==================================================================
 * V2 — section-for-section port of the-gsap-field.webflow.io
 * Structure preserved; copy swapped for VinoHub.
 * ================================================================== */

export default function V2Page() {
  return (
    <main className="v2 relative bg-[#ebe8db] text-[#2a2119] antialiased">
      <Navbar />
      <HeroSection />
      <BaseSection />
      <MakesSection />
      <SkillsSection />
      <StorySection />
      <SignalSection />
      <Footer />
      <V2Styles />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* NAV                                                                 */
/* ------------------------------------------------------------------ */

function Navbar() {
  const items = [
    { label: "Base", href: "#base" },
    { label: "Makes", href: "#makes" },
    { label: "Skills", href: "#skills" },
    { label: "Story", href: "#story" },
    { label: "Signal", href: "#signal" },
  ];
  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-[#2a2119]/10 bg-[#ebe8db]/80 px-4 py-2 backdrop-blur-md">
        <a
          href="#hero"
          className="font-[var(--v2-display)] text-[14px] font-medium tracking-tight"
        >
          THE VINOHUB FIELD™
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {items.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 font-[var(--v2-mono)] text-[11px] uppercase tracking-[1px] text-[#2a2119]/70 transition-colors hover:bg-[#2a2119]/5 hover:text-[#2a2119]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#signal"
          className="rounded-full bg-[#2a2119] px-4 py-2 font-[var(--v2-mono)] text-[11px] uppercase tracking-[1px] text-[#ebe8db] transition-transform hover:scale-[1.04]"
        >
          Book a demo
        </a>
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HERO — sticky, big centered wordmark, three-column bottom tile      */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative sticky top-0 z-[1] flex min-h-[100svh] w-full flex-col items-center justify-between overflow-hidden bg-[#ebe8db] pb-8 pt-32"
    >
      {/* subtle background grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#2a2119_1px,transparent_1px)] [background-size:3px_3px]" />

      {/* centered logo */}
      <div className="flex flex-1 items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h1
            className="font-[var(--v2-display)] font-medium leading-[0.86] tracking-[-0.04em] text-[#2a2119]"
            style={{ fontSize: "clamp(72px, 15vw, 220px)" }}
          >
            <span className="block">THE VINOHUB</span>
            <span className="block italic">FIELD™</span>
          </h1>
        </motion.div>
      </div>

      {/* Bottom tile: 3 columns */}
      <div className="grid w-full max-w-[1400px] grid-cols-3 items-end gap-6 px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex items-center gap-2"
        >
          <Sparkle className="h-3 w-3" />
          <span className="font-[var(--v2-mono)] text-[11px] uppercase tracking-[1px] text-[#2a2119]/80">
            VinoHub™ studio
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="text-center"
        >
          <p className="font-[var(--v2-mono)] text-[11px] uppercase leading-[1.5] tracking-[1px] text-[#2a2119]/80">
            A portfolio playground where wine meets software.
            <br />
            Built for distributors. Designed by VinoHub™.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex items-center justify-end gap-2"
        >
          <span className="font-[var(--v2-mono)] text-[11px] uppercase tracking-[1px] text-[#2a2119]/80">
            2025
          </span>
          <Sparkle className="h-3 w-3" />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* BASE — scroll prompt + stacked keywords + image collage             */
/* ------------------------------------------------------------------ */

function BaseSection() {
  return (
    <section
      id="base"
      className="relative z-[2] rounded-t-[8px] bg-[#ebe8db] px-6 pb-[200px] pt-12"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* top tile: left label / right arrow + copy */}
        <div className="flex flex-col gap-8 border-b border-[#2a2119]/10 pb-12 md:flex-row md:items-start md:justify-between">
          <div className="font-[var(--v2-mono)] text-[11px] uppercase tracking-[1px] text-[#2a2119]/70">
            scroll gently into that good field
          </div>
          <div className="flex max-w-[520px] items-start gap-4">
            <ArrowDown className="mt-1 h-6 w-6 shrink-0" />
            <p className="font-[var(--v2-display)] text-[22px] leading-[1.3] text-[#2a2119]">
              Somewhere between a spreadsheet and a cellar, we found a way of
              working worth keeping — quiet, honest, and made for wine.
            </p>
          </div>
        </div>

        {/* Stacked keyword scroll block */}
        <div className="mt-32 flex flex-col items-center gap-24">
          <StackedItem
            label="Eeny"
            heading="More than a spreadsheet"
            svg={<WavySvg className="h-10 w-48 text-[#2a2119]" />}
            svgPosition="below"
          />
          <StackedItem
            label="meeny"
            heading="A hub for every bottle"
            svg={<EyeSvg className="h-20 w-20 text-[#2a2119]" />}
            svgPosition="above"
          />
          <StackedItem
            label="miny"
            heading="Built for wine teams"
            svg={<GrapeSvg className="h-20 w-20 text-[#7d5b83]" />}
            svgPosition="above"
          />
          <StackedItem
            label="moe"
            heading="Rooted in real joy"
            svg={<SmileySvg className="h-20 w-20 text-[#2a2119]" />}
            svgPosition="above"
          />
        </div>

        {/* Image collage — mirrors the scroll-images block */}
        <div className="relative mt-32 grid grid-cols-12 gap-4">
          <ParallaxCell className="col-span-12 md:col-span-7" h={420} offset={40}>
            <img src={assets.hubScreenshot} alt="" className="h-full w-full object-cover" />
          </ParallaxCell>
          <ParallaxCell className="col-span-6 md:col-span-3" h={420} offset={70}>
            <img src={assets.vineyardCard} alt="" className="h-full w-full object-cover" />
          </ParallaxCell>
          <ParallaxCell className="col-span-6 md:col-span-2" h={420} offset={20}>
            <img src={assets.dashCard1} alt="" className="h-full w-full object-cover" />
          </ParallaxCell>

          <ParallaxCell className="col-span-6 md:col-span-4" h={320} offset={50}>
            <img src={assets.dashCard2} alt="" className="h-full w-full object-cover" />
          </ParallaxCell>
          <ParallaxCell className="col-span-6 md:col-span-4" h={320} offset={80}>
            <img src={assets.salesSheetScreenshot} alt="" className="h-full w-full object-cover" />
          </ParallaxCell>
          <ParallaxCell className="col-span-12 md:col-span-4 flex items-center justify-center bg-[#dfd8c6]" h={320} offset={30}>
            <img src={assets.bottle3} alt="" className="h-full w-auto object-contain" />
          </ParallaxCell>
        </div>
      </div>
    </section>
  );
}

function StackedItem({
  label,
  heading,
  svg,
  svgPosition = "above",
}: {
  label: string;
  heading: string;
  svg?: React.ReactNode;
  svgPosition?: "above" | "below";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-6 text-center"
    >
      {svgPosition === "above" && svg}
      <div className="font-[var(--v2-mono)] text-[11px] uppercase tracking-[1px] text-[#2a2119]/70">
        {label}
      </div>
      <h2
        className="font-[var(--v2-display)] font-medium leading-[1] tracking-[-0.04em] text-[#2a2119]"
        style={{ fontSize: "clamp(44px, 6.5vw, 80px)" }}
      >
        {heading}
      </h2>
      {svgPosition === "below" && svg}
    </motion.div>
  );
}

function ParallaxCell({
  children,
  className = "",
  h,
  offset = 40,
}: {
  children: React.ReactNode;
  className?: string;
  h: number;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <div ref={ref} className={className} style={{ height: h }}>
      <motion.div
        style={{ y }}
        className="h-full w-full overflow-hidden rounded-[8px]"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAKES — 3 full-screen "field characters" snap panels                */
/* Each: BG image, "field characters 0X / 03" label, two-layer mask    */
/* headline, visible/hidden image, decorative SVGs, CTA circle button. */
/* ------------------------------------------------------------------ */

type MakePanel = {
  label: string; // "01 / 03"
  firstLine: string; // "The Quiet One"
  secondLine: string; // "The Loud One"
  caption: string;
  bg: string;
  visible: string;
  hidden: string;
  bgColor: string; // fallback backdrop tint
};

const MAKES: MakePanel[] = [
  {
    label: "01 / 03",
    firstLine: "The Small Estate",
    secondLine: "The Full Portfolio",
    caption: "Six SKUs today, sixty tomorrow — the hub grows with you.",
    bg: assets.vineyardCard,
    visible: assets.dashCard1,
    hidden: assets.hubScreenshot,
    bgColor: "#b89568",
  },
  {
    label: "02 / 03",
    firstLine: "The Hand-Written Sheet",
    secondLine: "The One-Click Sheet",
    caption: "Tech sheets and shelf talkers, generated in seconds.",
    bg: assets.vineyardCard,
    visible: assets.salesSheetScreenshot,
    hidden: assets.dashCard2,
    bgColor: "#7f8769",
  },
  {
    label: "03 / 03",
    firstLine: "The Reps",
    secondLine: "The AI Partner",
    caption: "An AI partner that actually remembers your vintages.",
    bg: assets.vineyardCard,
    visible: assets.dashCard2,
    hidden: assets.hubScreenshot,
    bgColor: "#6a4b52",
  },
];

function MakesSection() {
  return (
    <section id="makes" className="relative z-[3] bg-[#ebe8db]">
      {MAKES.map((p, i) => (
        <MakePanelView key={i} panel={p} />
      ))}
    </section>
  );
}

function MakePanelView({ panel }: { panel: MakePanel }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative h-[100svh] w-full overflow-hidden"
      style={{ backgroundColor: panel.bgColor }}
    >
      {/* background */}
      <img
        src={panel.bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* top gradient: label + masked headline */}
      <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/30 to-transparent px-6 pb-32 pt-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="font-[var(--v2-mono)] text-[11px] uppercase leading-[1.4] tracking-[1px] text-white/90">
            field accounts
            <br />
            {panel.label}
          </div>
          <div className="relative mt-8 overflow-hidden">
            <motion.div
              initial={{ y: 0 }}
              whileInView={{ y: [0, -1] }}
              viewport={{ once: false, amount: 0.6 }}
            />
            {/* Two-layer text mask: first-layer slides up, second-layer takes over on scroll */}
            <TwoLayerHeadline first={panel.firstLine} second={panel.secondLine} />
          </div>
        </div>
      </div>

      {/* The subject (visible/hidden swap on hover) */}
      <div
        className="absolute inset-0 z-[5] flex items-end justify-center"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative h-[70%] w-[60%] max-w-[700px]">
          <motion.img
            src={panel.visible}
            alt=""
            className="absolute inset-0 h-full w-full rounded-t-[12px] border border-[#2a2119]/20 object-cover shadow-2xl"
            animate={{ opacity: hover ? 0 : 1, y: hover ? 10 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.img
            src={panel.hidden}
            alt=""
            className="absolute inset-0 h-full w-full rounded-t-[12px] border border-[#2a2119]/20 object-cover shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Decorative sparkles around the subject */}
          <motion.div
            animate={{ rotate: hover ? 360 : 0 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            className="absolute -left-10 top-10 text-[#ffda3d]"
          >
            <Sparkle className="h-8 w-8" />
          </motion.div>
          <motion.div
            animate={{ rotate: hover ? -360 : 0, scale: hover ? 1.2 : 1 }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
            className="absolute -right-6 top-20 text-[#7d5b83]"
          >
            <Sparkle className="h-6 w-6" />
          </motion.div>
          <motion.div
            animate={{ y: hover ? [-4, 4, -4] : 0 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-24 -left-8 text-[#c94040]"
          >
            <Sparkle className="h-5 w-5" />
          </motion.div>
        </div>
      </div>

      {/* bottom tile: circular CTA + caption */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/40 to-transparent px-6 pb-12 pt-32">
        <div className="mx-auto flex max-w-[1400px] items-center gap-6">
          <button
            type="button"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="group relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#ffda3d] text-[#2a2119]"
          >
            <motion.span
              animate={{ opacity: hover ? 0 : 1 }}
              className="absolute inset-0 flex items-center justify-center font-[var(--v2-mono)] text-[10px] font-semibold uppercase tracking-[1px]"
            >
              Make it pour
            </motion.span>
            <motion.span
              animate={{ opacity: hover ? 1 : 0 }}
              className="absolute inset-0 flex items-center justify-center font-[var(--v2-mono)] text-[9px] font-semibold uppercase tracking-[1px]"
            >
              GLUG GLUG GLUG
            </motion.span>
          </button>
          <div className="font-[var(--v2-mono)] text-[11px] uppercase tracking-[1px] text-white">
            {panel.caption}
          </div>
        </div>
      </div>
    </div>
  );
}

function TwoLayerHeadline({ first, second }: { first: string; second: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // First line starts visible and slides up out; second line slides in
  const firstY = useTransform(scrollYProgress, [0.3, 0.7], ["0%", "-100%"]);
  const secondY = useTransform(scrollYProgress, [0.3, 0.7], ["100%", "0%"]);
  return (
    <div ref={ref} className="relative h-[1em] overflow-hidden">
      <motion.div
        style={{
          y: firstY,
          fontSize: "clamp(64px, 14vw, 200px)",
          lineHeight: 0.8,
          letterSpacing: "-0.05em",
        }}
        className="font-[var(--v2-display)] font-medium text-white"
      >
        {first}
      </motion.div>
      <motion.div
        style={{
          y: secondY,
          fontSize: "clamp(64px, 14vw, 200px)",
          lineHeight: 0.8,
          letterSpacing: "-0.05em",
          position: "absolute",
          inset: 0,
        }}
        className="font-[var(--v2-display)] font-medium italic text-[#ffda3d]"
      >
        {second}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SKILLS — "Services" label + heading-large + tabs + H-scroll panels */
/* ------------------------------------------------------------------ */

const SKILLS_TABS = [
  {
    key: "boopity",
    title: "Boopity",
    panelTitle: "Portfolio\nStrategy",
    caption:
      "We walk the rows with you. What you sell, what you should sell, what the data says about both.",
    img: assets.vineyardWide ?? assets.vineyardCard,
  },
  {
    key: "shabooya",
    title: "shabooya",
    panelTitle: "Sheet\nFactory",
    caption:
      "Shelf talkers and tech sheets generated on tap. Always on brand, always current.",
    img: assets.salesSheetCard ?? assets.salesSheetScreenshot,
  },
  {
    key: "whoop",
    title: "Whoop",
    panelTitle: "AI\nSommelier",
    caption:
      "A chat partner trained on your wines, your regions, your notes. It answers the questions your reps keep Googling.",
    img: assets.hubLaptop ?? assets.hubScreenshot,
  },
];

function SkillsSection() {
  const [tab, setTab] = useState(0);
  return (
    <section
      id="skills"
      className="relative z-[4] bg-[#ebe8db] px-6 py-24"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Headline */}
        <div className="grid gap-4 md:grid-cols-[120px_1fr] md:items-end">
          <div className="font-[var(--v2-mono)] text-[11px] uppercase tracking-[1px] text-[#2a2119]/70">
            Services
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-[var(--v2-display)] font-medium leading-[1] tracking-[-0.04em]"
            style={{ fontSize: "clamp(44px, 6vw, 80px)" }}
          >
            We don&apos;t just store bottles
          </motion.h2>
        </div>

        {/* Tabs */}
        <div className="mt-16 flex flex-wrap gap-3">
          {SKILLS_TABS.map((t, i) => (
            <button
              key={t.key}
              onClick={() => setTab(i)}
              className={`flex items-center gap-3 rounded-full border px-5 py-3 transition-colors ${
                i === tab
                  ? "border-[#2a2119] bg-[#2a2119] text-[#ebe8db]"
                  : "border-[#2a2119]/20 bg-transparent text-[#2a2119] hover:bg-[#2a2119]/5"
              }`}
            >
              <TabIcon idx={i} />
              <span className="font-[var(--v2-mono)] text-[11px] uppercase tracking-[1px]">
                {t.title}
              </span>
            </button>
          ))}
        </div>

        {/* Panels */}
        <div className="mt-10 overflow-hidden rounded-[8px]">
          <AnimatePresence mode="wait">
            <motion.article
              key={SKILLS_TABS[tab].key}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid min-h-[540px] grid-cols-1 overflow-hidden rounded-[8px] md:grid-cols-2"
            >
              <div className="relative z-10 flex flex-col justify-between bg-[#2a2119] p-10 text-[#ebe8db] md:p-16">
                <h3
                  className="whitespace-pre-line font-[var(--v2-display)] font-medium italic leading-[0.95] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(48px, 6vw, 96px)" }}
                >
                  {SKILLS_TABS[tab].panelTitle}
                </h3>
                <p className="mt-8 max-w-[420px] font-[var(--v2-mono)] text-[11px] uppercase leading-[1.6] tracking-[1px] text-[#ebe8db]/80">
                  {SKILLS_TABS[tab].caption}
                </p>
              </div>
              <div className="relative min-h-[320px] overflow-hidden md:min-h-0">
                <img
                  src={SKILLS_TABS[tab].img}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function TabIcon({ idx }: { idx: number }) {
  if (idx === 0)
    return (
      <svg viewBox="0 0 32 32" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="6" y="10" width="20" height="16" rx="1" />
        <path d="M10 10V6h12v4" />
      </svg>
    );
  if (idx === 1)
    return (
      <svg viewBox="0 0 32 32" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M16 4 L28 10 V22 L16 28 L4 22 V10 Z" />
        <path d="M10 17l5 5M15 17l-5 5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 32 32" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="20" cy="12" r="8" />
      <path d="M14 18L4 28" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* STORY — split headline + 4 number grid + wide image                 */
/* ------------------------------------------------------------------ */

function StorySection() {
  return (
    <section
      id="story"
      className="relative z-[4] bg-[#ebe8db] px-6 py-24"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Split headline */}
        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9 }}
          >
            <h2
              className="font-[var(--v2-display)] font-medium leading-[1] tracking-[-0.03em]"
              style={{ fontSize: "clamp(36px, 4.6vw, 64px)" }}
            >
              We thought we were making a spreadsheet.
            </h2>
          </motion.div>
          <div className="flex items-start gap-6">
            <FlowerSvg className="h-16 w-16 shrink-0 text-[#7d5b83]" />
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="font-[var(--v2-display)] text-[22px] leading-[1.35] text-[#2a2119]"
            >
              Turns out we were planting a field — full of bottles, reps,
              reports, and late-night sales sheets. We mapped it, tended it,
              shipped it, and gave your team back their afternoons.
            </motion.p>
          </div>
        </div>

        {/* Number grid */}
        <div className="mt-24 grid grid-cols-2 gap-12 md:grid-cols-4">
          {[
            { n: 42, label: "Wineries onboarded", sub: "from estates to big books" },
            { n: 12800, label: "SKUs managed", sub: "every vintage, every note" },
            { n: 317, label: "Sheets generated", sub: "just this month, so far" },
            { n: 100, label: "% Real wine", sub: "no filler, no additives", suffix: "%" },
          ].map((s, i) => (
            <NumberCell key={i} {...s} index={i} />
          ))}
        </div>

        {/* Wide image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="mt-24 h-[60vh] w-full overflow-hidden rounded-[8px]"
        >
          <img src={assets.vineyardCard} alt="" className="h-full w-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}

function NumberCell({
  n,
  label,
  sub,
  suffix = "",
  index,
}: {
  n: number;
  label: string;
  sub: string;
  suffix?: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(0);
  const startedRef = useRef(false);

  if (typeof window !== "undefined" && ref.current && !startedRef.current) {
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const prog = Math.min(1, (t - start) / 1400);
            const eased = 1 - Math.pow(1 - prog, 3);
            setV(Math.round(n * eased));
            if (prog < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="border-t border-[#2a2119]/20 pt-4"
    >
      <div
        className="font-[var(--v2-display)] font-medium leading-[1] tracking-[-0.02em] text-[#2a2119]"
        style={{ fontSize: "clamp(56px, 7vw, 120px)" }}
      >
        {v.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-3 font-[var(--v2-display)] text-[18px] text-[#2a2119]">
        {label}
      </div>
      <div className="mt-1 font-[var(--v2-mono)] text-[11px] uppercase tracking-[1px] text-[#2a2119]/60">
        {sub}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* SIGNAL — "Start a fire / We'll see the smoke" + rotating images     */
/* ------------------------------------------------------------------ */

function SignalSection() {
  const bottles = [
    assets.bottleA,
    assets.bottleB,
    assets.bottleC,
    assets.bottleD,
    assets.bottleE,
    assets.bottleF,
    assets.bottleG,
  ];
  return (
    <section
      id="signal"
      className="relative z-[4] overflow-clip bg-[#ebe8db]"
      style={{ minHeight: "min(2500px, 180vh)" }}
    >
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1400px] items-center px-6 py-24">
        {/* left text block */}
        <div className="relative z-10 max-w-[620px]">
          <div className="font-[var(--v2-mono)] text-[11px] uppercase tracking-[1px] text-[#2a2119]/70">
            Start a fire
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1 }}
            className="mt-4 font-[var(--v2-display)] font-medium leading-[1] tracking-[-0.04em]"
            style={{ fontSize: "clamp(48px, 8vw, 120px)" }}
          >
            We&apos;ll see <span className="italic text-[#7d5b83]">the smoke</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-8 max-w-[460px] font-[var(--v2-display)] text-[20px] leading-[1.4] text-[#2a2119]/80"
          >
            Thirty free minutes, no pitch — just a look at your portfolio and a
            few things VinoHub could do for your team tomorrow.
          </motion.p>
          <div className="mt-10">
            <a
              href="/consult"
              className="inline-flex items-center gap-3 rounded-full bg-[#2a2119] px-6 py-4 font-[var(--v2-mono)] text-[11px] uppercase tracking-[1px] text-[#ebe8db] transition-transform hover:scale-[1.04]"
            >
              Send smoke <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* rotating circle of images */}
        <RotatingCircle images={bottles} />
      </div>
    </section>
  );
}

function RotatingCircle({ images }: { images: string[] }) {
  const count = images.length;
  const radius = 260;
  return (
    <div className="pointer-events-none absolute right-[-120px] top-1/2 z-0 hidden h-[600px] w-[600px] -translate-y-1/2 md:block">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        className="relative h-full w-full"
      >
        {images.map((src, i) => {
          const angle = (i / count) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 flex h-[180px] w-[120px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[8px] bg-[#dfd8c6]"
              style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
            >
              <motion.img
                animate={{ rotate: -360 }}
                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                src={src}
                alt=""
                className="h-full w-auto object-contain"
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FOOTER — newsletter + marquee of eye/logo + bottom row              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <section className="relative z-[4] bg-[#ebe8db] px-6 pb-6 pt-16">
      <div className="mx-auto max-w-[1400px]">
        {/* Newsletter */}
        <form className="mx-auto max-w-[640px]">
          <div className="text-center font-[var(--v2-mono)] text-[11px] uppercase tracking-[1px] text-[#2a2119]/70">
            join the cellar circle
          </div>
          <div className="mt-4 flex h-14 items-center rounded-full border border-[#2a2119]/20 bg-transparent pl-6 pr-1.5">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-transparent font-[var(--v2-display)] text-[18px] text-[#2a2119] outline-none placeholder:text-[#2a2119]/40"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2a2119] text-[#ebe8db] transition-transform hover:scale-[1.04]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Marquee of eye + big logo */}
        <div className="mt-20 overflow-hidden">
          <div
            className="flex w-max items-center gap-16"
            style={{ animation: "v2-marquee 40s linear infinite" }}
          >
            {Array.from({ length: 4 }).map((_, set) => (
              <div key={set} className="flex shrink-0 items-center gap-16">
                <EyeSvg className="h-24 w-24 text-[#2a2119]" />
                <div
                  className="font-[var(--v2-display)] font-medium italic leading-[0.8] tracking-[-0.04em] text-[#2a2119]"
                  style={{ fontSize: "clamp(80px, 14vw, 200px)" }}
                >
                  VinoHub™
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider + bottom row */}
        <div className="mt-8 border-t border-[#2a2119]/20 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 font-[var(--v2-mono)] text-[11px] uppercase tracking-[1px] text-[#2a2119]/70">
            <span>© 2025 The VinoHub Field. Crafted with care.</span>
            <span>VinoHub™ X Next.js X Motion</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Inline SVGs                                                         */
/* ------------------------------------------------------------------ */

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="currentColor" aria-hidden>
      <path d="M6 0l.44.8A10.4 10.4 0 0 0 11.2 5.56L12 6l-.8.44A10.4 10.4 0 0 0 6.44 11.2L6 12l-.44-.8A10.4 10.4 0 0 0 .8 6.44L0 6l.8-.44A10.4 10.4 0 0 0 5.56.8L6 0z" />
    </svg>
  );
}

function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 26" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13 1.33v21.67M24.67 13L13 24.67 1.33 13" />
    </svg>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 26" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1.33 13h21.67M13 1.33L24.67 13 13 24.67" />
    </svg>
  );
}

function WavySvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 40" className={className} fill="none" aria-hidden>
      <path
        d="M2 20 Q 30 2 60 20 T 120 20 T 180 20 T 240 20 T 300 20 T 360 20 T 398 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden>
      <ellipse cx="40" cy="40" rx="36" ry="20" stroke="currentColor" strokeWidth="2" />
      <circle cx="40" cy="40" r="10" fill="currentColor" />
      <circle cx="43" cy="37" r="3" fill="#ebe8db" />
      <path d="M4 40 Q 40 60 76 40" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

function SmileySvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden>
      <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="2" />
      <circle cx="28" cy="34" r="3" fill="currentColor" />
      <circle cx="52" cy="34" r="3" fill="currentColor" />
      <path d="M24 48 Q 40 64 56 48" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function GrapeSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden>
      {[
        [40, 18], [30, 28], [50, 28],
        [22, 38], [40, 38], [58, 38],
        [30, 48], [50, 48], [40, 58],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="7" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
      ))}
      <path d="M40 8 Q 36 4 40 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M40 12 Q 48 14 52 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function FlowerSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="40"
          cy="24"
          rx="9"
          ry="16"
          transform={`rotate(${deg} 40 40)`}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="currentColor"
          fillOpacity="0.15"
        />
      ))}
      <circle cx="40" cy="40" r="6" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Global styles for this route                                        */
/* ------------------------------------------------------------------ */

function V2Styles() {
  return (
    <style jsx global>{`
      .v2 {
        font-family: var(--v2-body), system-ui, sans-serif;
      }
      .v2 ::selection {
        background: #7d5b83;
        color: #ebe8db;
      }
      @keyframes v2-marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
    `}</style>
  );
}
