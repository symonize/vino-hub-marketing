"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

type Cell = {
  content: ReactNode;
  /** Optional grid placement classes like "col-span-2 row-span-2" */
  className?: string;
};

interface ScrollRevealGridProps {
  cells: Cell[];
  /** Tailwind classes that define the grid (cols, gap, etc) */
  gridClassName?: string;
  className?: string;
}

/**
 * Grid where each cell reveals as it enters the viewport: the wrapper fades
 * + lifts (y 30→0) while the inner content scales from 1.15 → 1.0. The cell
 * has overflow hidden, so the inner scale-down reads as a subtle morph /
 * stretch rather than a plain fade.
 */
export default function ScrollRevealGrid({
  cells,
  gridClassName = "grid grid-cols-2 md:grid-cols-4 gap-4",
  className = "",
}: ScrollRevealGridProps) {
  return (
    <div className={`${gridClassName} ${className}`}>
      {cells.map((cell, i) => (
        <motion.div
          key={i}
          className={`${cell.className ?? ""} overflow-hidden`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="h-full w-full"
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
          >
            {cell.content}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
