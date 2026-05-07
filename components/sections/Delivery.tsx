"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Truck, Phone, Clock } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* WhatsApp icon */
function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function Delivery() {
  const t   = useTranslations("delivery");
  const ref = useRef<HTMLDivElement>(null);
  const view = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="bg-[#F5EFE6] py-12 lg:py-14 border-y border-[#EDE4D3]/60">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">

          {/* Left: icon + title */}
          <motion.div
            className="flex items-center gap-5 shrink-0"
            initial={{ opacity: 0, x: -40 }}
            animate={view ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="w-16 h-16 rounded-full bg-[#C65D3A]/10 flex items-center justify-center shrink-0">
              <Truck size={28} className="text-[#C65D3A]" />
            </div>
            <div>
              <p className="text-label text-[#D4A574] mb-1">{t("label")}</p>
              <h3
                className="text-xl lg:text-2xl font-bold text-[#2C2C2C] mb-0.5"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {t("heading")}
              </h3>
              <p className="text-[#2C2C2C]/55 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                {t("body")}
              </p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="hidden lg:block w-px self-stretch bg-[#2C2C2C]/10" />

          {/* Right: contact details grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 w-full lg:w-auto"
            initial={{ opacity: 0, x: 40 }}
            animate={view ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
          >
            {/* Landline */}
            <a
              href="tel:928876370"
              className="flex flex-col items-center sm:items-start gap-1 group"
            >
              <div className="flex items-center gap-1.5">
                <Phone size={13} className="text-[#D4A574]" />
                <span className="text-[11px] font-semibold text-[#2C2C2C]/50 tracking-wider uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
                  {t("phone_label")}
                </span>
              </div>
              <span
                className="text-lg font-bold text-[#2C2C2C] group-hover:text-[#C65D3A] transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                928 876 370
              </span>
            </a>

            {/* Mobile / WhatsApp */}
            <a
              href="https://wa.me/34609927043"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center sm:items-start gap-1 group"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[#25D366]"><WhatsAppIcon /></span>
                <span className="text-[11px] font-semibold text-[#2C2C2C]/50 tracking-wider uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
                  {t("mobile_label")}
                </span>
              </div>
              <span
                className="text-lg font-bold text-[#2C2C2C] group-hover:text-[#25D366] transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                +34 609 92 70 43
              </span>
            </a>

            {/* Hours */}
            <div className="flex flex-col items-center sm:items-start gap-1">
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-[#D4A574]" />
                <span className="text-[11px] font-semibold text-[#2C2C2C]/50 tracking-wider uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
                  {t("hours_label")}
                </span>
              </div>
              <span
                className="text-lg font-bold text-[#C65D3A]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t("hours")}
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
