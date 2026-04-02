import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import UserContextHeader from '@/components/common/UserContextHeader';
import NavigationBreadcrumbs from '@/components/common/NavigationBreadcrumbs';
import OfflineStatusIndicator from '@/components/common/OfflineStatusIndicator';
import NotificationCenter from '@/components/common/NotificationCenter';
import InstitutionDashboardInteractive from './components/InstitutionDashboardInteractive';

export const metadata: Metadata = {
  title: 'Institution Dashboard - NutriSmart Care Africa',
  description: 'Comprehensive nutrition program management dashboard for healthcare facilities, schools, workplaces, and NGOs delivering scalable nutrition initiatives across African communities with participant tracking, resource allocation, and impact measurement tools.',
};

export default function InstitutionDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="sticky top-16 z-90 bg-card shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3">
          <NavigationBreadcrumbs />
          <div className="flex items-center space-x-4">
            <OfflineStatusIndicator />
            <NotificationCenter />
            <UserContextHeader
              userName="Dr. Sarah Mukamana"
              userRole="Institution Admin"
              avatarUrl="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
            />
          </div>
        </div>
      </div>
      <InstitutionDashboardInteractive />
    </div>
  );
}