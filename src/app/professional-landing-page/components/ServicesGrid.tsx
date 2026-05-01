'use client';
import React from 'react';

const services = [
  { 
    title: "AI-Powered Nutrition", 
    desc: "Adaptive, culturally relevant meal plans based on health profiles.", 
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
    size: "md:col-span-2 md:row-span-2",
    mask: "blob-1" 
  },
  { 
    title: "Mobile Apps", 
    desc: "Daily tracking and grocery management.", 
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
    size: "md:col-span-1 md:row-span-1",
    mask: "blob-2"
  },
  { 
    title: "AI Nutrition Coach", 
    desc: "24/7 real-time dietary guidance.", 
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    size: "md:col-span-1 md:row-span-1",
    mask: "blob-3"
  },
  { 
    title: "Tele-Nutrition", 
    desc: "Virtual consultations with licensed specialists.", 
    img: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800",
    size: "md:col-span-1 md:row-span-2",
    mask: "blob-4"
  },
  { 
    title: "Provider Dashboards", 
    desc: "Secure clinical monitoring portals.", 
    img: "https://images.unsplash.com/photo-1504868584819-f8eec0421731?auto=format&fit=crop&q=80&w=800",
    size: "md:col-span-2 md:row-span-1",
    mask: "blob-5"
  }
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">System Capabilities</h2>
          <p className="text-green-600 font-bold uppercase tracking-widest text-sm mt-2">Organic Innovation</p>
          <div className="w-16 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[280px]">
          {services.map((s, i) => (
            <div 
              key={i} 
              className={`group relative overflow-hidden rounded-[2.5rem] bg-gray-50 border border-gray-100 shadow-sm transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 hover:bg-white ${s.size}`}
            >
              {/* THE FLUID MASK - Fixed Syntax */}
              <div className="absolute inset-0 p-3 group-hover:p-0 transition-all duration-500">
                 <img 
                    src={s.img} 
                    alt={s.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${s.mask} group-hover:rounded-[2.5rem]`}
                  />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="absolute bottom-0 left-0 p-8 w-full max-w-full z-10">
                <h3 className="text-xl font-bold text-white mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 truncate max-w-full">
                  {s.title}
                </h3>
                <p className="text-green-100 text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 truncate max-w-full md:line-clamp-2 md:whitespace-normal">
                  {s.desc}
                </p>
              </div>

              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg opacity-100 group-hover:opacity-0 transition-opacity z-20">
                 +
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}