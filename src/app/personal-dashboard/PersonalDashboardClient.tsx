'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/common/Header';
import UserContextHeader from '@/components/common/UserContextHeader';
import NavigationBreadcrumbs from '@/components/common/NavigationBreadcrumbs';
import OfflineStatusIndicator from '@/components/common/OfflineStatusIndicator';
import NotificationCenter from '@/components/common/NotificationCenter';
import DashboardInteractive from './components/DashboardInteractive';
import NotificationPermissionPrompt from '@/components/common/NotificationPermissionPrompt';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { createClient } from '@/lib/supabase/client';

const PersonalDashboardClient = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const supabase = createClient();
  const [profile, setProfile] = useState<{ full_name: string; role: string; avatar_url?: string } | null>(null);
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);

  useEffect(() => {
    if (user) {
      supabase
        .from('user_profiles')
        .select('full_name, role, avatar_url')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data) setProfile(data);
        });
    }
  }, [user]);

  // Auto-prompt for notifications if not yet decided
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('Notification' in window)) return;
    const dismissed = localStorage.getItem('nutrismart_notification_dismissed');
    if (Notification.permission === 'default' && !dismissed) {
      const timer = setTimeout(() => setShowNotificationPrompt(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNotificationClose = () => {
    setShowNotificationPrompt(false);
    localStorage.setItem('nutrismart_notification_dismissed', 'true');
  };

  const displayName = profile?.full_name || user?.user_metadata?.full_name || 'User';
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="sticky top-16 z-40 bg-card shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3">
          <NavigationBreadcrumbs />
          <div className="flex items-center space-x-3">
            <OfflineStatusIndicator onStatusChange={() => {}} />
            <NotificationCenter onNotificationClick={() => {}} onMarkAllRead={() => {}} />
            <button
              onClick={() => setShowNotificationPrompt(true)}
              className="p-2 rounded-lg hover:bg-muted transition-smooth"
              aria-label="Notification settings"
              title="Notification Settings"
            >
              <Icon name="BellAlertIcon" size={20} className="text-muted-foreground" />
            </button>
            <UserContextHeader
              userName={displayName}
              userRole={profile?.role as 'Individual' | 'Healthcare Provider' | 'Institution Admin' | undefined || 'Individual'}
              avatarUrl={profile?.avatar_url || 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg'}
              onProfileClick={() => {}}
              onLogoutClick={() => {}}
            />
          </div>
        </div>
      </div>

      {showNotificationPrompt && (
        <NotificationPermissionPrompt onClose={handleNotificationClose} />
      )}

      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-primary mb-2">
            {t('dashboard.welcome')}, {displayName}!
          </h1>
          <p className="text-base text-muted-foreground">{t('dashboard.subtitle')} — {today}</p>
        </div>

        {/* Section tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { key: 'dashboard.myAccount', icon: 'UserCircleIcon' },
            { key: 'dashboard.myMealPlan', icon: 'CalendarIcon' },
            { key: 'dashboard.myProgress', icon: 'ChartBarIcon' },
            { key: 'dashboard.myConsultations', icon: 'UserGroupIcon' },
          ].map((tab) => (
            <span
              key={tab.key}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              <span>{t(tab.key)}</span>
            </span>
          ))}
        </div>

        <DashboardInteractive />
      </main>

      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="text-center">
            <p className="text-sm caption text-muted-foreground">
              &copy; {new Date().getFullYear()} NutriSmart Care Africa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PersonalDashboardClient;
