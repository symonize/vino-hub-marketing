import { Nav, Footer, CTAButton } from "@/components/site-chrome";
import { CapabilityCallouts } from "@/components/capability-callouts";
import StaggeredText from "@/components/react-bits/staggered-text";
import { assets } from "@/app/assets";

export const metadata = {
  title: "Sales Tools — VinoHub",
  description:
    "Generate on-brand sales sheets, shelf talkers, and trade tools from live inventory data. No designer needed.",
};

export default function SheetsPage() {
  return (
    <main className="bg-bg">
      <Nav />
      <SheetsHero />
      <GenerateSection />
      <LiveDataSection />
      <DesignSection />
      <AITeaseSection />
      <CustomSection />
      <ConsultationCTA />
      <Footer />
    </main>
  );
}

function SheetsHero() {
  return (
    <section className="px-[34px] pt-[28px]">
      <div className="relative mx-auto h-[700px] w-full overflow-hidden rounded-[25px] bg-[#7f3333]">
        <div className="relative z-10 mx-auto max-w-[820px] px-6 pt-[200px] text-center">
          <h1 className="text-[clamp(40px,5.6vw,62px)] font-medium leading-[1.1] tracking-[-1.86px] text-white">
            <div>
              <StaggeredText
                as="span"
                className="justify-center"
                text="Professional sales tools. No designer."
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
                text="No waiting. No excuses."
                segmentBy="words"
                delay={60}
                duration={0.7}
                direction="top"
                blur
              />
            </div>
          </h1>
          <p className="mx-auto mt-8 max-w-[620px] text-[20px] leading-[28px] tracking-[-0.2px] text-white/85">
            Your rep has a buyer meeting in an hour. Today that means scrambling for a PDF, hoping it has the right vintage, and apologizing for the layout. With VinoHub, it means opening their phone and hitting generate.
          </p>
          <div className="mt-10">
            <CTAButton cal variant="dark">Book a Demo</CTAButton>
          </div>
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
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">One-Click Generation</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            Beautiful collateral that builds itself.
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            Sales sheets, shelf talkers, tasting notes — generated instantly from live Hub data. Always branded. Always accurate. No InDesign, no Canva, no back-and-forth with a graphic designer.
          </p>
          <CapabilityCallouts items={["Sales sheets", "Shelf talkers", "Tasting note cards", "Branded templates"]} />
        </div>
        <div className="overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4">
          <img src={assets.salesSheetScreenshot} alt="Generated sales sheet" className="w-full rounded-[8px] object-cover" />
        </div>
      </div>
    </section>
  );
}

function LiveDataSection() {
  return (
    <section id="live-data" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4 md:order-first">
          <img src={assets.salesSheetScreenshot} alt="Live data sales sheet" className="w-full rounded-[8px] object-cover" />
        </div>
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">Always Accurate</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            Your pricing changed last Tuesday. Your sheets know.
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            Every generated asset pulls directly from the Hub in real time. Price updates, vintage changes, new tasting notes — reflected immediately across every piece of collateral. No more emailing updated PDFs to the whole team.
          </p>
          <CapabilityCallouts items={["Pulls from live Hub data", "No manual updates", "Always current pricing", "Shareable links"]} />
        </div>
      </div>
    </section>
  );
}

function DesignSection() {
  return (
    <section id="design" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">Design at Scale</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            Cancel the designer retainer.
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            VinoHub generates on-brand, print-ready materials for your entire portfolio. Whether you have 50 SKUs or 5,000, every wine gets the same quality of presentation. Your brand, applied consistently, at a scale no human team could match.
          </p>
          <CapabilityCallouts items={["Print-ready output", "Consistent brand", "Scales to any portfolio size", "No design software needed"]} />
        </div>
        <div className="overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4">
          <img src={assets.hubScreenshot} alt="Design at scale" className="w-full rounded-[8px] object-cover" />
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
          Don&apos;t have tasting notes? AI writes them.
        </h2>
        <p className="mx-auto mt-6 max-w-[600px] text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
          VinoHub AI generates tasting notes, product descriptions, and shelf talker copy automatically — in your voice, from your data. One less thing for your team to write.
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
          Need custom collateral formats?
        </h2>
        <p className="mx-auto mt-6 max-w-[580px] text-[19px] leading-[28px] tracking-[-0.19px] text-white/70">
          Got a specific template, custom branded format, or regional requirement? We build custom generators that fit exactly how your team sells.
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
            text="Stop sending outdated PDFs. Start sending confidence."
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
