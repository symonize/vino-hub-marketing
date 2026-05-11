"use client";

import { useState } from "react";
import StaggeredText from "@/components/react-bits/staggered-text";
import VariableProximityText from "@/components/react-bits/variable-proximity-text";
import { Nav, Footer } from "@/components/site-chrome";
import { CAL_DATA } from "@/components/cal-config";
import SkuSlider from "@/components/sku-slider";

// Pricing model: scale base prices linearly above the baseline 120 SKUs.
const BASE_SKUS = 120;
const STARTER_BASE = 120;
const PRO_BASE = 230;
function priceForSkus(base: number, skus: number) {
  const factor = Math.max(1, skus / BASE_SKUS);
  return Math.round(base * factor);
}

type Feature = { label: string; icon: "grid" | "image" | "ruler" | "sparkles" };
const STARTER_FEATURES: Feature[] = [
  { label: "Inventory Dashboard", icon: "grid" },
  { label: "Asset Management", icon: "image" },
  { label: "Stand alone trade tools", icon: "ruler" },
];
const PRO_FEATURES: Feature[] = [
  ...STARTER_FEATURES,
  { label: "VinoHub AI", icon: "sparkles" },
];

export default function PricingPage() {
  const [skus, setSkus] = useState(120);

  return (
    <main className="bg-bg">
      <Nav />

      <section className="px-6 pt-[160px]">
        <div className="mx-auto max-w-[820px] text-center">
          <h1 className="text-[clamp(40px,5.6vw,62px)] font-medium leading-[1.1] tracking-[-1.86px] text-[#353535]">
            <StaggeredText
              as="span"
              className="justify-center font-serif italic font-normal"
              text="Simple pricing"
              segmentBy="words"
              delay={60}
              duration={0.7}
              direction="top"
              blur
            />
            <StaggeredText
              as="span"
              className="justify-center"
              text="based on your needs"
              segmentBy="words"
              delay={60}
              duration={0.7}
              direction="top"
              blur
            />
          </h1>
          <p className="mx-auto mt-6 max-w-[549px] text-[20px] leading-[28px] tracking-[-0.2px] text-[#6d6d6d]">
            A fully customizable wine inventory management software for wine
            distributors to simplify portfolio management with a fully
            integrated, AI powered trade tools platform.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-[420px]">
          <SkuSlider value={skus} onChange={setSkus} />
        </div>
      </section>

      <PricingGrid skus={skus} />

      <section className="mx-auto max-w-[820px] px-6 pb-16 text-center">
        <p className="text-[16px] leading-[24px] tracking-[-0.16px] text-[#8a8a8a]">
          Website design &amp; development is available as a custom add-on.{" "}
          <button
            type="button"
            className="underline underline-offset-2 transition-colors hover:text-[#4d4d4d]"
            {...CAL_DATA}
          >
            Book a call
          </button>{" "}
          to discuss.
        </p>
      </section>

      <Footer />
    </main>
  );
}

function PricingGrid({ skus }: { skus: number }) {
  const starterPrice = priceForSkus(STARTER_BASE, skus);
  const proPrice = priceForSkus(PRO_BASE, skus);

  return (
    <section className="mx-auto max-w-[1300px] px-6 pb-24 pt-12">
      <div className="grid items-stretch gap-6 md:grid-cols-3">
        <PricingCard
          variant="light"
          dotColor="#e88a5a"
          name="Starter"
          subtitle="Core inventory + asset management"
          price={`$${starterPrice}`}
          period="/mo"
          features={STARTER_FEATURES}
          ctaLabel="Get Started"
        />
        <PricingCard
          variant="dark"
          featured
          dotColor="#7fd66a"
          name="Professional"
          subtitle="Core inventory + asset management"
          price={`$${proPrice}`}
          period="/mo"
          features={PRO_FEATURES}
          ctaLabel="Get Started"
        />
        <PricingCard
          variant="light"
          dotColor="#5a90e8"
          name="Enterprise"
          subtitle="Tailored for large portfolios"
          price="Let's Talk"
          features={STARTER_FEATURES}
          ctaLabel="Book A Call"
        />
      </div>
    </section>
  );
}

interface PricingCardProps {
  variant: "light" | "dark";
  featured?: boolean;
  dotColor: string;
  name: string;
  subtitle: string;
  price: string;
  period?: string;
  features: Feature[];
  ctaLabel: string;
}

function PricingCard({
  variant,
  featured,
  dotColor,
  name,
  subtitle,
  price,
  period,
  features,
  ctaLabel,
}: PricingCardProps) {
  const isDark = variant === "dark";

  const wrapperBase =
    "relative flex flex-col rounded-[14px] border p-7 transition-transform duration-300";
  const wrapperLight = "border-[#d5d5d5] bg-white text-[#353535]";
  const wrapperDark = "border-white/10 text-white";

  const subColor = isDark ? "text-white/70" : "text-[#6d6d6d]";
  const periodColor = isDark ? "text-white/60" : "text-[#838383]";
  const dividerColor = isDark ? "border-white/15" : "border-[#e6e6e6]";
  const featureColor = isDark ? "text-white/85" : "text-[#4d4d4d]";
  const includesColor = isDark ? "text-white" : "text-[#353535]";

  return (
    <article
      className={`${wrapperBase} ${isDark ? wrapperDark : wrapperLight} ${
        featured ? "md:-my-4 md:shadow-2xl md:shadow-black/20" : ""
      }`}
      style={
        isDark
          ? {
              backgroundImage:
                "linear-gradient(41.13deg, rgb(0,0,0) 43.58%, rgb(103,103,103) 98.76%)",
            }
          : undefined
      }
    >
      {featured && (
        <div className="absolute -top-px left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/15 bg-black px-4 py-1.5 text-white">
          <FeatureIcon kind="sparkles" className="text-white" />
          <span className="text-[14px] font-medium tracking-[-0.14px]">
            VinoHub AI
          </span>
        </div>
      )}

      <div className="flex items-center gap-2.5">
        <span
          className="size-[14px] rounded-full"
          style={{ backgroundColor: dotColor }}
        />
        <h3 className="font-serif text-[27px] italic leading-none tracking-[-0.81px]">
          {name}
        </h3>
      </div>

      <p className={`mt-3 text-[18px] leading-[24px] tracking-[-0.18px] ${subColor}`}>
        {subtitle}
      </p>

      <div className={`mt-5 border-t ${dividerColor}`} />

      <div className="mt-6 flex items-end gap-1">
        <span className="text-[54px] font-medium leading-none tracking-[-1.62px]">
          {price.startsWith("$") ? (
            <>
              <span className="text-[34.83px] align-top">$</span>
              <span>{price.slice(1)}</span>
            </>
          ) : (
            price
          )}
        </span>
        {period && (
          <span className={`pb-2 text-[20px] tracking-[-0.6px] ${periodColor}`}>
            {period}
          </span>
        )}
      </div>

      <p className={`mt-6 text-[16px] font-medium tracking-[-0.48px] ${includesColor}`}>
        {name === "Enterprise" ? "Everything in Pro, plus:" : `${name} includes:`}
      </p>

      <ul className="mt-3 space-y-2.5">
        {features.map((f) => (
          <li key={f.label} className="flex items-center gap-2.5">
            <FeatureIcon kind={f.icon} className={isDark ? "text-white/80" : "text-[#4d4d4d]"} />
            <span className={`text-[16px] tracking-[-0.48px] ${featureColor}`}>
              {f.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-10">
        <button
          type="button"
          {...CAL_DATA}
          className={`flex h-[42px] w-full items-center justify-center rounded-[12px] border text-[17px] font-medium tracking-[-0.17px] transition-transform duration-200 hover:scale-[1.02] ${
            isDark
              ? "border-white/25 bg-white/5 text-white hover:bg-white/10"
              : "border-black/25 bg-white text-[#3e3e3e] hover:bg-black/[0.02]"
          }`}
        >
          <VariableProximityText label={ctaLabel} />
        </button>
      </div>
    </article>
  );
}

function FeatureIcon({
  kind,
  className = "",
}: {
  kind: Feature["icon"];
  className?: string;
}) {
  const common = `size-[18px] ${className}`;
  switch (kind) {
    case "grid":
      return (
        <svg className={common} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2.75" y="2.75" width="5" height="5" rx="1" />
          <rect x="10.25" y="2.75" width="5" height="5" rx="2.5" />
          <rect x="2.75" y="10.25" width="5" height="5" rx="1" />
          <path d="M12.75 10.25v5M10.25 12.75h5" />
        </svg>
      );
    case "image":
      return (
        <svg className={common} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2.75" y="2.75" width="12.5" height="12.5" rx="2" />
          <circle cx="6.5" cy="6.75" r="1.25" />
          <path d="M3 12.5l3.5-3.5 4 4 2.5-2 2 2" />
        </svg>
      );
    case "ruler":
      return (
        <svg className={common} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.75 11.25l8.5-8.5 4 4-8.5 8.5z" />
          <path d="M5.5 6.5l1.5 1.5M8 4l1.5 1.5M11 7l1.5 1.5M8.5 9.5l1.5 1.5" />
        </svg>
      );
    case "sparkles":
      return (
        <svg className={common} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 2.5l1.5 4 4 1.5-4 1.5L9 13.5 7.5 9.5 3.5 8l4-1.5z" />
          <path d="M14 12.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" />
        </svg>
      );
  }
}
