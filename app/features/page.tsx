import StaggeredText from "@/components/react-bits/staggered-text";
import { CTAButton, Nav, Footer } from "@/components/site-chrome";
import ServicesHeroGraphic from "@/components/services-hero-graphic";
import ChatFlow from "@/components/chat-flow";
import { CapabilityCallouts } from "@/components/capability-callouts";
import { assets } from "../assets";

export const metadata = {
  title: "Features — VinoHub",
  description:
    "The complete wine portfolio management platform. The Hub, AI-powered trade tools, sales sheet generation, and website design built for wine distributors.",
};

// Intentionally a Server Component (no "use client") — Next.js App Router
// allows Server Components to render Client Components like Nav, ChatFlow, etc.
export default function FeaturesPage() {
  return (
    <main className="bg-bg">
      <Nav />
      <FeaturesHero />
      <TheHubSection />
      <SalesSheetsSection />
      <AISection />
      <WebsitesSection />
      <ConsultationCTA />
      <Footer />
    </main>
  );
}

function FeaturesHero() {
  return (
    <section className="px-[34px] pt-[28px]">
      <div className="relative mx-auto h-[861px] w-full overflow-hidden rounded-[25px] bg-[#7f3333]">
        <div className="absolute inset-x-0 top-[560px] bottom-0">
          <ServicesHeroGraphic />
        </div>
        <div className="relative z-10 mx-auto max-w-[820px] px-6 pt-[200px] text-center">
          <h1 className="text-[clamp(40px,5.6vw,62px)] font-medium leading-[1.1] tracking-[-1.86px] text-white">
            <div>
              <StaggeredText
                as="span"
                className="justify-center"
                text="[COPY: Everything Your Team Needs]"
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
                text="[COPY: to Sell More Wine]"
                segmentBy="words"
                delay={60}
                duration={0.7}
                direction="top"
                blur
              />
            </div>
          </h1>
          <p className="mx-auto mt-8 max-w-[620px] text-[20px] leading-[28px] tracking-[-0.2px] text-white/85">
            [COPY: A fully integrated platform built exclusively for wine distributors and importers —
            from portfolio management and AI tools to trade assets and your public website.]
          </p>
        </div>
      </div>
    </section>
  );
}

function TheHubSection() {
  return (
    <section id="hub" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">The Hub</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            [COPY: One place for your entire portfolio]
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            [COPY: The Hub is a centralized platform where your sales team and retail accounts can find
            exactly what they need in seconds — tasting notes, pricing, availability, assets — all from
            a single source of truth.]
          </p>
          <CapabilityCallouts items={[
            "Real-time inventory",
            "Role-based access",
            "Mobile-friendly for reps",
            "One source of truth",
          ]} />
          <CTAButton cal variant="light" className="mt-8">
            Book a Demo
          </CTAButton>
        </div>
        <div className="overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4">
          <img
            src={assets.hubScreenshot}
            alt="The Hub dashboard"
            className="w-full rounded-[8px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function SalesSheetsSection() {
  return (
    <section id="sheets" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        {/* Image left on desktop (md:order-first), copy right; stacks with copy on top on mobile */}
        <div className="overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4 md:order-first">
          <img
            src={assets.salesSheetScreenshot}
            alt="Generated sales sheet"
            className="w-full rounded-[8px] object-cover"
          />
        </div>
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">Sales Sheets &amp; Trade Tools</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            [COPY: Professional collateral at the click of a button]
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            [COPY: Generate branded sales sheets, shelf talkers, and tasting notes directly from
            your live inventory data. Always up to date. No design software, no manual reformatting.]
          </p>
          <CapabilityCallouts items={[
            "Always up to date",
            "Branded templates",
            "Shareable links",
            "No design software needed",
          ]} />
          <CTAButton cal variant="light" className="mt-8">
            Book a Demo
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

function AISection() {
  return (
    <section id="ai" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">VinoHub AI</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            [COPY: An AI partner that knows your portfolio]
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            [COPY: Chat with your wine data to get instant answers, surface insights, and automate the
            tedious work — from cleaning up messy CSVs to answering "which of our Burgundies moved most
            last quarter?"]
          </p>
          <CapabilityCallouts items={[
            "Natural language queries",
            "CSV import & cleanup",
            "Analytics & insights",
            "Bulk data operations",
          ]} />
          <CTAButton cal variant="light" className="mt-8">
            Book a Demo
          </CTAButton>
        </div>

        {/* AI chat visual */}
        <div className="relative h-[400px] overflow-hidden rounded-[16px] border border-[#d5d5d5]">
          <img
            src={assets.vineyardCard}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 h-full">
            <ChatFlow />
          </div>
        </div>
      </div>
    </section>
  );
}

function WebsitesSection() {
  const shots = [assets.siteShot1, assets.siteShot2, assets.siteShot3, assets.siteShot4];

  return (
    <section id="websites" className="mx-auto max-w-[1300px] px-6 py-24">
      {/* Section intro */}
      <div className="mx-auto max-w-[780px] text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">Website Design &amp; Development</p>
        <h2 className="mt-3 text-[clamp(32px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
          [COPY: Your portfolio, live on the web]
        </h2>
        <p className="mx-auto mt-6 max-w-[620px] text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
          [COPY: We design and build public-facing websites for wineries and importers — with one critical
          difference: your site is live-connected to VinoHub. When your inventory updates, your website
          updates too. No static content to maintain. No stale listings.]
        </p>
      </div>

      {/* Callout chips */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[
          "Live inventory integration",
          "No manual updates",
          "Designed for the wine trade",
          "Full setup & ongoing hosting",
        ].map((item) => (
          <span
            key={item}
            className="rounded-full border border-[#d5d5d5] bg-white px-4 py-2 text-[15px] tracking-[-0.15px] text-[#4d4d4d]"
          >
            {item}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <CTAButton cal variant="light">
          Book a call to discuss your website
        </CTAButton>
      </div>

      {/* Screenshot gallery marquee */}
      <div className="relative mt-12 overflow-hidden">
        <style>{`
          @keyframes marquee-features {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .marquee-track-features {
            display: flex;
            gap: 24px;
            width: max-content;
            animation: marquee-features 28s linear infinite;
          }
          .marquee-track-features:hover { animation-play-state: paused; }
        `}</style>

        <div className="marquee-track-features">
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

function ConsultationCTA() {
  return (
    <section className="mx-auto max-w-[1300px] px-6 py-16">
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
            className="justify-center"
            text="Schedule a Free Consultation"
            segmentBy="words"
            delay={70}
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
