"use client";

import StaggeredText from "@/components/react-bits/staggered-text";
import VariableProximityText from "@/components/react-bits/variable-proximity-text";
import { Nav, Footer } from "@/components/site-chrome";
import { useRef, useState, useEffect } from "react";

export default function ConsultPage() {
  return (
    <main className="bg-bg">
      <Nav />

      <section className="px-6 pb-16 pt-[160px] text-center">
        <h1 className="mx-auto max-w-[820px] text-[clamp(40px,5.6vw,62px)] font-medium leading-[1.1] tracking-[-1.86px] text-ink">
          <StaggeredText
            as="span"
            className="justify-center"
            text="Schedule A"
            segmentBy="words"
            delay={70}
            duration={0.7}
            direction="top"
            blur
          />
          <StaggeredText
            as="span"
            className="justify-center font-serif italic font-normal"
            text="Free Consultation"
            segmentBy="words"
            delay={70}
            duration={0.7}
            direction="top"
            blur
          />
        </h1>
        <p className="mx-auto mt-6 max-w-[680px] text-[20px] leading-[28px] tracking-[-0.2px] text-muted">
          In the wine and spirits industry, digital presence is no longer just a
          &ldquo;nice-to-have&rdquo;: it&apos;s a critical driver of operational
          efficiency and market share. However, knowing where to invest your
          resources first can be a challenge.
        </p>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 pb-24">
        <div className="grid gap-16 md:grid-cols-2">
          <SessionDetails />
          <ConsultationForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function SessionDetails() {
  const items = [
    {
      icon: <GlobeIcon />,
      title: "Comprehensive Digital Discovery",
      body: "We will explore your current digital landscape together, identifying what's working and where the bottlenecks are in your current systems.",
    },
    {
      icon: <PrioritizationIcon />,
      title: "Strategic Prioritization",
      body: "Not every digital project is urgent. We'll help you determine which initiatives will provide the most immediate impact for your team and your partners.",
    },
    {
      icon: <BlueprintIcon />,
      title: "A Blueprint for Efficiency",
      body: "Our goal is to make your business more competitive and cost-efficient. We'll discuss how to streamline your digital processes to save time and reduce overhead.",
    },
  ];

  return (
    <div className="max-w-[460px]">
      <h2 className="text-[clamp(28px,3.2vw,36px)] font-medium leading-[1.2] tracking-[-1.08px] text-[#2f2f2f]">
        Our free 30-minutes session includes
      </h2>
      <ul className="mt-10 space-y-8">
        {items.map((item, i) => (
          <li key={item.title}>
            {i > 0 && <hr className="mb-8 border-t border-[#dfdfdf]" />}
            <div className="flex items-center gap-3">
              <span className="text-[#2f2f2f]">{item.icon}</span>
              <h3 className="text-[23px] font-medium leading-[1.3] tracking-[-0.69px] text-[#2f2f2f]">
                {item.title}
              </h3>
            </div>
            <p className="mt-3 text-[18px] leading-[26px] tracking-[-0.18px] text-muted">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConsultationForm() {
  const [erpValues, setErpValues] = useState<string[]>([]);
  const [priorityValue, setPriorityValue] = useState<string>("");
  const [maturityValue, setMaturityValue] = useState<string | null>(null);

  const inputClass =
    "w-full h-[52px] rounded-[9px] border border-[#dfdfdf] bg-white pt-[18px] pb-[6px] px-[13px] text-[15px] tracking-[-0.45px] text-ink outline-none focus:border-ink/40 transition-colors";
  const labelClass =
    "absolute left-[13px] top-1/2 -translate-y-1/2 text-[15px] text-muted pointer-events-none transition-all duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)]";

  return (
    <form className="rounded-[14px] border border-[#d5d5d5] bg-white p-8 md:p-10">
      <div className="space-y-4">

        {/* Name + Email */}
        <div className="grid grid-cols-2 gap-3">
          <div className="float-field relative">
            <input className={inputClass} type="text" name="name" placeholder=" " />
            <label className={labelClass}>Name</label>
          </div>
          <div className="float-field relative">
            <input className={inputClass} type="email" name="email" placeholder=" " />
            <label className={labelClass}>Email</label>
          </div>
        </div>

        {/* Role + Company */}
        <div className="grid grid-cols-2 gap-3">
          <div className="float-field relative">
            <input className={inputClass} type="text" name="role" placeholder=" " />
            <label className={labelClass}>Role</label>
          </div>
          <div className="float-field relative">
            <input className={inputClass} type="text" name="company" placeholder=" " />
            <label className={labelClass}>Company</label>
          </div>
        </div>

        {/* Phone */}
        <div className="max-w-[240px]">
          <div className="float-field relative">
            <input className={inputClass} type="tel" name="phone" placeholder=" " />
            <label className={labelClass}>Phone</label>
          </div>
        </div>

        <hr className="border-t border-[#ebebeb]" />

        {/* ERP — multi-select pills */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
            ERP / Operational software
          </p>
          <div className="flex flex-wrap gap-2">
            {["None", "VinoShipper", "WineDirect", "Commerce7", "Other"].map((opt) => (
              <PillChip
                key={opt}
                label={opt}
                selected={erpValues.includes(opt)}
                onClick={() =>
                  setErpValues((prev) =>
                    prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt]
                  )
                }
              />
            ))}
          </div>
          <input type="hidden" name="erp" value={erpValues.join(",")} />
        </div>

        {/* Priority — single-select pills */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
            Highest priority area
          </p>
          <div className="flex flex-wrap gap-2">
            {["Website", "E-commerce", "Portfolio management", "Sales tools", "AI / automation"].map((opt) => (
              <PillChip
                key={opt}
                label={opt}
                selected={priorityValue === opt}
                onClick={() => setPriorityValue(opt)}
              />
            ))}
          </div>
          <input type="hidden" name="priority" value={priorityValue} />
        </div>

        {/* Maturity — segmented control */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
            Digital maturity
          </p>
          <SegmentedControl
            options={["1", "2", "3", "4", "5"]}
            value={maturityValue}
            onChange={setMaturityValue}
          />
          <div className="flex justify-between text-[11px] text-muted">
            <span>Just starting</span>
            <span>Highly mature</span>
          </div>
          <input type="hidden" name="maturity" value={maturityValue ?? ""} />
        </div>

        {/* Challenge textarea */}
        <div className="float-field relative">
          <textarea
            className="w-full h-[110px] rounded-[9px] border border-[#dfdfdf] bg-white pt-[28px] pb-[10px] px-[13px] text-[15px] tracking-[-0.45px] text-ink outline-none focus:border-ink/40 transition-colors resize-none leading-[20px]"
            name="challenge"
            placeholder=" "
          />
          <label className="absolute left-[13px] top-[14px] text-[15px] text-muted pointer-events-none transition-all duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
            #1 digital challenge in the next 6 months
          </label>
        </div>

      </div>

      <button
        type="submit"
        className="mt-6 flex h-[44px] w-full items-center justify-center rounded-[12px] border border-white/[0.27] bg-black text-[17px] font-medium tracking-[-0.17px] text-white transition-transform duration-200 hover:scale-[1.01]"
      >
        <VariableProximityText label="Send" />
      </button>
    </form>
  );
}

interface PillChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function PillChip({ label, selected, onClick }: PillChipProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const wasSelected = useRef(selected);

  const handleClick = () => {
    const becomingSelected = !selected;
    onClick();
    if (becomingSelected) setIsAnimating(true);
  };

  wasSelected.current = selected;

  return (
    <button
      type="button"
      onClick={handleClick}
      onAnimationEnd={() => setIsAnimating(false)}
      className={[
        "px-[13px] py-[6px] rounded-full border-[1.5px] text-[13.5px] transition-colors duration-150 cursor-pointer select-none",
        selected
          ? "bg-ink text-white border-ink"
          : "bg-white text-ink border-[#d5d5d5] hover:border-ink",
        isAnimating ? "pill-pop-anim" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </button>
  );
}

interface SegmentedControlProps {
  options: string[];
  value: string | null;
  onChange: (val: string) => void;
}

function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ left: 3, width: 0, visible: false });

  useEffect(() => {
    if (!trackRef.current) return;
    const idx = value !== null ? options.indexOf(value) : -1;
    if (idx === -1) {
      setThumb((t) => ({ ...t, visible: false }));
      return;
    }
    const trackWidth = trackRef.current.offsetWidth;
    const btnWidth = (trackWidth - 6) / options.length;
    setThumb({ left: idx * btnWidth + 3, width: btnWidth, visible: true });
  }, [value, options]);

  useEffect(() => {
    if (!trackRef.current) return;
    const ro = new ResizeObserver(() => {
      if (!trackRef.current || value === null) return;
      const idx = options.indexOf(value);
      if (idx === -1) return;
      const trackWidth = trackRef.current.offsetWidth;
      const btnWidth = (trackWidth - 6) / options.length;
      setThumb({ left: idx * btnWidth + 3, width: btnWidth, visible: true });
    });
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [value, options]);

  return (
    <div
      ref={trackRef}
      role="group"
      className="relative flex bg-[#f0f0f0] rounded-[10px] p-[3px] gap-0"
    >
      <div
        className="absolute inset-y-[3px] bg-white rounded-[8px] shadow-sm"
        style={{
          left: thumb.left,
          width: thumb.width,
          opacity: thumb.visible ? 1 : 0,
          transition:
            "left 220ms cubic-bezier(0.4,0,0.2,1), width 220ms cubic-bezier(0.4,0,0.2,1), opacity 150ms",
        }}
      />
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={[
            "relative z-10 flex-1 py-[8px] text-[14px] border-none bg-transparent cursor-pointer transition-colors duration-150 rounded-[8px]",
            value === opt ? "text-ink font-semibold" : "text-muted",
          ].join(" ")}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
      <circle cx="17" cy="17" r="2" />
      <path d="M19 19l2 2" />
    </svg>
  );
}

function PrioritizationIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 7h13" />
      <polyline points="14 4 17 7 14 10" />
      <path d="M20 17H7" />
      <polyline points="10 14 7 17 10 20" />
    </svg>
  );
}

function BlueprintIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 3h10l4 4v14H5z" />
      <polyline points="15 3 15 7 19 7" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="14" y2="16" />
    </svg>
  );
}
