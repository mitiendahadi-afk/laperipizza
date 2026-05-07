"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

import { Flame, Leaf, Heart, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Feature card definitions — icons are from lucide-react, colors match brand */
const FEATURES = [
  { icon: Flame, num: "1", iconColor: "text-[#C65D3A]", bgColor: "bg-[#C65D3A]/10" },
  { icon: Leaf,  num: "2", iconColor: "text-[#2D7D4F]", bgColor: "bg-[#2D7D4F]/10" },
  { icon: Heart, num: "3", iconColor: "text-[#C65D3A]", bgColor: "bg-[#C65D3A]/10" },
] as const;

export default function About() {
  const t = useTranslations("about");

  /* Trigger animations once as section enters the viewport */
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-120px 0px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-36 bg-[#F5EFE6] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[40%_1fr] gap-14 lg:gap-24 items-center">

          {/* ── Left: restaurant image ──────────────────────────────────── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -70 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(44,44,44,0.18)] aspect-[4/5]">
              <Image
                src="/images/restaurant-exterior.jpg"
                alt="L'AperiPizza — restaurant exterior in Costa Calma"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Soft gradient at the bottom for a polished look */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Decorative accent squares */}
            <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-2xl bg-[#C65D3A]/15 -z-10" />
            <div className="absolute -top-5 -left-5 w-16 h-16 rounded-2xl bg-[#D4A574]/20 -z-10" />

            {/* Floating stat badge */}
            <motion.div
              className="absolute -bottom-4 left-6 lg:left-8 glass bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-[#EDE4D3]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            >
              <p className="text-2xl font-bold text-[#C65D3A]" style={{ fontFamily: "Playfair Display, serif" }}>
                485°C
              </p>
              <p className="text-xs text-[#2C2C2C]/60 tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>
                Horno de leña
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: content ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            {/* Section label */}
            <p className="text-label text-[#D4A574] mb-4">{t("label")}</p>

            <h2
              className="text-display-lg text-[#2C2C2C] mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {t("heading")}
            </h2>

            {/* Body paragraph */}
            <p
              className="text-[#2C2C2C]/65 text-[1.05rem] leading-relaxed mb-10 max-w-xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {t("body")}
            </p>

            {/* ── Feature cards (3 columns on sm+, stacked on xs) ────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {FEATURES.map(({ icon: Icon, num, iconColor, bgColor }, i) => (
                <motion.div
                  key={num}
                  className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(44,44,44,0.07)] hover:shadow-[0_4px_24px_rgba(44,44,44,0.12)] transition-shadow duration-300"
                  initial={{ opacity: 0, y: 28 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.35 + i * 0.1 }}
                >
                  <div className={`w-11 h-11 rounded-full ${bgColor} flex items-center justify-center mb-4`}>
                    <Icon size={22} className={iconColor} />
                  </div>
                  <p
                    className="font-semibold text-[#2C2C2C] text-sm mb-1.5"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {t(`feature${num}_title`)}
                  </p>
                  <p
                    className="text-[#2C2C2C]/50 text-xs leading-relaxed"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {t(`feature${num}_desc`)}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* ── Opening hours box ──────────────────────────────────── */}
            <motion.div
              className="flex items-start gap-4 border-l-[3px] border-[#D4A574] bg-white rounded-r-2xl px-6 py-5 shadow-[0_2px_12px_rgba(44,44,44,0.06)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.65 }}
            >
              <Clock size={20} className="text-[#D4A574] mt-0.5 shrink-0" />
              <div>
                <p
                  className="font-semibold text-[#2C2C2C] text-sm mb-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t("hours_title")}
                </p>
                <p
                  className="text-[#2C2C2C]/70 text-sm mb-0.5"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t("hours_weekdays")}&nbsp;·&nbsp;
                  <span className="font-medium text-[#2C2C2C]">{t("hours_weekday_time")}</span>
                </p>
                <p
                  className="text-[#2C2C2C]/45 text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t("hours_closed_days")}&nbsp;·&nbsp;{t("hours_closed_time")}
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
