// components/HeroSection.tsx
'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200',
    title: 'Fresh Local Ingredients',
    desc: 'We source from local markets to bring you authentic nutrition.',
  },
  {
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
    title: 'AI‑Powered Meal Plans',
    desc: 'Personalized plans that learn and adapt to your health needs.',
  },
  {
    image: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=1200',
    title: 'Tele‑Nutrition Consultations',
    desc: 'Connect with licensed dietitians from the comfort of your home.',
  },
];

export default function HeroSection() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) servicesSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero section: video fills entire viewport, no gaps */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Video background - covers whole area without white space */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectFit: 'cover' }}
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

        {/* Centered content over video */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <span className="inline-block px-4 py-1.5 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full text-green-100 text-xs font-bold uppercase tracking-wider mb-6">
            "Right Food for Every Need"
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight max-w-5xl">
            Smart Solutions for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
              Personalized Wellness
            </span>
          </h1>
          <p className="text-xl text-green-100 italic mt-4">
            "Let Nutrismartcare be a guide to a healthier, happy you!"
          </p>
          <p className="text-base md:text-lg text-gray-100 max-w-2xl mt-6">
            Transforming nutrition and health through AI‑powered tools, mobile technology,
            and expert‑driven support across Rwanda and Africa.
          </p>
          <div className="mt-10">
            <button
              onClick={scrollToServices}
              className="inline-flex items-center gap-3 px-8 py-3 md:px-10 md:py-4 bg-green-500 hover:bg-green-400 text-slate-900 font-bold rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Explore Our Services <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Slideshow Section (below video) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Our Approach in Action</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="max-w-5xl mx-auto">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              loop
              className="pb-12"
            >
              {slides.map((slide, idx) => (
                <SwiperSlide key={idx}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{slide.title}</h3>
                      <p className="text-slate-500">{slide.desc}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}