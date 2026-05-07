"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, type Transition } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";

/* ── Shared easing curve ────────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Animation presets ──────────────────────────────────────────────────────── */
const fadeUpTransition = (delay: number): Transition => ({
  delay,
  duration: 0.75,
  ease: EASE,
});

const revealTransition = (delay: number): Transition => ({
  delay,
  duration: 1,
  ease: EASE,
});

export default function Hero() {
  const t          = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax — hero image scrolls at ~25% of page scroll speed */
  const { scrollY } = useScroll();
  const imgY        = useTransform(scrollY, [0, 900], ["0%", "25%"]);
  /* Content fades + rises as user scrolls away */
  const contentOp   = useTransform(scrollY, [0, 500], [1, 0]);
  const contentY    = useTransform(scrollY, [0, 500], ["0%", "12%"]);

  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen min-h-[680px] max-h-[1080px] overflow-hidden flex items-center justify-center"
    >
      {/* ── Background: Ken Burns zoom + scroll parallax ─────────────────── */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: imgY }}
      >
        {/* Inner wrapper carries the Ken Burns animation independently */}
        <div className="animate-kenburns absolute inset-[-4%] w-[108%] h-[108%]">
          <Image
            src="/images/hero-main.jpg"
            alt="L'AperiPizza — wood-fired Neapolitan pizza"
            fill
            priority
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </motion.div>

      {/* ── Gradient overlays ────────────────────────────────────────────── */}
      {/* Top: navbar readability */}
      <div className="absolute inset-x-0 top-0 h-40 z-[1] bg-gradient-to-b from-black/55 to-transparent pointer-events-none" />
      {/* Bottom: content anchor */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 z-[1] bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
      {/* Overall dim */}
      <div className="absolute inset-0 z-[1] bg-black/25 pointer-events-none" />

      {/* ── Main content (fades on scroll) ──────────────────────────────── */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity: contentOp, y: contentY }}
      >
        {/* Category label */}
        <div className="overflow-hidden mb-5">
          <motion.p
            className="text-label text-[#D4A574] text-shadow-sm"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={revealTransition(0.2)}
          >
            Pizzeria Italiana di Qualità
          </motion.p>
        </div>

        {/* Restaurant name — curtain reveal */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            className="text-display-xl text-white text-shadow-hero"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={revealTransition(0.35)}
          >
            L&apos;AperiPizza
          </motion.h1>
        </div>

        {/* Language tagline — curtain reveal */}
        <div className="overflow-hidden mb-4">
          <motion.p
            className="text-display-md italic text-white/85 text-shadow-sm"
            style={{ fontFamily: "Playfair Display, serif" }}
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={revealTransition(0.5)}
          >
            {t("tagline")}
          </motion.p>
        </div>

        {/* Location subtitle */}
        <motion.p
          className="text-[#D4A574] text-sm tracking-[0.16em] mb-10 text-shadow-sm"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fadeUpTransition(0.65)}
        >
          {t("location")}
        </motion.p>

        {/* ── CTA Buttons ────────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fadeUpTransition(0.8)}
        >
          {/* Primary — terracotta */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => goTo("reservations")}
            className="px-8 py-4 bg-[#C65D3A] hover:bg-[#d46b47] text-white text-sm font-semibold tracking-[0.15em] uppercase rounded-full cursor-pointer transition-colors duration-300 shadow-[0_6px_24px_rgba(198,93,58,0.45)] hover:shadow-[0_6px_32px_rgba(198,93,58,0.6)] min-w-[180px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {t("cta_primary")}
          </motion.button>

          {/* Secondary — outline white */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => goTo("menu")}
            className="px-8 py-4 border-2 border-white/50 hover:border-white text-white text-sm font-semibold tracking-[0.15em] uppercase rounded-full cursor-pointer backdrop-blur-sm transition-all duration-300 hover:bg-white/10 min-w-[180px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {t("cta_secondary")}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* ── TripAdvisor badge — bottom-left, glass morphism ─────────────── */}
      <motion.div
        className="absolute bottom-20 left-6 lg:left-10 z-10"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.7, ease: EASE }}
      >
        <div className="glass-dark rounded-2xl px-4 py-3 flex items-center gap-3">
          {/* TripAdvisor brand mark */}
          <div className="w-9 h-9 rounded-full bg-[#34E0A1] flex items-center justify-center shrink-0 text-[10px] font-bold text-white leading-none">
            TA
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4].map((s) => (
                <Star key={s} size={11} className="text-[#34E0A1] fill-[#34E0A1]" />
              ))}
              {/* Half-filled 5th star effect */}
              <div className="relative w-[11px] h-[11px]">
                <Star size={11} className="absolute inset-0 text-white/20" />
                <div className="absolute inset-0 overflow-hidden w-[70%]">
                  <Star size={11} className="text-[#34E0A1] fill-[#34E0A1]" />
                </div>
              </div>
              <span className="text-white text-xs font-bold ml-1.5">4.7 / 5</span>
            </div>
            <span className="text-white/55 text-[10px] tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>
              {t("rating_reviews")}
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll indicator — bottom-centre ─────────────────────────────── */}
      <motion.button
        onClick={() => goTo("about")}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/45 hover:text-white/75 cursor-pointer transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span
          className="text-[9px] tracking-[0.22em] uppercase text-shadow-sm"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {t("scroll")}
        </span>
        <div className="animate-bounce-y">
          <ChevronDown size={20} />
        </div>
      </motion.button>
    </section>
  );
}
