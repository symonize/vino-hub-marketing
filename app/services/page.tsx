import StaggeredText from "@/components/react-bits/staggered-text";
import VariableProximityText from "@/components/react-bits/variable-proximity-text";
import { CTAButton, Nav, Footer } from "@/components/site-chrome";
import ServicesHeroGraphic from "@/components/services-hero-graphic";
import WineAssetTabs from "@/components/wine-asset-tabs";
import { assets } from "../assets";

export const metadata = {
  title: "Services — VinoHub",
  description:
    "Digital innovation rooted in the wine trade. Asset management, websites, and AI built for wine and spirits.",
};

export default function ServicesPage() {
  return (
    <main className="bg-bg">
      <Nav />

      <ServicesHero />
      <WineAssetTabs />
      <WebsiteSection />
      <AISolutionsSection />
      <ConsultationCTA />

      <Footer />
    </main>
  );
}

function ServicesHero() {
  return (
    <section className="px-[34px] pt-[28px]">
      <div className="relative mx-auto h-[861px] w-full overflow-hidden rounded-[25px] bg-[#7f3333]">
        {/* Background graphic with bottle nodes + animated lines */}
        <div className="absolute inset-x-0 top-[560px] bottom-0">
          <ServicesHeroGraphic />
        </div>

        {/* Foreground heading + subheading */}
        <div className="relative z-10 mx-auto max-w-[820px] px-6 pt-[200px] text-center">
          <h1 className="text-[clamp(40px,5.6vw,62px)] font-medium leading-[1.1] tracking-[-1.86px] text-white">
            <div>
              <StaggeredText
                as="span"
                className="justify-center"
                text="Digital Innovation"
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
                className="justify-center"
                text="Rooted in the"
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
                text="Wine Trade"
                segmentBy="words"
                delay={60}
                duration={0.7}
                direction="top"
                blur
              />
            </div>
          </h1>
          <p className="mx-auto mt-8 max-w-[620px] text-[20px] leading-[28px] tracking-[-0.2px] text-white/85">
            In a crowded market, your digital workflow should be as premium as
            your portfolio. We provide a specialized suite of digital services
            built exclusively to solve the unique operational and marketing
            challenges of the wine and spirits industry.
          </p>
        </div>
      </div>
    </section>
  );
}

function WebsiteSection() {
  return (
    <section id="web" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="max-w-[470px]">
          <h2 className="text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            Website Design &amp; Development
          </h2>
          <CTAButton href="#web" variant="light" className="mt-8">
            Learn More
          </CTAButton>
        </div>
        <div className="max-w-[500px] space-y-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#363636]">
          <p>
            A website shouldn&apos;t just look good; it should work as hard as
            your winery team.
          </p>
          <p>
            Everything starts here. We design and build websites with a wine
            database workflow at their core: so your site isn&apos;t just a
            pretty storefront, it&apos;s the backbone of your entire digital
            operation.
          </p>
        </div>
      </div>
    </section>
  );
}

function AISolutionsSection() {
  return (
    <section id="ai" className="mx-auto max-w-[1300px] px-6 py-16">
      <div className="mx-auto max-w-[720px] text-center">
        <h2 className="text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
          The wine world is traditional, but your operations don&apos;t have
          to be.
        </h2>
        <p className="mx-auto mt-6 max-w-[549px] text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
          We create custom AI solutions specifically tailored to the unique
          needs of the wine and spirits industry.
        </p>
        <CTAButton cal variant="light" className="mt-8">
          Schedule A Call
        </CTAButton>
      </div>

      {/* Top row: two cards side-by-side */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Wine bottles card (red) */}
        <article className="relative flex h-[364px] flex-col justify-between overflow-hidden rounded-[12px] border border-[#d9d9d9] bg-[#7f3333] p-8 text-white">
          <div>
            <h3 className="max-w-[330px] text-[32px] font-medium leading-[40px] tracking-[-0.96px]">
              Instantly Organize and Manage
            </h3>
            <p className="mt-4 max-w-[404px] text-[19px] leading-[28px] tracking-[-0.19px]">
              You have 5,000 SKUs with inconsistent naming, missing vintages,
              and duplicated entries? AI can clean, categorize, and structure
              that data in days instead of months.
            </p>
          </div>
          <div className="pointer-events-none absolute -bottom-4 right-0 flex items-end gap-3 opacity-90">
            <img src={assets.bottleA} alt="" className="h-[140px] w-auto object-contain" />
            <img src={assets.bottleB} alt="" className="h-[160px] w-auto object-contain" />
            <img src={assets.bottleC} alt="" className="h-[155px] w-auto object-contain" />
          </div>
        </article>

        {/* Sales sheets card (white) */}
        <article className="relative flex h-[364px] flex-col justify-between overflow-hidden rounded-[12px] border border-[#d9d9d9] bg-white p-8 text-[#2f2f2f]">
          <div>
            <h3 className="max-w-[400px] text-[32px] font-medium leading-[37px] tracking-[-0.96px]">
              Generate Sales Sheets and more at the click of a button
            </h3>
            <p className="mt-4 max-w-[400px] text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
              Empower your sales reps to generate professional sales sheets and
              shelf talkers instantly.
            </p>
          </div>
          <div className="absolute right-6 bottom-6">
            <img
              src={assets.salesSheetCard}
              alt=""
              className="h-[160px] w-auto rounded-[6px] border border-[#d9d9d9] object-cover"
            />
          </div>
        </article>
      </div>

      {/* Bottom: full-width vineyard card with overlaid chat bubbles */}
      <article className="relative mt-6 h-[495px] overflow-hidden rounded-[12px] border border-[#d9d9d9]">
        <img
          src={assets.vineyardWide}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative z-10 flex h-full flex-col justify-end gap-3 p-8 md:p-12">
          {/* User message */}
          <div className="flex max-w-[420px] items-center gap-3 rounded-[15px] border border-white/30 bg-black/30 p-4 backdrop-blur-md">
            <span className="text-[22px] leading-[28px] tracking-[-0.66px] text-white">
              Update all our inventory from this CSV
            </span>
            <span className="ml-auto flex h-[52px] w-[52px] flex-shrink-0 flex-col items-center justify-center rounded-t-[7px] bg-white">
              <img src={assets.excelLogo} alt="" className="h-[24px] w-[24px]" />
              <span className="mt-1 text-[8px] font-medium tracking-[-0.27px] text-[#2a2a2a]">
                Wine List 2026
              </span>
            </span>
          </div>

          {/* AI response */}
          <div className="flex max-w-[460px] items-center gap-3 rounded-[15px] border border-white/30 bg-[#7f3333]/70 p-4 backdrop-blur-md">
            <span className="text-[22px] leading-[28px] tracking-[-0.66px] text-white">
              No problem, I&apos;ve updated 218 wines in your inventory based on
              this data.
            </span>
          </div>
        </div>

        {/* Right-side AI partner panel */}
        <div className="absolute top-1/2 right-12 z-10 hidden -translate-y-1/2 max-w-[330px] text-white md:block">
          <h3 className="text-[32px] font-medium leading-[40px] tracking-[-0.96px]">
            An AI partner
          </h3>
          <p className="mt-3 text-[19px] leading-[28px] tracking-[-0.19px]">
            Chat with your wine info to get insights and analytics to help you
            make informed decisions.
          </p>
          <a
            href="#ai"
            className="mt-6 inline-flex h-[38px] items-center rounded-[12px] border border-white/30 bg-white px-4 text-[17px] font-medium tracking-[-0.17px] text-[#3e3e3e] transition-transform duration-200 hover:scale-[1.04]"
          >
            <VariableProximityText label="Get AI Powered" />
          </a>
        </div>
      </article>
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
