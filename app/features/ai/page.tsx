import { Nav, Footer, CTAButton } from "@/components/site-chrome";
import { CapabilityCallouts } from "@/components/capability-callouts";
import StaggeredText from "@/components/react-bits/staggered-text";
import { assets } from "@/app/assets";

export const metadata = {
  title: "VinoHub AI — VinoHub",
  description:
    "AI built for the wine trade — trained on your portfolio, fluent in the language of the industry. Clean data, natural language queries, and content at scale.",
};

export default function AIPage() {
  return (
    <main className="bg-bg">
      <Nav />
      <AIHero />
      <CleanSection />
      <AskSection />
      <GenerateSection />
      <PlatformSection />
      <CustomSection />
      <ConsultationCTA />
      <Footer />
    </main>
  );
}

function AIHero() {
  return (
    <section className="px-[34px] pt-[28px]">
      <div className="relative mx-auto h-[700px] w-full overflow-hidden rounded-[25px] bg-[#1a1a1a]">
        <div className="relative z-10 mx-auto max-w-[820px] px-6 pt-[200px] text-center">
          <h1 className="text-[clamp(40px,5.6vw,62px)] font-medium leading-[1.1] tracking-[-1.86px] text-white">
            <div>
              <StaggeredText
                as="span"
                className="justify-center"
                text="Your best employee."
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
                text="Works nights and weekends."
                segmentBy="words"
                delay={60}
                duration={0.7}
                direction="top"
                blur
              />
            </div>
          </h1>
          <p className="mx-auto mt-8 max-w-[620px] text-[20px] leading-[28px] tracking-[-0.2px] text-white/85">
            Generic AI doesn&apos;t know the difference between a n&eacute;gociant and a r&eacute;coltant. VinoHub AI was built for the wine trade &mdash; trained on your portfolio, fluent in the language of the industry.
          </p>
          <div className="mt-10">
            <CTAButton cal variant="dark">Book a Demo</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function CleanSection() {
  return (
    <section id="clean" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">Data Cleanup</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            5,000 SKUs. Cleaned in minutes, not months.
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            Drop in a supplier CSV with inconsistent naming, missing vintages, and duplicated entries. AI categorizes, deduplicates, structures, and maps it to your Hub &mdash; without you touching a single cell.
          </p>
          <CapabilityCallouts items={["CSV Import", "Auto-Categorization", "Deduplication", "Vintage Mapping"]} />
        </div>
        <div className="overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4">
          <img src={assets.dashCard1} alt="AI data cleanup" className="w-full rounded-[8px] object-cover" />
        </div>
      </div>
    </section>
  );
}

function AskSection() {
  return (
    <section id="ask" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4 md:order-first">
          <img src={assets.vineyardCard} alt="Natural language portfolio queries" className="w-full rounded-[8px] object-cover" />
        </div>
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">Natural Language Queries</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            Which Burgundies moved most last quarter? Just ask.
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            No pivot tables, no reports to run, no waiting for your data analyst. Chat with your portfolio in plain English and get answers you can act on immediately.
          </p>
          <CapabilityCallouts items={["Plain English Queries", "Portfolio Insights", "Sales Trends", "Instant Answers"]} />
        </div>
      </div>
    </section>
  );
}

function GenerateSection() {
  return (
    <section id="generate" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">Content at Scale</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            Tasting notes for 400 wines. Ready in minutes.
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            AI generates tasting notes, product descriptions, shelf talker copy, and email blurbs from your wine data. Consistent tone, always on-brand, zero time from your team.
          </p>
          <CapabilityCallouts items={["Tasting Notes", "Product Descriptions", "Shelf Talker Copy", "Email Blurbs"]} />
        </div>
        <div className="overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4">
          <img src={assets.salesSheetScreenshot} alt="AI content generation" className="w-full rounded-[8px] object-cover" />
        </div>
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section id="platform" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4 md:order-first">
          <img src={assets.hubScreenshot} alt="AI powering the whole platform" className="w-full rounded-[8px] object-cover" />
        </div>
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">The Thread Through Everything</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            AI isn&apos;t a feature. It&apos;s what makes every other feature smarter.
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            Hub data gets cleaner &rarr; sheets get more accurate &rarr; your rep walks in with current pricing, every time. The compound effect of AI running through your entire operation.
          </p>
          <CapabilityCallouts items={["Smarter Hub Data", "More Accurate Sheets", "Better Rep Prep", "Continuous Improvement"]} />
        </div>
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
          Need AI built for your specific workflow?
        </h2>
        <p className="mx-auto mt-6 max-w-[580px] text-[19px] leading-[28px] tracking-[-0.19px] text-white/70">
          Have a unique process, a legacy system, or a niche use case? We build custom AI solutions that fit how your business actually operates.
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
            text="The wine trade runs on data. Yours should work harder."
            segmentBy="words"
            delay={70}
            duration={0.7}
            direction="top"
            blur
          />
        </h2>
        <p className="mt-8 max-w-[704px] text-[19px] leading-[28px] tracking-[-0.19px] text-white/80">
          See VinoHub AI in action and find out what it could do for your specific portfolio and workflow.
        </p>
        <CTAButton cal variant="light" className="mt-10">Book A Call</CTAButton>
      </div>
    </section>
  );
}
