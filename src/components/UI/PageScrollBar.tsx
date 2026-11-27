"use client";

import React, { useEffect, useRef, useState } from "react";

const EDGE_INSET_PX = 10;
const HIDE_DELAY_MS = 900;

/**
 * Minimalist trackless scroll thumb that appears on the right edge only while scrolling
 * and fades out automatically once scrolling stops.
 */
export default function PageScrollBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateThumb = () => {
      rafRef.current = null;
      const bar = barRef.current;
      if (!bar) return;

      const docEl = document.documentElement;
      const viewportHeight = window.innerHeight;
      const scrollHeight = docEl.scrollHeight;
      const maxScroll = scrollHeight - viewportHeight;

      if (maxScroll <= 8) {
        setVisible(false);
        return;
      }

      const thumbHeight = Math.max(
        36,
        Math.min(64, Math.round((viewportHeight / scrollHeight) * viewportHeight))
      );
      const travel = Math.max(0, viewportHeight - thumbHeight - EDGE_INSET_PX * 2);
      const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      const y = EDGE_INSET_PX + progress * travel;

      bar.style.height = `${thumbHeight}px`;
      bar.style.transform = `translate3d(0, ${y}px, 0)`;
    };

    const scheduleUpdate = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(updateThumb);
      }
    };

    const handleScroll = () => {
      scheduleUpdate();
      setVisible(true);

      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
      }
      hideTimerRef.current = window.setTimeout(() => {
        setVisible(false);
      }, HIDE_DELAY_MS);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", scheduleUpdate);
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
      }
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed top-0 right-0 z-50 pointer-events-none transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={barRef}
        className="w-1 h-12 rounded-full bg-[#332f2c]/55 ring-1 ring-white/35 will-change-transform"
      />
    </div>
  );
}

