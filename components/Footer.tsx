"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, Clock, MapPin, Truck } from "lucide-react";

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TripAdvisorIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-3 8a2 2 0 110 4 2 2 0 010-4zm6 0a2 2 0 110 4 2 2 0 010-4zm-3 6c-2.33 0-4.31-1.46-5.11-3.53.36.03.72.05 1.11.05 1.04 0 2.04-.21 2.95-.58.13.05.27.1.41.14A5.975 5.975 0 0012 12c.56 0 1.1.08 1.62.22.9.37 1.9.58 2.95.58.39 0 .75-.02 1.11-.05C16.89 14.54 14.92 16 12 16z"/>
    </svg>
  );
}

const NAV_LINKS = [
  { key: "about",        href: "#about" },
  { key: "menu",         href: "#menu" },
  { key: "gallery",      href: "#gallery" },
  { key: "reservations", href: "#reservations" },
  { key: "contact",      href: "#contact" },
] as const;

export default function Footer() {
  const t      = useTranslations();
  const locale = useLocale();
  const year   = new Date().getFullYear();

  const [email, setEmail]         = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  }

  return (
    <footer className="bg-[#1a1a1a] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Main grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/8">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={`/${locale}`} className="inline-block mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png.png"
                alt="L'AperiPizza"
                style={{ height: "160px", width: "auto", display: "block", border: "none", outline: "none", marginBottom: "8px" }}
              />
              <p className="text-[#D4A574] text-[10px] tracking-[0.22em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
                Costa Calma · Fuerteventura
              </p>
            </Link>
            <p className="text-white/45 text-sm leading-relaxed italic max-w-[220px] mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
              &ldquo;{t("footer.tagline")}&rdquo;
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2.5">
              <a href="https://wa.me/34609927043" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#25D366]/20 hover:text-[#25D366] flex items-center justify-center text-white/50 transition-all" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#1877F2]/20 hover:text-[#1877F2] flex items-center justify-center text-white/50 transition-all" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#E1306C]/20 hover:text-[#E1306C] flex items-center justify-center text-white/50 transition-all" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#34E0A1]/20 hover:text-[#34E0A1] flex items-center justify-center text-white/50 transition-all" aria-label="TripAdvisor">
                <TripAdvisorIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white/30 text-[10px] font-semibold tracking-[0.18em] uppercase mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
              {t("footer.links_title")}
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map(({ key, href }) => (
                <a key={key} href={href}
                  className="text-white/55 hover:text-white text-sm transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {t(`nav.${key}`)}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/30 text-[10px] font-semibold tracking-[0.18em] uppercase mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
              {t("footer.contact_title")}
            </p>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#D4A574] mt-0.5 shrink-0" />
                <p className="text-white/55 text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  Centro C. Plaza, C. Punta Pesebre, Local D2<br />35627 Costa Calma, Fuerteventura
                </p>
              </div>
              <a href="tel:+34609927043" className="flex items-center gap-2.5 text-white/55 hover:text-white text-xs transition-colors">
                <Phone size={14} className="text-[#D4A574] shrink-0" />
                +34 609 92 70 43
              </a>
              <a href="mailto:aperipizzacostacalma@gmail.com" className="flex items-center gap-2.5 text-white/55 hover:text-white text-xs transition-colors break-all">
                <Mail size={14} className="text-[#D4A574] shrink-0" />
                aperipizzacostacalma@gmail.com
              </a>
              <div className="pt-2 mt-1 border-t border-white/8">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Truck size={13} className="text-[#D4A574] shrink-0" />
                  <span className="text-[10px] font-semibold text-white/35 tracking-wider uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
                    Delivery
                  </span>
                </div>
                <a href="tel:928876370" className="flex items-center gap-2.5 text-white/55 hover:text-white text-xs transition-colors">
                  <Phone size={13} className="text-[#D4A574]/70 shrink-0" />
                  928 876 370
                </a>
              </div>
            </div>
          </div>

          {/* Hours + Newsletter */}
          <div>
            <p className="text-white/30 text-[10px] font-semibold tracking-[0.18em] uppercase mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
              {t("footer.hours_title")}
            </p>
            <div className="flex flex-col gap-3.5 mb-8">
              <div className="flex items-start gap-2.5">
                <Clock size={14} className="text-[#D4A574] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/70 text-xs font-medium mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                    {t("location.hours.weekdays")}
                  </p>
                  <p className="text-white/45 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                    {t("location.hours.weekday_time")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 ml-[22px]">
                <div>
                  <p className="text-white/35 text-xs font-medium mb-0.5 line-through" style={{ fontFamily: "Inter, sans-serif" }}>
                    {t("location.hours.closed_days")}
                  </p>
                  <p className="text-white/30 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                    {t("location.hours.closed_time")}
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <p className="text-white/30 text-[10px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
              {t("footer.newsletter_title")}
            </p>
            {subscribed ? (
              <p className="text-[#D4A574] text-xs font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                {t("footer.newsletter_success")}
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.newsletter_placeholder")}
                  className="flex-1 min-w-0 px-3 py-2 bg-white/8 border border-white/10 rounded-lg text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#D4A574]/50 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#D4A574] hover:bg-[#c89660] text-[#1a1a1a] text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t("footer.newsletter_btn")}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────── */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/25 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            © {year} L&apos;AperiPizza Costa Calma · {t("footer.rights")}
          </p>
          <p className="text-white/20 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            {t("footer.designed_by")}
          </p>
        </div>

      </div>
    </footer>
  );
}
