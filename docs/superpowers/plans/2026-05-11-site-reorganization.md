# Site Reorganization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize the VinoHub marketing site — rename Services → Features, restore Pricing in nav, expand the homepage website section, rewrite the Features page with expanded per-feature sections, and add a website add-on footnote to the Pricing page.

**Architecture:** Navigation is driven by a single `NAV_LINKS` array in `components/site-chrome.tsx` that serves both desktop and mobile menus. The Services page becomes a redirect; a new `app/features/page.tsx` is created as a full rewrite. The homepage `WebsiteGallery` component is replaced in-place. No new shared components are needed — existing assets and components are reused throughout.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion (`motion/react`). Cal.com for booking via `CTAButton cal`. Placeholder copy marked `[COPY]` throughout for the team to finalize.

---

## File Map

| File | Action | What changes |
|---|---|---|
| `components/site-chrome.tsx` | Modify | `NAV_LINKS` array + `Footer` links |
| `app/page.tsx` | Modify | Replace `WebsiteGallery` function |
| `app/services/page.tsx` | Modify | Replace with redirect to `/features` |
| `app/features/page.tsx` | Create | Full Features page |
| `app/pricing/page.tsx` | Modify | Add website add-on footnote |

---

## Task 1: Update Navigation

**Files:**
- Modify: `components/site-chrome.tsx` (lines 49–55, the `NAV_LINKS` array)

- [ ] **Step 1: Update `NAV_LINKS` in `site-chrome.tsx`**

Replace the current array:
```ts
const NAV_LINKS: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Free Consultation", href: "/consult" },
  // { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];
```

With:
```ts
const NAV_LINKS: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Free Consultation", href: "/consult" },
  { label: "About", href: "/about" },
];
```

- [ ] **Step 2: Update Footer links in `site-chrome.tsx`**

In the `Footer` function, replace the Services column (currently has heading "Services" and links to `/services#hub`, `/services#web`, `/services#ai`) with:

```tsx
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
```

Leave the "About" column unchanged.

- [ ] **Step 3: Verify nav renders correctly**

Run `npm run dev` and open `http://localhost:3000`. Confirm:
- Desktop nav shows: Features | Pricing | Free Consultation | About
- Mobile hamburger menu shows the same four links
- "Book Demo" CTA button still present and clickable
- Footer "Features" column has all four links

- [ ] **Step 4: Commit**

```bash
git add components/site-chrome.tsx
git commit -m "feat: update nav (Services→Features, restore Pricing, remove broken Contact) and footer links"
```

---

## Task 2: Update Homepage WebsiteGallery Section

**Files:**
- Modify: `app/page.tsx` (the `WebsiteGallery` function, currently lines 301–358)

- [ ] **Step 1: Replace `WebsiteGallery` with an expanded 2-column section**

Replace the entire `WebsiteGallery` function with:

```tsx
function WebsiteGallery() {
  const shots = [assets.siteShot1, assets.siteShot2, assets.siteShot3, assets.siteShot4];
  return (
    <section id="web" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-10 md:grid-cols-2 items-center">
        {/* Left: copy + CTA */}
        <div>
          <h2 className="max-w-[619px] text-[clamp(32px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-ink">
            <StaggeredText
              as="span"
              text="[COPY: A website that sells as hard as your portfolio.]"
              segmentBy="words"
              delay={70}
              duration={0.7}
              direction="top"
              blur
            />
          </h2>
          <p className="mt-6 max-w-[500px] text-[19px] leading-[28px] tracking-[-0.19px] text-muted">
            [COPY: Your VinoHub portfolio, live on a website we design, build, and maintain for you.
            When your inventory updates in VinoHub, your website updates too — no manual work, no stale listings.]
          </p>
          <CTAButton href="/features#websites" variant="light" className="mt-8">
            Learn More
          </CTAButton>
        </div>

        {/* Right: marquee of site screenshots */}
        <div className="relative overflow-hidden">
          <style>{`
            @keyframes marquee {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
            .marquee-track {
              display: flex;
              gap: 16px;
              width: max-content;
              animation: marquee 28s linear infinite;
            }
            .marquee-track:hover { animation-play-state: paused; }
          `}</style>

          <div className="marquee-track">
            {[...shots, ...shots].map((src, i) => (
              <div key={i} className="h-[300px] flex-shrink-0 overflow-hidden rounded-[12px]" style={{ width: 240 }}>
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-[80px] bg-gradient-to-r from-bg to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[80px] bg-gradient-to-l from-bg to-transparent" />
        </div>
      </div>
    </section>
  );
}
```

Note: `[COPY: ...]` placeholders mark text the team should finalize. The structure and layout are correct; only the copy needs revision.

- [ ] **Step 2: Verify homepage renders correctly**

Open `http://localhost:3000`. Scroll to the website section and confirm:
- Two-column layout with copy left, marquee right (the previous full-width marquee below the grid is intentionally replaced by this embedded right-column marquee)
- "Learn More" CTA links to `/features#websites` (check href in browser dev tools)
- Marquee animates and pauses on hover

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: expand homepage WebsiteGallery to 2-col layout with integration copy"
```

---

## Task 3: Redirect `/services` → `/features`

**Files:**
- Modify: `app/services/page.tsx` (full replacement)

- [ ] **Step 1: Replace services page with a redirect**

Replace the entire contents of `app/services/page.tsx` with:

```ts
import { redirect } from "next/navigation";

export default function ServicesRedirect() {
  redirect("/features");
}
```

- [ ] **Step 2: Verify redirect works**

Navigate to `http://localhost:3000/services`. Confirm it immediately redirects to `/features` (which 404s for now — that's expected until Task 4). Check browser network tab: should be a 307 redirect.

- [ ] **Step 3: Commit**

```bash
git add app/services/page.tsx
git commit -m "feat: redirect /services to /features"
```

---

## Task 4: Create the Features Page

**Files:**
- Create: `app/features/page.tsx`

This is the largest task. The page has 6 sections: Hero, The Hub, Sales Sheets, VinoHub AI, Websites, Consultation CTA.

The reusable pattern for each feature section is: full-width heading + descriptive copy on the left, screenshot/visual on the right, then a row of capability callout chips below. Copy marked `[COPY: ...]` is placeholder.

- [ ] **Step 1: Create `app/features/page.tsx` with scaffolding**

```tsx
import StaggeredText from "@/components/react-bits/staggered-text";
import { CTAButton, Nav, Footer } from "@/components/site-chrome";
import ServicesHeroGraphic from "@/components/services-hero-graphic";
import ChatFlow from "@/components/chat-flow";
import { assets } from "../assets";

export const metadata = {
  title: "Features — VinoHub",
  description:
    "The complete wine portfolio management platform. The Hub, AI-powered trade tools, sales sheet generation, and website design built for wine distributors.",
};

// Intentionally a Server Component (no "use client") — Next.js App Router
// allows Server Components to render Client Components like Nav, ChatFlow, etc.
export default function FeaturesPage() {
  return (
    <main className="bg-bg">
      <Nav />
      <FeaturesHero />
      <TheHubSection />
      <SalesSheetsSection />
      <AISection />
      <WebsitesSection />
      <ConsultationCTA />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Add `FeaturesHero`**

```tsx
function FeaturesHero() {
  return (
    <section className="px-[34px] pt-[28px]">
      <div className="relative mx-auto h-[861px] w-full overflow-hidden rounded-[25px] bg-[#7f3333]">
        <div className="absolute inset-x-0 top-[560px] bottom-0">
          <ServicesHeroGraphic />
        </div>
        <div className="relative z-10 mx-auto max-w-[820px] px-6 pt-[200px] text-center">
          <h1 className="text-[clamp(40px,5.6vw,62px)] font-medium leading-[1.1] tracking-[-1.86px] text-white">
            <div>
              <StaggeredText
                as="span"
                className="justify-center"
                text="[COPY: Everything Your Team Needs]"
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
                text="[COPY: to Sell More Wine]"
                segmentBy="words"
                delay={60}
                duration={0.7}
                direction="top"
                blur
              />
            </div>
          </h1>
          <p className="mx-auto mt-8 max-w-[620px] text-[20px] leading-[28px] tracking-[-0.2px] text-white/85">
            [COPY: A fully integrated platform built exclusively for wine distributors and importers —
            from portfolio management and AI tools to trade assets and your public website.]
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add shared `CapabilityCallouts` helper + `TheHubSection`**

```tsx
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

function TheHubSection() {
  return (
    <section id="hub" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">The Hub</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            [COPY: One place for your entire portfolio]
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            [COPY: The Hub is a centralized platform where your sales team and retail accounts can find
            exactly what they need in seconds — tasting notes, pricing, availability, assets — all from
            a single source of truth.]
          </p>
          <CapabilityCallouts items={[
            "Real-time inventory",
            "Role-based access",
            "Mobile-friendly for reps",
            "One source of truth",
          ]} />
          <CTAButton cal variant="light" className="mt-8">
            Book a Demo
          </CTAButton>
        </div>
        <div className="overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4">
          <img
            src={assets.hubScreenshot}
            alt="The Hub dashboard"
            className="w-full rounded-[8px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add `SalesSheetsSection`**

```tsx
function SalesSheetsSection() {
  return (
    <section id="sheets" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        {/* Screenshot first on desktop (right col), but copy first in source for mobile */}
        <div className="overflow-hidden rounded-[16px] border border-[#d5d5d5] bg-white p-4 md:order-first">
          <img
            src={assets.salesSheetScreenshot}
            alt="Generated sales sheet"
            className="w-full rounded-[8px] object-cover"
          />
        </div>
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">Sales Sheets &amp; Trade Tools</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            [COPY: Professional collateral at the click of a button]
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            [COPY: Generate branded sales sheets, shelf talkers, and tasting notes directly from
            your live inventory data. Always up to date. No design software, no manual reformatting.]
          </p>
          <CapabilityCallouts items={[
            "Always up to date",
            "Branded templates",
            "Shareable links",
            "No design software needed",
          ]} />
          <CTAButton cal variant="light" className="mt-8">
            Book a Demo
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Add `AISection`**

```tsx
function AISection() {
  return (
    <section id="ai" className="mx-auto max-w-[1300px] px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="max-w-[500px]">
          <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">VinoHub AI</p>
          <h2 className="mt-3 text-[clamp(36px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
            [COPY: An AI partner that knows your portfolio]
          </h2>
          <p className="mt-6 text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
            [COPY: Chat with your wine data to get instant answers, surface insights, and automate the
            tedious work — from cleaning up messy CSVs to answering "which of our Burgundies moved most
            last quarter?"]
          </p>
          <CapabilityCallouts items={[
            "Natural language queries",
            "CSV import & cleanup",
            "Analytics & insights",
            "Bulk data operations",
          ]} />
          <CTAButton cal variant="light" className="mt-8">
            Book a Demo
          </CTAButton>
        </div>

        {/* AI chat visual — reuse the full-width card pattern from the old services page */}
        <div className="relative h-[400px] overflow-hidden rounded-[16px] border border-[#d5d5d5]">
          <img
            src={assets.vineyardCard}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 h-full">
            <ChatFlow />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Add `WebsitesSection`**

```tsx
function WebsitesSection() {
  const shots = [assets.siteShot1, assets.siteShot2, assets.siteShot3, assets.siteShot4];

  return (
    <section id="websites" className="mx-auto max-w-[1300px] px-6 py-24">
      {/* Section intro */}
      <div className="mx-auto max-w-[780px] text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[2px] text-[#7f3333]">Website Design &amp; Development</p>
        <h2 className="mt-3 text-[clamp(32px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-[#2f2f2f]">
          [COPY: Your portfolio, live on the web]
        </h2>
        <p className="mx-auto mt-6 max-w-[620px] text-[19px] leading-[28px] tracking-[-0.19px] text-[#626262]">
          [COPY: We design and build public-facing websites for wineries and importers — with one critical
          difference: your site is live-connected to VinoHub. When your inventory updates, your website
          updates too. No static content to maintain. No stale listings.]
        </p>
      </div>

      {/* Callout chips */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[
          "Live inventory integration",
          "No manual updates",
          "Designed for the wine trade",
          "Full setup & ongoing hosting",
        ].map((item) => (
          <span
            key={item}
            className="rounded-full border border-[#d5d5d5] bg-white px-4 py-2 text-[15px] tracking-[-0.15px] text-[#4d4d4d]"
          >
            {item}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <CTAButton cal variant="light">
          Book a call to discuss your website
        </CTAButton>
      </div>

      {/* Screenshot gallery marquee */}
      <div className="relative mt-12 overflow-hidden">
        <style>{`
          @keyframes marquee-features {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .marquee-track-features {
            display: flex;
            gap: 24px;
            width: max-content;
            animation: marquee-features 28s linear infinite;
          }
          .marquee-track-features:hover { animation-play-state: paused; }
        `}</style>

        <div className="marquee-track-features">
          {[...shots, ...shots].map((src, i) => (
            <div key={i} className="h-[423px] flex-shrink-0 overflow-hidden rounded-[12px]" style={{ width: 320 }}>
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-[150px] bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[150px] bg-gradient-to-l from-bg to-transparent" />
      </div>
    </section>
  );
}
```

Note: The keyframe is renamed `marquee-features` as a precaution. Since `/features` and `/` are separate routes with separate CSS scope at runtime, there's no actual collision — but unique names are good practice and avoid any edge cases with CSS-in-JS extraction.

- [ ] **Step 7: Add `ConsultationCTA`**

```tsx
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
```

- [ ] **Step 8: Verify the full Features page**

Navigate to `http://localhost:3000/features`. Confirm:
- Hero renders with `ServicesHeroGraphic` animation
- All 4 feature sections (Hub, Sheets, AI, Websites) are visible with screenshots
- `id="hub"`, `id="sheets"`, `id="ai"`, `id="websites"` anchors work (test by appending `#hub` etc. to URL)
- All "Book a Demo" / CTA buttons are clickable
- Websites section marquee animates

- [ ] **Step 9: Verify `/services` redirect**

Navigate to `http://localhost:3000/services`. Confirm it redirects to `/features`.

- [ ] **Step 10: Commit**

```bash
git add app/features/page.tsx
git commit -m "feat: create /features page with expanded Hub, Sales Sheets, AI, and Websites sections"
```

---

## Task 5: Add Website Add-on Note to Pricing Page

**Files:**
- Modify: `app/pricing/page.tsx` (after the `PricingGrid` section, before `Footer`)

- [ ] **Step 1: Add footnote below the pricing grid**

In `PricingPage`, replace:
```tsx
      <PricingGrid skus={skus} />

      <Footer />
```

With:
```tsx
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
```

Note: `CAL_DATA` is already imported in `app/pricing/page.tsx` via the `CAL_DATA` import from `@/components/cal-config`.

- [ ] **Step 2: Verify Pricing page**

Navigate to `http://localhost:3000/pricing`. Confirm:
- The footnote appears below the three pricing cards
- The "Book a call" text is clickable and triggers the Cal.com modal

- [ ] **Step 3: Commit**

```bash
git add app/pricing/page.tsx
git commit -m "feat: add website add-on footnote to pricing page"
```

---

## Task 6: Smoke Test the Full Site

- [ ] **Step 1: Check all nav links**

Open `http://localhost:3000`. Click every nav link:
- Features → `/features` ✓
- Pricing → `/pricing` ✓
- Free Consultation → `/consult` ✓
- About → `/about` ✓
- Book Demo button → Cal.com modal ✓

- [ ] **Step 2: Check footer links**

Scroll to footer on the homepage. Click:
- Features column: all four links land on the correct `#anchor` sections on `/features`
- About column: unchanged links work

- [ ] **Step 3: Check old Services URL**

Navigate to `http://localhost:3000/services`. Confirm redirect to `/features`.

- [ ] **Step 4: Mobile check**

Resize browser to mobile width (~375px). Confirm:
- Hamburger menu shows correct 4 links
- Homepage website section stacks to single column
- Features page sections stack gracefully

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: smoke test complete — site reorganization done"
```

---

## Copy Placeholders

All `[COPY: ...]` strings throughout the Features page and homepage WebsiteGallery are intentional placeholders for the team to finalize. They are functional stubs that describe the intended message. Search for `[COPY:` across the codebase to find all instances:

```bash
grep -r "\[COPY:" app/
```
