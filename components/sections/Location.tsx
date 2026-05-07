"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock, ExternalLink, MessageCircle } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Social icons */
function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function TripAdvisorIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-3 8a2 2 0 110 4 2 2 0 010-4zm6 0a2 2 0 110 4 2 2 0 010-4zm-3 6c-2.33 0-4.31-1.46-5.11-3.53.36.03.72.05 1.11.05 1.04 0 2.04-.21 2.95-.58.13.05.27.1.41.14A5.975 5.975 0 0012 12c.56 0 1.1.08 1.62.22.9.37 1.9.58 2.95.58.39 0 .75-.02 1.11-.05C16.89 14.54 14.92 16 12 16z"/>
    </svg>
  );
}

export default function Location() {
  const t   = useTranslations("location");
  const tH  = useTranslations("location.hours");
  const ref = useRef<HTMLDivElement>(null);
  const view = useInView(ref, { once: true, margin: "-80px 0px" });

  const addressLines = t("address").split("\n");

  return (
    <section id="contact" className="bg-[#F5EFE6] py-24 lg:py-32 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <div className="text-center mb-14">
          <motion.p
            className="text-label text-[#D4A574] mb-4"
            initial={{ opacity: 0, y: 14 }} animate={view ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {t("label")}
          </motion.p>
          <motion.h2
            className="text-display-lg text-[#2C2C2C]"
            style={{ fontFamily: "Playfair Display, serif" }}
            initial={{ opacity: 0, y: 18 }} animate={view ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            {t("title")}
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">

          {/* ── Left: contact info ──────────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-7"
            initial={{ opacity: 0, x: -50 }}
            animate={view ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
          >
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#C65D3A]/10 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={20} className="text-[#C65D3A]" />
              </div>
              <div>
                <p className="font-semibold text-[#2C2C2C] text-sm mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  {t("label")}
                </p>
                {addressLines.map((line, i) => (
                  <p key={i} className="text-[#2C2C2C]/65 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{line}</p>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#D4A574]/15 flex items-center justify-center shrink-0 mt-0.5">
                <Clock size={20} className="text-[#D4A574]" />
              </div>
              <div>
                <p className="font-semibold text-[#2C2C2C] text-sm mb-2" style={{ fontFamily: "Inter, sans-serif" }}>{t("hours_title")}</p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-8">
                    <span className="text-sm text-[#2C2C2C]/65" style={{ fontFamily: "Inter, sans-serif" }}>{tH("weekdays")}</span>
                    <span className="text-sm font-semibold text-[#2C2C2C]" style={{ fontFamily: "Inter, sans-serif" }}>{tH("weekday_time")}</span>
                  </div>
                  <div className="flex items-center justify-between gap-8">
                    <span className="text-sm text-[#2C2C2C]/45 line-through" style={{ fontFamily: "Inter, sans-serif" }}>{tH("closed_days")}</span>
                    <span className="text-sm text-[#2C2C2C]/45" style={{ fontFamily: "Inter, sans-serif" }}>{tH("closed_time")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <a href="tel:+34609927043" className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-full bg-[#C65D3A]/10 group-hover:bg-[#C65D3A]/20 flex items-center justify-center shrink-0 transition-colors">
                <Phone size={20} className="text-[#C65D3A]" />
              </div>
              <div>
                <p className="font-semibold text-[#2C2C2C] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>+34 609 92 70 43</p>
                <p className="text-[#2C2C2C]/40 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{t("call_label")}</p>
              </div>
            </a>

            {/* Email */}
            <a href="mailto:aperipizzacostacalma@gmail.com" className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-full bg-[#C65D3A]/10 group-hover:bg-[#C65D3A]/20 flex items-center justify-center shrink-0 transition-colors">
                <Mail size={20} className="text-[#C65D3A]" />
              </div>
              <div>
                <p className="font-semibold text-[#2C2C2C] text-sm break-all" style={{ fontFamily: "Inter, sans-serif" }}>aperipizzacostacalma@gmail.com</p>
                <p className="text-[#2C2C2C]/40 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{t("email_label")}</p>
              </div>
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              <a href="#" aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-[#2C2C2C]/8 hover:bg-[#1877F2]/15 hover:text-[#1877F2] flex items-center justify-center text-[#2C2C2C]/50 transition-all">
                <FacebookIcon size={17} />
              </a>
              <a href="#" aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#2C2C2C]/8 hover:bg-[#E1306C]/15 hover:text-[#E1306C] flex items-center justify-center text-[#2C2C2C]/50 transition-all">
                <InstagramIcon size={17} />
              </a>
              <a href="#" aria-label="TripAdvisor"
                className="w-10 h-10 rounded-full bg-[#2C2C2C]/8 hover:bg-[#34E0A1]/15 hover:text-[#34E0A1] flex items-center justify-center text-[#2C2C2C]/50 transition-all">
                <TripAdvisorIcon size={17} />
              </a>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=28.1634,-14.2278"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-[#C65D3A] hover:bg-[#d46b47] text-white text-sm font-semibold rounded-full transition-colors shadow-[0_4px_16px_rgba(198,93,58,0.3)] cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <ExternalLink size={15} />
                {t("directions")}
              </a>
              <a
                href="https://wa.me/34609927043"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 border border-[#2C2C2C]/15 hover:border-[#C65D3A]/40 text-[#2C2C2C] hover:text-[#C65D3A] text-sm font-semibold rounded-full transition-all cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <MessageCircle size={15} />
                {t("whatsapp")}
              </a>
            </div>
          </motion.div>

          {/* ── Right: Google Maps embed with exact GPS ─────────────────── */}
          <motion.div
            className="rounded-3xl overflow-hidden shadow-[0_16px_48px_rgba(44,44,44,0.14)] h-[420px] lg:h-[500px] bg-[#EDE4D3]"
            initial={{ opacity: 0, x: 50 }}
            animate={view ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
          >
            <iframe
              title="L'AperiPizza — Google Maps"
              src="https://maps.google.com/maps?q=28.1634,-14.2278&output=embed&z=17"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "saturate(0.9) contrast(1.05)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
