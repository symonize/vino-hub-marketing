"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import StaggeredText from "@/components/react-bits/staggered-text";
import BlurHighlight from "@/components/react-bits/blur-highlight";
import { CTAButton, Nav, Footer } from "@/components/site-chrome";
import TeamModal, { type TeamMember } from "@/components/team-modal";
import { InfiniteCanvas } from "@/components/infinite-canvas";

const TEAM: TeamMember[] = [
  {
    id: "giulia",
    name: "Giulia Pedrina",
    title: "Co-Founder & Head of Client Strategy",
    initials: "GP",
    shortBio:
      "From the cellars of Veneto to the boardrooms of New York importers.",
    fullBio: [
      "Giulia grew up in the Veneto region of Italy, where her family's relationship with wine wasn't a hobby — it was the texture of daily life. After moving to New York, she spent nearly a decade leading digital strategy for boutique importers and Michelin-starred wine programs.",
      "She co-founded VinoHub because she watched too many talented sommeliers and brand managers drowning in spreadsheets, ten-year-old PDFs, and Dropbox folders nobody could find. Her job here is to make sure every workflow we build maps to how the trade actually works — not how a software company thinks it works.",
      "Today she leads client strategy, working directly with importers and distributors to translate the messy reality of the wine business into systems that finally feel native to it.",
    ],
    funFact:
      "Will absolutely die on the hill that Soave is one of Italy's most underrated whites. Don't get her started.",
  },
  {
    id: "simon",
    name: "Simon Milberg",
    title: "Co-Founder & Head of Engineering",
    initials: "SM",
    shortBio:
      "Built the infrastructure that powered America's largest wine distributor.",
    fullBio: [
      "Simon spent six years embedded inside the technical infrastructure of the country's largest wine and spirits distributor, where he learned firsthand how brittle the tooling around a multi-billion-dollar industry really is.",
      "He started VinoHub with Giulia after one too many conversations with importers who were paying enterprise software prices for tools that couldn't even open a vintage-specific tasting note. He leads engineering here, with a focus on AI workflows that do the boring parts of wine ops faster than any human ever could — so the humans can get back to the part of the job that actually matters.",
      "His north star: a sales rep should be able to walk into a restaurant, pull out their phone, and have everything they need to close the sale in under three taps.",
    ],
    funFact:
      "Keeps a small but indefensibly nerdy collection of single-vineyard Rieslings. Has opinions about screwcaps.",
  },
];

export default function AboutPage() {
  const [openMember, setOpenMember] = useState<TeamMember | null>(null);

  return (
    <main className="bg-bg">
      <Nav />

      <AboutHero />
      <TeamSection onOpen={setOpenMember} />
      <ValuesGrid />
      <TimelineSection />
      <ManifestoSection />
      <CTASection />

      <Footer />

      <TeamModal member={openMember} onClose={() => setOpenMember(null)} />
    </main>
  );
}

const CANVAS_MEDIA = [
  { url: "/assets/site-shot1.png",              width: 323,  height: 579 },
  { url: "/assets/site-shot2.png",              width: 387,  height: 579 },
  { url: "/assets/bottles/asset 4.webp",        width: 200,  height: 259 },
  { url: "/assets/site-shot3.png",              width: 516,  height: 579 },
  { url: "/assets/bottles/asset 6.webp",        width: 200,  height: 259 },
  { url: "/assets/site-shot4.png",              width: 579,  height: 579 },
  { url: "/assets/hub-screenshot.png",          width: 232,  height: 174 },
  { url: "/assets/bottles/asset 8.webp",        width: 200,  height: 259 },
  { url: "/assets/dashboard.webp",              width: 1200, height: 840 },
  { url: "/assets/vineyard-card.png",           width: 600,  height: 400 },
  { url: "/assets/bottles/asset 10.webp",       width: 200,  height: 259 },
  { url: "/assets/dash-card1.png",              width: 500,  height: 500 },
  { url: "/assets/dash-card2.png",              width: 500,  height: 226 },
  { url: "/assets/sales-sheet-screenshot.png",  width: 400,  height: 266 },
];

// Camera zooms from INITIAL_CAMERA_Z (50) toward this value at full scroll
const CAMERA_Z_START = 50;
const CAMERA_Z_END   = 5;
// How many vh of scroll distance the animation plays over
const SCROLL_DISTANCE_VH = 300;

function AboutHero() {
  const cameraZRef = React.useRef<number>(CAMERA_Z_START);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const { top, height } = wrapper.getBoundingClientRect();
      // progress 0 → 1 over the scrollable sticky range
      const scrollRange = height - window.innerHeight;
      const scrolled = -top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));
      cameraZRef.current = CAMERA_Z_START + (CAMERA_Z_END - CAMERA_Z_START) * progress;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // Tall wrapper — creates the scroll distance while the canvas stays sticky
    <div
      ref={wrapperRef}
      style={{ height: `${SCROLL_DISTANCE_VH}vh` }}
    >
      {/* Sticky panel — stays in view while user scrolls through the wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <InfiniteCanvas
          media={CANVAS_MEDIA}
          backgroundColor="#7f3333"
          fogColor="#7f3333"
          fogNear={100}
          fogFar={280}
          externalCameraZRef={cameraZRef}
          disableWheel
        />

        {/* Headline overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-[clamp(40px,5.6vw,72px)] font-medium leading-[1.08] tracking-[-1.86px] text-white drop-shadow-lg">
            <div>
              <StaggeredText
                as="span"
                className="justify-center"
                text="We specialize in making the"
                segmentBy="words"
                delay={60}
                duration={0.7}
                direction="top"
                blur
              />
            </div>
            <div>
              <StaggeredText
                as="span"
                className="justify-center font-serif italic font-normal"
                text="complex feel simple"
                segmentBy="words"
                delay={60}
                duration={0.7}
                direction="top"
                blur
              />
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
}

const VALUES = [
  {
    kicker: "01",
    title: "Wine first, software second.",
    body: "Every feature we ship gets pressure-tested against how the trade actually moves a bottle — not how a generic CRM thinks it should.",
  },
  {
    kicker: "02",
    title: "Boring work belongs to the machine.",
    body: "Sales sheets, shelf talkers, inventory cleanup — if a computer can do it in seconds, your team shouldn't be spending a Tuesday on it.",
  },
  {
    kicker: "03",
    title: "Premium tools for a premium portfolio.",
    body: "Your wines deserve a digital experience as considered as the labels on the bottles. We design for that bar, every time.",
  },
];

function ValuesGrid() {
  return (
    <section className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-8 md:grid-cols-3">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.kicker}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[16px] border border-black/10 bg-white p-7"
          >
            <span className="font-serif text-[28px] italic text-[#7f3333]">
              {v.kicker}
            </span>
            <h3 className="mt-3 text-[24px] font-medium leading-[30px] tracking-[-0.72px] text-[#2f2f2f]">
              {v.title}
            </h3>
            <p className="mt-3 text-[17px] leading-[26px] tracking-[-0.17px] text-[#626262]">
              {v.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const TIMELINE = [
  { year: "2010", body: "Giulia leaves Veneto for New York and joins her first import team." },
  { year: "2014", body: "Simon starts inside the engineering org of America's largest distributor." },
  { year: "2021", body: "The two cross paths consulting on the same broken sales-enablement project." },
  { year: "2024", body: "VinoHub is founded with one bet: the wine trade deserves better software." },
  { year: "2026", body: "VinoHub AI ships — the first wine-native AI assistant for distributors." },
];

function TimelineSection() {
  return (
    <section className="mx-auto max-w-[1300px] px-6 py-12">
      <div className="grid gap-12 md:grid-cols-[320px_1fr]">
        <div>
          <p className="text-[14px] font-semibold uppercase tracking-[2px] text-[#7f3333]">
            How we got here
          </p>
          <h2 className="mt-4 text-[clamp(32px,4vw,44px)] font-medium leading-[1.15] tracking-[-1.32px] text-[#2f2f2f]">
            Fifteen years of working in the trade — built into one platform.
          </h2>
        </div>

        <ol className="relative border-l border-black/15 pl-8">
          {TIMELINE.map((t, i) => (
            <motion.li
              key={t.year}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              className="relative pb-8 last:pb-0"
            >
              <span className="absolute -left-[37px] top-1 flex size-4 items-center justify-center">
                <span className="size-2 rounded-full bg-[#7f3333]" />
                <span className="absolute size-4 rounded-full border border-[#7f3333]/30" />
              </span>
              <div className="font-serif text-[28px] italic leading-none tracking-[-0.84px] text-[#2f2f2f]">
                {t.year}
              </div>
              <p className="mt-2 max-w-[520px] text-[18px] leading-[26px] tracking-[-0.18px] text-[#535353]">
                {t.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TeamSection({ onOpen }: { onOpen: (m: TeamMember) => void }) {
  return (
    <section className="mx-auto max-w-[1300px] px-6 py-24">
      <h2 className="text-[44px] font-medium leading-[59px] tracking-[-1.32px] text-[#2f2f2f]">
        Meet our team
      </h2>
      <p className="mt-2 max-w-[640px] text-[18px] leading-[26px] tracking-[-0.18px] text-[#626262]">
        Two founders, one shared frustration with how the wine trade is asked
        to work today. Click a card to read the long version.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {TEAM.map((m, i) => (
          <TeamCard key={m.id} member={m} index={i} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

function TeamCard({
  member,
  index,
  onOpen,
}: {
  member: TeamMember;
  index: number;
  onOpen: (m: TeamMember) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(member)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group block w-full text-left"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[16px] border border-[#a6a6a6] bg-gradient-to-br from-[#7f3333] to-[#3a1414]">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-[140px] italic leading-none text-white/95 transition-transform duration-500 group-hover:scale-110">
            {member.initials}
          </span>
        </div>

        {/* Hover overlay with short bio */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-black/0 p-6 transition-transform duration-300 group-hover:translate-y-0">
          <p className="text-[16px] leading-[22px] tracking-[-0.16px] text-white">
            {member.shortBio}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[1.2px] text-white/90">
            Read full bio
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-serif text-[33px] italic leading-[1.1] tracking-[-0.99px] text-[#353535]">
          {member.name}
        </h3>
        <p className="mt-1 text-[18px] leading-[28px] tracking-[0.36px] text-[#2f2f2f]">
          {member.title}
        </p>
      </div>
    </motion.button>
  );
}

function ManifestoSection() {
  return (
    <section className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="mx-auto max-w-[900px] text-center">
        <p className="text-[14px] font-semibold uppercase tracking-[2px] text-[#7f3333]">
          Our mission
        </p>
        <p className="mt-6 text-[clamp(28px,3.5vw,40px)] font-medium leading-[1.25] tracking-[-1.2px] text-[#2f2f2f]">
          <BlurHighlight
            highlightedBits={["centuries-old craft", "sells, ships, and scales"]}
            highlightColor="#7f3333"
            highlightClassName="text-white font-medium px-1 -mx-1 rounded-[3px]"
            highlightDirection="left"
            highlightDuration={1.6}
            highlightDelay={1.0}
            blurDuration={0.6}
            viewportOptions={{ once: true, amount: 0.3 }}
          >
            We&apos;re building the operating system for the modern wine trade —
            one that respects the centuries-old craft inside every bottle, and
            modernizes the way it sells, ships, and scales.
          </BlurHighlight>
        </p>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="mx-auto max-w-[1300px] px-6 py-16">
      <div
        className="mx-auto flex min-h-[340px] flex-col items-center justify-center rounded-[20px] px-8 py-16 text-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(146.75deg, rgb(46,46,46) 28%, rgb(0,0,0) 72%)",
        }}
      >
        <h2 className="max-w-[720px] text-[clamp(32px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px]">
          <StaggeredText
            as="span"
            className="justify-center"
            text="Want to build the future of wine with us?"
            segmentBy="words"
            delay={60}
            duration={0.7}
            direction="top"
            blur
          />
        </h2>
        <p className="mt-6 max-w-[600px] text-[19px] leading-[28px] tracking-[-0.19px] text-white/80">
          We&apos;re always looking to talk to importers, distributors, and
          winery teams who are tired of fighting their tools.
        </p>
        <CTAButton cal variant="light" className="mt-8">
          Book A Call
        </CTAButton>
      </div>
    </section>
  );
}
