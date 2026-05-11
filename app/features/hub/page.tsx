import { Nav, Footer, CTAButton } from "@/components/site-chrome";
import { CapabilityCallouts } from "@/components/capability-callouts";
import StaggeredText from "@/components/react-bits/staggered-text";
import { assets } from "@/app/assets";

export const metadata = {
  title: "The Hub — VinoHub",
  description:
    "The command center for your entire wine portfolio. Manage wines, wineries, vintages, assets, and data from one beautiful dashboard.",
};

export default function HubPage() {
  return (
    <main className="bg-bg">
      <Nav />
      <HubHero />
      <EverythingSection />
      <TeamSection />
      <LiveSection />
      <AITeaseSection />
      <CustomSection />
      <ConsultationCTA />
      <Footer />
    </main>
  );
}

function HubHero() {
  return (
    <section className="px-[34px] pt-[28px]">
      <div className="relative mx-auto h-[700px] w-full overflow-hidden rounded-[25px] bg-[#7f3333]">
        <div className="relative z-10 mx-auto max-w-[820px] px-6 pt-[200px] text-center">
          <h1 className="text-[clamp(40px,5.6vw,62px)] font-medium leading-[1.1] tracking-[-1.86px] text-white">
            <div>
              <StaggeredText
                as="span"
                className="justify-center"
                text="The command center for your entire"
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
                text="wine portfolio."
                segmentBy="words"
                delay={60}
                duration={0.7}
                direction="top"
                blur
              />
            </div>
          </h1>
          <p className="mx-auto mt-8 max-w-[620px] text-[20px] leading-[28px] tracking-[-0.2px] text-white/85">
            Your inventory lives in three spreadsheets, a shared Dropbox, and someone&apos;s inbox. VinoHub Hub brings all of it — wines, wineries, vintages, tasting notes, assets, pricing — into one clean, beautiful dashboard your whole team can actually use.
          </p>
        </div>
      </div>
    </section>
  );
}

function EverythingSection() {
  return (
    <section id="everything" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">One Source of Truth</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            Every wine. Every vintage. Every asset. No more hunting.
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            Add wines, wineries, regions, and varietals. Attach images, PDFs, tasting notes, and tech sheets. Every data point the trade needs — structured, searchable, and always up to date.
          </p>
          <CapabilityCallouts items={["Full wine data model", "Image & asset management", "Searchable & filterable", "Always current"]} />
        </div>
        <div className="overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4">
          <img src={assets.hubScreenshot} alt="Hub dashboard" className="w-full rounded-[8px] object-cover" />
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section id="team" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4 md:order-first">
          <img src={assets.dashCard1} alt="Hub team view" className="w-full rounded-[8px] object-cover" />
        </div>
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">Built for the Trade</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            Beautiful enough that people actually use it.
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            Role-based access for admins, sales reps, and account managers. Mobile-ready for reps in the field. Clean enough for your most spreadsheet-resistant teammate. Powerful enough for your most data-obsessed one.
          </p>
          <CapabilityCallouts items={["Role-based access", "Mobile-ready", "Admin & rep views", "No training required"]} />
        </div>
      </div>
    </section>
  );
}

function LiveSection() {
  return (
    <section id="live" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">Connected Platform</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            Update once. Everything updates.
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            The Hub is the single source of truth your entire operation runs on. Change a price, update a vintage, add a new wine — your sales sheets, your website, and your team all see it instantly.
          </p>
          <CapabilityCallouts items={["Powers sales sheet generation", "Feeds your public website", "Real-time sync", "Zero manual updates"]} />
        </div>
        <div className="overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4">
          <img src={assets.dashCard2} alt="Hub live sync" className="w-full rounded-[8px] object-cover" />
        </div>
      </div>
    </section>
  );
}

function AITeaseSection() {
  return (
    <section className="bg-[#f9f8f6] py-20">
      <div className="mx-auto max-w-[780px] px-6 text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">Powered by VinoHub AI</p>
        <h2 className="mt-3 text-[clamp(28px,4vw,42px)] font-medium leading-[1.18] tracking-[-1.2px] text-[#2f2f2f]">
          Your data, but intelligent.
        </h2>
        <p className="mx-auto mt-6 max-w-[600px] text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
          Import a messy supplier CSV and watch AI clean, categorize, and structure it in seconds. Ask questions in plain English. Get answers, not reports.
        </p>
        <a href="/features/ai" className="mt-8 inline-flex items-center text-[#7f3333] font-semibold hover:underline">
          Learn about VinoHub AI →
        </a>
      </div>
    </section>
  );
}

function CustomSection() {
  return (
    <section className="mx-auto max-w-[1300px] px-6 py-16">
      <div className="rounded-[20px] bg-[#1a1a1a] px-8 py-16 text-center text-white">
        <p className="text-[13px] font-semibold uppercase tracking-[2px] text-white/50">Custom &amp; Bespoke</p>
        <h2 className="mx-auto mt-4 max-w-[680px] text-[clamp(28px,4vw,42px)] font-medium leading-[1.18] tracking-[-1.2px]">
          Need something built to spec?
        </h2>
        <p className="mx-auto mt-6 max-w-[580px] text-[19px] leading-[28px] tracking-[-0.19px] text-white/70">
          Every operation is different. If your workflow has unique requirements — custom data fields, integrations, or specialized reporting — we build to fit.
        </p>
        <CTAButton cal variant="dark" className="mt-8">Talk to us about custom work</CTAButton>
      </div>
    </section>
  );
}

function ConsultationCTA() {
  return (
    <section className="mx-auto max-w-[1300px] px-6 py-16">
      <div
        className="mx-auto flex min-h-[418px] flex-col items-center justify-center rounded-[20px] px-8 py-20 text-center text-white"
        style={{ backgroundImage: "linear-gradient(146.75deg, rgb(46,46,46) 28%, rgb(0,0,0) 72%)" }}
      >
        <h2 className="max-w-[780px] text-[clamp(32px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px]">
          <StaggeredText
            as="span"
            className="justify-center"
            text="Stop managing your portfolio in five places at once."
            segmentBy="words"
            delay={70}
            duration={0.7}
            direction="top"
            blur
          />
        </h2>
        <p className="mt-8 max-w-[704px] text-[19px] leading-[28px] tracking-[-0.19px] text-white/80">
          In the wine and spirits industry, digital presence is no longer just a &ldquo;nice-to-have&rdquo;: it&apos;s a critical driver of operational efficiency and market share.
        </p>
        <p className="mt-4 max-w-[704px] text-[19px] leading-[28px] tracking-[-0.19px] text-white/80">
          Knowing where to invest your resources first can be a challenge and in this free 30-minute session, we&apos;ll move past the jargon and focus on the practical steps.
        </p>
        <CTAButton cal variant="light" className="mt-10">Book A Call</CTAButton>
      </div>
    </section>
  );
}
