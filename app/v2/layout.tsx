import type { Metadata } from "next";
import { Instrument_Sans, Fraunces, Geist_Mono } from "next/font/google";

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--v2-body",
  weight: ["400", "500", "600", "700"],
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--v2-display",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--v2-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "The VinoHub Field™ — A portfolio playground by VinoHub",
  description:
    "Built for wine. Filled with scrolls, stories, and cellar-level craft. A playful V2 of the VinoHub marketing site.",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${body.variable} ${display.variable} ${mono.variable}`}>
      {children}
    </div>
  );
}
