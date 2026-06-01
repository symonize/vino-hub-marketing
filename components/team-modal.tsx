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
  funFact?: string | string[];
  linkedIn?: string;
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
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.removeProperty("--scrollbar-width");
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
                  {Array.isArray(member.funFact) ? (
                    <ul className="mt-2 space-y-1 text-[16px] leading-[24px] tracking-[-0.16px] text-[#2f2f2f]">
                      {member.funFact.map((fact, i) => (
                        <li key={i}>{fact}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-[16px] leading-[24px] tracking-[-0.16px] text-[#2f2f2f]">
                      {member.funFact}
                    </p>
                  )}
                </div>
              )}

              {member.linkedIn && (
                <div className="mt-6 border-t border-black/10 pt-6">
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-[10px] border border-[#0a66c2]/25 bg-[#0a66c2]/5 px-5 py-3 text-[15px] font-medium text-[#0a66c2] transition-colors hover:bg-[#0a66c2]/10"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Let&apos;s Connect on LinkedIn
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
