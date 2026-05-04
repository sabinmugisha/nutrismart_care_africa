// components/ServicesGrid.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Brain, Smartphone, Bot, Video, ClipboardList, 
  Building2, Baby, Weight, ShoppingBag, Microscope, ArrowRight
} from 'lucide-react';

const services = [
  { slug: 'ai-powered-nutrition-platforms', title: 'AI-Powered Nutrition Platforms', icon: Brain, shortDesc: 'Smart algorithms that learn, adapt, and personalize meal plans to your health profile and local foods.' },
  { slug: 'mobile-applications', title: 'Mobile Applications', icon: Smartphone, shortDesc: 'Wellness at your fingertips – daily meal planning, grocery lists, behavior nudges, and chronic disease tracking.' },
  { slug: 'ai-nutrition-coach', title: 'AI Nutrition Coach', icon: Bot, shortDesc: 'Your personal dietitian, 24/7 – instant answers, meal suggestions, and motivational support.' },
  { slug: 'tele-nutrition-services', title: 'Tele-Nutrition Services', icon: Video, shortDesc: 'Expert care from anywhere – connect with licensed dietitians via secure video consultations.' },
  { slug: 'healthcare-provider-dashboards', title: 'Healthcare Provider Dashboards', icon: ClipboardList, shortDesc: 'Data-driven insights for clinical teams – monitor patient diet quality, adherence, and outcomes.' },
  { slug: 'workplace-wellness', title: 'Workplace Wellness for Institutions', icon: Building2, shortDesc: 'Corporate nutrition solutions – canteen audits, smart meal programs, and wellness challenges.' },
  { slug: 'early-childhood-nutrition', title: 'Early Childhood Nutrition Support', icon: Baby, shortDesc: 'Support for daycare centers & crèches – age-specific meal plans, growth monitoring, and caregiver training.' },
  { slug: 'weight-management', title: 'Weight Management', icon: Weight, shortDesc: 'Personalized, sustainable, and effective – healthy weight loss or gain with AI-based coaching.' },
  { slug: 'nutrimarket', title: 'NutriMarket – Food Access', icon: ShoppingBag, shortDesc: 'Shop smart, eat local – connect with verified vendors for affordable, nutritious products.' },
  { slug: 'research-development', title: 'Research & Development', icon: Microscope, shortDesc: 'Evidence at the heart of innovation – studies, data analytics, and policy advocacy.' }
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section header - improved alignment */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-green-600 font-bold uppercase tracking-wider text-sm mb-3">Digital Health & Health-Tech</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Smart Solutions for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Personalized Wellness
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mt-6 rounded-full"></div>
          <p className="text-slate-500 text-lg mt-6">
            Comprehensive nutrition solutions powered by AI and expert knowledge
          </p>
        </div>

        {/* Grid - improved card design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.slug}
                className="group relative bg-white rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-green-200 flex flex-col h-full"
              >
                {/* Icon with gradient background */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mb-5 group-hover:from-green-600 group-hover:to-emerald-600 transition-colors duration-300">
                  <Icon size={28} className="text-green-600 group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-700 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 leading-relaxed mb-6 flex-grow">
                  {service.shortDesc}
                </p>
                
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:gap-3 transition-all mt-auto pt-2 border-t border-slate-100 group-hover:border-green-200"
                >
                  Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}