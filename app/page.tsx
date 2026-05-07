import { assets } from "./assets";
import StaggeredText from "@/components/react-bits/staggered-text";
import VariableProximityText from "@/components/react-bits/variable-proximity-text";
import Testimonials from "@/components/testimonials";
import ChatFlow from "@/components/chat-flow";
import { CTAButton, Nav, Footer } from "@/components/site-chrome";
import ScrollRevealGrid from "@/components/scroll-reveal-grid";
import StickyGridScroll from "@/components/sticky-grid-scroll";

export default function Home() {
  return (
    <main className="bg-bg">
      <Hero />
      {/* <Testimonials /> */}
      <PortfolioStickyGrid />
      <FeatureCards />
      <ConsultationCTA />
      <WebsiteGallery />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative z-10 w-full overflow-hidden bg-bg">
      {/* Layer 1: Sky */}
      <img
        src={assets.heroSky}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-top select-none"
      />

      {/* Layer 3: Vineyard — clips just the bottom ~25% of the hero */}
      <img
        src={assets.heroVineyard}
        alt=""
        aria-hidden
        className="absolute inset-x-0 bottom-0 w-full object-cover object-top select-none pointer-events-none z-[3]"
        style={{ height: "25%" }}
      />

      <Nav />

      {/* Content: flows naturally, sets the section height */}
      <div className="relative z-[4] flex flex-col items-center">

        {/* Hero text */}
        <div id="demo" className="mx-auto flex max-w-[1100px] flex-col items-center px-6 pt-[200px] pb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/20 px-3 py-2 backdrop-blur-sm">
            <img src={assets.aiIcon} alt="" className="h-[18px] w-[18px]" />
            <span className="text-[17px] font-medium text-white tracking-[-0.17px]">
              Introducing VinoAI
            </span>
          </div>

          <h1 className="mt-8 flex max-w-[900px] flex-wrap justify-center gap-x-[0.28em] text-[clamp(40px,6vw,62px)] font-medium leading-[1.09] tracking-[-1.86px] text-white">
            <StaggeredText as="span" text="The" segmentBy="words" delay={60} duration={0.7} direction="top" blur />
            <StaggeredText
              as="span"
              className="font-serif italic font-normal"
              text="better way"
              segmentBy="words"
              delay={60}
              duration={0.7}
              direction="top"
              blur
            />
            <StaggeredText as="span" text="to manage your wine portfolio." segmentBy="words" delay={60} duration={0.7} direction="top" blur />
          </h1>

          <p className="mt-6 max-w-[549px] text-[19px] leading-[24px] tracking-[-0.19px] text-white/85">
            <StaggeredText
              as="span"
              text="A fully customizable wine portfolio management software for wine distributors to simplify portfolio management with a fully integrated, AI powered trade tools platform."
              segmentBy="words"
              delay={15}
              duration={0.5}
              direction="top"
              blur
            />
          </p>

          <div className="mt-8 flex gap-3">
            <a
              href="#demo"
              className="flex h-[38px] items-center rounded-[12px] bg-white px-4 text-[17px] font-medium text-[#3e3e3e] tracking-[-0.17px] transition-transform duration-200 hover:scale-[1.04]"
            >
              <VariableProximityText label="View Demo" />
            </a>
            <a
              href="#consult"
              className="flex h-[38px] items-center rounded-[12px] border border-white/30 px-4 text-[17px] font-medium text-white tracking-[-0.17px] transition-colors duration-200 hover:bg-white/10"
            >
              <VariableProximityText label="Book a Consult" />
            </a>
          </div>
        </div>

        {/* Layer 2: Dashboard — in normal flow, below text, behind vineyard via z-index */}
        <div className="relative z-[2] w-full max-w-[860px] px-6 pb-[18%]">
          <img
            src={assets.heroDashboard}
            alt="VinoHub dashboard"
            className="w-full rounded-[12px] shadow-2xl shadow-black/50"
          />
        </div>

      </div>
    </section>
  );
}

const GRID_IMAGES = [
  assets.dashCard1,
  assets.vineyardCard,
  assets.dashCard2,
  assets.hubScreenshot,
  assets.salesSheetScreenshot,
  assets.siteShot1,
  assets.siteShot2,
  assets.siteShot3,
  assets.siteShot4,
];

function PortfolioStickyGrid() {
  return (
    <StickyGridScroll
      images={GRID_IMAGES}
      title={
        <>
          <div>With us, portfolio</div>
          <div>management is</div>
          <div className="font-serif italic font-normal">a breeze.</div>
        </>
      }
      description="Update all your wine inventory from a single source of truth — all from a beautiful dashboard that anyone can use."
      cta={
        <CTAButton href="#demo" variant="light">
          View The Demo
        </CTAButton>
      }
    />
  );
}

function FeatureCards() {
  return (
    <section className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="mx-auto max-w-[780px] text-center">
        <h2 className="text-center text-[clamp(32px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-ink">
          <div>
            <StaggeredText
              as="span"
              className="justify-center"
              text="Everything Your Team Needs"
              segmentBy="words"
              delay={55}
              duration={0.7}
              direction="top"
              blur
            />
          </div>
          <div>
            <StaggeredText
              as="span"
              className="justify-center"
              text="to Sell More Wine."
              segmentBy="words"
              delay={55}
              duration={0.7}
              direction="top"
              blur
            />
          </div>
          <div>
            <StaggeredText
              as="span"
              className="justify-center font-serif italic font-normal"
              text="In One Place"
              segmentBy="words"
              delay={55}
              duration={0.7}
              direction="top"
              blur
            />
          </div>
        </h2>
        <p className="mx-auto mt-6 max-w-[549px] text-[19px] leading-[28px] tracking-[-0.19px] text-muted">
          Update all your wine portfolio from a single source of truth all from a
          beautiful dashboard that anyone can use.
        </p>
        <CTAButton href="#demo" variant="light" className="mt-8">
          View The Demo
        </CTAButton>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Card 1: Meet The Hub (wine red) */}
        <article id="hub" className="relative flex min-h-[364px] flex-col justify-between overflow-hidden rounded-[12px] border border-[#d9d9d9] bg-wine p-8 text-white">
          <div>
            <h3 className="text-[32px] font-medium leading-[40px] tracking-[-0.96px]">
              Meet The Hub
            </h3>
            <p className="mt-2 max-w-[374px] text-[19px] leading-[28px] tracking-[-0.19px]">
              A centralized platform where your sales team and retail accounts
              can find exactly what they need in seconds, not hours.
            </p>
          </div>
          <CTAButton href="#hub" variant="light" className="mt-6 w-fit border-transparent">
            Learn More
          </CTAButton>
        </article>

        {/* Card 2: Sales sheets */}
        <article id="sheets" className="relative flex min-h-[364px] flex-col justify-between overflow-hidden rounded-[12px] border border-[#d9d9d9] bg-white p-8">
          <div>
            <h3 className="text-[32px] font-medium leading-[37px] tracking-[-0.96px] text-ink">
              Generate Sales Sheets and more at the click of a button
            </h3>
            <p className="mt-4 max-w-[394px] text-[19px] leading-[28px] tracking-[-0.19px] text-muted">
              Empower your sales reps to generate professional sales sheets and
              shelf talkers instantly.
            </p>
          </div>
          <div className="mt-6 flex items-end justify-between gap-4">
            <CTAButton href="#sheets" variant="light">
              Learn More
            </CTAButton>
            <img
              src={assets.salesSheetScreenshot}
              alt=""
              className="h-[160px] w-[240px] rounded-[5px] border border-[#c7c7c7] object-cover"
            />
          </div>
        </article>
      </div>

      {/* AI partner full-width card */}
      <article id="ai" className="relative mt-6 min-h-[495px] overflow-hidden rounded-[12px] border border-[#d9d9d9]">
        <img src={assets.hubScreenshot} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/30 to-black/60" />

        <ChatFlow />

        <div className="absolute right-8 top-12 max-w-[340px] text-white">
          <h3 className="text-[32px] font-medium leading-[40px] tracking-[-0.96px]">
            An AI partner
          </h3>
          <p className="mt-2 text-[19px] leading-[28px] tracking-[-0.19px]">
            Chat with your wine info to get insights and analytics to help you
            make informed decisions.
          </p>
          <CTAButton href="#ai" variant="light" className="mt-6 border-transparent">
            Get AI Powered
          </CTAButton>
        </div>
      </article>
    </section>
  );
}

function ConsultationCTA() {
  return (
    <section id="consult" className="mx-auto max-w-[1300px] px-6 py-16">
      <div
        className="mx-auto flex min-h-[418px] flex-col items-center justify-center rounded-[20px] px-8 py-20 text-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(146.75deg, rgb(46,46,46) 28%, rgb(0,0,0) 72%)",
        }}
      >
        <h2 className="max-w-[780px] text-[clamp(32px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px]">
          <StaggeredText
            as="span"
            text="Schedule a Free Consultation"
            segmentBy="words"
            delay={80}
            duration={0.7}
            direction="top"
            blur
          />
        </h2>
        <p className="mt-8 max-w-[704px] text-[19px] leading-[28px] tracking-[-0.19px] text-white/80">
          In the wine and spirits industry, digital presence is no longer just a
          &ldquo;nice-to-have&rdquo;: it&apos;s a critical driver of operational
          efficiency and market share.
        </p>
        <p className="mt-4 max-w-[704px] text-[19px] leading-[28px] tracking-[-0.19px] text-white/80">
          Knowing where to invest your resources first can be a challenge and in
          this free 30-minute session, we&apos;ll move past the jargon and focus
          on the practical steps.
        </p>
        <CTAButton cal variant="light" className="mt-10">
          Book A Call
        </CTAButton>
      </div>
    </section>
  );
}

function WebsiteGallery() {
  const shots = [assets.siteShot1, assets.siteShot2, assets.siteShot3, assets.siteShot4];
  return (
    <section id="web" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="max-w-[619px] text-[clamp(32px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-ink">
            <StaggeredText
              as="span"
              text="A website that matches your robust portfolio."
              segmentBy="words"
              delay={70}
              duration={0.7}
              direction="top"
              blur
            />
          </h2>
          <CTAButton href="#web" variant="light" className="mt-8">
            Learn More
          </CTAButton>
        </div>
        <p className="max-w-[616px] text-[19px] leading-[28px] tracking-[-0.19px] text-muted">
          A website shouldn&apos;t just look good; it should work as hard as your
          winery team. Everything starts here. We design and build websites with
          a wine database workflow at their core — so your site isn&apos;t just
          a pretty storefront, it&apos;s the backbone of your entire digital
          operation.
        </p>
      </div>

      <div className="relative mt-12 overflow-hidden">
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            gap: 24px;
            width: max-content;
            animation: marquee 28s linear infinite;
          }
          .marquee-track:hover { animation-play-state: paused; }
        `}</style>

        <div className="marquee-track">
          {[...shots, ...shots].map((src, i) => (
            <div key={i} className="h-[423px] flex-shrink-0 overflow-hidden rounded-[12px]" style={{ width: 320 }}>
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-[150px] bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[150px] bg-gradient-to-l from-bg to-transparent" />
      </div>
    </section>
  );
}

