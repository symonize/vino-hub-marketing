"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StickyGridScrollProps {
  images: string[];
  title: React.ReactNode;
  description: React.ReactNode;
  cta?: React.ReactNode;
}

export default function StickyGridScroll({ images, title, description, cta }: StickyGridScrollProps) {
  const blockRef  = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef  = useRef<HTMLDivElement>(null);
  const descRef   = useRef<HTMLDivElement>(null);
  const btnRef    = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLUListElement>(null);
  const itemRefs  = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    const block   = blockRef.current;
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const title   = titleRef.current;
    const desc    = descRef.current;
    const btn     = btnRef.current;
    const grid    = gridRef.current;
    const items   = itemRefs.current;

    if (!block || !wrapper || !content || !title || !desc || !btn || !grid || !items.length) return;

    // --- Init: hide desc/btn, vertically center title ---
    gsap.set([desc, btn], { opacity: 0, pointerEvents: "none" });

    const dy = (content.offsetHeight - title.offsetHeight) / 2;
    const titleOffsetY = (dy / content.offsetHeight) * 100;
    gsap.set(title, { yPercent: titleOffsetY });

    // --- Group into 3 columns ---
    const numColumns = 3;
    const columns: HTMLLIElement[][] = Array.from({ length: numColumns }, () => []);
    items.forEach((item, i) => columns[i % numColumns].push(item));

    // --- Parallax: wrapper slides up from below as block enters ---
    gsap.from(wrapper, {
      yPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: block,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    // --- Title fade in ---
    gsap.from(title, {
      opacity: 0,
      duration: 0.7,
      ease: "power1.out",
      scrollTrigger: {
        trigger: block,
        start: "top 57%",
        toggleActions: "play none none reset",
      },
    });

    // --- Grid reveal + zoom + content toggle ---
    const wh = window.innerHeight;
    const distY = wh - (wh - grid.offsetHeight) / 2;

    const revealTl = gsap.timeline();
    columns.forEach((col, colIdx) => {
      const fromTop = colIdx % 2 === 0;
      revealTl.from(
        col,
        {
          y: distY * (fromTop ? -1 : 1),
          stagger: { each: 0.06, from: fromTop ? "end" : "start" },
          ease: "power1.inOut",
        },
        "grid-reveal"
      );
    });

    const zoomTl = gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } });
    zoomTl.to(grid, { scale: 2.6 });
    zoomTl.to(columns[0], { xPercent: -65 }, "<");
    zoomTl.to(columns[2], { xPercent: 65 }, "<");
    zoomTl.to(
      columns[1],
      {
        yPercent: (i) => (i < Math.floor(columns[1].length / 2) ? -1 : 1) * 110,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "-=0.5"
    );

    const toggleContent = (visible: boolean) => {
      gsap.timeline({ defaults: { overwrite: true } })
        .to(title, { yPercent: visible ? 0 : titleOffsetY, duration: 0.7, ease: "power2.inOut" })
        .to(
          [desc, btn],
          {
            opacity: visible ? 1 : 0,
            duration: 0.4,
            ease: `power1.${visible ? "inOut" : "out"}`,
            pointerEvents: visible ? "all" : "none",
          },
          visible ? "-=90%" : "<"
        );
    };

    let toggled = false;

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: "top 25%",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress > 0.7 && !toggled) {
            toggleContent(true);
            toggled = true;
          } else if (self.progress <= 0.7 && toggled) {
            toggleContent(false);
            toggled = false;
          }
        },
      },
    });

    mainTl.add(revealTl).add(zoomTl, "-=0.6");

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf([wrapper, title, desc, btn, grid, ...items]);
    };
  }, []);

  return (
    // 425vh gives enough scroll travel for the full animation
    <div ref={blockRef} className="block--main relative" style={{ height: "425vh" }}>
      {/* Sticky container */}
      <div ref={wrapperRef} className="sticky top-0 overflow-hidden will-change-transform">
        {/* Content overlay (title, desc, CTA) */}
        <div
          ref={contentRef}
          className="relative z-10 flex h-screen flex-col items-center justify-center text-center"
        >
          <div ref={titleRef} className="w-full max-w-[780px] px-6">
            <div className="text-[clamp(32px,4.5vw,50px)] font-medium leading-[1.18] tracking-[-1.5px] text-ink">
              {title}
            </div>
          </div>
          <div ref={descRef} className="mt-6 max-w-[549px] px-6 text-[19px] leading-[28px] tracking-[-0.19px] text-muted">
            {description}
          </div>
          {cta && (
            <div ref={btnRef} className="mt-8">
              {cta}
            </div>
          )}
        </div>

        {/* Gallery grid */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "min(580px, 72vw)" }}
        >
          <ul
            ref={gridRef}
            className="grid grid-cols-3 gap-x-[32px] gap-y-[40px] will-change-transform"
          >
            {images.map((src, i) => (
              <li
                key={i}
                ref={(el) => { if (el) itemRefs.current[i] = el; }}
                className="aspect-square w-full will-change-transform"
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover rounded-[8px]"
                  draggable={false}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
