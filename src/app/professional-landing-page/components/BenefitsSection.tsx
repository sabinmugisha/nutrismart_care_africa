import Icon from '@/components/ui/AppIcon';

interface BenefitsSectionProps {
  language: 'en' | 'rw';
}

const BenefitsSection = ({ language }: BenefitsSectionProps) => {
  const content = {
    en: {
      title: 'Comprehensive Nutrition Solutions',
      subtitle: 'Everything you need for better health outcomes',
      benefits: [
        {
          icon: 'CalendarIcon',
          title: 'Personalized Meal Planning',
          description:
            'Custom meal plans using locally available ingredients, tailored to your health needs and cultural preferences.',
          color: 'bg-primary',
        },
        {
          icon: 'UserGroupIcon',
          title: 'Professional Consultations',
          description:
            'Connect with certified nutritionists and healthcare providers through video calls or in-person visits.',
          color: 'bg-accent',
        },
        {
          icon: 'BuildingOfficeIcon',
          title: 'Institutional Programs',
          description:
            'Scalable nutrition programs for schools, hospitals, and community organizations with impact tracking.',
          color: 'bg-secondary',
        },
        {
          icon: 'ChartBarIcon',
          title: 'Health Metrics Tracking',
          description:
            'Monitor your nutrition goals, track progress, and receive personalized recommendations based on your data.',
          color: 'bg-success',
        },
        {
          icon: 'GlobeAltIcon',
          title: 'Multilingual Support',
          description:
            'Access our platform in English, Kinyarwanda, and other African languages for better accessibility.',
          color: 'bg-warning',
        },
        {
          icon: 'ShieldCheckIcon',
          title: 'Healthcare Certified',
          description:
            'Trusted by healthcare organizations across Africa with certifications from leading medical institutions.',
          color: 'bg-primary',
        },
      ],
    },
    rw: {
      title: 'Ibisubizo Byuzuye byo Kurya Neza',
      subtitle: 'Ibyo ukeneye byose kugira ngo ugire ubuzima bwiza',
      benefits: [
        {
          icon: 'CalendarIcon',
          title: 'Gahunda yo Gutegura Indyo',
          description:
            'Gahunda yo gutegura indyo zikubiyemo ibyo kurya byo mu gace, zikubiye ku buzima bwawe n\'umuco wawe.',
          color: 'bg-primary',
        },
        {
          icon: 'UserGroupIcon',
          title: 'Inama z\'Abahanga',
          description:
            'Huza n\'abahanga mu by\'imirire n\'abavuzi bemewe binyuze kuri videwo cyangwa mu buryo busanzwe.',
          color: 'bg-accent',
        },
        {
          icon: 'BuildingOfficeIcon',
          title: 'Gahunda z\'Ibigo',
          description:
            'Gahunda z\'imirire zishobora kwaguka ku mashuri, ibitaro, n\'imiryango y\'abaturage hamwe no gukurikirana ingaruka.',
          color: 'bg-secondary',
        },
        {
          icon: 'ChartBarIcon',
          title: 'Gukurikirana Ubuzima',
          description:
            'Koresha intego zawe zo kurya neza, ukurikirana iterambere, kandi uhabwe inama zikubiye ku makuru yawe.',
          color: 'bg-success',
        },
        {
          icon: 'GlobeAltIcon',
          title: 'Indimi Nyinshi',
          description:
            'Koresha urubuga rwacu mu Cyongereza, Ikinyarwanda, n\'izindi ndimi z\'Afurika kugira ngo biboroherwe.',
          color: 'bg-warning',
        },
        {
          icon: 'ShieldCheckIcon',
          title: 'Byemejwe n\'Ubuvuzi',
          description:
            'Byizerwaho n\'imiryango y\'ubuzima muri Afurika hamwe n\'impamyabushobozi z\'ibigo by\'ubuvuzi bikomeye.',
          color: 'bg-primary',
        },
      ],
    },
  };

  const text = content[language];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading text-card-foreground mb-4">
            {text.title}
          </h2>
          <p className="text-lg text-muted-foreground">{text.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {text.benefits.map((benefit, index) => (
            <div
              key={index}
              className="card-base hover:shadow-elevation-lg transition-smooth group"
            >
              <div
                className={`${benefit.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}
              >
                <Icon name={benefit.icon as any} size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold font-heading text-card-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground caption leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;