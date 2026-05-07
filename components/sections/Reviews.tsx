"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const REVIEWS = [
  {
    name: "Carlos R.",
    flag: "🇪🇸",
    rating: 5,
    date: "Marzo 2024",
    platform: "TripAdvisor",
    text: "La mejor pizza que hemos probado en Fuerteventura. La masa es increíblemente ligera y la Godfather es espectacular. El servicio, amabilísimo. ¡Volveremos cada año!",
  },
  {
    name: "Wolfgang M.",
    flag: "🇩🇪",
    rating: 5,
    date: "Febrero 2024",
    platform: "TripAdvisor",
    text: "Ausgezeichnete neapolitanische Pizza! Der Teig ist perfekt — knusprig aussen und weich innen. Das Godfather-Pizza war fantastisch. Das freundliche Personal macht es noch besser.",
  },
  {
    name: "James & Sarah",
    flag: "🇬🇧",
    rating: 5,
    date: "Enero 2024",
    platform: "Google",
    text: "Absolutely superb! We visited three times during our holiday. The Italiana pizza is a must — fresh bresaola, rocket and parmesan. Genuine Neapolitan quality in the Canaries.",
  },
  {
    name: "Marco V.",
    flag: "🇮🇹",
    rating: 5,
    date: "Diciembre 2023",
    platform: "TripAdvisor",
    text: "Da italiano, posso dire che questa pizza è davvero autentica! L'impasto è perfettamente lievitato e gli ingredienti sono di primissima qualità. Mi ha ricordato Napoli.",
  },
  {
    name: "Isabelle D.",
    flag: "🇫🇷",
    rating: 5,
    date: "Noviembre 2023",
    platform: "Google",
    text: "Une pizza de qualité exceptionnelle! La pâte est légère et aérienne, les ingrédients sont frais. Le service est chaleureux et rapide. On y retourne absolument!",
  },
  {
    name: "Anke B.",
    flag: "🇩🇪",
    rating: 4,
    date: "Octubre 2023",
    platform: "TripAdvisor",
    text: "Sehr gutes Restaurant mit echter neapolitanischer Pizza. Die Margherita ist erstaunlich gut — manchmal sind die einfachsten Dinge die besten. Schöne Atmosphäre und freundliches Personal.",
  },
] as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={13} className={s <= rating ? "text-[#D4A574] fill-[#D4A574]" : "text-[#D4A574]/25"} />
      ))}
    </div>
  );
}

export default function Reviews() {
  const t    = useTranslations("reviews");
  const ref  = useRef<HTMLDivElement>(null);
  const view = useInView(ref, { once: true, margin: "-100px 0px" });

  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused]       = useState(false);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  }, [activeIdx]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIdx((i) => (i + 1) % REVIEWS.length);
  }, []);

  /* Auto-advance every 5 s, pause on hover */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, [paused, goNext]);

  const slideVariants = {
    enter:  (dir: number) => ({ x: dir * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({ x: dir * -80, opacity: 0 }),
  };

  const review = REVIEWS[activeIdx];

  return (
    <section className="bg-[#2C2C2C] py-24 lg:py-28 overflow-hidden">
      <div ref={ref} className="max-w-5xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.p
            className="text-label text-[#D4A574] mb-4"
            initial={{ opacity: 0, y: 14 }} animate={view ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {t("label")}
          </motion.p>
          <motion.h2
            className="text-display-lg text-white"
            style={{ fontFamily: "Playfair Display, serif" }}
            initial={{ opacity: 0, y: 18 }} animate={view ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            {t("heading")}
          </motion.h2>

          {/* TripAdvisor rank bar */}
          <motion.div
            className="inline-flex flex-col sm:flex-row items-center gap-3 mt-8 px-6 py-4 rounded-2xl bg-white/5 border border-white/10"
            initial={{ opacity: 0, y: 16 }} animate={view ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
          >
            <div className="flex items-center gap-2">
              {/* TripAdvisor owl logo */}
              <div className="w-7 h-7 rounded-full bg-[#34E0A1]/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#34E0A1">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-3 8a2 2 0 110 4 2 2 0 010-4zm6 0a2 2 0 110 4 2 2 0 010-4zm-3 6c-2.33 0-4.31-1.46-5.11-3.53.36.03.72.05 1.11.05 1.04 0 2.04-.21 2.95-.58.13.05.27.1.41.14A5.975 5.975 0 0012 12c.56 0 1.1.08 1.62.22.9.37 1.9.58 2.95.58.39 0 .75-.02 1.11-.05C16.89 14.54 14.92 16 12 16z"/>
                </svg>
              </div>
              <span className="text-[#34E0A1] font-bold text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                {t("tripadvisor_rank")}
              </span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-white/15" />
            <div className="flex items-center gap-2">
              <StarRating rating={5} />
              <span className="text-white font-bold text-sm">4.7</span>
              <span className="text-white/40 text-xs">· {t("total_reviews")}</span>
            </div>
          </motion.div>
        </div>

        {/* ── Carousel ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={view ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Card */}
          <div className="relative overflow-hidden min-h-[280px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIdx}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: EASE }}
                className="w-full"
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10">
                  <Quote size={24} className="text-[#D4A574]/50 mb-5" />
                  <p className="text-white/80 text-base lg:text-lg leading-relaxed italic mb-8 max-w-3xl" style={{ fontFamily: "Playfair Display, serif" }}>
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{review.flag}</span>
                      <div>
                        <p className="text-white font-semibold text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{review.name}</p>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#D4A574] text-xs font-semibold tracking-wide uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{review.platform}</p>
                      <p className="text-white/30 text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{review.date}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls: prev · dots · next */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full bg-white/8 hover:bg-white/18 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer"
              aria-label={t("prev")}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIdx
                      ? "w-6 h-2.5 bg-[#D4A574]"
                      : "w-2.5 h-2.5 bg-white/25 hover:bg-white/45"
                  }`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full bg-white/8 hover:bg-white/18 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer"
              aria-label={t("next")}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
