// components/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';


export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Service links (same as in ServicesGrid)
  const serviceLinks = [
    'AI-Powered Nutrition Platforms',
    'Mobile Applications',
    'AI Nutrition Coach',
    'Tele-Nutrition Services',
    'Healthcare Provider Dashboards',
    'Workplace Wellness',
    'Early Childhood Support',
    'Weight Management',
    'NutriMarket',
    'Research & Development'
  ];

  const whoWeHelpLinks = [
    'Individuals & Families',
    'Chronic Patients',
    'Healthcare Providers',
    'Pregnant & Postpartum Women',
    'Children (6m–5y)',
    'Weight Management',
    'Smart School Feeding'
  ];

  const companyLinks = ['About Us', 'Partnerships', 'Careers', 'Contact'];
  const connectLinks = ['Blog', 'Newsletter', 'Social Media', 'Support'];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f2619] text-white pt-20 pb-12 relative overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[20vw] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter">
        NUTRISMART
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Services Column */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500 mb-6">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollToSection(`service-${link.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)}
                    className="text-green-100/40 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Who We Help Column */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500 mb-6">Who We Help</h3>
            <ul className="space-y-3">
              {whoWeHelpLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollToSection(`help-${link.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)}
                    className="text-green-100/40 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500 mb-6">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={`#${link.toLowerCase()}`} className="text-green-100/40 hover:text-white transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500 mb-6">Connect</h3>
            <ul className="space-y-3">
              {connectLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href="#" className="text-green-100/40 hover:text-white transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-green-100/20">
            <p>© {currentYear} NutriSmart Care Africa</p>
            <div className="w-1 h-1 bg-white/10 rounded-full" />
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
          
          <div className="group flex items-center gap-4 bg-white/[0.03] hover:bg-white/[0.08] px-6 py-3 rounded-full border border-white/5 transition-all cursor-default">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-100/30">Engineered by</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black italic tracking-tighter group-hover:text-green-400 transition-colors">Sabin Mugisha</span>
             
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}