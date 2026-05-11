# Features Dropdown & Sub-Pages Spec
_Date: 2026-05-11_

## Context & Goals

The site was just reorganized to rename Services → Features and create a `/features` overview page. This spec extends that work with two additions:

1. **Nav dropdown** — "Features" in the desktop nav opens (on hover or click) to show 3 feature cards linking to dedicated sub-pages
2. **Feature sub-pages** — Three dedicated landing pages (`/features/hub`, `/features/sheets`, `/features/ai`), each with a hero, 3–4 use case sections, an AI tease, a custom engagement section, and a booking CTA

The existing `/features` page remains as an overview/index. Sub-pages go deeper with dedicated landing page treatment per feature.

---

## Part 1: Nav Dropdown

### Trigger Behavior

- **Hover** over "Features" nav link → dropdown opens
- **Click** on "Features" nav link → dropdown toggles (open/close)
- **Mouse leave** from the nav container → dropdown closes (with 150ms delay to allow cursor travel to cards)
- **Click outside** the nav → dropdown closes
- **Escape key** → dropdown closes
- On mobile: no dropdown — "Features" remains a plain link to `/features` (the existing mobile menu behavior is unchanged)

### Animation

The dropdown is **absolutely positioned** below the nav pill — it does NOT expand the nav pill's height. This avoids conflict with the existing `motion.div` height animation used for the mobile menu.

Structure:
```
<nav>                          ← fixed, top-0, z-20
  <div ref={navRef}>           ← ref target for click-outside
    <NotchWing left />
    <NotchWing right />
    <motion.div>               ← existing, animates height for mobile menu only
      [top bar — always 80px]
      [mobile menu — AnimatePresence, hidden on desktop]
    </motion.div>
    <AnimatePresence>          ← desktop dropdown, outside motion.div
      {featuresOpen && (
        <motion.div>           ← absolutely positioned below pill
          [3 feature cards]
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</nav>
```

The dropdown card container:
- `position: absolute`, `top: 88px` (80px bar + 8px gap), centered or full-width of nav
- `initial={{ opacity: 0, y: -8 }}` → `animate={{ opacity: 1, y: 0 }}`
- `exit={{ opacity: 0, y: -8 }}`
- `transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}`
- Background: `bg-white/90 backdrop-blur-md`, `rounded-[20px]`, `shadow-2xl shadow-black/20`
- Cards fade in with staggered delay (0ms, 40ms, 80ms): `initial={{ opacity: 0, y: 8 }}` → `animate={{ opacity: 1, y: 0 }}`

### Dropdown Content — 3 Feature Cards

Displayed in a horizontal row inside the dropdown. Each card:

```
[Icon — 32×32px wine red (#7f3333) rounded square, border-radius 8px]
[Feature name — 13px semibold, color #1a1a1a]
[One-line description — 11px, color #777]
```

**Card content:**

| Feature | Name | Description |
|---|---|---|
| Hub | The Hub | Your entire wine portfolio. One beautiful dashboard. |
| Sheets | Sales Tools | On-brand sales sheets & trade tools. No designer needed. |
| AI | VinoHub AI | Your best employee. Works nights and weekends. |

**Links:** Each card is an `<a>` linking to its sub-page (`/features/hub`, `/features/sheets`, `/features/ai`). Clicking a card sets `featuresOpen(false)` and navigates.

**Card icon:** Use a plain `<div>` with `w-8 h-8 rounded-[8px] bg-[#7f3333]` — no SVG, no image inside. It is a solid wine-red square acting as a visual block/placeholder icon. Keep it simple.

**Card hover state:** `bg-white border border-[#e5e5e5]` at rest → `bg-[#fafafa] border-[#d0d0d0]` on hover, `transition-colors`.

### State Management

The `Nav` component in `components/site-chrome.tsx` currently has a single `open` boolean for the mobile menu. Rename it to `mobileOpen` and add a second state `featuresOpen` for the desktop dropdown.

**Update the React import** at the top of `components/site-chrome.tsx`:

```ts
// Before:
import { useState } from "react";

// After:
import { useState, useRef, useEffect } from "react";
```

**All callsites to rename in `Nav`:**

```ts
// Before:
const [open, setOpen] = useState(false);

// After:
const [mobileOpen, setMobileOpen] = useState(false);
const [featuresOpen, setFeaturesOpen] = useState(false);
```

Every reference to `open` / `setOpen` in Nav becomes `mobileOpen` / `setMobileOpen`:

1. `useState(false)` declaration → `mobileOpen`
2. `animate={{ height: open ? "auto" : 80 }}` → `mobileOpen`
3. `aria-label={open ? "Close menu" : "Open menu"}` → `mobileOpen`
4. `aria-expanded={open}` → `mobileOpen`
5. `onClick={() => setOpen((o) => !o)}` → `setMobileOpen`
6. `{open && (` inside `AnimatePresence` → `mobileOpen`
7. `<HamburgerIcon open={open} />` → `mobileOpen`
8. `onClick={() => setOpen(false)}` on each mobile NavLink → `setMobileOpen(false)`

Note: The `HamburgerIcon` component has its own `open` prop (`{ open: boolean }`) — this is a local parameter name on a separate function and is **not renamed**. Only references in the `Nav` function body are changed.

### "Features" Nav Link — Desktop Behavior

**Keep Features in `NAV_LINKS`** so that the mobile menu map continues to render it as a plain link (unchanged behavior). In the desktop `<ul>`, special-case the Features entry instead of rendering it through the generic `NavLink`. The remaining links (Pricing, Free Consultation, About) render as before via `NavLink`.

The existing `NavLink` for Features needs special treatment on desktop only. Replace it with an inline handler in the desktop `<ul>`:

```tsx
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
```

The remaining nav links (Pricing, Free Consultation, About) render as before via `NavLink`.

### Click-Outside & Hover-Close Behavior

**Click-outside:** Attach a `ref` to the existing `<div className="relative">` that wraps the NotchWings, the `motion.div`, and the dropdown — this is the `<div className="relative">` directly inside `<nav>` at line 120 of the current file. In a `useEffect`, add a `mousedown` listener on `document`; if `event.target` is not contained by `navRef.current`, call `setFeaturesOpen(false)`.

```tsx
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
```

**Mouse-leave close:** Attach `onMouseEnter` and `onMouseLeave` to the `navRef` div. The `onMouseEnter` on `navRef` is solely responsible for clearing the leave timer — the Features `<button>`'s own `onMouseEnter` only opens the dropdown and does NOT need to clear the timer. This is intentional: once the user moves from the Features button into the dropdown cards area, they stay inside `navRef`, so the `navRef` `onMouseEnter` fires and clears the timer correctly.

```tsx
// on the navRef div:
onMouseEnter={() => {
  if (leaveTimer.current) clearTimeout(leaveTimer.current);
}}
onMouseLeave={() => {
  leaveTimer.current = setTimeout(() => setFeaturesOpen(false), 150);
}}
```

---

## Part 2: Feature Sub-Pages

### Routing

- `app/features/hub/page.tsx` — The Hub landing page
- `app/features/sheets/page.tsx` — Sales Tools landing page
- `app/features/ai/page.tsx` — VinoHub AI landing page

The existing `/features` overview page (`app/features/page.tsx`) is unchanged.

### Shared Component: CapabilityCallouts

The `CapabilityCallouts` component is currently defined locally in `app/features/page.tsx` (not exported). Extract it to a standalone shared component:

**New file:** `components/capability-callouts.tsx`

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

**Update `app/features/page.tsx`:** Remove the local `CapabilityCallouts` function definition and add `import { CapabilityCallouts } from "@/components/capability-callouts"`. The `WebsitesSection` in the same file uses its own inline `<span>` chip markup (not the `CapabilityCallouts` function) — leave that code as-is.

All three sub-pages import `CapabilityCallouts` from `@/components/capability-callouts`.

### Assets

Sub-pages live at `app/features/hub/page.tsx` etc. Import assets using the `@/app/assets` alias:

```ts
import { assets } from "@/app/assets";
```

**Asset mapping used in sub-pages** (all keys exist in `app/assets.ts`):

| Key | Resolves to |
|---|---|
| `assets.heroDashboard` | `/assets/dashboard.webp` |
| `assets.hubScreenshot` | `/assets/hub-screenshot.png` |
| `assets.dashCard1` | `/assets/dash-card1.png` |
| `assets.dashCard2` | `/assets/dash-card2.png` |
| `assets.salesSheetScreenshot` | `/assets/sales-sheet-screenshot.png` |
| `assets.vineyardCard` | `/assets/vineyard-card.png` |

Note: `assets.salesSheetCard` (defined in `assets.ts`) resolves to the same file as `assets.salesSheetScreenshot`. Use `assets.salesSheetScreenshot` consistently throughout all sub-pages — do not use `assets.salesSheetCard`.

### Imports for Sub-Pages

Each sub-page is a Server Component (no `"use client"`). Standard imports:

```ts
import { Nav, Footer, CTAButton } from "@/components/site-chrome";
import { CapabilityCallouts } from "@/components/capability-callouts";
import StaggeredText from "@/components/react-bits/staggered-text";
import { assets } from "@/app/assets";
```

`StaggeredText` is a default export — import as `import StaggeredText from "..."` (not a named import).

### Shared Page Structure

Every sub-page follows this section order:

1. **Hero** — Full-width colored hero (wine red `#7f3333`), page-specific headline + subheadline
2. **Use case sections** — 3–4 sections, alternating layout, each with: kicker label, h2 headline, body copy, `CapabilityCallouts` chips
3. **AI Tease** — Standalone section teasing AI integration with link to `/features/ai`
4. **Custom Engagement** — Section inviting prospects to discuss bespoke/custom feature work
5. **Consultation CTA** — Standard dark gradient CTA block (same as on `/features`)

The AI page (`/features/ai`) omits the AI Tease section. The AI page has 4 use case sections instead of 3.

### Section Layouts

**Hero** — reuses the same structure as `FeaturesHero` in `app/features/page.tsx`, with two differences:
- Outer: `section` with `px-[34px] pt-[28px]`
- Inner: `div` with `relative mx-auto h-[700px] w-full overflow-hidden rounded-[25px] bg-[#7f3333]` — intentionally shorter than the overview hero (861px)
- Text centered, `pt-[200px]`, max-width `max-w-[820px]`
- H1 uses `StaggeredText` (same props as `/features` hero)
- Subheadline: `text-white/85`, `text-[20px]`, `leading-[28px]`
- **No `ServicesHeroGraphic`** — sub-page heroes are plain wine-red backgrounds with text only; do not include the canvas animation from the overview page.

**Use case sections** — same alternating 2-col pattern used on `/features`:
- Container: `mx-auto max-w-[1300px] px-6 py-24`
- Grid: `grid gap-12 md:grid-cols-2 items-center`
- Odd sections (1, 3): copy div left, visual div right
- Even sections (2, 4): visual div has `md:order-first` to appear left on desktop
- Copy div: `max-w-[500px]`
- Visual div: `overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4` containing `<img className="w-full rounded-[8px] object-cover" />`
- Kicker: `text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]`
- H2: `mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]`
- Body: `mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]`

**ChatFlow visual** (used on `/features/ai` Use Case 2):
```tsx
<div className="relative h-[400px] overflow-hidden rounded-[16px] border border-[#d5d5d5]">
  <img src={assets.vineyardCard} alt="" className="absolute inset-0 h-full w-full object-cover" />
  <div className="absolute inset-0 bg-black/30" />
  <div className="relative z-10 h-full">
    <ChatFlow />
  </div>
</div>
```

`ChatFlow` is a Client Component — import as: `import ChatFlow from "@/components/chat-flow"`.

**AI Tease section** — centered, `bg-[#f9f8f6]`:
```tsx
<section className="bg-[#f9f8f6] py-20">
  <div className="mx-auto max-w-[780px] px-6 text-center">
    <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">{kicker}</p>
    <h2 className="mt-3 text-[clamp(28px,4vw,42px)] font-medium leading-[1.18] tracking-[-1.2px] text-[#2f2f2f]">{headline}</h2>
    <p className="mx-auto mt-6 max-w-[600px] text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">{body}</p>
    <a href="/features/ai" className="mt-8 inline-flex items-center text-[#7f3333] font-semibold hover:underline">
      {linkText}
    </a>
  </div>
</section>
```

**Custom Engagement section** — centered, dark background:
```tsx
<section className="mx-auto max-w-[1300px] px-6 py-16">
  <div className="rounded-[20px] bg-[#1a1a1a] px-8 py-16 text-center text-white">
    <p className="text-[13px] font-semibold uppercase tracking-[2px] text-white/50">Custom & Bespoke</p>
    <h2 className="mx-auto mt-4 max-w-[680px] text-[clamp(28px,4vw,42px)] font-medium leading-[1.18] tracking-[-1.2px]">{headline}</h2>
    <p className="mx-auto mt-6 max-w-[580px] text-[19px] leading-[28px] tracking-[-0.19px] text-white/70">{body}</p>
    <CTAButton cal variant="dark" className="mt-8">Talk to us about custom work</CTAButton>
  </div>
</section>
```

Note: `CTAButton` with `cal` prop uses boolean JSX syntax: `<CTAButton cal variant="dark">`.

**Consultation CTA section** — identical to `ConsultationCTA` in `app/features/page.tsx`, with a page-specific h2 headline replacing "Schedule a Free Consultation":
```tsx
<section className="mx-auto max-w-[1300px] px-6 py-16">
  <div className="mx-auto flex min-h-[418px] flex-col items-center justify-center rounded-[20px] px-8 py-20 text-center text-white"
    style={{ backgroundImage: "linear-gradient(146.75deg, rgb(46,46,46) 28%, rgb(0,0,0) 72%)" }}>
    <h2 className="max-w-[780px] text-[clamp(32px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px]">
      <StaggeredText as="span" className="justify-center" text="{PAGE_SPECIFIC_HEADLINE}"
        segmentBy="words" delay={70} duration={0.7} direction="top" blur />
    </h2>
    <p className="mt-8 max-w-[704px] text-[19px] leading-[28px] tracking-[-0.19px] text-white/80">
      In the wine and spirits industry, digital presence is no longer just a "nice-to-have": it's a critical driver of operational efficiency and market share.
    </p>
    <p className="mt-4 max-w-[704px] text-[19px] leading-[28px] tracking-[-0.19px] text-white/80">
      Knowing where to invest your resources first can be a challenge and in this free 30-minute session, we'll move past the jargon and focus on the practical steps.
    </p>
    <CTAButton cal variant="light" className="mt-10">Book A Call</CTAButton>
  </div>
</section>
```

---

## Part 3: Page-by-Page Copy

### `/features/hub` — The Hub

**Metadata:**
- title: `"The Hub — VinoHub"`
- description: `"The command center for your entire wine portfolio. Manage wines, wineries, vintages, assets, and data from one beautiful dashboard."`

**Hero:**
- Headline: "The command center for your entire wine portfolio."
- Subheadline: "Your inventory lives in three spreadsheets, a shared Dropbox, and someone's inbox. VinoHub Hub brings all of it — wines, wineries, vintages, tasting notes, assets, pricing — into one clean, beautiful dashboard your whole team can actually use."

**Use Case 1 — Everything in one place** (`id="everything"`)
- Kicker: "One Source of Truth"
- H2: "Every wine. Every vintage. Every asset. No more hunting."
- Body: "Add wines, wineries, regions, and varietals. Attach images, PDFs, tasting notes, and tech sheets. Every data point the trade needs — structured, searchable, and always up to date."
- Callouts: "Full wine data model", "Image & asset management", "Searchable & filterable", "Always current"
- Visual: `assets.hubScreenshot`

**Use Case 2 — Built for your team** (`id="team"`)
- Kicker: "Built for the Trade"
- H2: "Beautiful enough that people actually use it."
- Body: "Role-based access for admins, sales reps, and account managers. Mobile-ready for reps in the field. Clean enough for your most spreadsheet-resistant teammate. Powerful enough for your most data-obsessed one."
- Callouts: "Role-based access", "Mobile-ready", "Admin & rep views", "No training required"
- Visual: `assets.dashCard1`

**Use Case 3 — Live everywhere** (`id="live"`)
- Kicker: "Connected Platform"
- H2: "Update once. Everything updates."
- Body: "The Hub is the single source of truth your entire operation runs on. Change a price, update a vintage, add a new wine — your sales sheets, your website, and your team all see it instantly."
- Callouts: "Powers sales sheet generation", "Feeds your public website", "Real-time sync", "Zero manual updates"
- Visual: `assets.dashCard2`

**AI Tease:**
- Kicker: "Powered by VinoHub AI"
- Headline: "Your data, but intelligent."
- Body: "Import a messy supplier CSV and watch AI clean, categorize, and structure it in seconds. Ask questions in plain English. Get answers, not reports."
- Link text: "Learn about VinoHub AI →"

**Custom section:**
- Headline: "Need something built to spec?"
- Body: "Every operation is different. If your workflow has unique requirements — custom data fields, integrations, or specialized reporting — we build to fit."

**Consultation CTA headline:** "Stop managing your portfolio in five places at once."

---

### `/features/sheets` — Sales Tools

**Metadata:**
- title: `"Sales Tools — VinoHub"`
- description: `"Generate on-brand sales sheets, shelf talkers, and trade tools from live inventory data. No designer needed."`

**Hero:**
- Headline: "Professional sales tools. No designer. No waiting. No excuses."
- Subheadline: "Your rep has a buyer meeting in an hour. Today that means scrambling for a PDF, hoping it has the right vintage, and apologizing for the layout. With VinoHub, it means opening their phone and hitting generate."

**Use Case 1 — Generate in one click** (`id="generate"`)
- Kicker: "One-Click Generation"
- H2: "Beautiful collateral that builds itself."
- Body: "Sales sheets, shelf talkers, tasting notes — generated instantly from live Hub data. Always branded. Always accurate. No InDesign, no Canva, no back-and-forth with a graphic designer."
- Callouts: "Sales sheets", "Shelf talkers", "Tasting note cards", "Branded templates"
- Visual: `assets.salesSheetScreenshot`

**Use Case 2 — Live data, zero errors** (`id="live-data"`)
- Kicker: "Always Accurate"
- H2: "Your pricing changed last Tuesday. Your sheets know."
- Body: "Every generated asset pulls directly from the Hub in real time. Price updates, vintage changes, new tasting notes — reflected immediately across every piece of collateral. No more emailing updated PDFs to the whole team."
- Callouts: "Pulls from live Hub data", "No manual updates", "Always current pricing", "Shareable links"
- Visual: `assets.salesSheetScreenshot`

**Use Case 3 — Eliminate the design bottleneck** (`id="design"`)
- Kicker: "Design at Scale"
- H2: "Cancel the designer retainer."
- Body: "VinoHub generates on-brand, print-ready materials for your entire portfolio. Whether you have 50 SKUs or 5,000, every wine gets the same quality of presentation. Your brand, applied consistently, at a scale no human team could match."
- Callouts: "Print-ready output", "Consistent brand", "Scales to any portfolio size", "No design software needed"
- Visual: `assets.hubScreenshot` (stand-in — no dedicated sheets asset available for this section)

**AI Tease:**
- Kicker: "Powered by VinoHub AI"
- Headline: "Don't have tasting notes? AI writes them."
- Body: "VinoHub AI generates tasting notes, product descriptions, and shelf talker copy automatically — in your voice, from your data. One less thing for your team to write."
- Link text: "Learn about VinoHub AI →"

**Custom section:**
- Headline: "Need custom collateral formats?"
- Body: "Got a specific template, custom branded format, or regional requirement? We build custom generators that fit exactly how your team sells."

**Consultation CTA headline:** "Stop sending outdated PDFs. Start sending confidence."

---

### `/features/ai` — VinoHub AI

**Metadata:**
- title: `"VinoHub AI — VinoHub"`
- description: `"AI built for the wine trade. Clean your data, answer questions, generate content, and make every part of your operation smarter."`

**Hero:**
- Headline: "Your best employee. Works nights and weekends. Never forgets a vintage."
- Subheadline: "Generic AI doesn't know the difference between a négociant and a récoltant. VinoHub AI was built for the wine trade — trained on your portfolio, fluent in the language of the industry, and wired into every corner of your operation."

**Use Case 1 — Clean your data** (`id="clean"`)
- Kicker: "Data Cleanup"
- H2: "5,000 messy SKUs. Fixed in minutes, not months."
- Body: "Drop in a supplier CSV with inconsistent naming, missing vintages, and duplicated entries. AI cleans, categorizes, deduplicates, and structures it — mapped directly into your Hub without you touching a single cell."
- Callouts: "CSV import & cleanup", "Deduplication", "Auto-categorization", "Bulk operations"
- Visual: `assets.hubScreenshot`

**Use Case 2 — Ask questions** (`id="ask"`)
- Kicker: "Natural Language Queries"
- H2: "Which Burgundies moved most last quarter? Just ask."
- Body: "No pivot tables. No reports to run. No waiting for your data analyst. Chat with your portfolio in plain English and get answers you can act on immediately — from sales trends to inventory gaps to account performance."
- Callouts: "Plain English queries", "Sales analytics", "Inventory insights", "No SQL required"
- Visual: `ChatFlow` component (see ChatFlow visual layout above)

**Use Case 3 — Generate content** (`id="generate"`)
- Kicker: "Content Generation"
- H2: "Tasting notes for 400 wines. Written in your voice. Ready in minutes."
- Body: "AI generates tasting notes, product descriptions, shelf talker copy, and email blurbs directly from your wine data. Consistent tone, always on-brand, and zero time from your team. Every wine in your portfolio gets the presentation it deserves."
- Callouts: "Tasting notes", "Product descriptions", "Shelf talker copy", "Email-ready blurbs"
- Visual: `assets.salesSheetScreenshot`

**Use Case 4 — The thread through everything** (`id="platform"`)
- Kicker: "Platform Intelligence"
- H2: "AI isn't a feature. It's what makes every feature smarter."
- Body: "Hub data gets cleaner. Sheets get more accurate. Your website stays in sync. Your rep walks into a restaurant with current pricing, every time. The compound effect of AI running through your entire operation isn't incremental — it's transformational."
- Callouts: "Powers the Hub", "Improves sheet accuracy", "Keeps your website live", "Compound ROI"
- Visual: `assets.heroDashboard`

**No AI Tease section** — this is the AI page.

**Custom section:**
- Headline: "Need AI built for your specific workflow?"
- Body: "Have a unique data problem, a custom integration, or a workflow that off-the-shelf AI can't solve? We build tailored AI solutions for wine and spirits operations of any size."

**Consultation CTA headline:** "The wine trade runs on data. Yours should work harder."

---

## Out of Scope

- The existing `/features` overview page — no changes
- Mobile dropdown — Features remains a plain link on mobile
- Sub-pages for Websites (`/features/websites`) — future consideration
- Actual product screenshots beyond what's in `assets.ts` — use existing assets
- Footer anchor links (e.g. `/features#hub`) — remain pointing to overview page sections, not updated to sub-page URLs in this work
