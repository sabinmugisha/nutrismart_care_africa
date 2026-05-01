'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, HeartPulse, Building2, ArrowRight } from 'lucide-react';

const targets = [
  { 
    id: 'individuals',
    title: "Individuals", 
    desc: "Personalized, culturally relevant diet plans that integrate seamlessly into your daily life and food traditions.",
    icon: Users,
    color: "bg-green-500"
  },
  { 
    id: 'patients',
    title: "Chronic Patients", 
    desc: "Data-driven nutrition tracking and specialized meal planning to manage diabetes, hypertension, and more.",
    icon: HeartPulse,
    color: "bg-emerald-500"
  },
  { 
    id: 'clinics',
    title: "Health Providers", 
    desc: "Clinically secure portals for doctors to monitor patient adherence and nutritional recovery in real-time.",
    icon: Building2,
    color: "bg-green-700"
  }
];

export default function AboutPreview() {
  const [activeTab, setActiveTab] = useState(targets[0]);

  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: MISSION (The Anchor) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-green-600 font-black uppercase tracking-[0.2em] text-xs mb-4">Our Purpose</p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                Empowering Wellness <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  Across the Continent
                </span>
              </h2>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <p className="text-slate-600 leading-relaxed">
                NutriSmart Care Africa is a digital bridge. We combine advanced AI with local nutrition expertise to ensure health is accessible, understandable, and actionable for everyone.
              </p>
              
              <div className="mt-8 pt-8 border-t border-slate-100 flex gap-6">
                <div>
                  <p className="text-2xl font-black text-slate-900">10k+</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Transformed</p>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div>
                  <p className="text-2xl font-black text-slate-900">24/7</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400">AI Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: THE FOCUS SPOTLIGHT */}
          <div className="lg:col-span-7 bg-white rounded-[3rem] p-4 md:p-12 border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {targets.map((target) => (
                <button
                  key={target.id}
                  onClick={() => setActiveTab(target)}
                  className={`flex flex-col items-center p-6 rounded-3xl transition-all duration-300 ${
                    activeTab.id === target.id 
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/20 scale-105' 
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <target.icon className={`w-8 h-8 mb-3 ${activeTab.id === target.id ? 'text-white' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold uppercase tracking-widest">{target.title}</span>
                </button>
              ))}
            </div>

            <div className="relative min-h-[250px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-center max-w-md"
                >
                  {/* The Fluid Blob Mask behind the icon */}
                  <div className="relative mb-8 flex justify-center">
                    <div className={`absolute inset-0 blur-3xl opacity-20 rounded-full ${activeTab.color}`}></div>
                    <div className={`w-20 h-20 rounded-2xl ${activeTab.color} flex items-center justify-center text-white shadow-2xl rotate-3`}>
                      <activeTab.icon className="w-10 h-10" />
                    </div>
                  </div>

                  <h3 className="text-3xl font-black text-slate-900 mb-4">{activeTab.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-8">
                    {activeTab.desc}
                  </p>
                  
                  <button className="inline-flex items-center gap-2 text-green-600 font-bold hover:gap-4 transition-all">
                    View Impact Case Study <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-slate-50 rounded-full pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
}