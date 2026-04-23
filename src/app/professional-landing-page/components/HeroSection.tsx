import React from 'react';

interface HeroSectionProps {
  language: 'en' | 'rw';
}

const HeroSection = ({ language }: HeroSectionProps) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover brightness-125 contrast-110"
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
        {/* Lighter overlay for better text readability */}
        <div className="absolute inset-0 bg-gray-900/30"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="mb-8">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight drop-shadow-lg">
            Start feeling healthier and,{' '}
            <span className="text-gray-200"> trusted nutritional advice</span>
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            From our team of registered dietitians and nutritionists
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;