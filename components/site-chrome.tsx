"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { assets } from "@/app/assets";
import VariableProximityText from "@/components/react-bits/variable-proximity-text";
import { CAL_DATA } from "@/components/cal-config";

type CTAVariant = "light" | "dark" | "accent";

export function CTAButton({
  href,
  children,
  variant = "light",
  className = "",
  cal = false,
}: {
  href?: string;
  children: string;
  variant?: CTAVariant;
  className?: string;
  cal?: boolean;
}) {
  const base =
    "inline-flex h-[38px] items-center rounded-[12px] px-4 text-[17px] font-medium tracking-[-0.17px] transition-transform duration-200 hover:scale-[1.04]";
  const styles: Record<CTAVariant, string> = {
    light: "border border-black/25 bg-white text-[#3e3e3e]",
    dark: "border border-white/30 text-white hover:bg-white/10",
    accent: "bg-accent text-black",
  };
  const cls = `${base} ${styles[variant]} ${className}`;

  if (cal) {
    return (
      <button type="button" className={cls} {...CAL_DATA}>
        <VariableProximityText label={children} />
      </button>
    );
  }

  return (
    <a href={href ?? "#"} className={cls}>
      <VariableProximityText label={children} />
    </a>
  );
}

type NavItem = { label: string; href?: string; cal?: boolean };
const NAV_LINKS: NavItem[] = [
  { label: "Features", href: "/features" }, // href used for mobile menu only; desktop renders a dropdown button
  { label: "Pricing", href: "/pricing" },
  { label: "Free Consultation", href: "/consult" },
  { label: "About", href: "/about" },
];

const FEATURE_CARDS = [
  { href: "/features/hub", name: "The Hub", desc: "Your entire wine portfolio. One beautiful dashboard." },
  { href: "/features/sheets", name: "Sales Tools", desc: "On-brand sales sheets & trade tools. No designer needed." },
  { href: "/features/ai", name: "VinoHub AI", desc: "Your best employee. Works nights and weekends." },
] as const;

function NavLink({ label, href, cal, onClick }: NavItem & { onClick?: () => void }) {
  const cls =
    "inline-flex items-center rounded-full px-4 py-2 text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink";
  if (cal) {
    return (
      <button type="button" className={cls} {...CAL_DATA} onClick={onClick}>
        <VariableProximityText label={label} radius={60} />
      </button>
    );
  }
  return (
    <a href={href ?? "#"} className={cls} onClick={onClick}>
      <VariableProximityText label={label} radius={60} />
    </a>
  );
}

function NotchWing({ side }: { side: "left" | "right" }) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      className={`absolute top-0 h-[50px] w-[50px] text-white/70 ${
        side === "left" ? "-left-[50px] rotate-180" : "-right-[50px] rotate-90"
      }`}
      aria-hidden
    >
      <path
        d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Hamburger icon — animates between ☰ and ✕
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
      <motion.span
        className="block h-[1.5px] w-5 rounded-full bg-ink origin-center"
        animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="block h-[1.5px] w-5 rounded-full bg-ink origin-center"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-[1.5px] w-5 rounded-full bg-ink origin-center"
        animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </span>
  );
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setFeaturesOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setFeaturesOpen(false);
    }
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-20 w-[min(1100px,92%)]" style={{ marginRight: "var(--scrollbar-width, 0px)" }}>
      <div
        className="relative"
        ref={navRef}
        onMouseEnter={() => {
          if (leaveTimer.current) clearTimeout(leaveTimer.current);
        }}
        onMouseLeave={() => {
          leaveTimer.current = setTimeout(() => setFeaturesOpen(false), 150);
        }}
      >
        <NotchWing side="left" />
        <NotchWing side="right" />
      <motion.div
        className="overflow-hidden rounded-b-[32px] bg-white/70 backdrop-blur-md shadow-2xl shadow-black/20"
        animate={{ height: mobileOpen ? "auto" : 80 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >

        {/* Top bar — always visible */}
        <div className="flex h-20 items-center justify-between px-4">
          <a href="/" className="ml-4 shrink-0">
            <img
              src={assets.vinoHubWordmark}
              alt="VinoHub"
              width={104}
              height={25}
              className="h-[25px] w-auto"
            />
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1 text-sm font-medium text-ink/80">
            {NAV_LINKS.map((l) =>
              l.label === "Features" ? (
                <li key="features" className="relative">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-full px-4 py-2 text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
                    onMouseEnter={() => setFeaturesOpen(true)}
                    onClick={() => setFeaturesOpen((o) => !o)}
                    aria-expanded={featuresOpen}
                    aria-haspopup="menu"
                  >
                    <VariableProximityText label="Features" radius={60} />
                  </button>
                </li>
              ) : (
                <li key={l.label}>
                  <NavLink label={l.label} href={l.href} cal={l.cal} />
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-3">
            {/* Book Demo — hidden on mobile when menu open to reduce clutter */}
            <button type="button" {...CAL_DATA} className="rounded-[12px] bg-ink px-5 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.04]">
              <VariableProximityText label="Book Demo" />
            </button>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-full hover:bg-ink/5 transition-colors"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* Mobile menu — slides in below the top bar */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.ul
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex md:hidden flex-col px-6 pb-6 pt-2 gap-1 border-t border-black/8"
            >
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.22, ease: "easeOut" }}
                >
                  <NavLink
                    label={l.label}
                    href={l.href}
                    cal={l.cal}
                    onClick={() => setMobileOpen(false)}
                  />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {featuresOpen && (
          <motion.div
            key="features-dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-[88px] z-10 rounded-[20px] bg-white/90 backdrop-blur-md shadow-2xl shadow-black/20 p-4"
          >
            <div className="grid grid-cols-3 gap-3">
              {FEATURE_CARDS.map((card, i) => (
                <motion.a
                  key={card.href}
                  href={card.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setFeaturesOpen(false)}
                  className="flex flex-col rounded-[12px] border border-[#e5e5e5] bg-white p-3 transition-colors hover:border-[#d0d0d0] hover:bg-[#fafafa]"
                >
                  <div className="w-8 h-8 rounded-[8px] bg-[#7f3333] mb-2.5" />
                  <span className="text-[13px] font-semibold text-[#1a1a1a] mb-1">{card.name}</span>
                  <span className="text-[11px] text-[#777] leading-[1.5]">{card.desc}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1300px] px-6 pb-0 pt-16">
      <div className="grid gap-12 md:grid-cols-[200px_200px_1fr]">
        <div>
          <h4 className="text-[20px] font-semibold uppercase tracking-[2px] text-black">
            Features
          </h4>
          <ul className="mt-4 space-y-2 text-[20px] font-medium tracking-[-0.2px] text-[#535353]">
            <li><a href="/features#hub" className="transition-colors hover:text-black">Wine Asset Management</a></li>
            <li><a href="/features#sheets" className="transition-colors hover:text-black">Sales Sheets &amp; Trade Tools</a></li>
            <li><a href="/features#ai" className="transition-colors hover:text-black">AI Solutions</a></li>
            <li><a href="/features#websites" className="transition-colors hover:text-black">Website Design &amp; Dev</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[20px] font-semibold uppercase tracking-[2px] text-black">
            About
          </h4>
          <ul className="mt-4 space-y-2 text-[20px] font-medium tracking-[-0.2px] text-[#535353]">
            <li><a href="/about" className="transition-colors hover:text-black">Our Team</a></li>
            <li><a href="/consult" className="transition-colors hover:text-black">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <p className="font-serif text-[24px] leading-[28px] tracking-[-0.24px] text-black">
            Sign up to receive product and industry updates.
          </p>
          <form className="mt-6 flex h-[53px] items-center rounded-[12px] border border-[#cacaca] bg-white pl-5 pr-2">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 bg-transparent text-[20px] tracking-[-0.2px] text-[#535353] outline-none placeholder:text-[#535353]"
            />
            <button
              type="submit"
              className="flex h-[38px] w-[95px] items-center justify-center rounded-[12px] bg-accent text-[17px] font-medium tracking-[-0.17px] text-black transition-transform duration-200 hover:scale-[1.04]"
            >
              <VariableProximityText label="Send" />
            </button>
          </form>
          <a href="/privacy" className="mt-6 inline-block text-[13px] tracking-[-0.13px] text-[#7e7e7e] transition-colors hover:text-black">
            Privacy Policy
          </a>
        </div>
      </div>

      <div className="mt-16 overflow-hidden">
        <img
          src={assets.vinoHubLarge}
          alt="VinoHub"
          width={1257}
          height={302}
          className="block h-auto w-full"
        />
      </div>
    </footer>
  );
}
