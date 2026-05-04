// app/data/servicesData.ts

export interface ServiceData {
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
  outcomes: string[];
  ctaText: string;
  ctaLink?: string;
}

export const servicesData: ServiceData[] = [
  {
    slug: 'ai-powered-nutrition-platforms',
    title: 'AI‑Powered Nutrition Platforms',
    shortDesc: 'Smart algorithms that learn, adapt, and personalize meal plans to your health profile and local foods.',
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Personalized, Culturally Relevant Meal Plans',
        content: 'Our intelligent platforms analyze your unique health profile to generate meal plans that actually fit your life. Health-specific guidance for diabetes, hypertension, cardiovascular disease, obesity, malnutrition, HIV/AIDS, and more. Culturally grounded with local foods, seasonal availability, and regional eating patterns.',
        image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800',
        bullets: [
          'Personalized by age, weight, gender, activity level, pregnancy status, and medical history',
          'Respects religious, ethical, and personal dietary choices',
          'Scalable for individuals, families, workplaces, and health networks'
        ]
      },
      {
        heading: 'How It Works',
        content: 'After a quick health assessment, the AI builds a dynamic profile. It learns from your feedback and adjusts meal recommendations in real time. You receive weekly plans, grocery lists, and cooking tips tailored to what’s available locally.',
        image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&q=80&w=800'
      }
    ],
    outcomes: [
      'Better adherence to dietary recommendations',
      'Improved clinical outcomes for chronic conditions',
      'Reduced meal planning stress'
    ],
    ctaText: 'Start Your Personalized Plan',
    ctaLink: '/contact'
  },
  {
    slug: 'mobile-applications',
    title: 'Mobile Applications',
    shortDesc: 'Wellness at your fingertips – daily meal planning, grocery lists, behavior nudges, and chronic disease tracking.',
    heroImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Your Daily Nutrition Companion',
        content: 'Our mobile apps turn expert nutrition advice into daily action. Smart meal planning with step-by-step recipes, automated grocery lists tailored to your health condition and budget, behavior nudges to keep you consistent, and comprehensive tracking of meals, symptoms, energy levels, and wellness metrics.',
        image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800',
        bullets: [
          'Progress visualization showing how your choices connect to health outcomes',
          'Seamless integration with wearable devices',
          'Offline access for remote areas'
        ]
      }
    ],
    outcomes: [
      'Higher consistency in healthy eating',
      'Better chronic disease management',
      'Reduced grocery waste'
    ],
    ctaText: 'Download the App',
    ctaLink: '/contact'
  },
  {
    slug: 'ai-nutrition-coach',
    title: 'AI Nutrition Coach',
    shortDesc: 'Your personal dietitian, 24/7 – instant answers, meal suggestions, and motivational support.',
    heroImage: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Instant, Evidence‑Based Answers',
        content: 'Get instant, evidence-based answers whenever questions arise. "Can I eat this?" "What\'s a better alternative?" Practical meal suggestions when you\'re stuck or short on time, educational explanations about the "why" behind recommendations, and conversational support that feels like texting a trusted expert.',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800',
        bullets: [
          'Real-time dietary guidance for any food or situation',
          'Motivational coaching to keep you on track',
          'Learns your preferences over time'
        ]
      }
    ],
    outcomes: [
      'Immediate answers reduce anxiety',
      'Higher confidence in food choices',
      'Sustained behavior change'
    ],
    ctaText: 'Chat With Your AI Coach',
    ctaLink: '/contact'
  },
  {
    slug: 'tele-nutrition-services',
    title: 'Tele‑Nutrition Services',
    shortDesc: 'Expert care from anywhere – connect with licensed dietitians via secure video consultations.',
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Expert Care, No Travel Required',
        content: 'Distance should never limit access to professional support. Through our secure tele-nutrition platform, you can consult licensed dietitians for personalized guidance, diet reviews, and continuous progress tracking. Each session is tailored to your medical needs, cultural food habits, and health goals.',
        image: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800',
        bullets: [
          'Virtual consultations from home or office',
          'Risk assessments for chronic disease prevention',
          'Follow-up plans with accountability check-ins'
        ]
      }
    ],
    outcomes: [
      'No travel time or waiting rooms',
      'Consistent professional support',
      'Better long‑term outcomes'
    ],
    ctaText: 'Book a Tele‑Nutrition Session',
    ctaLink: '/contact'
  },
  {
    slug: 'healthcare-provider-dashboards',
    title: 'Healthcare Provider Dashboards',
    shortDesc: 'Data‑driven insights for clinical teams – monitor patient diet quality, adherence, and outcomes.',
    heroImage: 'https://images.unsplash.com/photo-1504868584819-f8eec0421731?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Empower Your Practice with Nutrition Data',
        content: 'Empower hospitals, clinics, and wellness providers with tools that integrate nutrition into patient care. Real-time monitoring of patient diet quality, adherence, and symptom trends. Visual analytics showing nutrition\'s impact on clinical outcomes, automated reporting for insurance claims, and collaborative care platform.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
        bullets: [
          'HIPAA‑aligned & privacy‑compliant',
          'Connect doctors, dietitians, and patients in one secure system',
          'Export reports for audits and follow‑ups'
        ]
      }
    ],
    outcomes: [
      'Reduced length of stay for malnourished patients',
      'Lower readmission rates',
      'Improved staff efficiency'
    ],
    ctaText: 'Request a Demo for Healthcare Providers',
    ctaLink: '/contact'
  },
  {
    slug: 'workplace-wellness',
    title: 'Workplace Wellness for Institutions',
    shortDesc: 'Corporate nutrition solutions – canteen audits, smart meal programs, and wellness challenges.',
    heroImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Fuel Your Team for Performance',
        content: 'We help organizations turn nutrition into a productivity advantage. Through corporate meal audits, smart canteen programs, and wellness challenges, we design workplace solutions that boost energy, focus, and resilience. Companies benefit from fewer sick days, better morale, and measurable ROI.',
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800',
        bullets: [
          'Staff wellness feeding programs for shift workers',
          'Immune support nutrition during outbreaks',
          'Data‑driven ROI tracking'
        ]
      }
    ],
    outcomes: [
      'Reduced absenteeism by up to 30%',
      'Increased employee satisfaction',
      'Higher retention rates'
    ],
    ctaText: 'Build a Healthier Workplace',
    ctaLink: '/contact'
  },
  {
    slug: 'early-childhood-nutrition',
    title: 'Early Childhood Nutrition Support',
    shortDesc: 'Support for daycare centers & crèches – age‑specific meal plans, growth monitoring, and caregiver training.',
    heroImage: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Healthy Beginnings for Brighter Futures',
        content: 'The early years matter most. We partner with daycare centers, creches, and parents to ensure children aged 3–5 receive safe, nutritious, and appealing meals. Our program covers age‑specific guidelines, weekly menu planning, food safety, and growth monitoring.',
        image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800',
        bullets: [
          'Portion sizes by age and meal type',
          'Food safety checklists and hygiene protocols',
          'Parent engagement tools and nutrition days'
        ]
      }
    ],
    outcomes: [
      'Improved growth and cognitive development',
      'Reduced stunting and malnutrition',
      'Stronger parent‑provider trust'
    ],
    ctaText: 'Support Early Childhood Nutrition',
    ctaLink: '/contact'
  },
  {
    slug: 'weight-management',
    title: 'Weight Management',
    shortDesc: 'Personalized, sustainable, and effective – healthy weight loss or gain with AI‑based coaching.',
    heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Sustainable Weight Change, No Extremes',
        content: 'Safe, effective, and evidence‑based solutions to manage your weight whether for aesthetic health or medical reasons. Our AI‑based system designs meal plans and lifestyle guidance tailored to your body type, health condition, and food culture. No fad diets, no extremes.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
        bullets: [
          'Realistic goals and progress tracking',
          'Behavioral support and coaching',
          'Integration with physical activity tracking'
        ]
      }
    ],
    outcomes: [
      'Sustainable weight change',
      'Improved metabolic health',
      'Confidence and well‑being'
    ],
    ctaText: 'Start Your Weight Plan',
    ctaLink: '/contact'
  },
  {
    slug: 'nutrimarket',
    title: 'NutriMarket – Food Access',
    shortDesc: 'Shop smart, eat local – connect with verified vendors for affordable, nutritious products.',
    heroImage: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Where Nutrition Meets Convenience',
        content: 'NutriMarket bridges the gap between nutrition advice and food access. We link individuals, families, and institutions to verified vendors offering affordable, nutritious, and locally sourced products. From fortified flours to diabetic‑friendly foods and ready‑to‑cook healthy kits, every product is reviewed for quality.',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
        bullets: [
          'Direct sourcing from local farmers and producers',
          'Price comparison and budget‑friendly options',
          'Delivery or pickup options'
        ]
      }
    ],
    outcomes: [
      'Convenient access to healthy food',
      'Supports local economy',
      'Reduces food deserts'
    ],
    ctaText: 'Visit NutriMarket',
    ctaLink: '/contact'
  },
  {
    slug: 'research-development',
    title: 'Research & Development',
    shortDesc: 'Evidence at the heart of innovation – studies, data analytics, and policy advocacy.',
    heroImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200',
    sections: [
      {
        heading: 'Science That Shapes Smarter Nutrition',
        content: 'Our R&D unit leads studies on dietary patterns, chronic diseases, food access, and behavioral change. We transform data into insights that guide policy, shape new technologies, and advance nutrition equity across Africa. Through partnerships with universities, hospitals, and development agencies.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
        bullets: [
          'Clinical trials and community studies',
          'Policy briefs for government and NGOs',
          'Open‑access data and publications'
        ]
      }
    ],
    outcomes: [
      'Science‑backed product development',
      'Influence on national nutrition policy',
      'Global recognition of African nutrition science'
    ],
    ctaText: 'Learn About Our Research Initiatives',
    ctaLink: '/contact'
  }
];