'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeroSection from './HeroSection';
import BenefitsSection from './BenefitsSection';
import TestimonialsSection from './TestimonialsSection';
import StatsSection from './StatsSection';
import CTASection from './CTASection';
import Footer from './Footer';

const LandingPageInteractive = () => {
  const [language, setLanguage] = useState<'en' | 'rw'>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'rw' : 'en'));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-100 bg-card/95 backdrop-blur-sm shadow-elevation-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/professional-landing-page" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <svg
                  className="w-6 h-6 text-primary-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold font-heading text-primary">
                  NutriSmart
                </h1>
                <p className="text-xs caption text-muted-foreground">Care Africa</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-smooth caption"
              >
                {language === 'en' ? 'English' : 'Kinyarwanda'}
              </button>
              <Link
                href="/login"
                className="px-6 py-2 rounded-lg text-primary hover:bg-muted transition-smooth font-medium"
              >
                {language === 'en' ? 'Sign In' : 'Injira'}
              </Link>
              <Link
                href="/user-registration"
                className="button-base bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {language === 'en' ? 'Get Started' : 'Tangira'}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HeroSection language={language} />
        <StatsSection language={language} />
        <BenefitsSection language={language} />
        <TestimonialsSection language={language} />
        <CTASection language={language} />
      </main>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

export default LandingPageInteractive;