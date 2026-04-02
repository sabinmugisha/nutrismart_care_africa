'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TestimonialsSectionProps {
  language: 'en' | 'rw';
}

const TestimonialsSection = ({ language }: TestimonialsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const content = {
    en: {
      title: 'Success Stories from Our Community',
      subtitle: 'Real people, real results',
      testimonials: [
        {
          name: 'Amina Nkunda',
          role: 'Mother of 3, Rwanda',
          image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
          quote:
            'NutriSmart helped me create affordable meal plans using local ingredients. My children are healthier and more energetic than ever before.',
          rating: 5,
        },
        {
          name: 'Dr. Joseph Okonkwo',
          role: 'Healthcare Provider, Nigeria',
          image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
          quote:
            'As a healthcare provider, I recommend NutriSmart to all my patients. The culturally-relevant approach makes a real difference in patient outcomes.',
          rating: 5,
        },
        {
          name: 'Grace Mwangi',
          role: 'School Administrator, Kenya',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
          quote:
            'Our school nutrition program improved dramatically with NutriSmart. We now serve balanced meals to 500 students daily with better budget management.',
          rating: 5,
        },
      ],
    },
    rw: {
      title: 'Inkuru z\'Intsinzi zo mu Muryango Wacu',
      subtitle: 'Abantu nyabo, ibisubizo nyabyo',
      testimonials: [
        {
          name: 'Amina Nkunda',
          role: 'Umubyeyi w\'abana 3, U Rwanda',
          image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
          quote:
            'NutriSmart yampfashije gukora gahunda yo gutegura indyo zihendutse zikoresha ibyo kurya byo mu gace. Abana banjye bafite ubuzima bwiza kandi bafite imbaraga kuruta mbere.',
          rating: 5,
        },
        {
          name: 'Dr. Joseph Okonkwo',
          role: 'Umuvuzi, Nijeriya',
          image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
          quote:
            'Nk\'umuvuzi, nsaba abarwayi banjye bose gukoresha NutriSmart. Uburyo bwo gukora bukubiye ku muco butuma habaho impinduka nyabyo ku buzima bw\'abarwayi.',
          rating: 5,
        },
        {
          name: 'Grace Mwangi',
          role: 'Umuyobozi w\'Ishuri, Kenya',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
          quote:
            'Gahunda yacu yo kurya neza mu ishuri yateye imbere cyane hamwe na NutriSmart. Ubu duha indyo zifite intungamubiri zikwiye abanyeshuri 500 buri munsi hamwe no gucunga neza ingengo y\'imari.',
          rating: 5,
        },
      ],
    },
  };

  const text = content[language];
  const currentTestimonial = text.testimonials[currentIndex];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % text.testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + text.testimonials.length) % text.testimonials.length);
  };

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading text-card-foreground mb-4">
            {text.title}
          </h2>
          <p className="text-lg text-muted-foreground">{text.subtitle}</p>
        </div>

        <div className="bg-card rounded-xl p-8 lg:p-12 shadow-elevation-lg">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-6 shadow-elevation-md">
              <AppImage
                src={currentTestimonial.image}
                alt={`Portrait of ${currentTestimonial.name}, ${currentTestimonial.role}, sharing their success story with NutriSmart Care Africa`}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex space-x-1 mb-4">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Icon key={i} name="StarIcon" size={20} className="text-accent fill-accent" />
              ))}
            </div>

            <blockquote className="text-lg lg:text-xl text-card-foreground mb-6 leading-relaxed max-w-3xl">
              "{currentTestimonial.quote}"
            </blockquote>

            <div>
              <p className="font-semibold text-card-foreground">{currentTestimonial.name}</p>
              <p className="text-sm caption text-muted-foreground">{currentTestimonial.role}</p>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-lg hover:bg-muted transition-smooth"
              aria-label="Previous testimonial"
            >
              <Icon name="ChevronLeftIcon" size={24} />
            </button>
            <div className="flex space-x-2">
              {text.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-smooth ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-border'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-lg hover:bg-muted transition-smooth"
              aria-label="Next testimonial"
            >
              <Icon name="ChevronRightIcon" size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;