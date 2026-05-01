'use client';
import * as React from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  Home, 
  User, 
  Briefcase, 
  Globe, 
  UserCircle,
  Zap,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', icon: Home, href: '#home' },
    { name: 'About', icon: User, href: '#about' },
    { name: 'Services', icon: Briefcase, href: '#services' },
    { name: 'Who We Help', icon: UserCircle, href: '#help' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#0f2619]/70 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto">
        
        {/* TOP BAR - Integrated and Fixed */}
        <div className="flex justify-between items-center px-6 py-2 border-b border-white/[0.03]">
          <div className="flex items-center gap-4">
           
            <div className="hidden md:flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/30">
              <Globe size={10} />
              <span>Africa Region</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              href="/login" 
              className="flex items-center gap-2 group text-[9px] font-black uppercase tracking-widest text-white/60 hover:text-green-400 transition-colors"
            >
              <UserCircle size={14} className="text-green-500" />
              <span>Login / Register</span>
              <ArrowRight size={10} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        </div>

        {/* MAIN NAVIGATION */}
        <div className="px-6 py-4 flex justify-between items-center">
          
          {/* Identity with health.png */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-11 h-11 relative flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <img 
                src="/health.png" 
                alt="NutriSmart Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none text-white">
                NutriSmart
              </h1>
              <p className="text-[8px] font-black uppercase tracking-[0.4em] mt-1 text-green-500/80">
                Care Africa
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group text-white/60 hover:text-green-400"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-green-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Primary Action Button */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all group active:scale-95 bg-green-500 text-[#0f2619] hover:bg-white shadow-xl shadow-green-500/10">
              <Phone size={14} className="group-hover:rotate-12 transition-transform" /> 
              <span>Get Support</span>
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden p-2 text-white/70 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 bg-[#0f2619]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:hidden shadow-2xl mt-2"
          >
            <div className="flex flex-col gap-6">
              {menuItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-black text-white flex items-center justify-between group"
                >
                  {item.name}
                  <ChevronRight className="text-green-500 group-hover:translate-x-2 transition-transform" />
                </Link>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 bg-green-500 text-[#0f2619] font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3"
              >
                <UserCircle size={18} /> Account Access
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}