# VinoHub Site Reorganization Spec
_Date: 2026-05-11_

## Context & Goals

VinoHub is a SaaS product for wine distributors and importers. The primary conversion goal is booking a demo/consultation call. The target audience is cold traffic — both owner/GMs (ROI, operations) and sales/marketing managers (day-to-day tools). Website design is an add-on service, not a separate product line.

The site currently has a "Services" page that conflates SaaS features with the website design offering, and each feature section is too thin to self-qualify a prospect. The website design service has no clear home and is underpowered relative to its acquisition potential (it can be an entry point for prospects who find VinoHub through the web design angle).

---

## Navigation Changes

**Current nav array in `site-chrome.tsx`:**
```
Services → /services
Free Consultation → /consult
About → /about
Contact → /#contact
```

**New nav array:**
```
Features → /features
Pricing → /pricing
Free Consultation → /consult
About → /about
```

Changes:
- Rename "Services" → "Features", update href to `/features`
- Restore "Pricing" link (currently commented out)
- Remove "Contact" — it pointed to `/#contact` which doesn't exist; contact is handled by the Free Consultation page
- Website design does **not** get a nav item

Note: `NAV_LINKS` drives both desktop and mobile menus from the same array — updating it handles both automatically.

---

## Homepage Changes

### Existing sections (no changes)
- Hero
- Portfolio Sticky Grid
- Feature Cards (Hub, Sales Sheets, AI partner)
- Consultation CTA

### WebsiteGallery section (expand)

The existing `WebsiteGallery` component in `app/page.tsx` is thin — a heading, one paragraph, a marquee, and a "Learn More" CTA that currently points to `href="#web"` (a broken self-anchor on the homepage). Replace this section with a proper 2-column layout:

- **Headline:** e.g. "A website that sells as hard as your portfolio" (final copy TBD by team)
- **Subheadline/copy:** Emphasize the differentiator — the site is live-connected to VinoHub inventory, always in sync, no manual updates needed
- **Layout:** Left column = copy + CTA; Right column = marquee or grid of site screenshots (reuse existing `shots` assets)
- **CTA:** "Learn More" — update href from `#web` to `/features#websites` (anchor to the website section on the Features page)

### Footer (`site-chrome.tsx` → `Footer` component)

Update to match new nav structure. Explicit before/after:

**Before:**
- Services column: Wine Asset Management → `/services#hub`, Website Design & Dev → `/services#web`, AI Solutions → `/services#ai`
- About column: Our Team → `/about`, Contact Us → `/consult`

**After:**
- Rename "Services" column heading → "Features"
- Update links: Wine Asset Management → `/features#hub`, Sales Sheets & Trade Tools → `/features#sheets`, AI Solutions → `/features#ai`, Website Design & Dev → `/features#websites`
- About column: Our Team → `/about`, Contact Us → `/consult` (no change)

---

## Features Page

### Routing

- Create `app/features/page.tsx` (new file — effectively a rewrite of the services page)
- Add a redirect from `/services` → `/features` in `app/services/page.tsx` using Next.js `redirect()`:
  ```ts
  import { redirect } from "next/navigation";
  export default function ServicesRedirect() { redirect("/features"); }
  ```
- Update `<head>` metadata: title → `"Features — VinoHub"`, update description to reflect SaaS platform framing

### Scope note

The current services page (`app/services/page.tsx`) has the structure: `ServicesHero → WineAssetTabs → WebsiteSection → AISolutionsSection → ConsultationCTA`. The new Features page is a **full rewrite** with a different layout and section order. The `WineAssetTabs` component is **not carried forward** — it is replaced by the expanded individual feature sections below. `ServicesHeroGraphic` can be reused.

### Page structure

**1. Hero**
- Reuse `ServicesHeroGraphic` component (lives at `components/services-hero-graphic.tsx` — no move needed) and existing visual treatment
- Update headline copy to orient around the SaaS platform (not "digital services")
- Update subheadline copy accordingly

**2. The Hub** (`id="hub"`)
- Descriptive copy: what The Hub is, who uses it, what problem it solves (centralized portfolio access for sales reps and trade accounts)
- Screenshot or product visual (reuse `assets.hubScreenshot`)
- 3–4 capability callouts, e.g.: real-time inventory, role-based access, mobile-friendly for in-field reps, one source of truth

**3. Sales Sheets & Trade Tools** (`id="sheets"`)
- This is a standalone SaaS feature (not part of the AI section)
- Descriptive copy: one-click generation of professional sales sheets, shelf talkers, and other collateral directly from live inventory data
- Screenshot (reuse `assets.salesSheetScreenshot`)
- 3–4 capability callouts, e.g.: always up-to-date from the database, branded templates, shareable links, no design software needed

**4. VinoHub AI** (`id="ai"`)
- Descriptive copy: an AI assistant that knows the entire portfolio — answers questions, surfaces insights, automates data cleanup
- Visual: reuse the chat UI / `ChatFlow` component or the vineyard AI card from the current services page
- 3–4 capability callouts, e.g.: CSV import and cleanup, natural language inventory queries, analytics, bulk data operations

**5. Website Design & Development** (`id="websites"`)
- Position as the natural next step: "You're running your portfolio on VinoHub — now put it in front of the world"
- Copy emphasis: public-facing winery/importer websites **live-connected** to the VinoHub platform (inventory always in sync, no manual updates)
- Visual: gallery of site screenshots — reuse the marquee pattern from the homepage `WebsiteGallery`
- 3–4 differentiator callouts: live inventory integration, no static content to maintain, designed for the wine trade, full setup and ongoing hosting
- CTA: "Book a call to discuss your website" → Cal.com booking (use `CTAButton cal`)

**6. Consultation CTA**
- Keep the existing dark gradient CTA block (copy from current services page `ConsultationCTA` function)

---

## Pricing Page

- Restore the Pricing link in `NAV_LINKS` (already implemented in nav changes above)
- No content changes to `app/pricing/page.tsx` — existing metadata (`title: "Pricing — VinoHub"`) is acceptable as-is
- Add a small note or footnote to the pricing page clarifying that website design is priced separately as a custom quote — UI treatment is a single line of muted text below the pricing grid, e.g. "Website design & development is available as a custom add-on. [Book a call](#) to discuss."

---

## Out of Scope

- Homepage hero, sticky grid, feature cards — no changes
- About page — no changes
- Consult/form page — separate spec (`docs/superpowers/specs/2026-05-08-consult-form-redesign.md`)
- Final copy — this spec defines structure and intent; the team writes final copy
- New photography or screenshots — reuse existing assets throughout
