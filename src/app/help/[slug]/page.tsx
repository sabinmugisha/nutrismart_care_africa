// app/help/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { helpData } from '@/app/data/helpData';
import Navigation from '@/app/professional-landing-page/components/Navigation';
import Footer from '@/app/professional-landing-page/components/Footer';
import Image from 'next/image';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return helpData.map((item) => ({ slug: item.slug }));
}

export default function HelpPage({ params }: { params: { slug: string } }) {
  const item = helpData.find((h) => h.slug === params.slug);
  if (!item) return notFound();

  return (
    <>
      <Navigation />
      <main className="pt-32 pb-16 bg-white">
        <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
          <Image src={item.heroImage} alt={item.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4">{item.title}</h1>
              <p className="text-xl text-white/90 max-w-2xl">{item.shortDesc}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-5xl">
          {item.sections.map((section, idx) => (
            <div
              key={idx}
              className={`mb-16 flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              <div className="flex-1">
                <h2 className="text-3xl font-black text-slate-900 mb-4">{section.heading}</h2>
                <p className="text-slate-600 leading-relaxed mb-4">{section.content}</p>
                {section.bullets && (
                  <ul className="space-y-2">
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2">
                        <CheckCircle2 size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {section.image && (
                <div className="flex-1 relative h-64 w-full rounded-2xl overflow-hidden shadow-lg">
                  <Image src={section.image} alt={section.heading} fill className="object-cover" />
                </div>
              )}
            </div>
          ))}
          <div className="text-center mt-12">
            <Link
              href={item.ctaLink || '/contact'}
              className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-700 transition"
            >
              {item.ctaText} <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}