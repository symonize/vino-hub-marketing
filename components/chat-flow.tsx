"use client";

import { useMemo } from "react";
import AnimatedList, {
  AnimatedListItem,
} from "@/components/react-bits/animated-list";
import { assets } from "@/app/assets";

type Role = "user" | "ai";

interface Message {
  role: Role;
  text: string;
  attachment?: "csv";
}

const SCRIPT: Message[] = [
  { role: "user", text: "Update all our inventory from this CSV", attachment: "csv" },
  { role: "ai", text: "No problem, I've updated 218 wines in your inventory based on this data." },
  { role: "user", text: "Which of our Italian reds are low on stock?" },
  { role: "ai", text: "4 SKUs are under 50 cases: Barolo Riserva '19, Chianti Classico '21, Amarone '20, and Brunello '18." },
  { role: "user", text: "Generate a sell sheet for the Barolo" },
  { role: "ai", text: "Done — your Barolo Riserva '19 sell sheet is ready with tasting notes, ratings, and pairings." },
  { role: "user", text: "What's our best-selling Pinot Noir this quarter?" },
  { role: "ai", text: "Willamette Reserve '22 — up 34% QoQ with 1,240 cases moved across 18 accounts." },
];

function Bubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const shell = isUser
    ? "border border-white/30 bg-black/30"
    : "border border-white/30 bg-wine/60";
  return (
    <div className={`max-w-[420px] rounded-[15px] p-4 backdrop-blur-sm ${shell}`}>
      {message.attachment === "csv" ? (
        <div className="flex items-center gap-3">
          <div className="flex h-[60px] w-[66px] items-start justify-center rounded-t-[7px] bg-white pt-2">
            <img src={assets.excelIcon} alt="" className="h-[26px] w-[29px]" />
          </div>
          <p className="text-[20px] leading-[26px] tracking-[-0.6px] text-white">
            {message.text}
          </p>
        </div>
      ) : (
        <p className="text-[20px] leading-[26px] tracking-[-0.6px] text-white">
          {message.text}
        </p>
      )}
    </div>
  );
}

export default function ChatFlow() {
  const items: AnimatedListItem[] = useMemo(
    () =>
      SCRIPT.map((m, i) => ({
        id: `msg-${i}`,
        content: <Bubble message={m} />,
      })),
    [],
  );

  return (
    <div className="absolute bottom-8 left-8 w-[460px]">
      <AnimatedList
        items={items}
        autoAddDelay={2500}
        maxItems={3}
        animationType="blur"
        enterFrom="top"
        duration={0.7}
        itemGap={12}
        fadeEdges
        fadeEdgeSize={60}
        fadeColor="transparent"
        startFrom="top"
        height={360}
        itemClassName="bg-transparent"
      />
    </div>
  );
}
