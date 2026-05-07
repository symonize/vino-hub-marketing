"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const TICKS = [50, 120, 250, 500, 1000, 2500, 5000];
const MIN = TICKS[0];
const MAX = TICKS[TICKS.length - 1];

function formatSku(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `${n}`;
}

function valueToPct(v: number) {
  // log scale across the tick range so spacing feels even
  const lo = Math.log(MIN);
  const hi = Math.log(MAX);
  return ((Math.log(v) - lo) / (hi - lo)) * 100;
}

function pctToValue(p: number) {
  const lo = Math.log(MIN);
  const hi = Math.log(MAX);
  const v = Math.exp(lo + (p / 100) * (hi - lo));
  return Math.round(v);
}

interface Props {
  value: number;
  onChange: (v: number) => void;
}

export default function SkuSlider({ value, onChange }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const pct = valueToPct(value);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      onChange(pctToValue(p));
    },
    [onChange],
  );

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => updateFromClientX(e.clientX);
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragging, updateFromClientX]);

  return (
    <div className="mx-auto w-[402px] max-w-full pt-2">
      <div className="flex items-center gap-3 pb-3">
        <span className="text-[17px] tracking-[-0.51px] text-[#353535]">
          How many SKUs?
        </span>
      </div>

      <div className="relative h-10">
        {/* Tooltip */}
        <div
          className="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 -translate-y-full"
          style={{ left: `${pct}%` }}
        >
          <div className="rounded-[5px] bg-black px-[7px] py-[6px]">
            <span className="text-[16px] font-medium leading-none tracking-[-0.48px] text-white">
              {formatSku(value)}
            </span>
          </div>
          <div className="mx-auto h-0 w-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-black" />
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 cursor-pointer rounded-full bg-[#dcdcdc]"
          onPointerDown={(e) => {
            setDragging(true);
            updateFromClientX(e.clientX);
          }}
        >
          {/* Fill */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-black"
            style={{ width: `${pct}%` }}
          />

          {/* Tick dots */}
          {TICKS.slice(0, -1).map((t) => {
            const tp = valueToPct(t);
            const reached = pct >= tp;
            return (
              <span
                key={t}
                className={`absolute top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                  reached ? "bg-white" : "bg-[#9a9a9a]"
                }`}
                style={{ left: `${tp}%` }}
              />
            );
          })}

          {/* Handle */}
          <button
            type="button"
            aria-label="SKU count"
            onPointerDown={(e) => {
              e.stopPropagation();
              setDragging(true);
            }}
            className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-black bg-white shadow-md transition-transform hover:scale-110 active:scale-105"
            style={{ left: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
