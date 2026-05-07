import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif, Roboto_Flex } from "next/font/google";
import "./globals.css";
import CalInit from "@/components/cal-init";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  weight: ["400", "500", "600", "700"],
});

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-proximity",
  axes: ["wdth"],
});

// Figma uses Grenette Pro (paid). Instrument Serif Italic is the closest free match
// for the display italic accents ("better way", "In One Place").
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-grenette",
  weight: "400",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "VinoHub — The better way to manage your wine inventory",
  description:
    "A fully customizable wine portfolio management software for wine distributors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${instrumentSerif.variable} ${robotoFlex.variable}`}>
      <body className="font-sans bg-bg text-ink">
        <CalInit />
        {children}
      </body>
    </html>
  );
}
