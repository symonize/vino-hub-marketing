# Features Dropdown & Sub-Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Features nav dropdown (3 feature cards, hover+click, absolutely positioned) and three dedicated feature landing pages (`/features/hub`, `/features/sheets`, `/features/ai`).

**Architecture:** The nav dropdown is an `AnimatePresence`-wrapped `motion.div` placed outside the existing mobile `motion.div` in `site-chrome.tsx`, absolutely positioned so it doesn't conflict with the existing height animation. A shared `CapabilityCallouts` component is extracted first so all pages (overview + sub-pages) can import it. Each sub-page is a Next.js App Router Server Component following the same section structure.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion (`motion/react`), `useRef`/`useEffect` for dropdown close behavior.

**No test framework is configured** — verification for each task is `npx tsc --noEmit` (type check) + visual inspection at `http://localhost:3000`.

---

## File Map

| Action | File | Purpose |
|---|---|---|
| **Create** | `components/capability-callouts.tsx` | Shared chip/callout component extracted from features page |
| **Modify** | `components/site-chrome.tsx` | Add `featuresOpen` state, rename `open`→`mobileOpen`, add dropdown JSX |
| **Modify** | `app/features/page.tsx` | Remove local `CapabilityCallouts`, import from shared component |
| **Create** | `app/features/hub/page.tsx` | The Hub landing page |
| **Create** | `app/features/sheets/page.tsx` | Sales Tools landing page |
| **Create** | `app/features/ai/page.tsx` | VinoHub AI landing page |

---

## Task 1: Extract CapabilityCallouts to a shared component

**Files:**
- Create: `components/capability-callouts.tsx`
- Modify: `app/features/page.tsx` (lines 74–87, remove local function; add import)

- [ ] **Step 1: Create `components/capability-callouts.tsx`**

```tsx
export function CapabilityCallouts({ items }: { items: string[] }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-[#d5d5d5] bg-white px-4 py-2 text-[15px] tracking-[-0.15px] text-[#4d4d4d]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Update `app/features/page.tsx`**

Remove the local `CapabilityCallouts` function (lines 74–87):
```tsx
// DELETE this entire block:
function CapabilityCallouts({ items }: { items: string[] }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-[#d5d5d5] bg-white px-4 py-2 text-[15px] tracking-[-0.15px] text-[#4d4d4d]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
```

Add import at the top of the file (after the existing imports):
```tsx
import { CapabilityCallouts } from "@/components/capability-callouts";
```

The `WebsitesSection` in `app/features/page.tsx` uses its own inline `<span>` chip markup — leave that code as-is.

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors. If errors mention `CapabilityCallouts`, verify the import path and that the function signature matches.

- [ ] **Step 4: Verify visually**

Start `npm run dev`, open `http://localhost:3000/features`. The Hub, Sales Sheets, and AI sections should all still show their callout chips. The Websites section chips should also be unchanged.

- [ ] **Step 5: Commit**

```bash
git add components/capability-callouts.tsx app/features/page.tsx
git commit -m "refactor: extract CapabilityCallouts to shared component"
```

---

## Task 2: Add Features nav dropdown

**Files:**
- Modify: `components/site-chrome.tsx`

This task modifies the `Nav` function only. No other components in this file change.

- [ ] **Step 1: Update the React import**

In `components/site-chrome.tsx`, line 3:

```tsx
// Before:
import { useState } from "react";

// After:
import { useState, useRef, useEffect } from "react";
```

- [ ] **Step 2: Rename `open` → `mobileOpen` and add `featuresOpen` state**

Inside the `Nav` function body, replace the existing state declaration and all 8 references:

```tsx
// Before (single state):
const [open, setOpen] = useState(false);

// After (two states):
const [mobileOpen, setMobileOpen] = useState(false);
const [featuresOpen, setFeaturesOpen] = useState(false);
const navRef = useRef<HTMLDivElement>(null);
const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
```

Rename all callsites (8 locations in Nav function body):

Note: `onClick={() => setOpen(false)}` is inside `NAV_LINKS.map(...)` in the mobile menu — it's one source line that generates handlers for all mobile links. Rename that single line and all handlers update automatically.

| Before | After |
|---|---|
| `animate={{ height: open ? "auto" : 80 }}` | `animate={{ height: mobileOpen ? "auto" : 80 }}` |
| `aria-label={open ? "Close menu" : "Open menu"}` | `aria-label={mobileOpen ? "Close menu" : "Open menu"}` |
| `aria-expanded={open}` | `aria-expanded={mobileOpen}` |
| `onClick={() => setOpen((o) => !o)}` | `onClick={() => setMobileOpen((o) => !o)}` |
| `{open && (` (inside AnimatePresence) | `{mobileOpen && (` |
| `<HamburgerIcon open={open} />` | `<HamburgerIcon open={mobileOpen} />` |
| `onClick={() => setOpen(false)}` (inside map, one source line) | `onClick={() => setMobileOpen(false)}` |

**Important:** `HamburgerIcon` has its own `open` prop (`{ open: boolean }`) — do NOT rename the parameter inside `HamburgerIcon`. Only the Nav function body references are renamed.

- [ ] **Step 3: Add `useEffect` for click-outside and escape key**

Add this block immediately after the `leaveTimer` ref declaration:

```tsx
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
```

- [ ] **Step 4: Add `ref` and mouse handlers to the nav wrapper div**

The `<div className="relative">` directly inside `<nav>` (the element that wraps the NotchWings and `motion.div`) gets `ref={navRef}` and the hover close handlers:

```tsx
// Before:
<div className="relative">

// After:
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
```

- [ ] **Step 5: Special-case the Features link in the desktop `<ul>`**

The desktop `<ul>` (currently at `hidden md:flex`) maps `NAV_LINKS` uniformly. **Keep `NAV_LINKS` unchanged** (Features stays in the array so the mobile menu continues rendering it as a plain link). In the desktop map, special-case the Features entry:

```tsx
// Before (desktop ul):
<ul className="hidden md:flex items-center gap-1 text-sm font-medium text-ink/80">
  {NAV_LINKS.map((l) => (
    <li key={l.label}>
      <NavLink label={l.label} href={l.href} cal={l.cal} />
    </li>
  ))}
</ul>

// After (desktop ul):
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
          aria-haspopup="true"
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
```

- [ ] **Step 6: Add the dropdown `AnimatePresence` block**

**Critical placement note:** The existing `motion.div` (which wraps the top bar and mobile menu) has `overflow-hidden` on it. If you place the dropdown INSIDE that `motion.div`, it will be invisible/clipped. It MUST go AFTER the closing `</motion.div>`, still inside the `navRef` div. In the current file the structure ends with `</motion.div>` on one line followed by `</div>` (closing navRef). Insert the new block between those two lines:

```tsx
      </motion.div>
      {/* ↑ existing closing tag — dropdown goes HERE, after this line */}
      <AnimatePresence>
        ...
      </AnimatePresence>
    </div>  {/* ← navRef div closes after the dropdown */}
```

Full block to insert after `</motion.div>` and before the `</div>` that closes the navRef wrapper:

```tsx
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
        {[
          { href: "/features/hub", name: "The Hub", desc: "Your entire wine portfolio. One beautiful dashboard." },
          { href: "/features/sheets", name: "Sales Tools", desc: "On-brand sales sheets & trade tools. No designer needed." },
          { href: "/features/ai", name: "VinoHub AI", desc: "Your best employee. Works nights and weekends." },
        ].map((card, i) => (
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
```

- [ ] **Step 7: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 8: Verify visually**

Open `http://localhost:3000` (or any page with the nav). On desktop:
- Hover over "Features" → dropdown opens with 3 cards
- Move mouse to cards → dropdown stays open
- Move mouse away from nav entirely → dropdown closes after ~150ms
- Click a card → navigates and dropdown closes
- Click "Features" button → toggles open/close
- Click outside nav → dropdown closes
- Press Escape → dropdown closes
- On mobile (narrow viewport): "Features" is a plain link, no dropdown

- [ ] **Step 9: Commit**

```bash
git add components/site-chrome.tsx
git commit -m "feat: add Features nav dropdown with hover and click trigger"
```

---

## Task 3: `/features/hub` — The Hub landing page

**Files:**
- Create: `app/features/hub/page.tsx`

**Note on `CTAButton variant="dark"`:** The `dark` variant has no background color — it's `border border-white/30 text-white hover:bg-white/10` (transparent background). This is correct: the button is rendered on a `bg-[#1a1a1a]` parent, which provides the dark background. Do not add a `bg-` class to the button.

- [ ] **Step 1: Create `app/features/hub/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify visually**

Open `http://localhost:3000/features/hub`. Confirm:
- Wine-red hero with headline and subheadline (no canvas animation)
- 3 alternating use case sections (copy left / image right, image left / copy right, copy left / image right)
- AI Tease section on off-white background
- Dark custom engagement section
- Dark gradient CTA at the bottom

- [ ] **Step 4: Commit**

```bash
git add app/features/hub/page.tsx
git commit -m "feat: add /features/hub landing page"
```

---

## Task 4: `/features/sheets` — Sales Tools landing page

**Files:**
- Create: `app/features/sheets/page.tsx`

- [ ] **Step 1: Create `app/features/sheets/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify visually**

Open `http://localhost:3000/features/sheets`. Confirm:
- Wine-red hero with Sales Tools copy
- 3 alternating use case sections
- AI Tease on off-white background with link to `/features/ai`
- Dark custom section
- Dark gradient CTA

- [ ] **Step 4: Commit**

```bash
git add app/features/sheets/page.tsx
git commit -m "feat: add /features/sheets landing page"
```

---

## Task 5: `/features/ai` — VinoHub AI landing page

**Files:**
- Create: `app/features/ai/page.tsx`

Note: This page has 4 use case sections (not 3) and **no AI Tease section** — it is the AI page.

- [ ] **Step 1: Create `app/features/ai/page.tsx`**

```tsx
import { Nav, Footer, CTAButton } from "@/components/site-chrome";
import { CapabilityCallouts } from "@/components/capability-callouts";
import StaggeredText from "@/components/react-bits/staggered-text";
import ChatFlow from "@/components/chat-flow";
import { assets } from "@/app/assets";

export const metadata = {
  title: "VinoHub AI — VinoHub",
  description:
    "AI built for the wine trade. Clean your data, answer questions, generate content, and make every part of your operation smarter.",
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
      <div className="relative mx-auto h-[700px] w-full overflow-hidden rounded-[25px] bg-[#7f3333]">
        <div className="relative z-10 mx-auto max-w-[820px] px-6 pt-[200px] text-center">
          <h1 className="text-[clamp(40px,5.6vw,62px)] font-medium leading-[1.1] tracking-[-1.86px] text-white">
            <div>
              <StaggeredText
                as="span"
                className="justify-center"
                text="Your best employee. Works nights and weekends."
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
                text="Never forgets a vintage."
                segmentBy="words"
                delay={60}
                duration={0.7}
                direction="top"
                blur
              />
            </div>
          </h1>
          <p className="mx-auto mt-8 max-w-[620px] text-[20px] leading-[28px] tracking-[-0.2px] text-white/85">
            Generic AI doesn&apos;t know the difference between a n&eacute;gociant and a r&eacute;coltant. VinoHub AI was built for the wine trade — trained on your portfolio, fluent in the language of the industry, and wired into every corner of your operation.
          </p>
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
            5,000 messy SKUs. Fixed in minutes, not months.
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            Drop in a supplier CSV with inconsistent naming, missing vintages, and duplicated entries. AI cleans, categorizes, deduplicates, and structures it — mapped directly into your Hub without you touching a single cell.
          </p>
          <CapabilityCallouts items={["CSV import & cleanup", "Deduplication", "Auto-categorization", "Bulk operations"]} />
        </div>
        <div className="overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4">
          <img src={assets.hubScreenshot} alt="AI data cleanup" className="w-full rounded-[8px] object-cover" />
        </div>
      </div>
    </section>
  );
}

function AskSection() {
  return (
    <section id="ask" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="relative h-[400px] overflow-hidden rounded-[16px] border border-[#d5d5d5] md:order-first">
          <img src={assets.vineyardCard} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 h-full">
            <ChatFlow />
          </div>
        </div>
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">Natural Language Queries</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            Which Burgundies moved most last quarter? Just ask.
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            No pivot tables. No reports to run. No waiting for your data analyst. Chat with your portfolio in plain English and get answers you can act on immediately — from sales trends to inventory gaps to account performance.
          </p>
          <CapabilityCallouts items={["Plain English queries", "Sales analytics", "Inventory insights", "No SQL required"]} />
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
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">Content Generation</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            Tasting notes for 400 wines. Written in your voice. Ready in minutes.
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            AI generates tasting notes, product descriptions, shelf talker copy, and email blurbs directly from your wine data. Consistent tone, always on-brand, and zero time from your team. Every wine in your portfolio gets the presentation it deserves.
          </p>
          <CapabilityCallouts items={["Tasting notes", "Product descriptions", "Shelf talker copy", "Email-ready blurbs"]} />
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
          <img src={assets.heroDashboard} alt="AI platform intelligence" className="w-full rounded-[8px] object-cover" />
        </div>
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">Platform Intelligence</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            AI isn&apos;t a feature. It&apos;s what makes every feature smarter.
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            Hub data gets cleaner. Sheets get more accurate. Your website stays in sync. Your rep walks into a restaurant with current pricing, every time. The compound effect of AI running through your entire operation isn&apos;t incremental — it&apos;s transformational.
          </p>
          <CapabilityCallouts items={["Powers the Hub", "Improves sheet accuracy", "Keeps your website live", "Compound ROI"]} />
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
          Have a unique data problem, a custom integration, or a workflow that off-the-shelf AI can&apos;t solve? We build tailored AI solutions for wine and spirits operations of any size.
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
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify visually**

Open `http://localhost:3000/features/ai`. Confirm:
- Wine-red hero with AI copy
- 4 use case sections (section 2 has the ChatFlow component on a vineyard background)
- **No** AI Tease section
- Dark custom section
- Dark gradient CTA

- [ ] **Step 4: Commit**

```bash
git add app/features/ai/page.tsx
git commit -m "feat: add /features/ai landing page"
```

---

## Final Verification

- [ ] **Type-check all files**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Build check**

```bash
npm run build
```

Expected: successful build with no errors. Note any warnings but don't block on them.

- [ ] **Full nav flow test**

On desktop at `http://localhost:3000`:
1. Hover "Features" → dropdown opens
2. Click each card → navigates to correct sub-page
3. Each sub-page has correct title (check browser tab)
4. Back to home, press Escape while dropdown is open → closes
5. Click outside nav → closes
6. On mobile viewport: "Features" is a plain link

- [ ] **Sub-page spot-check**

Verify each sub-page renders correctly at:
- `http://localhost:3000/features/hub`
- `http://localhost:3000/features/sheets`
- `http://localhost:3000/features/ai`

- [ ] **Existing pages unaffected**

Check `http://localhost:3000/features` still works and is unchanged.
