'use client';
import React from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight,
  Globe,
  Zap
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f2619] text-white pt-32 pb-12 relative overflow-hidden">
      {/* BACKGROUND INNOVATION: Large Text Watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[20vw] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter">
        NUTRISMART
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* BRAND ARCHITECTURE (5 Columns) */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center font-black text-2xl shadow-2xl shadow-green-500/20">
                  N
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tighter leading-none">NutriSmart</h2>
                  <p className="text-green-500 text-xs font-bold uppercase tracking-[0.3em] mt-1">Care Africa</p>
                </div>
              </div>
              <p className="text-green-100/50 leading-relaxed text-lg max-w-md font-medium">
                We are building the digital backbone for personalized wellness across the continent, merging AI precision with nutritional wisdom.
              </p>
            </div>

            {/* System Status - Innovation Detail */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 w-fit px-6 py-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <div className="w-1.5 h-1.5 bg-green-500/40 rounded-full" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Systems Operational</span>
            </div>
          </div>

          {/* NAV GROUPS (7 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500 mb-8">Navigation</p>
              <ul className="space-y-4">
                {['Home', 'About', 'Services', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase()}`} className="text-green-100/40 hover:text-white transition-all flex items-center gap-2 group">
                      <span className="text-sm font-bold">{item}</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-y-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500 mb-8">Capabilities</p>
              <ul className="space-y-4 text-green-100/40 text-sm font-bold">
                <li className="hover:text-white cursor-pointer transition-colors">AI Meal Plans</li>
                <li className="hover:text-white cursor-pointer transition-colors">Chronic Care</li>
                <li className="hover:text-white cursor-pointer transition-colors">Tele-Nutrition</li>
                <li className="hover:text-white cursor-pointer transition-colors">Corporate</li>
              </ul>
            </div>
            
            {/* Third column intentionally left empty or for future use to maintain grid balance */}
            <div className="hidden md:block"></div>
          </div>
        </div>

        {/* BOTTOM ARCHITECTURE */}
        <div className="pt-12 border-t border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-green-100/20">
              <p>© {currentYear} NutriSmart Care Africa</p>
              <div className="w-1 h-1 bg-white/10 rounded-full" />
              <p>Privacy Protocol</p>
            </div>
            
            {/* DEVELOPER CREDIT */}
            <div className="group flex items-center gap-4 bg-white/[0.03] hover:bg-white/[0.08] px-6 py-3 rounded-full border border-white/5 transition-all cursor-default">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-100/30">Engineered by</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black italic tracking-tighter group-hover:text-green-400 transition-colors">Sabin Mugisha</span>
                <Zap size={12} className="text-green-500 fill-green-500 group-hover:animate-bounce" />
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </footer>
  );
}