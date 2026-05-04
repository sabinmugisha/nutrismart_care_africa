// app/data/helpData.ts

export interface HelpData {
  slug: string;
  title: string;
  shortDesc: string;
  heroImage: string;
  sections: {
    heading: string;
    content: string;
    image?: string;
    bullets?: string[];
  }[];
  ctaText: string;
  ctaLink?: string;
}

export const helpData: HelpData[] = [
  {
    slug: 'individuals-families',
    title: 'Individuals & Families',
    shortDesc: 'Personalized, culturally relevant diet plans that fit your daily life and traditions.',
    heroImage: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Nutrition That Respects Your Home',
        content: 'Tailored nutrition guidance for every member of your household. From children to elders, we create meal plans that respect your traditions, budget, and health goals.',
        bullets: [
          'Customized for age, activity level, and medical history',
          'Family‑friendly recipes using local ingredients',
          'Ongoing support from our AI coach and dietitians'
        ],
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800'
      },
      {
        heading: 'How We Support Your Family',
        content: 'We provide a dedicated dashboard for each family member, weekly meal plans, grocery lists, and 24/7 access to the AI coach. Parents can monitor children’s growth and receive tips for picky eaters.',
        image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&q=80&w=800'
      }
    ],
    ctaText: 'Get Your Family Plan',
    ctaLink: '/contact'
  },
  {
    slug: 'chronic-patients',
    title: 'Chronic Patients',
    shortDesc: 'Data‑driven tracking and specialized meal plans for diabetes, hypertension, HIV/AIDS, and more.',
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Precision Nutrition for Chronic Conditions',
        content: 'Managing a chronic condition requires consistent, precise nutrition. Our platform integrates with clinical care to help you stabilise your health through food.',
        bullets: [
          'Condition‑specific meal plans (diabetes, hypertension, renal, etc.)',
          'Symptom and medication tracking with intelligent adjustments',
          'Collaboration with your healthcare team for holistic care'
        ],
        image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=800'
      }
    ],
    ctaText: 'Manage Your Condition',
    ctaLink: '/contact'
  },
  {
    slug: 'healthcare-providers',
    title: 'Healthcare Providers',
    shortDesc: 'Secure portals for doctors to monitor patient adherence and nutritional recovery in real‑time.',
    heroImage: 'https://images.unsplash.com/photo-1504868584819-f8eec0421731?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Integrate Nutrition into Clinical Workflows',
        content: 'Empower your clinical practice with nutrition data. Our dashboards integrate with your EHR and provide actionable insights for better patient outcomes.',
        bullets: [
          'Real‑time patient diet adherence and progress graphs',
          'Automated reports for insurance and audits',
          'Collaborative care between doctors and dietitians'
        ],
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
      }
    ],
    ctaText: 'Request a Demo',
    ctaLink: '/contact'
  },
  {
    slug: 'pregnant-postpartum',
    title: 'Pregnant & Postpartum Women',
    shortDesc: 'Stage‑based nutrition plans, breastfeeding support, and first‑time mother toolkits.',
    heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Nourishing Mother and Baby',
        content: 'Proper nutrition during pregnancy and after childbirth is critical for both mother and baby. We provide science‑backed guidance that adapts as your body changes.',
        bullets: [
          'Trimester‑specific meal plans and supplement reminders',
          'Breastfeeding support with hydration and energy tips',
          'Postpartum recovery recipes and mental wellness check‑ins'
        ],
        image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=800'
      }
    ],
    ctaText: 'Get Pregnancy Nutrition Guide',
    ctaLink: '/contact'
  },
  {
    slug: 'children-6m-5y',
    title: 'Children (6 months – 5 years)',
    shortDesc: 'Growth monitoring, caregiver coaching, and early childhood nutrition guidance.',
    heroImage: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Building Bright Futures From the First Bite',
        content: 'The first five years lay the foundation for lifelong health. We partner with parents and daycare centers to ensure every child gets the right nutrients at the right stage.',
        bullets: [
          'Age‑appropriate portion sizes and food textures',
          'Growth tracking and early detection of malnutrition',
          'Simple, affordable recipes for busy caregivers'
        ],
        image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=800'
      }
    ],
    ctaText: 'Support Your Child’s Growth',
    ctaLink: '/contact'
  },
  {
    slug: 'weight-management',
    title: 'Weight Management',
    shortDesc: 'Healthy weight loss and gain programs with behavioral support and tracking.',
    heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Sustainable, No Fad Diets',
        content: 'Sustainable weight management is about more than calories. Our program includes personalized meal planning, coaching, and habit‑change strategies that fit your lifestyle.',
        bullets: [
          'Realistic goals based on your body and health status',
          'Weekly check‑ins with an AI coach or human dietitian',
          'Integration with fitness trackers for holistic progress'
        ],
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
      }
    ],
    ctaText: 'Start Your Weight Plan',
    ctaLink: '/contact'
  },
  {
    slug: 'smart-school-feeding',
    title: 'Smart School Feeding Programs',
    shortDesc: 'Collaboration with schools to provide menu design, vendor training, and nutritional budgeting.',
    heroImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Healthy Students, Better Learning',
        content: 'School feeding is a powerful intervention for child health and education. We help schools design cost‑effective, nutritious menus that children love.',
        bullets: [
          'Menu planning using local, affordable ingredients',
          'Staff training on food safety and meal prep',
          'Parent engagement and nutrition education sessions'
        ],
        image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=800'
      }
    ],
    ctaText: 'Partner With Your School',
    ctaLink: '/contact'
  }
];