"use client";

import { useRef } from "react";
import VariableProximity from "./variable-proximity";

interface Props {
  label: string;
  className?: string;
  radius?: number;
}

export default function VariableProximityText({ label, className = "", radius = 100 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      className={`inline-block ${className}`}
      style={{ fontFamily: "var(--font-proximity), sans-serif" }}
    >
      <VariableProximity
        label={label}
        containerRef={ref as React.MutableRefObject<HTMLElement | null>}
        radius={radius}
        falloff="gaussian"
        fromFontVariationSettings="'wdth' 60"
        toFontVariationSettings="'wdth' 140"
      />
    </span>
  );
}
