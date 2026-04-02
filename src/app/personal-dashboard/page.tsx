import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import UserContextHeader from '@/components/common/UserContextHeader';
import NavigationBreadcrumbs from '@/components/common/NavigationBreadcrumbs';
import OfflineStatusIndicator from '@/components/common/OfflineStatusIndicator';
import NotificationCenter from '@/components/common/NotificationCenter';
import DashboardInteractive from './components/DashboardInteractive';

export const metadata: Metadata = {
  title: 'Personal Dashboard - NutriSmart Care Africa',
  description: 'Access personalized nutrition guidance, track your dietary progress, manage meal plans, and monitor health metrics in your central nutrition management hub.',
};

export default function PersonalDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="sticky top-16 z-90 bg-card shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3">
          <NavigationBreadcrumbs />
          <div className="flex items-center space-x-3">
            <OfflineStatusIndicator />
            <NotificationCenter />
            <UserContextHeader
              userName="Sarah Mukamana"
              userRole="Individual"
              avatarUrl="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg"
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading text-primary mb-2">
            Welcome Back, Sarah!
          </h1>
          <p className="text-lg text-muted-foreground">
            Here's your nutrition overview for today, January 20, 2026
          </p>
        </div>

        <DashboardInteractive />
      </main>

      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold font-heading text-primary mb-3">
                NutriSmart Care Africa
              </h3>
              <p className="text-sm caption text-muted-foreground">
                Empowering African communities with accessible, personalized nutrition guidance for better health outcomes.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-card-foreground mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/meal-planning" className="text-sm caption text-muted-foreground hover:text-primary transition-smooth">
                    Meal Planning
                  </a>
                </li>
                <li>
                  <a href="/consultation-booking" className="text-sm caption text-muted-foreground hover:text-primary transition-smooth">
                    Book Consultation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm caption text-muted-foreground hover:text-primary transition-smooth">
                    Health Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-card-foreground mb-3">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm caption text-muted-foreground hover:text-primary transition-smooth">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm caption text-muted-foreground hover:text-primary transition-smooth">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm caption text-muted-foreground hover:text-primary transition-smooth">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-border text-center">
            <p className="text-sm caption text-muted-foreground">
              &copy; {new Date().getFullYear()} NutriSmart Care Africa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}