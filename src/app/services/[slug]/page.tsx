// app/services/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { servicesData } from '@/app/data/servicesData';
import Navigation from '@/app/professional-landing-page/components/Navigation';
import Footer from '@/app/professional-landing-page/components/Footer';
import Image from 'next/image';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  return (
    <>
      <Navigation />
      <main className="pt-32 pb-20 bg-white">
        {/* Hero - improved overlay and text alignment */}
        <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 pb-12 text-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 max-w-4xl mx-auto leading-tight">
                {service.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                {service.shortDesc}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-5xl">
          {service.sections.map((section, idx) => (
            <div
              key={idx}
              className={`mb-20 flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="flex-1 space-y-4">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  {section.heading}
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">{section.content}</p>
                {section.bullets && (
                  <ul className="space-y-3 mt-6">
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {section.image && (
                <div className="flex-1 relative h-80 w-full rounded-2xl overflow-hidden shadow-xl">
                  <Image src={section.image} alt={section.heading} fill className="object-cover" />
                </div>
              )}
            </div>
          ))}

          {service.outcomes && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 my-16">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 text-center">Expected Outcomes</h3>
              <ul className="grid md:grid-cols-3 gap-6">
                {service.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium bg-white rounded-xl p-4 shadow-sm">
                    <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-center mt-16">
            <Link
              href={service.ctaLink || '/contact'}
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {service.ctaText} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}