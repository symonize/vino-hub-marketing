# Consult Form Redesign

**Date:** 2026-05-08
**File:** `app/consult/page.tsx` — `ConsultationForm` component

## Summary

Enhance the free consultation form from a plain stacked-input layout into a visually rich, interactive experience. The structure remains a single page (no wizard steps), but field types are reimagined and micro-interactions are added throughout.

---

## Field Changes

### Text inputs (Name, Email, Role, Company, Phone)

- Replace static placeholder labels with **floating labels**
- Each field is wrapped in `<div className="relative">` containing `<input>` then `<label>`
- Input: `h-[52px]`, `pt-[18px] pb-[6px] px-[13px]`, `placeholder=" "` (single space)
- Label resting state (inside field): `absolute left-[13px] top-1/2 -translate-y-1/2 text-[15px] text-muted pointer-events-none transition-all duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)]`
- Label floated state (triggered by `input:focus + label` and `input:not(:placeholder-shown) + label`): `top-[10px] translate-y-0 text-[10px] font-semibold tracking-[0.06em] uppercase text-muted`
- Note: label must come **after** the input in the DOM for the `+` sibling selector to work
- Add these CSS rules to `app/globals.css` under `.float-field input:focus + label` and `.float-field input:not(:placeholder-shown) + label`; wrap each field's `<div>` with `className="float-field relative"`

### Textarea (challenge field)

- Same floating label pattern as text inputs
- Textarea: `h-[110px]`, `pt-[28px] pb-[10px] px-[13px]`, `placeholder=" "`
- Label resting state: `absolute left-[13px] top-[14px] text-[15px] text-muted pointer-events-none transition-all duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)]` (top-aligned, not vertically centered)
- Label floated state: `top-[8px] text-[10px] font-semibold tracking-[0.06em] uppercase text-muted`
- Use `.float-field textarea:focus + label` and `.float-field textarea:not(:placeholder-shown) + label` in `globals.css`

### Layout

- Name + Email → `<div className="grid grid-cols-2 gap-3">`
- Role + Company → `<div className="grid grid-cols-2 gap-3">`
- Phone → single column, `<div className="max-w-[240px]">`
- Textarea and interactive fields remain full-width

### ERP software (was: `<select name="erp">`)

- Replace with **pill chip group** (multi-select)
- `<div className="flex flex-wrap gap-2">` wrapping `<PillChip>` buttons
- Hidden `<input type="hidden" name="erp" value={erpValues.join(",")} />` preserves the field name for the existing form action; defaults to `""` when nothing selected
- Options: `["None", "VinoShipper", "WineDirect", "Commerce7", "Other"]`
- Spring-pop animation on **select only**: see PillChip spec below
- **Deselect**: no animation — immediate style swap
- Selected: `bg-ink text-white border-ink`
- Unselected: `bg-white text-ink border-[#d5d5d5]`, hover `border-ink`

### Highest priority area (was: `<select name="priority">`)

- Replace with **pill chip group** (single-select)
- `<div className="flex flex-wrap gap-2">` wrapping `<PillChip>` buttons
- Hidden `<input type="hidden" name="priority" value={priorityValue} />` — defaults to `""` when nothing selected (same empty-string default as the previous `<select>` which also submitted `""` with no selection; server action behavior is unchanged)
- Options: `["Website", "E-commerce", "Portfolio management", "Sales tools", "AI / automation"]`
- Same spring-pop on select, no animation on deselect
- Single-select: clicking a new pill calls `setPriorityValue(label)`, deselecting the previous

### Digital maturity scale (was: `<select name="maturity">`)

- Replace with **segmented control**
- Hidden `<input type="hidden" name="maturity" value={maturityValue ?? ""} />` — defaults to `""` when nothing selected
- State: `maturityValue: string | null`, initial `null`
- Caller: `<SegmentedControl options={["1","2","3","4","5"]} value={maturityValue} onChange={setMaturityValue} />`
- Labels below: `<div className="flex justify-between mt-[5px] text-[11px] text-muted">` with "Just starting" and "Highly mature"

---

## Micro-interactions

| Interaction | Detail |
|---|---|
| Floating label animate-up | CSS transition 180ms `cubic-bezier(0.4,0,0.2,1)` on `top`, `font-size`, `transform` |
| Pill spring-pop on select | keyframe: `0% scale(1) → 50% scale(1.15) → 100% scale(1)`, 220ms, `cubic-bezier(0.34,1.56,0.64,1)` |
| Segmented thumb slide | CSS `transition: left 220ms cubic-bezier(0.4,0,0.2,1), width 220ms cubic-bezier(0.4,0,0.2,1)` on the thumb div |
| Text input focus border | `focus:border-ink/40 transition-colors` (unchanged from current) |

---

## Component Structure

`ConsultationForm` becomes a `"use client"` component. State:

```ts
const [erpValues, setErpValues] = useState<string[]>([])
const [priorityValue, setPriorityValue] = useState<string>("")
const [maturityValue, setMaturityValue] = useState<string | null>(null)
```

### `PillChip` (local to file)

```ts
interface PillChipProps {
  label: string
  selected: boolean
  onClick: () => void
}
```

- Renders `<button type="button">`
- Uses a `isAnimating` boolean local state (or a `useRef` class toggle) to trigger the `pill-pop` keyframe
- On click: call `onClick()`, then set `isAnimating = true`; remove via `onAnimationEnd` handler on the button: `onAnimationEnd={() => setIsAnimating(false)}`
- Use a `justSelected` ref (`useRef(false)`) to guard the animation: set it to `true` inside `onClick` before calling `onClick()`, then apply class `pill-pop-anim` when `justSelected.current === true`. Clear it in `onAnimationEnd`.
- Do **not** guard on `selected` prop — by the time React re-renders, `selected` has already flipped, making `!selected` an incorrect guard for "just became selected".

```css
/* globals.css */
@keyframes pill-pop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.15); }
  100% { transform: scale(1); }
}
.pill-pop-anim {
  animation: pill-pop 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### `SegmentedControl` (local to file)

```ts
interface SegmentedControlProps {
  options: string[]
  value: string | null
  onChange: (val: string) => void
}
```

- Renders `<div role="group" className="relative flex bg-[#f0f0f0] rounded-[10px] p-[3px] gap-0">` 
- One `<button type="button">` per option, each `flex-1`
- A `<div>` positioned `absolute inset-y-[3px]` acts as the sliding thumb with `bg-white rounded-[8px] shadow-sm`
- Thumb inline style: `{ left: thumbLeft, width: thumbWidth, transition: "left 220ms cubic-bezier(0.4,0,0.2,1), width 220ms cubic-bezier(0.4,0,0.2,1)" }`
- Thumb measurement: attach a `ref` to the track `<div>`; calculate `thumbWidth = (trackRef.current.offsetWidth - 6) / options.length` (subtracting 3px padding on each side) and `thumbLeft = index * thumbWidth + 3` (offset by the left padding)
- Recalculate on `value` change via `useEffect`; also add a `ResizeObserver` on the track to recalculate if the container resizes (e.g. on window resize or when two-column grid reflows)
- Thumb is hidden (`opacity-0`) when `value === null`

---

## Visual divider

Add **one** `<hr className="border-t border-[#ebebeb] my-0" />` between the text fields block (Name/Email through Phone) and the interactive fields block (ERP chips, priority chips, maturity scale, textarea).

---

## globals.css additions

The CSS block below handles **floated state only**. All resting-state positioning (e.g. `top-1/2 -translate-y-1/2` for inputs, `top-[14px]` for textarea) is set exclusively via Tailwind classes in JSX and must not be duplicated in CSS.

```css
@keyframes pill-pop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.15); }
  100% { transform: scale(1); }
}
.pill-pop-anim {
  animation: pill-pop 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Floated state only — resting positions are set via Tailwind in JSX */
.float-field input:focus + label,
.float-field input:not(:placeholder-shown) + label,
.float-field textarea:focus + label,
.float-field textarea:not(:placeholder-shown) + label {
  top: 8px;
  transform: none;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
```

---

## Out of scope

- Form submission handler / server action — no logic changes; hidden inputs preserve all existing field names; empty-string default matches previous `<select>` behavior
- Client-side validation
- Mobile layout — existing responsive behavior preserved; two-column grid collapses naturally on small screens via `grid-cols-2` (add `sm:grid-cols-2 grid-cols-1` if needed, at implementer discretion)
- Animation libraries — plain CSS keyframes and transitions only, no Framer Motion
