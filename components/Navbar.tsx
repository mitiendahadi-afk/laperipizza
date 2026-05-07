"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LOCALES = [
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "it", label: "IT", flag: "🇮🇹" },
  { code: "de", label: "DE", flag: "🇩🇪" },
] as const;

const NAV_LINKS = [
  { key: "menu"         as const, href: "#menu" },
  { key: "reservations" as const, href: "#reservations" },
  { key: "gallery"      as const, href: "#gallery" },
  { key: "about"        as const, href: "#about" },
  { key: "contact"      as const, href: "#contact" },
] as const;

function scrollTo(href: string, onDone?: () => void) {
  const id = href.replace("#", "");
  onDone?.();
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, 60);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Navbar() {
  const t        = useTranslations("nav");
  const locale   = useLocale();
  const pathname = usePathname();
  const router   = useRouter();

  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen,   setLangOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [langOpen]);

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setLangOpen(false);
    setMobileOpen(false);
  }

  /* Logo click: scroll to top if already on this locale page, else navigate */
  function handleLogoClick(e: React.MouseEvent) {
    const localeRoot = `/${locale}`;
    if (pathname === localeRoot || pathname === `${localeRoot}/`) {
      e.preventDefault();
      scrollToTop();
    }
  }

  const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <>
      {/* ── Fixed Navbar ──────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#F5EFE6]/95 backdrop-blur-sm shadow-[0_2px_20px_rgba(44,44,44,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[156px] lg:h-[176px]">

            {/* ── Logo ──────────────────────────────────────────────────── */}
            <Link
              href={`/${locale}`}
              onClick={handleLogoClick}
              className="shrink-0 cursor-pointer"
              style={{ outline: "none", WebkitTapHighlightColor: "transparent" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png.png"
                alt="L'AperiPizza"
                style={{ height: "140px", width: "auto", display: "block", border: "none", outline: "none" }}
                className="lg:!h-[160px]"
              />
            </Link>

            {/* ── Desktop center links ────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map(({ key, href }) => (
                <button
                  key={key}
                  onClick={() => scrollTo(href)}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer hover:text-[#C65D3A] ${
                    scrolled ? "text-[#2C2C2C]" : "text-white/85"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t(key)}
                </button>
              ))}
            </nav>

            {/* ── Right: language switcher + CTA ─────────────────────── */}
            <div className="hidden lg:flex items-center gap-4">

              {/* Language switcher */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                    scrolled
                      ? "border-[#2C2C2C]/20 text-[#2C2C2C] hover:border-[#C65D3A]/50"
                      : "border-white/25 text-white/85 hover:border-white/60"
                  }`}
                >
                  <span>{currentLocale.flag}</span>
                  <span className="text-xs tracking-widest uppercase font-semibold">
                    {currentLocale.label}
                  </span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                    className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 bg-white border border-[#EDE4D3] rounded-xl shadow-xl overflow-hidden min-w-[130px]"
                    >
                      {LOCALES.map((loc) => (
                        <button
                          key={loc.code}
                          onClick={() => switchLocale(loc.code)}
                          className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-left cursor-pointer transition-colors ${
                            loc.code === locale
                              ? "bg-[#F5EFE6] text-[#C65D3A] font-semibold"
                              : "text-[#2C2C2C] hover:bg-[#F5EFE6]"
                          }`}
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          <span className="text-base">{loc.flag}</span>
                          <span>{loc.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Reserve CTA */}
              <motion.button
                onClick={() => scrollTo("#reservations")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 bg-[#C65D3A] hover:bg-[#d46b47] text-white text-xs font-semibold tracking-[0.14em] uppercase rounded-full cursor-pointer transition-colors duration-300 shadow-[0_4px_14px_rgba(198,93,58,0.35)] hover:shadow-[0_4px_20px_rgba(198,93,58,0.5)]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t("reserve")}
              </motion.button>
            </div>

            {/* ── Mobile hamburger ───────────────────────────────────── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-md cursor-pointer transition-colors ${
                scrolled ? "text-[#2C2C2C]" : "text-white"
              }`}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile full-screen overlay ─────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#F5EFE6] flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button onClick={() => setMobileOpen(false)} className="text-[#2C2C2C] p-2 cursor-pointer">
                <X size={28} />
              </button>
            </div>

            {/* Mobile overlay logo */}
            <div className="flex justify-center mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png.png"
                alt="L'AperiPizza"
                style={{ height: "120px", width: "auto", display: "block", border: "none", outline: "none" }}
              />
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center items-center gap-8 px-8">
              {NAV_LINKS.map(({ key, href }, i) => (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => scrollTo(href, () => setMobileOpen(false))}
                  className="text-[#2C2C2C] text-3xl italic cursor-pointer hover:text-[#C65D3A] transition-colors"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {t(key)}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                onClick={() => scrollTo("#reservations", () => setMobileOpen(false))}
                className="mt-4 px-8 py-4 bg-[#C65D3A] text-white text-sm font-semibold tracking-[0.14em] uppercase rounded-full cursor-pointer shadow-lg"
              >
                {t("reserve")}
              </motion.button>
            </nav>

            {/* Language row at bottom */}
            <div className="flex justify-center gap-4 pb-12">
              {LOCALES.map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => switchLocale(loc.code)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all border ${
                    loc.code === locale
                      ? "border-[#C65D3A] text-[#C65D3A] bg-[#C65D3A]/5"
                      : "border-[#2C2C2C]/15 text-[#2C2C2C]/50 hover:text-[#2C2C2C]"
                  }`}
                >
                  <span>{loc.flag}</span>
                  <span className="text-xs tracking-widest uppercase font-semibold">{loc.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
