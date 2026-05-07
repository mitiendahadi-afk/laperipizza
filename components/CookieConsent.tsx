"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "aperipizza_cookie_consent";

export default function CookieConsent() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const id = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(id);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "all");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "essential");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "120%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "120%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-[90] px-4 pb-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm"
        >
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-lg">🍪</span>
              <p className="text-white font-semibold text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                {t("title")}
              </p>
            </div>

            <p className="text-white/55 text-xs leading-relaxed mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
              {t("body")}
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={accept}
                className="flex-1 px-4 py-2.5 bg-[#D4A574] hover:bg-[#c89660] text-[#1a1a1a] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t("accept")}
              </button>
              <button
                onClick={decline}
                className="flex-1 px-4 py-2.5 bg-white/8 hover:bg-white/15 text-white/70 text-xs font-medium rounded-xl transition-colors cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t("decline")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
