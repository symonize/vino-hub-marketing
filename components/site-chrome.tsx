"use client";

import { useState } from "react";
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
  { label: "Services", href: "/services" },
  { label: "Free Consultation", href: "/consult" },
  // { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

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
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-20 w-[min(1100px,92%)]">
      <motion.div
        className="relative overflow-hidden rounded-b-[32px] bg-white/70 backdrop-blur-md shadow-2xl shadow-black/20"
        animate={{ height: open ? "auto" : 80 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <NotchWing side="left" />
        <NotchWing side="right" />

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
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <NavLink label={l.label} href={l.href} cal={l.cal} />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Book Demo — hidden on mobile when menu open to reduce clutter */}
            <button type="button" {...CAL_DATA} className="group relative inline-flex items-center">
              <span className="absolute inset-y-[6px] right-0 w-[calc(100%-1.25rem)] rounded-[12px] bg-accent" />
              <span className="relative z-10 rounded-[12px] bg-ink px-5 py-3 text-sm font-medium text-white">
                <VariableProximityText label="Book Demo" />
              </span>
              <span className="relative z-10 -ml-px flex h-10 w-10 items-center justify-center rounded-[12px] text-black transition-transform duration-300 group-hover:-rotate-45">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </button>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-full hover:bg-ink/5 transition-colors"
            >
              <HamburgerIcon open={open} />
            </button>
          </div>
        </div>

        {/* Mobile menu — slides in below the top bar */}
        <AnimatePresence>
          {open && (
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
                    onClick={() => setOpen(false)}
                  />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1300px] px-6 pb-0 pt-16">
      <div className="grid gap-12 md:grid-cols-[200px_200px_1fr]">
        <div>
          <h4 className="text-[20px] font-semibold uppercase tracking-[2px] text-black">
            Services
          </h4>
          <ul className="mt-4 space-y-2 text-[20px] font-medium tracking-[-0.2px] text-[#535353]">
            <li><a href="/services#hub" className="transition-colors hover:text-black">Wine Asset Management</a></li>
            <li><a href="/services#web" className="transition-colors hover:text-black">Website Design &amp; Dev</a></li>
            <li><a href="/services#ai" className="transition-colors hover:text-black">AI Solutions</a></li>
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
