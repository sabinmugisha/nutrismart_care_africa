'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/contexts/LanguageContext';

// ─── Helper Components ────────────────────────────────────────────────────────

interface HeroSectionProps {
  language: 'en' | 'rw';
}

const HeroSection = ({ language }: HeroSectionProps) => {
  const content = {
    en: {
      headline: 'Culturally-Relevant Nutrition Solutions for African Communities',
      subheadline:
      'Personalized meal planning with local ingredients, professional consultations, and institutional programs to combat malnutrition across Africa.',
      ctaPrimary: 'Start Your Journey',
      ctaSecondary: 'For Institutions'
    },
    rw: {
      headline: 'Ibisubizo byo Kurya Bifite Umuco ku Baturage ba Afurika',
      subheadline:
      'Gahunda yo gutegura indyo zikubiyemo ibyo kurya byo mu gace, inama z\'abahanga, na gahunda z\'ibigo kurwanya imirire mibi muri Afurika.',
      ctaPrimary: 'Tangira Urugendo Rwawe',
      ctaSecondary: 'Ku Bigo'
    }
  };
  const text = content[language];
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-card-foreground leading-tight">
              {text.headline}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{text.subheadline}</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/user-registration" className="button-base bg-primary text-primary-foreground hover:bg-primary/90 text-center">
                {text.ctaPrimary}
              </Link>
              <Link href="/institution-dashboard" className="button-base bg-secondary text-secondary-foreground hover:bg-secondary/90 text-center">
                {text.ctaSecondary}
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-elevation-lg">
            <AppImage
              src="https://images.unsplash.com/photo-1657299156725-dc862fea3e11"
              alt="African community members sharing a healthy meal together, showcasing diverse local ingredients and traditional cooking methods"
              fill
              className="object-cover" />
            
          </div>
        </div>
      </div>
    </section>);

};

interface StatsSectionProps {
  language: 'en' | 'rw';
}

const StatsSection = ({ language }: StatsSectionProps) => {
  const content = {
    en: {
      title: 'Our Impact Across Africa',
      stats: [
      { value: '50,000+', label: 'Lives Improved' },
      { value: '200+', label: 'Healthcare Partners' },
      { value: '15', label: 'Countries Served' },
      { value: '95%', label: 'User Satisfaction' }]

    },
    rw: {
      title: 'Ingaruka Zacu muri Afurika',
      stats: [
      { value: '50,000+', label: 'Ubuzima Bwatewe Imbere' },
      { value: '200+', label: 'Abafatanyabikorwa bo mu Buvuzi' },
      { value: '15', label: 'Ibihugu Byakiriye Serivisi' },
      { value: '95%', label: 'Abakoresha Banyuzwe' }]

    }
  };
  const text = content[language];
  return (
    <section className="bg-primary text-primary-foreground py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <h2 className="text-3xl font-bold font-heading text-center mb-12">{text.title}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {text.stats.map((stat, index) =>
          <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold font-heading mb-2 data-text">{stat.value}</div>
              <div className="text-sm lg:text-base caption opacity-90">{stat.label}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

interface BenefitsSectionProps {
  language: 'en' | 'rw';
}

const BenefitsSection = ({ language }: BenefitsSectionProps) => {
  const content = {
    en: {
      title: 'Comprehensive Nutrition Solutions',
      subtitle: 'Everything you need for better health outcomes',
      benefits: [
      { icon: 'CalendarIcon', title: 'Personalized Meal Planning', description: 'Custom meal plans using locally available ingredients, tailored to your health needs and cultural preferences.', color: 'bg-primary' },
      { icon: 'UserGroupIcon', title: 'Professional Consultations', description: 'Connect with certified nutritionists and healthcare providers through video calls or in-person visits.', color: 'bg-accent' },
      { icon: 'BuildingOfficeIcon', title: 'Institutional Programs', description: 'Scalable nutrition programs for schools, hospitals, and community organizations with impact tracking.', color: 'bg-secondary' },
      { icon: 'ChartBarIcon', title: 'Health Metrics Tracking', description: 'Monitor your nutrition goals, track progress, and receive personalized recommendations based on your data.', color: 'bg-success' },
      { icon: 'GlobeAltIcon', title: 'Multilingual Support', description: 'Access our platform in English, Kinyarwanda, and other African languages for better accessibility.', color: 'bg-warning' },
      { icon: 'ShieldCheckIcon', title: 'Healthcare Certified', description: 'Trusted by healthcare organizations across Africa with certifications from leading medical institutions.', color: 'bg-primary' }]

    },
    rw: {
      title: 'Ibisubizo Byuzuye byo Kurya Neza',
      subtitle: 'Ibyo ukeneye byose kugira ngo ugire ubuzima bwiza',
      benefits: [
      { icon: 'CalendarIcon', title: 'Gahunda yo Gutegura Indyo', description: 'Gahunda yo gutegura indyo zikubiyemo ibyo kurya byo mu gace, zikubiye ku buzima bwawe n\'umuco wawe.', color: 'bg-primary' },
      { icon: 'UserGroupIcon', title: 'Inama z\'Abahanga', description: 'Huza n\'abahanga mu by\'imirire n\'abavuzi bemewe binyuze kuri videwo cyangwa mu buryo busanzwe.', color: 'bg-accent' },
      { icon: 'BuildingOfficeIcon', title: 'Gahunda z\'Ibigo', description: 'Gahunda z\'imirire zishobora kwaguka ku mashuri, ibitaro, n\'imiryango y\'abaturage hamwe no gukurikirana ingaruka.', color: 'bg-secondary' },
      { icon: 'ChartBarIcon', title: 'Gukurikirana Ubuzima', description: 'Koresha intego zawe zo kurya neza, ukurikirana iterambere, kandi uhabwe inama zikubiye ku makuru yawe.', color: 'bg-success' },
      { icon: 'GlobeAltIcon', title: 'Indimi Nyinshi', description: 'Koresha urubuga rwacu mu Cyongereza, Ikinyarwanda, n\'izindi ndimi z\'Afurika kugira ngo biboroherwe.', color: 'bg-warning' },
      { icon: 'ShieldCheckIcon', title: 'Byemejwe n\'Ubuvuzi', description: 'Byizerwaho n\'imiryango y\'ubuzima muri Afurika hamwe n\'impamyabushobozi z\'ibigo by\'ubuvuzi bikomeye.', color: 'bg-primary' }]

    }
  };
  const text = content[language];
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading text-card-foreground mb-4">{text.title}</h2>
          <p className="text-lg text-muted-foreground">{text.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {text.benefits.map((benefit, index) =>
          <div key={index} className="card-base hover:shadow-elevation-lg transition-smooth group">
              <div className={`${benefit.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}>
                <Icon name={benefit.icon as any} size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold font-heading text-card-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground caption leading-relaxed">{benefit.description}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

};

interface TestimonialsSectionProps {
  language: 'en' | 'rw';
}

const TestimonialsSection = ({ language }: TestimonialsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const content = {
    en: {
      title: 'Success Stories from Our Community',
      subtitle: 'Real people, real results',
      testimonials: [
      { name: 'Amina Nkunda', role: 'Mother of 3, Rwanda', image: "https://img.rocket.new/generatedImages/rocket_gen_img_11a3a3f84-1768403195953.png", quote: 'NutriSmart helped me create affordable meal plans using local ingredients. My children are healthier and more energetic than ever before.', rating: 5 },
      { name: 'Dr. Joseph Okonkwo', role: 'Healthcare Provider, Nigeria', image: "https://img.rocket.new/generatedImages/rocket_gen_img_16bc68c73-1769259458014.png", quote: 'As a healthcare provider, I recommend NutriSmart to all my patients. The culturally-relevant approach makes a real difference in patient outcomes.', rating: 5 },
      { name: 'Grace Mwangi', role: 'School Administrator, Kenya', image: "https://img.rocket.new/generatedImages/rocket_gen_img_19b6d2c83-1768271415930.png", quote: 'Our school nutrition program improved dramatically with NutriSmart. We now serve balanced meals to 500 students daily with better budget management.', rating: 5 }]

    },
    rw: {
      title: 'Inkuru z\'Intsinzi zo mu Muryango Wacu',
      subtitle: 'Abantu nyabo, ibisubizo nyabyo',
      testimonials: [
      { name: 'Amina Nkunda', role: 'Umubyeyi w\'abana 3, U Rwanda', image: "https://img.rocket.new/generatedImages/rocket_gen_img_104acfee2-1776704837456.png", quote: 'NutriSmart yampfashije gukora gahunda yo gutegura indyo zihendutse zikoresha ibyo kurya byo mu gace. Abana banjye bafite ubuzima bwiza kandi bafite imbaraga kuruta mbere.', rating: 5 },
      { name: 'Dr. Joseph Okonkwo', role: 'Umuvuzi, Nijeriya', image: "https://img.rocket.new/generatedImages/rocket_gen_img_10b192c42-1773474533143.png", quote: 'Nk\'umuvuzi, nsaba abarwayi banjye bose gukoresha NutriSmart. Uburyo bwo gukora bukubiye ku muco butuma habaho impinduka nyabyo ku buzima bw\'abarwayi.', rating: 5 },
      { name: 'Grace Mwangi', role: 'Umuyobozi w\'Ishuri, Kenya', image: "https://img.rocket.new/generatedImages/rocket_gen_img_14f187564-1776704842357.png", quote: 'Gahunda yacu yo kurya neza mu ishuri yateye imbere cyane hamwe na NutriSmart. Ubu duha indyo zifite intungamubiri zikwiye abanyeshuri 500 buri munsi hamwe no gucunga neza ingengo y\'imari.', rating: 5 }]

    }
  };
  const text = content[language];
  const currentTestimonial = text.testimonials[currentIndex];
  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % text.testimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + text.testimonials.length) % text.testimonials.length);

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading text-card-foreground mb-4">{text.title}</h2>
          <p className="text-lg text-muted-foreground">{text.subtitle}</p>
        </div>
        <div className="bg-card rounded-xl p-8 lg:p-12 shadow-elevation-lg">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-6 shadow-elevation-md">
              <AppImage src={currentTestimonial.image} alt={`Portrait of ${currentTestimonial.name}, ${currentTestimonial.role}, sharing their success story with NutriSmart Care Africa`} fill className="object-cover" />
            </div>
            <div className="flex space-x-1 mb-4">
              {[...Array(currentTestimonial.rating)].map((_, i) =>
              <Icon key={i} name="StarIcon" size={20} className="text-accent fill-accent" />
              )}
            </div>
            <blockquote className="text-lg lg:text-xl text-card-foreground mb-6 leading-relaxed max-w-3xl">
              "{currentTestimonial.quote}"
            </blockquote>
            <div>
              <p className="font-semibold text-card-foreground">{currentTestimonial.name}</p>
              <p className="text-sm caption text-muted-foreground">{currentTestimonial.role}</p>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button onClick={prevTestimonial} className="p-2 rounded-lg hover:bg-muted transition-smooth" aria-label="Previous testimonial">
              <Icon name="ChevronLeftIcon" size={24} />
            </button>
            <div className="flex space-x-2">
              {text.testimonials.map((_, index) =>
              <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full transition-smooth ${index === currentIndex ? 'bg-primary w-8' : 'bg-border'}`} aria-label={`Go to testimonial ${index + 1}`} />
              )}
            </div>
            <button onClick={nextTestimonial} className="p-2 rounded-lg hover:bg-muted transition-smooth" aria-label="Next testimonial">
              <Icon name="ChevronRightIcon" size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>);

};

interface CTASectionProps {
  language: 'en' | 'rw';
}

const CTASection = ({ language }: CTASectionProps) => {
  const content = {
    en: {
      title: 'Ready to Transform Your Nutrition Journey?',
      subtitle: 'Join thousands of African families and institutions already benefiting from culturally-relevant nutrition solutions.',
      individualCTA: 'Start Free Trial',
      institutionCTA: 'Partner With Us',
      features: ['No credit card required', '30-day free trial', 'Cancel anytime']
    },
    rw: {
      title: 'Witeguye Guhindura Urugendo Rwawe rwo Kurya Neza?',
      subtitle: 'Jya ku miryango ibihumbi y\'Abanyafurika n\'ibigo bisanzwe byunguka ku bisubizo byo kurya neza bifite umuco.',
      individualCTA: 'Tangira Igerageza Kubuntu',
      institutionCTA: 'Dufatanye',
      features: ['Nta karita y\'inguzanyo isabwa', 'Igerageza ry\'iminsi 30 kubuntu', 'Hagarika igihe cyose']
    }
  };
  const text = content[language];
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">{text.title}</h2>
        <p className="text-lg opacity-90 mb-8 leading-relaxed">{text.subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/user-registration" className="button-base bg-accent text-accent-foreground hover:bg-accent/90 text-center">{text.individualCTA}</Link>
          <Link href="/institution-dashboard" className="button-base bg-card text-card-foreground hover:bg-card/90 text-center">{text.institutionCTA}</Link>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm opacity-90">
          {text.features.map((feature, index) =>
          <div key={index} className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </div>
          )}
        </div>
      </div>
    </section>);

};

interface FooterProps {
  language: 'en' | 'rw';
}

const Footer = ({ language }: FooterProps) => {
  const content = {
    en: {
      about: 'Empowering African communities with accessible, personalized nutrition guidance for better health outcomes.',
      quickLinks: 'Quick Links',
      solutions: 'Solutions',
      support: 'Support',
      links: { mealPlanning: 'Meal Planning', consultations: 'Consultations', institutions: 'For Institutions', helpCenter: 'Help Center', contact: 'Contact Us', privacy: 'Privacy Policy' },
      copyright: 'NutriSmart Care Africa. All rights reserved.'
    },
    rw: {
      about: 'Gutera inkunga imiryango y\'Abanyafurika hamwe n\'ubuyobozi bwo kurya neza bworoshye kandi bwite kugira ngo haboneke ubuzima bwiza.',
      quickLinks: 'Ihuza Byihuse',
      solutions: 'Ibisubizo',
      support: 'Ubufasha',
      links: { mealPlanning: 'Gutegura Indyo', consultations: 'Inama', institutions: 'Ku Bigo', helpCenter: 'Ikigo cy\'Ubufasha', contact: 'Twandikire', privacy: 'Politiki y\'Ubuzima Bwite' },
      copyright: 'NutriSmart Care Africa. Uburenganzira bwose burahawe.'
    }
  };
  const text = content[language];
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <svg className="w-6 h-6 text-primary-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-heading text-primary">NutriSmart</h3>
                <p className="text-xs caption text-muted-foreground">Care Africa</p>
              </div>
            </div>
            <p className="text-sm caption text-muted-foreground leading-relaxed">{text.about}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-card-foreground mb-3">{text.solutions}</h4>
            <ul className="space-y-2">
              <li><Link href="/meal-planning" className="text-sm caption text-muted-foreground hover:text-primary transition-smooth">{text.links.mealPlanning}</Link></li>
              <li><Link href="/consultation-booking" className="text-sm caption text-muted-foreground hover:text-primary transition-smooth">{text.links.consultations}</Link></li>
              <li><Link href="/institution-dashboard" className="text-sm caption text-muted-foreground hover:text-primary transition-smooth">{text.links.institutions}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-card-foreground mb-3">{text.support}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm caption text-muted-foreground hover:text-primary transition-smooth">{text.links.helpCenter}</a></li>
              <li><a href="#" className="text-sm caption text-muted-foreground hover:text-primary transition-smooth">{text.links.contact}</a></li>
              <li><a href="#" className="text-sm caption text-muted-foreground hover:text-primary transition-smooth">{text.links.privacy}</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm caption text-muted-foreground">&copy; {new Date().getFullYear()} {text.copyright}</p>
        </div>
      </div>
    </footer>);

};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfessionalLandingPage() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm shadow-elevation-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <svg className="w-6 h-6 text-primary-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold font-heading text-primary">{t('app.name')}</h1>
                <p className="text-xs caption text-muted-foreground">{t('app.tagline')}</p>
              </div>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button onClick={toggleLanguage} className="flex items-center space-x-1.5 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-smooth text-sm font-medium text-card-foreground" aria-label="Toggle language">
                <Icon name="LanguageIcon" size={16} />
                <span className="hidden sm:inline">{t('lang.toggle')}</span>
              </button>
              <Link href="/login" className="px-4 py-2 rounded-lg text-primary hover:bg-muted transition-smooth font-medium text-sm">{t('nav.login')}</Link>
              <Link href="/user-registration" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth font-medium text-sm">{t('nav.getStarted')}</Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        <HeroSection language={language} />
        <StatsSection language={language} />
        <BenefitsSection language={language} />
        <TestimonialsSection language={language} />
        <CTASection language={language} />
      </main>
      <Footer language={language} />
    </div>);

}