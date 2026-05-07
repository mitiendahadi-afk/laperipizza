import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/sections/About";
import MenuSection from "@/components/sections/Menu";
import Gallery from "@/components/sections/Gallery";
import Reservations from "@/components/sections/Reservations";
import Delivery from "@/components/sections/Delivery";
import Reviews from "@/components/sections/Reviews";
import Location from "@/components/sections/Location";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <Gallery />
        <Reservations />
        <Delivery />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}
