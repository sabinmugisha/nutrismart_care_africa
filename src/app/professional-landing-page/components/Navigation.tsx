// components/Navigation.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, Menu, X, Home, User, Briefcase, Globe, UserCircle,
  ChevronRight, ArrowRight, ChevronDown, Search, Languages, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Slug mappings (unchanged)
const serviceSlugs: Record<string, string> = {
  'AI-Powered Nutrition Platforms': 'ai-powered-nutrition-platforms',
  'Mobile Applications': 'mobile-applications',
  'AI Nutrition Coach': 'ai-nutrition-coach',
  'Tele-Nutrition Services': 'tele-nutrition-services',
  'Healthcare Provider Dashboards': 'healthcare-provider-dashboards',
  'Workplace Wellness for Institutions': 'workplace-wellness',
  'Early Childhood Nutrition Support': 'early-childhood-nutrition',
  'Weight Management': 'weight-management',
  'NutriMarket – Food Access': 'nutrimarket',
  'Research & Development': 'research-development'
};

const helpSlugs: Record<string, string> = {
  'Individuals & Families': 'individuals-families',
  'Chronic Patients': 'chronic-patients',
  'Healthcare Providers': 'healthcare-providers',
  'Pregnant & Postpartum Women': 'pregnant-postpartum',
  'Children (6m–5y)': 'children-6m-5y',
  'Weight Management': 'weight-management',
  'Smart School Feeding': 'smart-school-feeding'
};

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);
  const [isWhoWeHelpOpen, setIsWhoWeHelpOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const serviceLinks = Object.keys(serviceSlugs);
  const whoWeHelpLinks = Object.keys(helpSlugs);

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#0f2619]/95 backdrop-blur-xl border-b border-white/15 shadow-2xl' 
          : 'bg-[#0f2619]/80 backdrop-blur-md border-b border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar - increased height (py-2 -> py-3) */}
          <div className="flex justify-between items-center py-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/40">
                <Globe size={10} />
                <span>Pan‑African Network</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Language selector */}
              <div className="relative hidden md:block">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-green-400 transition-colors"
                >
                  <Languages size={12} />
                  <span>EN</span>
                  <ChevronDown size={10} />
                </button>
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-full right-0 mt-2 w-28 bg-[#0f2619]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden"
                    >
                      {['English', 'Kinyarwanda', 'French'].map(lang => (
                        <button key={lang} onClick={() => setIsLangOpen(false)} className="block w-full text-left px-3 py-2 text-xs text-white/70 hover:bg-green-500/20 transition-colors">
                          {lang}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search */}
              <button onClick={() => setIsSearchOpen(true)} className="text-white/60 hover:text-green-400 transition-colors">
                <Search size={16} />
              </button>

              {/* Login */}
              <Link href="/login" className="hidden sm:flex items-center gap-1.5 group text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-green-400 transition-colors">
                <UserCircle size={14} className="text-green-500" />
                <span>Login</span>
                <ArrowRight size={10} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            </div>
          </div>

          {/* Main nav - increased height (py-3 -> py-5) */}
          <div className="flex justify-between items-center py-5">
            {/* Logo - slightly larger */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <img src="/health.png" alt="NutriSmart Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black tracking-tighter leading-none text-white">NutriSmart</h1>
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-green-400/80">Care Africa</p>
              </div>
            </Link>

            {/* Desktop links - increased line-height */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className={`text-[11px] font-bold uppercase tracking-wider transition-all relative py-1 ${
                isActive('/') ? 'text-green-400' : 'text-white/70 hover:text-green-400'
              }`}>
                Home
                {isActive('/') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-400 rounded-full"></span>}
              </Link>
              
              {/* Services Dropdown */}
              <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
                <button className={`text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                  isServicesOpen ? 'text-green-400' : 'text-white/70 hover:text-green-400'
                }`}>
                  Services <ChevronDown size={12} className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute top-full left-0 mt-2 w-64 bg-[#0f2619]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl py-2 z-50">
                      {serviceLinks.map(link => (
                        <Link key={link} href={`/services/${serviceSlugs[link]}`} onClick={() => setIsServicesOpen(false)} className="block px-4 py-2.5 text-sm text-white/70 hover:bg-green-500/20 hover:text-white transition-colors">
                          {link}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Who We Help Dropdown */}
              <div className="relative" onMouseEnter={() => setIsWhoWeHelpOpen(true)} onMouseLeave={() => setIsWhoWeHelpOpen(false)}>
                <button className={`text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                  isWhoWeHelpOpen ? 'text-green-400' : 'text-white/70 hover:text-green-400'
                }`}>
                  Who We Help <ChevronDown size={12} className={`transition-transform ${isWhoWeHelpOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isWhoWeHelpOpen && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute top-full left-0 mt-2 w-64 bg-[#0f2619]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl py-2 z-50">
                      {whoWeHelpLinks.map(link => (
                        <Link key={link} href={`/help/${helpSlugs[link]}`} onClick={() => setIsWhoWeHelpOpen(false)} className="block px-4 py-2.5 text-sm text-white/70 hover:bg-green-500/20 hover:text-white transition-colors">
                          {link}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/#contact" className="text-[11px] font-bold uppercase tracking-wider text-white/70 hover:text-green-400 transition-all">Contact</Link>
            </div>

            {/* Support button - slightly taller */}
            <div className="flex items-center gap-3">
              <button className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 bg-green-500 text-[#0f2619] hover:bg-white shadow-lg shadow-green-500/20">
                <Phone size={14} /> 
                <span>Support</span>
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-white/70 hover:text-white">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile slide‑in menu (unchanged) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#0f2619] backdrop-blur-2xl border-l border-white/10 shadow-2xl z-[100] p-6 overflow-y-auto"
          >
            <div className="flex justify-end mb-8">
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white/70 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-white flex items-center justify-between group">
                Home <ChevronRight className="text-green-500" />
              </Link>
              {/* Services accordion */}
              <div>
                <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="text-2xl font-black text-white flex items-center justify-between w-full">
                  Services <ChevronDown className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden mt-4 space-y-3 pl-4">
                      {serviceLinks.map(link => (
                        <Link key={link} href={`/services/${serviceSlugs[link]}`} onClick={() => setIsMobileMenuOpen(false)} className="block text-white/70 hover:text-green-400 text-lg">
                          {link}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Who We Help accordion */}
              <div>
                <button onClick={() => setIsWhoWeHelpOpen(!isWhoWeHelpOpen)} className="text-2xl font-black text-white flex items-center justify-between w-full">
                  Who We Help <ChevronDown className={`transition-transform ${isWhoWeHelpOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isWhoWeHelpOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden mt-4 space-y-3 pl-4">
                      {whoWeHelpLinks.map(link => (
                        <Link key={link} href={`/help/${helpSlugs[link]}`} onClick={() => setIsMobileMenuOpen(false)} className="block text-white/70 hover:text-green-400 text-lg">
                          {link}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-white">Contact</Link>
              <div className="h-px bg-white/10 my-2" />
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 bg-green-500 text-[#0f2619] font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-3 text-center">
                <UserCircle size={18} /> Account Access
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay unchanged */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-start justify-center pt-32 px-4" onClick={() => setIsSearchOpen(false)}>
            <motion.div initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }} className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="p-5 border-b flex items-center gap-3">
                <Search size={22} className="text-green-600" />
                <input type="text" placeholder="Search services, articles, meal plans..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 text-lg outline-none bg-transparent" autoFocus />
                <button onClick={() => setIsSearchOpen(false)}><XCircle size={22} className="text-slate-400" /></button>
              </div>
              <div className="p-5 text-slate-500 text-sm">{searchQuery ? `Results for "${searchQuery}" coming soon.` : 'Try searching for "diabetes meal plan", "AI nutrition coach", etc.'}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}