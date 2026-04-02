import type { Metadata } from 'next';
import LandingPageInteractive from './components/LandingPageInteractive';

export const metadata: Metadata = {
  title: 'NutriSmart Care Africa - Professional Nutrition Solutions',
  description:
    'Culturally-relevant nutrition solutions for African communities. Personalized meal planning with local ingredients, professional consultations, and institutional programs to combat malnutrition.',
};

export default function ProfessionalLandingPage() {
  return <LandingPageInteractive />;
}