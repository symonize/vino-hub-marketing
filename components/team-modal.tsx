"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  imageUrl?: string;
  initials: string;
  shortBio: string;
  fullBio: string[];
  funFact?: string;
};

interface Props {
  member: TeamMember | null;
  onClose: () => void;
}

export default function TeamModal({ member, onClose }: Props) {
  useEffect(() => {
    if (!member) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            className="relative z-10 grid max-h-[88vh] w-full max-w-[860px] grid-cols-1 overflow-hidden rounded-[20px] bg-white shadow-2xl md:grid-cols-[300px_1fr]"
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square w-full bg-gradient-to-br from-[#7f3333] to-[#3a1414] md:aspect-auto md:h-full">
              {member.imageUrl ? (
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-serif text-[96px] italic text-white/95">
                    {member.initials}
                  </span>
                </div>
              )}
            </div>

            <div className="relative flex flex-col overflow-y-auto p-8 md:p-10">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full text-[#535353] transition-colors hover:bg-black/5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6l-12 12" />
                </svg>
              </button>

              <h3 className="font-serif text-[36px] leading-[1.1] tracking-[-1.08px] text-[#2f2f2f]">
                {member.name}
              </h3>
              <p className="mt-1 text-[15px] uppercase tracking-[1.5px] text-[#7f3333]">
                {member.title}
              </p>

              <div className="mt-6 space-y-4 text-[17px] leading-[26px] tracking-[-0.17px] text-[#535353]">
                {member.fullBio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {member.funFact && (
                <div className="mt-6 rounded-[12px] border border-black/10 bg-[#fafaf7] p-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[1.5px] text-[#7f3333]">
                    Off the clock
                  </p>
                  <p className="mt-2 text-[16px] leading-[24px] tracking-[-0.16px] text-[#2f2f2f]">
                    {member.funFact}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
