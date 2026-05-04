// page.tsx (partial update)
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesGrid from './components/ServicesGrid';
import WhoWeHelp from './components/WhoWeHelp';  // ← new import, replace AboutPreview
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function NutrismartLandingPage() {
  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden selection:bg-green-100 selection:text-green-900">
      <Navigation />
      <main className="w-full">
        <div className="pt-[116px] md:pt-[124px]">
          <HeroSection />
        </div>
        <section id="services" className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <ServicesGrid />
        </section>
        {/* Replace AboutPreview with WhoWeHelp */}
        <section id="who-we-help" className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-24 bg-gray-50">
          <WhoWeHelp />
        </section>
        <section id="contact" className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}