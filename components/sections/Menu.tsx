"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  pizzas, calzones, starters, salads, specials,
  type PizzaItem, type MenuItem, type Locale,
} from "@/lib/menuData";

/* ── Types ─────────────────────────────────────────────────────────────────── */
type Tab = "pizza" | "calzone" | "entrantes" | "ensaladas" | "especiales";
type PizzaSize = "normal" | "maxi";

/* ── Constants ─────────────────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TABS: { id: Tab; emoji: string; labelKey: string }[] = [
  { id: "pizza",      emoji: "🍕", labelKey: "tab_pizza" },
  { id: "calzone",    emoji: "🥟", labelKey: "tab_calzone" },
  { id: "entrantes",  emoji: "🍽️", labelKey: "tab_starters" },
  { id: "ensaladas",  emoji: "🥗", labelKey: "tab_salads" },
  { id: "especiales", emoji: "⭐", labelKey: "tab_specials" },
];

/* Badge background colours keyed by badge string prefix */
function badgeStyle(badge: string): string {
  if (badge.startsWith("🌶️")) return "bg-red-100 text-red-700";
  if (badge.startsWith("⭐")) return "bg-[#D4A574]/20 text-[#9A6B32]";
  if (badge.startsWith("🌿")) return "bg-green-100 text-green-700";
  if (badge.startsWith("👨‍🍳")) return "bg-[#1B3A5C]/10 text-[#1B3A5C]";
  if (badge.startsWith("🍫")) return "bg-amber-100 text-amber-800";
  return "bg-[#F5EFE6] text-[#2C2C2C]";
}

/* ── Shared grid animation variants ─────────────────────────────────────── */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/* ── Image Placeholder (shown when no image exists) ─────────────────────── */
function PizzaPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#F5EFE6] to-[#EDE4D3]">
      <span className="text-5xl opacity-30 select-none">🍕</span>
    </div>
  );
}

/* ── Single pizza card ───────────────────────────────────────────────────── */
function PizzaCard({ item, locale, size }: { item: PizzaItem; locale: Locale; size: PizzaSize }) {
  const price = size === "normal" ? item.normal : item.maxi;
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(44,44,44,0.08)] hover:shadow-[0_8px_32px_rgba(44,44,44,0.14)] transition-shadow duration-300 flex flex-col group"
    >
      {/* Image / placeholder */}
      <div className="relative w-full aspect-[4/3] bg-[#F5EFE6] overflow-hidden shrink-0">
        {item.image ? (
          <Image
            src={`/images/${item.image}`}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <PizzaPlaceholder />
        )}
        {/* Badge */}
        {item.badge && (
          <span className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${badgeStyle(item.badge)}`}>
            {item.badge}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4">
        <h3
          className="font-bold text-[#2C2C2C] text-base mb-1"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {item.name}
        </h3>
        <p
          className="text-[#2C2C2C]/55 text-xs leading-relaxed flex-1 mb-3"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {item.desc[locale]}
        </p>
        {/* Price */}
        <div className="flex items-center justify-between mt-auto">
          <span
            className="text-[#C65D3A] font-bold text-lg"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {price.toFixed(2).replace(".", ",")} €
          </span>
          <span className="text-[10px] text-[#2C2C2C]/30 tracking-widest uppercase">
            {size}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── General item card (calzone / starter / salad / special) ─────────────── */
function MenuCard({ item, locale }: { item: MenuItem; locale: Locale }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(44,44,44,0.08)] hover:shadow-[0_8px_32px_rgba(44,44,44,0.14)] transition-shadow duration-300 flex flex-col group"
    >
      {/* Image / placeholder */}
      <div className="relative w-full aspect-[4/3] bg-[#F5EFE6] overflow-hidden shrink-0">
        {item.image ? (
          <Image
            src={`/images/${item.image}`}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <PizzaPlaceholder />
        )}
        {item.badge && (
          <span className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${badgeStyle(item.badge)}`}>
            {item.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3
          className="font-bold text-[#2C2C2C] text-base mb-1"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {item.name}
        </h3>
        <p
          className="text-[#2C2C2C]/55 text-xs leading-relaxed flex-1 mb-3"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {item.desc[locale]}
        </p>
        <span
          className="text-[#C65D3A] font-bold text-lg mt-auto"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {item.price.toFixed(2).replace(".", ",")} €
        </span>
      </div>
    </motion.div>
  );
}

/* ── Main Menu section component ─────────────────────────────────────────── */
export default function MenuSection() {
  const t       = useTranslations("menu");
  const locale  = useLocale() as Locale;

  const [activeTab, setActiveTab] = useState<Tab>("pizza");
  const [pizzaSize, setPizzaSize] = useState<PizzaSize>("normal");

  /* Animate the header in on scroll */
  const headerRef  = useRef<HTMLDivElement>(null);
  const headerView = useInView(headerRef, { once: true, margin: "-100px 0px" });

  return (
    <section id="menu" className="bg-[#FAF7F2] py-24 lg:py-32">
      {/* ── Section header ──────────────────────────────────────────────── */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-10">
        <motion.p
          className="text-label text-[#D4A574] mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={headerView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {t("label")}
        </motion.p>

        <motion.h2
          className="text-display-lg text-[#2C2C2C] mb-4"
          style={{ fontFamily: "Playfair Display, serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={headerView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          {t("heading")}
        </motion.h2>

        <motion.p
          className="italic text-[#2C2C2C]/50 text-sm"
          style={{ fontFamily: "Playfair Display, serif" }}
          initial={{ opacity: 0, y: 16 }}
          animate={headerView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          {t("slogan")}
        </motion.p>
      </div>

      {/* ── Sticky tab bar (sticks below the 80px navbar) ───────────────── */}
      <div className="sticky top-[80px] z-30 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#EDE4D3] mb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
            {TABS.map(({ id, emoji, labelKey }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === id
                    ? "bg-[#C65D3A] text-white shadow-[0_2px_12px_rgba(198,93,58,0.35)]"
                    : "text-[#2C2C2C]/60 hover:text-[#2C2C2C] hover:bg-[#EDE4D3]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span>{emoji}</span>
                <span>{t(labelKey)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatePresence mode="wait">
          {/* ── PIZZA TAB ─────────────────────────────────────────────── */}
          {activeTab === "pizza" && (
            <motion.div
              key="pizza"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {/* Size toggle + notes row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                {/* Notes */}
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-[#2C2C2C]/50 flex items-center gap-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                    <span className="text-[#D4A574]">*</span> {t("note_base")}
                  </p>
                  <p className="text-xs text-[#2C2C2C]/50 flex items-center gap-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                    <span className="text-[#D4A574]">*</span> {t("note_wholegrain")}
                  </p>
                </div>

                {/* Size pill toggle */}
                <div className="flex items-center p-1 bg-[#EDE4D3] rounded-full gap-1 shrink-0">
                  {(["normal", "maxi"] as PizzaSize[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setPizzaSize(s)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                        pizzaSize === s
                          ? "bg-white text-[#C65D3A] shadow-sm"
                          : "text-[#2C2C2C]/50 hover:text-[#2C2C2C]"
                      }`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {t(s === "normal" ? "size_normal" : "size_maxi")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pizza grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
              >
                {pizzas.map((item) => (
                  <PizzaCard key={item.id} item={item} locale={locale} size={pizzaSize} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ── CALZONE TAB ───────────────────────────────────────────── */}
          {activeTab === "calzone" && (
            <motion.div
              key="calzone"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
              >
                {calzones.map((item) => (
                  <MenuCard key={item.id} item={item} locale={locale} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ── ENTRANTES TAB ─────────────────────────────────────────── */}
          {activeTab === "entrantes" && (
            <motion.div
              key="entrantes"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
              >
                {starters.map((item) => (
                  <MenuCard key={item.id} item={item} locale={locale} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ── ENSALADAS TAB ─────────────────────────────────────────── */}
          {activeTab === "ensaladas" && (
            <motion.div
              key="ensaladas"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
              >
                {salads.map((item) => (
                  <MenuCard key={item.id} item={item} locale={locale} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ── ESPECIALES TAB ────────────────────────────────────────── */}
          {activeTab === "especiales" && (
            <motion.div
              key="especiales"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
              >
                {specials.map((item) => (
                  <MenuCard key={item.id} item={item} locale={locale} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
