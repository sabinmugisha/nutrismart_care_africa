import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import MealPlanningInteractive from './components/MealPlanningInteractive';

export const metadata: Metadata = {
  title: 'Meal Planning - NutriSmart Care Africa',
  description: 'Plan your weekly nutrition with culturally-relevant African foods including Isombe, Ibirayi, Amateke, and Uburo.',
};

export default function MealPlanningPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <MealPlanningInteractive />
      </main>
    </div>
  );
}