'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface NavLink {
  label: string;
  href: string;
}

interface Tip {
  id: number;
  emoji: string;
  title: string;
  desc: string;
  tag: string;
  span?: string;
}

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Nutrition Tips', href: '#gallery' },
  { label: 'Programs', href: '#programs' },
  { label: 'Contact', href: '#contact' },
];

const TIPS: Tip[] = [
  {
    id: 1,
    emoji: '🥑',
    title: 'Avocado & Plantain Bowl',
    desc: 'Rich in healthy fats and potassium — a Rwandan staple reimagined for balanced macros.',
    tag: 'Breakfast',
    span: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    emoji: '🫘',
    title: 'Isombe with Beans',
    desc: 'Cassava leaves + kidney beans deliver complete protein and iron in one dish.',
    tag: 'Lunch',
  },
  {
    id: 3,
    emoji: '🌽',
    title: 'Ugali & Greens',
    desc: 'Maize flour base paired with dark leafy greens for sustained energy.',
    tag: 'Dinner',
  },
  {
    id: 4,
    emoji: '🍠',
    title: 'Sweet Potato Porridge',
    desc: 'Beta-carotene powerhouse — ideal for children and pregnant mothers.',
    tag: 'Snack',
  },
  {
    id: 5,
    emoji: '🥬',
    title: 'Amaranth Salad',
    desc: 'Local greens with lemon and groundnuts — micronutrient-dense and affordable.',
    tag: 'Salad',
    span: 'col-span-2',
  },
  {
    id: 6,
    emoji: '🍌',
    title: 'Banana & Millet Smoothie',
    desc: 'Natural energy boost using finger millet — high in calcium and fibre.',
    tag: 'Drink',
  },
];

const STATS = [
  { value: '12,000+', label: 'Families Supported' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '47', label: 'Districts Reached' },
  { value: '200+', label: 'Nutrition Plans' },
];

const BOT_RESPONSES: Record<string, string> = {
  default: "Hello! I'm NutriBot 🌿. Ask me about meal plans, nutrition tips, or how to get started with NutriSmart Care.",
  hello: "Hi there! 👋 How can I help you with your nutrition journey today?",
  meal: "We offer personalised meal plans using locally-sourced Rwandan ingredients. Would you like to book a consultation?",
  plan: "Our nutrition plans are tailored to your health goals, budget, and cultural preferences. Start with a free assessment!",
  contact: "You can reach us at info@nutrismartcare.com or call +250 788 000 000. We're here Mon–Sat, 8am–6pm.",
  price: "Plans start from 5,000 RWF/month. We also offer institutional packages for schools and hospitals.",
};

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const Navbar = ({ onContactClick }: { onContactClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href === '#contact') {
      onContactClick();
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-elevation-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-elevation-sm">
              <span className="text-white text-lg">🌿</span>
            </div>
            <div>
              <span
                className={`font-heading font-bold text-lg leading-tight block transition-colors duration-300 ${
                  scrolled ? 'text-primary' : 'text-white'
                }`}
              >
                NutriSmart Care
              </span>
              <span
                className={`text-xs transition-colors duration-300 ${
                  scrolled ? 'text-text-secondary' : 'text-white/70'
                }`}
              >
                Africa
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-body font-medium transition-smooth hover:text-accent ${
                  scrolled ? 'text-text-primary' : 'text-white/90'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onContactClick}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-smooth shadow-elevation-sm"
            >
              Get Started
            </button>

            {/* Profile Icon → /login */}
            <Link
              href="/login"
              className={`group relative w-9 h-9 rounded-full flex items-center justify-center border-2 transition-smooth hover:border-accent hover:bg-accent/10 ${
                scrolled ? 'border-primary/30' : 'border-white/40'
              }`}
              title="Sign in to your account"
            >
              <svg
                className={`w-5 h-5 transition-smooth group-hover:text-accent ${
                  scrolled ? 'text-primary' : 'text-white'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-smooth whitespace-nowrap pointer-events-none">
                Sign In
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 ${
                scrolled ? 'text-primary' : 'text-white'
              }`}
            >
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-80 pb-4' : 'max-h-0'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-elevation-lg p-4 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-4 py-2.5 text-text-primary font-medium rounded-lg hover:bg-primary/5 hover:text-primary transition-smooth"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onContactClick(); }}
              className="mt-2 px-4 py-2.5 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-smooth"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
const HeroSection = ({ onContactClick }: { onContactClick: () => void }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1920&q=80"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-fresh-vegetables-on-a-wooden-table-1565/1080p.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a16]/90 via-[#2D5A27]/75 to-[#8B4513]/60" />

      {/* Animated grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/3 left-1/5 w-48 h-48 rounded-full bg-primary/20 blur-2xl animate-pulse-soft" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-6 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Serving 47 Districts Across Rwanda
          </div>

          {/* Headline */}
          <h1
            className={`font-heading text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6 transition-all duration-700 delay-100 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Nourish Your Family with{' '}
            <span className="text-accent italic">Local Wisdom</span>,<br />
            Modern Science
          </h1>

          {/* Sub */}
          <p
            className={`font-body text-lg text-white/80 max-w-xl mb-8 leading-relaxed transition-all duration-700 delay-200 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Culturally-relevant nutrition plans built around Rwandan ingredients.
            Personalised consultations, institutional programs, and community
            support — all in one place.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button
              onClick={onContactClick}
              className="px-7 py-3.5 bg-accent text-white font-medium rounded-xl hover:bg-accent/90 transition-smooth shadow-elevation-md hover:shadow-elevation-lg hover:-translate-y-0.5"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => {
                const el = document.querySelector('#gallery');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl border border-white/30 hover:bg-white/20 transition-smooth"
            >
              Explore Recipes ↓
            </button>
          </div>

          {/* Stats */}
          <div
            className={`mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="font-heading text-3xl text-accent font-bold">{s.value}</div>
                <div className="text-white/60 text-sm mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   HEALTHY MEALS GALLERY
───────────────────────────────────────────── */
const HealthyMealsGallery = () => {
  const [activeTag, setActiveTag] = useState<string>('All');
  const tags = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Salad', 'Drink'];

  const filtered =
    activeTag === 'All' ? TIPS : TIPS.filter((t) => t.tag === activeTag);

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
            Nutrition Tips & Recipes
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
            Eat Well with What Grows Here
          </h2>
          <p className="font-body text-text-secondary max-w-xl">
            Every recipe uses ingredients available in Rwandan markets — affordable,
            seasonal, and packed with nutrients your family needs.
          </p>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                activeTag === tag
                  ? 'bg-primary text-white shadow-elevation-sm'
                  : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[180px]">
          {filtered.map((tip) => (
            <div
              key={tip.id}
              className={`group relative rounded-2xl overflow-hidden border border-border bg-card hover:shadow-elevation-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                tip.span || ''
              }`}
            >
              {/* Background emoji art */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 text-[8rem] select-none pointer-events-none">
                {tip.emoji}
              </div>

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-300" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-5">
                <div>
                  <span className="text-3xl">{tip.emoji}</span>
                  <span className="ml-2 px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded-full">
                    {tip.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-lg text-text-primary mb-1 group-hover:text-primary transition-smooth">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                    {tip.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Programs teaser */}
        <div id="programs" className="mt-20 rounded-3xl bg-gradient-to-br from-primary to-[#1a3a16] p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl mb-3">
                Institutional Nutrition Programs
              </h2>
              <p className="text-white/70 max-w-lg text-sm sm:text-base">
                Schools, hospitals, and NGOs across Rwanda trust NutriSmart Care to
                design evidence-based feeding programs that reduce malnutrition at scale.
              </p>
            </div>
            <Link
              href="/professional-landing-page"
              className="flex-shrink-0 px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent/90 transition-smooth shadow-elevation-sm whitespace-nowrap"
            >
              For Professionals →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   CONTACT MODAL
───────────────────────────────────────────── */
const ContactModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
      onClose();
    }, 2500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-elevation-xl w-full max-w-md p-6 sm:p-8 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary transition-smooth"
        >
          ✕
        </button>

        {sent ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="font-heading text-2xl text-primary mb-2">Message Sent!</h3>
            <p className="text-text-secondary">We'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-2xl">🌿</span>
              <h2 className="font-heading text-2xl text-text-primary mt-2">
                Get in Touch
              </h2>
              <p className="text-text-secondary text-sm mt-1">
                Tell us about your nutrition goals and we'll reach out.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Amina Uwase"
                  className="input-base w-full border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="input-base w-full border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  How can we help?
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your nutrition needs..."
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-smooth resize-none text-sm"
                />
              </div>
              <button
                type="submit"
                className="button-base bg-primary text-white hover:bg-primary/90 transition-smooth font-medium"
              >
                Send Message
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
const Footer = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <footer className="bg-[#0f1f0d] text-white">
      {/* Top band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-base">🌿</span>
              </div>
              <span className="font-heading text-lg font-bold">NutriSmart Care</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Empowering Rwandan families with science-backed, culturally-relevant
              nutrition solutions since 2020.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'in', 'f', '▶'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs hover:bg-accent/80 transition-smooth"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-4 text-white/90">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              {[
                'Personal Nutrition Plans',
                'Family Meal Planning',
                'Consultation Booking',
                'Institutional Programs',
                'School Feeding Programs',
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-accent transition-smooth">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-4 text-white/90">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <Link href="/login" className="hover:text-accent transition-smooth">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/user-registration" className="hover:text-accent transition-smooth">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/professional-landing-page" className="hover:text-accent transition-smooth">
                  For Professionals
                </Link>
              </li>
              <li>
                <Link href="/consultation-booking" className="hover:text-accent transition-smooth">
                  Book Consultation
                </Link>
              </li>
              <li>
                <button onClick={onContactClick} className="hover:text-accent transition-smooth">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-4 text-white/90">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>KG 7 Ave, Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+250788000000" className="hover:text-accent transition-smooth">
                  +250 788 000 000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:info@nutrismartcare.com" className="hover:text-accent transition-smooth">
                  info@nutrismartcare.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>Mon–Sat, 8am–6pm CAT</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
        <span>© {new Date().getFullYear()} NutriSmart Care Africa. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white/70 transition-smooth">Privacy Policy</a>
          <a href="#" className="hover:text-white/70 transition-smooth">Terms of Service</a>
          <a href="#" className="hover:text-white/70 transition-smooth">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

/* ─────────────────────────────────────────────
   MODERN CHATBOT
───────────────────────────────────────────── */
const ModernChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: BOT_RESPONSES.default },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { role: 'user', text: trimmed };
    const lower = trimmed.toLowerCase();
    const key = Object.keys(BOT_RESPONSES).find((k) => lower.includes(k)) || 'default';
    const botMsg: ChatMessage = { role: 'bot', text: BOT_RESPONSES[key] };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[250] flex flex-col items-end gap-3">
      {/* Chat window */}
      {open && (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-elevation-xl border border-border overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base">
                🌿
              </div>
              <div>
                <div className="text-white text-sm font-medium">NutriBot</div>
                <div className="text-white/60 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-smooth text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 flex flex-col gap-3 bg-muted/30">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user' ?'bg-primary text-white rounded-br-sm' :'bg-white text-text-primary shadow-elevation-sm rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about nutrition..."
              className="flex-1 px-3 py-2 text-sm rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-smooth"
            />
            <button
              onClick={sendMessage}
              className="w-9 h-9 flex items-center justify-center bg-primary text-white rounded-lg hover:bg-primary/90 transition-smooth flex-shrink-0"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-primary text-white shadow-elevation-lg hover:shadow-elevation-xl hover:scale-105 transition-all duration-300 flex items-center justify-center text-2xl"
        aria-label="Open chat"
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────
   COOKIE BANNER
───────────────────────────────────────────── */
const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('nutrismart_cookies');
    if (!accepted) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('nutrismart_cookies', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('nutrismart_cookies', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-sm z-[250] animate-fade-in">
      <div className="bg-white rounded-2xl shadow-elevation-xl border border-border p-5">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl flex-shrink-0">🍪</span>
          <div>
            <h4 className="font-heading text-base text-text-primary mb-1">
              We use cookies
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              We use cookies to personalise your nutrition experience and improve our
              services. You can manage your preferences at any time.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={accept}
            className="flex-1 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-smooth"
          >
            Accept All
          </button>
          <button
            onClick={decline}
            className="flex-1 py-2 bg-muted text-text-secondary text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-smooth"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN LANDING PAGE
───────────────────────────────────────────── */
export default function LandingPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="smooth-scroll min-h-screen">
      {/* Sticky Navbar */}
      <Navbar onContactClick={() => setContactOpen(true)} />

      {/* Page Sections */}
      <main>
        <HeroSection onContactClick={() => setContactOpen(true)} />
        <HealthyMealsGallery />
      </main>

      {/* Footer */}
      <Footer onContactClick={() => setContactOpen(true)} />

      {/* Floating Elements */}
      <ModernChatbot />
      <CookieBanner />

      {/* Contact Modal */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
