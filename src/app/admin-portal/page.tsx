import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import AdminPortalInteractive from './components/AdminPortalInteractive';

export const metadata: Metadata = {
  title: 'Admin Portal - NutriSmart Care Africa',
  description: 'System administration, user management, provider verification, and institutional impact monitoring.',
};

export default function AdminPortalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-primary mb-2">Admin Portal</h1>
          <p className="text-base text-muted-foreground">System management, user oversight, and institutional impact monitoring</p>
        </div>
        <AdminPortalInteractive />
      </main>
    </div>
  );
}
