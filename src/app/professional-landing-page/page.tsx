'use client';

import React from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesGrid from './components/ServicesGrid';
import AboutPreview from './components/AboutPreview';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function NutrismartLandingPage() {
  return (
    // overflow-x-hidden prevents unwanted horizontal scrolling on mobile
    <div className="relative min-h-screen bg-white overflow-x-hidden selection:bg-green-100 selection:text-green-900">
      
      <Navigation />

      <main className="w-full">
        {/* We use responsive padding-top to account for the fixed header */}
        <div className="pt-[116px] md:pt-[124px]"> 
          <HeroSection />
        </div>

        {/* Each section below uses container mx-auto to stay centered on wide screens */}
        <section id="services" className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <ServicesGrid />
        </section>

        <section id="about" className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-24 bg-gray-50">
          <AboutPreview />
        </section>

        <section id="contact" className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}