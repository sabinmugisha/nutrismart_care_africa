import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import NavigationBreadcrumbs from '@/components/common/NavigationBreadcrumbs';
import MealPlanningInteractive from './components/MealPlanningInteractive';

export const metadata: Metadata = {
  title: 'Meal Planning - NutriSmart Care Africa',
  description:
    'Create and customize weekly nutrition plans using locally available African ingredients and cultural dietary preferences with AI-powered recommendations.',
};

export default function MealPlanningPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NavigationBreadcrumbs />

      <main className="px-4 lg:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold font-heading text-foreground mb-3">
            Meal Planning
          </h1>
          <p className="text-base text-muted-foreground max-w-3xl">
            Plan your weekly meals with culturally appropriate recipes, local ingredients, and
            personalized nutrition guidance. Generate shopping lists and track your dietary goals.
          </p>
        </div>

        <MealPlanningInteractive />
      </main>
    </div>
  );
}