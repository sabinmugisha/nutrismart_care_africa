interface StatsSectionProps {
  language: 'en' | 'rw';
}

const StatsSection = ({ language }: StatsSectionProps) => {
  const content = {
    en: {
      title: 'Our Impact Across Africa',
      stats: [
        { value: '50,000+', label: 'Lives Improved' },
        { value: '200+', label: 'Healthcare Partners' },
        { value: '15', label: 'Countries Served' },
        { value: '95%', label: 'User Satisfaction' },
      ],
    },
    rw: {
      title: 'Ingaruka Zacu muri Afurika',
      stats: [
        { value: '50,000+', label: 'Ubuzima Bwatewe Imbere' },
        { value: '200+', label: 'Abafatanyabikorwa bo mu Buvuzi' },
        { value: '15', label: 'Ibihugu Byakiriye Serivisi' },
        { value: '95%', label: 'Abakoresha Banyuzwe' },
      ],
    },
  };

  const text = content[language];

  return (
    <section className="bg-primary text-primary-foreground py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <h2 className="text-3xl font-bold font-heading text-center mb-12">{text.title}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {text.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold font-heading mb-2 data-text">
                {stat.value}
              </div>
              <div className="text-sm lg:text-base caption opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;