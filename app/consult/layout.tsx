import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule a Free Consultation — VinoHub",
  description:
    "Book a free 30-minute digital strategy session for your wine and spirits business.",
};

export default function ConsultLayout({ children }: { children: React.ReactNode }) {
  return children;
}
