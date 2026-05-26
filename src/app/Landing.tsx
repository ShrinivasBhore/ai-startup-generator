import { Navbar } from "@/src/components/layout/Navbar";
import { Hero } from "@/src/components/features/landing/Hero";
import { Showcase } from "@/src/components/features/landing/Showcase";
import { Features } from "@/src/components/features/landing/Features";
import { Pricing } from "@/src/components/features/landing/Pricing";
import { Testimonials } from "@/src/components/features/landing/Testimonials";
import { FAQ } from "@/src/components/features/landing/FAQ";
import { Footer } from "@/src/components/layout/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">
      <Navbar />
      <main>
        <Hero />
        <Showcase />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
