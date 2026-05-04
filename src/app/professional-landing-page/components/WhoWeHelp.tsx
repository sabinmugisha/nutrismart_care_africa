// components/WhoWeHelp.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Users, HeartPulse, Building2, Activity, Baby, Weight, School, ArrowRight } from 'lucide-react';

// Improved animated counter
function StatCounter({ end, suffix, label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const stepTime = Math.max(10, Math.floor(duration / end));
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className="text-center p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
      <div className="text-4xl md:text-5xl font-black text-green-700">{hasAnimated ? count : 0}{suffix || ''}</div>
      <p className="text-sm font-medium text-slate-500 mt-2">{label}</p>
    </div>
  );
}

const helpCategories = [
  { slug: 'individuals-families', title: 'Individuals & Families', icon: Users, shortDesc: 'Personalized, culturally relevant diet plans that fit your daily life and traditions.' },
  { slug: 'chronic-patients', title: 'Chronic Patients', icon: HeartPulse, shortDesc: 'Data‑driven tracking and specialized meal plans for diabetes, hypertension, HIV/AIDS, and more.' },
  { slug: 'healthcare-providers', title: 'Healthcare Providers', icon: Building2, shortDesc: 'Secure portals for doctors to monitor patient adherence and nutritional recovery in real‑time.' },
  { slug: 'pregnant-postpartum', title: 'Pregnant & Postpartum Women', icon: Activity, shortDesc: 'Stage‑based nutrition plans, breastfeeding support, and first‑time mother toolkits.' },
  { slug: 'children-6m-5y', title: 'Children (6 months – 5 years)', icon: Baby, shortDesc: 'Growth monitoring, caregiver coaching, and early childhood nutrition guidance.' },
  { slug: 'weight-management', title: 'Weight Management', icon: Weight, shortDesc: 'Healthy weight loss and gain programs with behavioral support and tracking.' },
  { slug: 'smart-school-feeding', title: 'Smart School Feeding Programs', icon: School, shortDesc: 'Collaboration with schools to provide menu design, vendor training, and nutritional budgeting.' }
];

export default function WhoWeHelp() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-green-600 font-bold uppercase tracking-wider text-sm mb-3">Who We Help</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Tailored Nutrition for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Diverse Communities
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mt-6 rounded-full"></div>
          <p className="text-slate-500 text-lg mt-6">
            Across Rwanda and Africa, we serve individuals, families, healthcare providers, and institutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {helpCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.slug}
                className="group bg-white rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-green-200 flex flex-col h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mb-5 group-hover:from-green-600 group-hover:to-emerald-600 transition-colors">
                  <Icon size={28} className="text-green-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-700">{category.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6 flex-grow">{category.shortDesc}</p>
                <Link
                  href={`/help/${category.slug}`}
                  className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:gap-3 transition-all pt-2 border-t border-slate-100 group-hover:border-green-200"
                >
                  Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Stats Section - improved design */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <h3 className="text-2xl md:text-3xl font-black text-center text-slate-900 mb-10">Our Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCounter end={15000} suffix="+" label="Lives Impacted" />
            <StatCounter end={45} suffix="+" label="Healthcare Partners" />
            <StatCounter end={120} suffix="+" label="Institutions Served" />
            <StatCounter end={25000} suffix="+" label="Nutrition Plans Generated" />
          </div>
        </div>
      </div>
    </section>
  );
}