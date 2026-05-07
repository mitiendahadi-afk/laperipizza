import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "L'AperiPizza Costa Calma — Pizzeria Italiana | Fuerteventura",
  description:
    "¡La vida es demasiado corta para comer una mala pizza! Auténtica pizza napolitana en Costa Calma, Fuerteventura. Miércoles a domingo, 12:00–23:00.",
  keywords: [
    "pizza", "pizzeria", "Fuerteventura", "Costa Calma", "italiana",
    "napolitana", "AperiPizza", "restaurant", "Canary Islands",
  ],
  authors: [{ name: "L'AperiPizza Costa Calma" }],
  openGraph: {
    title: "L'AperiPizza Costa Calma — Pizzeria Italiana",
    description: "Authentic Neapolitan pizza in Costa Calma, Fuerteventura. Wed–Sun 12:00–23:00.",
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_GB", "it_IT", "de_DE"],
    siteName: "L'AperiPizza Costa Calma",
  },
  other: {
    "restaurant:contact_info:phone_number": "+34 609 92 70 43",
    "restaurant:contact_info:email":        "aperipizzacostacalma@gmail.com",
    "restaurant:contact_info:street_address": "Centro C. Plaza, C. Punta Pesebre, Local D2",
    "restaurant:contact_info:locality":     "Costa Calma",
    "restaurant:contact_info:postal_code":  "35627",
    "restaurant:contact_info:country_name": "Spain",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
