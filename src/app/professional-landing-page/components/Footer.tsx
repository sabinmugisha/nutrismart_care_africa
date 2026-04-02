import Link from 'next/link';

interface FooterProps {
  language: 'en' | 'rw';
}

const Footer = ({ language }: FooterProps) => {
  const content = {
    en: {
      about:
        'Empowering African communities with accessible, personalized nutrition guidance for better health outcomes.',
      quickLinks: 'Quick Links',
      solutions: 'Solutions',
      support: 'Support',
      links: {
        mealPlanning: 'Meal Planning',
        consultations: 'Consultations',
        institutions: 'For Institutions',
        helpCenter: 'Help Center',
        contact: 'Contact Us',
        privacy: 'Privacy Policy',
      },
      copyright: 'NutriSmart Care Africa. All rights reserved.',
    },
    rw: {
      about:
        'Gutera inkunga imiryango y\'Abanyafurika hamwe n\'ubuyobozi bwo kurya neza bworoshye kandi bwite kugira ngo haboneke ubuzima bwiza.',
      quickLinks: 'Ihuza Byihuse',
      solutions: 'Ibisubizo',
      support: 'Ubufasha',
      links: {
        mealPlanning: 'Gutegura Indyo',
        consultations: 'Inama',
        institutions: 'Ku Bigo',
        helpCenter: 'Ikigo cy\'Ubufasha',
        contact: 'Twandikire',
        privacy: 'Politiki y\'Ubuzima Bwite',
      },
      copyright: 'NutriSmart Care Africa. Uburenganzira bwose burahawe.',
    },
  };

  const text = content[language];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <svg
                  className="w-6 h-6 text-primary-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-heading text-primary">NutriSmart</h3>
                <p className="text-xs caption text-muted-foreground">Care Africa</p>
              </div>
            </div>
            <p className="text-sm caption text-muted-foreground leading-relaxed">{text.about}</p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-card-foreground mb-3">{text.solutions}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/meal-planning"
                  className="text-sm caption text-muted-foreground hover:text-primary transition-smooth"
                >
                  {text.links.mealPlanning}
                </Link>
              </li>
              <li>
                <Link
                  href="/consultation-booking"
                  className="text-sm caption text-muted-foreground hover:text-primary transition-smooth"
                >
                  {text.links.consultations}
                </Link>
              </li>
              <li>
                <Link
                  href="/institution-dashboard"
                  className="text-sm caption text-muted-foreground hover:text-primary transition-smooth"
                >
                  {text.links.institutions}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-card-foreground mb-3">{text.support}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm caption text-muted-foreground hover:text-primary transition-smooth"
                >
                  {text.links.helpCenter}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm caption text-muted-foreground hover:text-primary transition-smooth"
                >
                  {text.links.contact}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm caption text-muted-foreground hover:text-primary transition-smooth"
                >
                  {text.links.privacy}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm caption text-muted-foreground">
            &copy; {new Date().getFullYear()} {text.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;