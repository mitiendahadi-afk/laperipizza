"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* 12 gallery images with aspect ratios for true masonry feel */
const IMAGES = [
  { src: "restaurant-exterior.jpg",  alt: "Exterior del restaurante", ratio: "16/9" },
  { src: "pizza-diavola.jpg",        alt: "Pizza Diavola",            ratio: "3/4"  },
  { src: "restaurant-interior.jpg",  alt: "Interior del restaurante", ratio: "4/3"  },
  { src: "pizza-godfather.jpg",      alt: "Pizza Godfather",          ratio: "1/1"  },
  { src: "calzone-classico.jpg",     alt: "Calzone Classico",         ratio: "3/4"  },
  { src: "pizza-italiana.jpg",       alt: "Pizza Italiana",           ratio: "4/3"  },
  { src: "restaurant-bar.jpg",       alt: "Nuestra barra",            ratio: "16/9" },
  { src: "pizza-burrata-pesto.jpg",  alt: "Burrata & Pesto",          ratio: "1/1"  },
  { src: "pizza-cotto.jpg",          alt: "Pizza Cotto",              ratio: "4/3"  },
  { src: "calzone-board.jpg",        alt: "Calzone del Mar",          ratio: "16/9" },
  { src: "pizza-vegetariana.jpg",    alt: "Pizza Vegetariana",        ratio: "1/1"  },
  { src: "salad-fresh.jpg",          alt: "Ensalada fresca",          ratio: "4/3"  },
] as const;

export default function Gallery() {
  const t      = useTranslations("gallery");
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px 0px" });

  const [lightbox, setLightbox] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length)), []);
  const next = useCallback(() => setLightbox((i) => (i === null ? null : (i + 1) % IMAGES.length)), []);

  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape")     closeLightbox();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox, closeLightbox, prev, next]);

  return (
    <>
      <section id="gallery" className="bg-[#F5EFE6] py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Section header */}
          <div ref={ref} className="text-center mb-14">
            <motion.p
              className="text-label text-[#D4A574] mb-4"
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {t("label")}
            </motion.p>
            <motion.h2
              className="text-display-lg text-[#2C2C2C]"
              style={{ fontFamily: "Playfair Display, serif" }}
              initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              {t("heading")}
            </motion.h2>
          </div>

          {/* CSS columns masonry grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="[columns:1] [column-gap:16px] sm:[columns:2] lg:[columns:3]"
          >
            {IMAGES.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, ease: EASE, delay: 0.05 * i }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer mb-4"
                style={{ breakInside: "avoid" }}
                onClick={() => setLightbox(i)}
              >
                <div style={{ position: "relative", aspectRatio: img.ratio }}>
                  <Image
                    src={`/images/${img.src}`}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-semibold tracking-widest uppercase bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      {img.alt}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/93 flex items-center justify-center p-4 lg:p-12"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: IMAGES[lightbox].ratio }}>
                <Image
                  src={`/images/${IMAGES[lightbox].src}`}
                  alt={IMAGES[lightbox].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  quality={95}
                />
              </div>

              {/* Caption + counter */}
              <div className="mt-4 flex items-center justify-between px-1">
                <p className="text-white/70 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                  {IMAGES[lightbox].alt}
                </p>
                <p className="text-white/40 text-xs font-medium tabular-nums" style={{ fontFamily: "Inter, sans-serif" }}>
                  {lightbox + 1} / {IMAGES.length}
                </p>
              </div>
            </motion.div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/22 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label={t("close")}
            >
              <X size={20} />
            </button>

            {/* Prev */}
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label={t("prev")}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next */}
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label={t("next")}
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
