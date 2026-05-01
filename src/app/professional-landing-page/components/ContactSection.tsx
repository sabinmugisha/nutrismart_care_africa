'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Mail, Globe, Send, Sparkles, Zap } from 'lucide-react';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <section id="contact" className="w-full bg-white relative overflow-hidden min-h-screen flex items-center">
      
      {/* FULL WIDTH LAYOUT WITHOUT IMAGE */}
      <div className="w-full flex flex-col lg:flex-row items-stretch min-h-screen">
        
        {/* LEFT: THE BRAND ANCHOR (Deep Forest Green) */}
        <div className="lg:w-[40%] bg-[#0f2619] relative p-12 md:p-24 flex flex-col justify-between overflow-hidden">
          {/* Abstract Geometric Background (The "Engine" Look) */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-500/20 blur-[120px] rounded-full" />

          <div className="relative z-10">
            

            <h3 className="text-5xl md:text-6xl font-serif text-white leading-none tracking-tighter mb-8">
              Let's build <br /> 
              <span className="text-green-400">the future.</span>
            </h3>
            <p className="text-green-100/60 text-lg max-w-sm leading-relaxed">
              Our engineering team is ready to scale your nutritional vision across Africa. Drop a message to initialize our partnership.
            </p>
          </div>

          <div className="relative z-10 space-y-8">
            {[
              { icon: MapPin, label: "Kigali, Rwanda", sub: "Regional HQ" },
              { icon: Mail, label: "info@nutrismartcare.com", sub: "Official Inquiry" },
              { icon: Globe, label: "Pan-African Reach", sub: "Network Scope" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-500">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-green-500/50">{item.sub}</p>
                  <p className="text-white font-bold text-lg">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: THE HIGH-END FORM (Soft Slate/White) */}
        <div className="lg:w-[60%] p-12 md:p-24 lg:p-32 bg-slate-50 flex flex-col justify-center">
          <div className="max-w-2xl mx-auto w-full">
            
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-green-600 w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Secure Transmission</span>
              </div>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Initialize <span className="text-green-700">Contact</span></h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-green-600 transition-colors">Your Identity</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-xl outline-none focus:border-green-600 transition-all text-slate-900 placeholder:text-slate-200"
                  />
                </div>
                <div className="group space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-green-600 transition-colors">Digital Point</label>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-xl outline-none focus:border-green-600 transition-all text-slate-900 placeholder:text-slate-200"
                  />
                </div>
              </div>

              <div className="group space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-green-600 transition-colors">Context / Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us how we can collaborate..."
                  className="w-full bg-white rounded-[2.5rem] p-8 text-xl outline-none focus:ring-8 focus:ring-green-600/5 border border-slate-100 focus:border-green-600 transition-all text-slate-900 shadow-sm resize-none"
                />
              </div>

              <button
                disabled={isSubmitting || isSuccess}
                className={`w-full py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-4 transition-all shadow-2xl ${
                  isSuccess
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#0f2619] hover:bg-green-700 text-white hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Connecting...</span>
                ) : isSuccess ? (
                  <>Transmission Success <CheckCircle size={20} /></>
                ) : (
                  <>Send Message <Send size={16} /></>
                )}
              </button>
            </form>

            <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40">
               <p className="text-[9px] font-bold text-slate-400 tracking-[0.3em] uppercase">© 2026 NutriSmart Care Africa</p>
               <p className="text-[9px] font-bold text-slate-400 tracking-[0.3em] uppercase underline underline-offset-4">Privacy Protocols</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}