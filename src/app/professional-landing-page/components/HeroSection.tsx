'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
        <source src="/intro.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 via-transparent to-green-900/60"></div>

      <div className="relative z-10 text-center px-4">
        <span className="px-4 py-1.5 bg-green-500/20 backdrop-blur-md border border-green-400/30 rounded-full text-green-400 text-xs font-bold uppercase tracking-widest mb-6 inline-block">
          "Right Food for Every Need"
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg">
          Smart Solutions for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
            Personalized Wellness
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 italic max-w-2xl mx-auto">
          "Let Nutrismartcare be a guide to a healthier, happy you!"
        </p>
  
      </div>
    </section>
  );
}