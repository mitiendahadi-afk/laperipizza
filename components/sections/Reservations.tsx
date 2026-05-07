"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Phone, Mail, Clock, MessageCircle, Users, ChevronUp, ChevronDown, CheckCircle } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TIME_SLOTS: string[] = [];
for (let h = 12; h <= 22; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, "0")}:00`);
  TIME_SLOTS.push(`${String(h).padStart(2, "0")}:30`);
}

const OCCASIONS = [
  "form_occasion_normal",
  "form_occasion_birthday",
  "form_occasion_anniversary",
  "form_occasion_business",
  "form_occasion_other",
] as const;

interface FormData {
  name: string; email: string; phone: string; date: string;
  time: string; guests: number; occasion: string; requests: string;
}

const inputCls =
  "w-full px-4 py-3 bg-white border border-[#EDE4D3] rounded-xl text-[#2C2C2C] text-sm placeholder-[#2C2C2C]/35 focus:outline-none focus:border-[#C65D3A] focus:ring-1 focus:ring-[#C65D3A]/30 transition-all duration-200";
const labelCls = "block text-xs font-semibold text-[#2C2C2C]/60 tracking-wide uppercase mb-1.5";

export default function Reservations() {
  const t    = useTranslations("reservations");
  const ref  = useRef<HTMLDivElement>(null);
  const view = useInView(ref, { once: true, margin: "-80px 0px" });

  const [minDate, setMinDate] = useState("");
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", date: "", time: "13:00", guests: 2,
    occasion: "form_occasion_normal", requests: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  function set<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const occasionLabel = t(form.occasion as Parameters<typeof t>[0]);
    const lines = [
      t("wa_greeting"), "",
      `📅 ${t("wa_date")}: ${form.date}`,
      `⏰ ${t("wa_time")}: ${form.time}`,
      `👥 ${t("wa_guests")}: ${form.guests}`,
      `👤 ${t("wa_name")}: ${form.name}`,
      `📱 ${t("wa_phone")}: ${form.phone}`,
      `✉️ ${t("wa_email")}: ${form.email}`,
      occasionLabel !== t("form_occasion_normal") ? `🎉 ${t("wa_occasion")}: ${occasionLabel}` : "",
      form.requests ? `📝 ${t("wa_requests")}: ${form.requests}` : "",
      "", "Gracias / Thank you! 🍕",
    ].filter((l) => l !== undefined && (l !== "" || true));
    while (lines[lines.length - 1] === "") lines.pop();

    window.open(`https://wa.me/34609927043?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <section id="reservations" className="bg-[#2C2C2C] py-24 lg:py-32 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-20 items-start">

          {/* ── Left: info panel ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={view ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: EASE }}
            className="lg:pt-2"
          >
            <p className="text-label text-[#D4A574] mb-5">{t("label")}</p>
            <h2 className="text-display-lg text-white mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
              {t("heading")}
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-10 max-w-md" style={{ fontFamily: "Inter, sans-serif" }}>
              {t("body")}
            </p>

            <div className="flex flex-col gap-5 mb-10">
              <a href="tel:+34609927043" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white/8 group-hover:bg-[#C65D3A]/20 flex items-center justify-center transition-colors">
                  <Phone size={18} className="text-[#D4A574]" />
                </div>
                <span className="text-sm font-medium" style={{ fontFamily: "Inter, sans-serif" }}>+34 609 92 70 43</span>
              </a>
              <a href="mailto:aperipizzacostacalma@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white/8 group-hover:bg-[#C65D3A]/20 flex items-center justify-center transition-colors">
                  <Mail size={18} className="text-[#D4A574]" />
                </div>
                <span className="text-sm font-medium" style={{ fontFamily: "Inter, sans-serif" }}>aperipizzacostacalma@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-white/50">
                <div className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center">
                  <Clock size={18} className="text-[#D4A574]" />
                </div>
                <span className="text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{t("hours")}</span>
              </div>
            </div>

            <motion.a
              href="https://wa.me/34609927043?text=Hola!%20Me%20gustar%C3%ADa%20reservar%20una%20mesa%20en%20L%27AperiPizza"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-7 py-4 bg-[#25D366] hover:bg-[#1fb958] text-white font-semibold text-sm tracking-wide rounded-full transition-colors shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_4px_28px_rgba(37,211,102,0.5)]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <MessageCircle size={20} />
              {t("whatsapp_btn")}
            </motion.a>
          </motion.div>

          {/* ── Right: form card ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={view ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
          >
            <div className="bg-[#F5EFE6] rounded-3xl p-7 lg:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.25)] relative overflow-hidden">

              {/* ── Success overlay ─────────────────────────────────────── */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-[#F5EFE6] rounded-3xl z-20 flex flex-col items-center justify-center gap-5"
                  >
                    {/* Pulse rings */}
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        className="absolute w-20 h-20 rounded-full bg-[#25D366]/20"
                        animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                      />
                      <motion.div
                        className="absolute w-20 h-20 rounded-full bg-[#25D366]/15"
                        animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                      />
                      <motion.div
                        className="w-20 h-20 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.4)]"
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
                      >
                        <CheckCircle size={38} className="text-white" />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.5, ease: EASE }}
                      className="text-center px-8"
                    >
                      <p className="text-[#2C2C2C] font-bold text-xl mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                        {t("success_title")}
                      </p>
                      <p className="text-[#2C2C2C]/60 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                        {t("success_body")}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Form ────────────────────────────────────────────────── */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>{t("form_name")} *</label>
                    <input type="text" required value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="Mario Rossi" />
                  </div>
                  <div>
                    <label className={labelCls}>{t("form_phone")} *</label>
                    <input type="tel" required value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} placeholder="+34 600 000 000" />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>{t("form_email")} *</label>
                  <input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} placeholder="mario@email.com" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>{t("form_date")} *</label>
                    <input type="date" required min={minDate} value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>{t("form_time")} *</label>
                    <select value={form.time} onChange={(e) => set("time", e.target.value)} className={inputCls}>
                      {TIME_SLOTS.map((slot) => (<option key={slot} value={slot}>{slot}</option>))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 items-end">
                  <div>
                    <label className={labelCls}>{t("form_guests")} *</label>
                    <div className="flex items-center border border-[#EDE4D3] rounded-xl bg-white overflow-hidden">
                      <button type="button" onClick={() => set("guests", Math.max(1, form.guests - 1))}
                        className="px-4 py-3 text-[#C65D3A] hover:bg-[#F5EFE6] transition-colors cursor-pointer">
                        <ChevronDown size={16} />
                      </button>
                      <div className="flex-1 flex items-center justify-center gap-2 text-[#2C2C2C] font-semibold text-sm">
                        <Users size={14} className="text-[#2C2C2C]/40" />
                        <span>{form.guests}</span>
                      </div>
                      <button type="button" onClick={() => set("guests", Math.min(12, form.guests + 1))}
                        className="px-4 py-3 text-[#C65D3A] hover:bg-[#F5EFE6] transition-colors cursor-pointer">
                        <ChevronUp size={16} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>{t("form_occasion")}</label>
                    <select value={form.occasion} onChange={(e) => set("occasion", e.target.value)} className={inputCls}>
                      {OCCASIONS.map((key) => (<option key={key} value={key}>{t(key)}</option>))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>{t("form_requests")}</label>
                  <textarea value={form.requests} onChange={(e) => set("requests", e.target.value)} rows={3}
                    className={`${inputCls} resize-none`}
                    placeholder="Alergia al gluten, silla de bebé, mesa en terraza..." />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl font-semibold text-sm tracking-[0.12em] uppercase cursor-pointer transition-all duration-300 bg-[#C65D3A] hover:bg-[#d46b47] text-white shadow-[0_4px_20px_rgba(198,93,58,0.35)] hover:shadow-[0_4px_28px_rgba(198,93,58,0.5)]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t("form_submit")}
                </motion.button>

                <p className="text-center text-[10px] text-[#2C2C2C]/40 -mt-1 flex items-center justify-center gap-1" style={{ fontFamily: "Inter, sans-serif" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t("form_whatsapp_note")}
                </p>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
