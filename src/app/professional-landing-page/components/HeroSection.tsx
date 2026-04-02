import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

interface HeroSectionProps {
  language: 'en' | 'rw';
}

const HeroSection = ({ language }: HeroSectionProps) => {
  const content = {
    en: {
      headline: 'Culturally-Relevant Nutrition Solutions for African Communities',
      subheadline:
        'Personalized meal planning with local ingredients, professional consultations, and institutional programs to combat malnutrition across Africa.',
      ctaPrimary: 'Start Your Journey',
      ctaSecondary: 'For Institutions',
    },
    rw: {
      headline: 'Ibisubizo byo Kurya Bifite Umuco ku Baturage ba Afurika',
      subheadline:
        'Gahunda yo gutegura indyo zikubiyemo ibyo kurya byo mu gace, inama z\'abahanga, na gahunda z\'ibigo kurwanya imirire mibi muri Afurika.',
      ctaPrimary: 'Tangira Urugendo Rwawe',
      ctaSecondary: 'Ku Bigo',
    },
  };

  const text = content[language];

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-card-foreground leading-tight">
              {text.headline}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {text.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/user-registration"
                className="button-base bg-primary text-primary-foreground hover:bg-primary/90 text-center"
              >
                {text.ctaPrimary}
              </Link>
              <Link
                href="/institution-dashboard"
                className="button-base bg-secondary text-secondary-foreground hover:bg-secondary/90 text-center"
              >
                {text.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-elevation-lg">
            <AppImage
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
              alt="African community members sharing a healthy meal together, showcasing diverse local ingredients and traditional cooking methods"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;