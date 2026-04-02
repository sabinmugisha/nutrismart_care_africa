import Link from 'next/link';

interface CTASectionProps {
  language: 'en' | 'rw';
}

const CTASection = ({ language }: CTASectionProps) => {
  const content = {
    en: {
      title: 'Ready to Transform Your Nutrition Journey?',
      subtitle:
        'Join thousands of African families and institutions already benefiting from culturally-relevant nutrition solutions.',
      individualCTA: 'Start Free Trial',
      institutionCTA: 'Partner With Us',
      features: [
        'No credit card required',
        '30-day free trial',
        'Cancel anytime',
      ],
    },
    rw: {
      title: 'Witeguye Guhindura Urugendo Rwawe rwo Kurya Neza?',
      subtitle:
        'Jya ku miryango ibihumbi y\'Abanyafurika n\'ibigo bisanzwe byunguka ku bisubizo byo kurya neza bifite umuco.',
      individualCTA: 'Tangira Igerageza Kubuntu',
      institutionCTA: 'Dufatanye',
      features: [
        'Nta karita y\'inguzanyo isabwa',
        'Igerageza ry\'iminsi 30 kubuntu',
        'Hagarika igihe cyose',
      ],
    },
  };

  const text = content[language];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">{text.title}</h2>
        <p className="text-lg opacity-90 mb-8 leading-relaxed">{text.subtitle}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/user-registration"
            className="button-base bg-accent text-accent-foreground hover:bg-accent/90 text-center"
          >
            {text.individualCTA}
          </Link>
          <Link
            href="/institution-dashboard"
            className="button-base bg-card text-card-foreground hover:bg-card/90 text-center"
          >
            {text.institutionCTA}
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm opacity-90">
          {text.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;