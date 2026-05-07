import StaggeredText from "@/components/react-bits/staggered-text";
import VariableProximityText from "@/components/react-bits/variable-proximity-text";
import { Nav, Footer } from "@/components/site-chrome";

export const metadata = {
  title: "Schedule a Free Consultation — VinoHub",
  description:
    "Book a free 30-minute digital strategy session for your wine and spirits business.",
};

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
  const inputClass =
    "w-full h-[44px] rounded-[9px] border border-[#dfdfdf] bg-white px-[13px] text-[15px] tracking-[-0.45px] text-ink outline-none placeholder:text-[#797979] focus:border-ink/40 transition-colors";
  const selectClass = `${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2218%22 height=%2218%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23797979%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%2218 15 12 9 6 15%22/></svg>')] bg-[right_13px_center] bg-no-repeat pr-10`;

  return (
    <form className="rounded-[14px] border border-[#d5d5d5] bg-white p-8 md:p-10">
      <div className="space-y-4">
        <input className={inputClass} type="text" name="name" placeholder="Name" />
        <input className={inputClass} type="email" name="email" placeholder="Email" />
        <input className={inputClass} type="text" name="role" placeholder="Role" />
        <input className={inputClass} type="text" name="company" placeholder="Company" />
        <input className={inputClass} type="tel" name="phone" placeholder="Phone" />

        <select className={selectClass} name="erp" defaultValue="">
          <option value="" disabled>
            Which operational/ERP software are you currently using?
          </option>
          <option>None</option>
          <option>VinoShipper</option>
          <option>WineDirect</option>
          <option>Commerce7</option>
          <option>Other</option>
        </select>

        <select className={selectClass} name="priority" defaultValue="">
          <option value="" disabled>
            Which area of your digital presence is currently the highest priority?
          </option>
          <option>Website</option>
          <option>E-commerce</option>
          <option>Portfolio management</option>
          <option>Sales tools</option>
          <option>AI / automation</option>
        </select>

        <select className={selectClass} name="maturity" defaultValue="">
          <option value="" disabled>
            On a scale of 1–5, how &quot;digitally mature&quot; is your current operation?
          </option>
          <option>1 — Just getting started</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5 — Highly mature</option>
        </select>

        <textarea
          className={`${inputClass} h-[110px] resize-none py-[14px] leading-[20px]`}
          name="challenge"
          placeholder="What is the #1 digital challenge you'd like to solve in the next 6 months?"
        />
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
