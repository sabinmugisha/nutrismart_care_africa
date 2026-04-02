'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { createClient } from '@/lib/supabase/client';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (user) {
      supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data) setUserRole(data.role);
        });
    } else {
      setUserRole(null);
    }
  }, [user]);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      router.push('/login');
    } catch {
      setIsSigningOut(false);
    }
  };

  const NutriSmartLogo = () => (
    <Link href="/" className="flex items-center space-x-3">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary flex-shrink-0">
        <svg className="w-6 h-6 text-primary-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-semibold font-heading text-primary leading-tight">{t('app.name')}</h1>
        <p className="text-xs caption text-muted-foreground">{t('app.tagline')}</p>
      </div>
    </Link>
  );

  const LanguageToggle = () => (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-1.5 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-smooth text-sm font-medium text-card-foreground"
      aria-label="Toggle language"
    >
      <Icon name="LanguageIcon" size={16} />
      <span className="hidden sm:inline">{t('lang.toggle')}</span>
    </button>
  );

  // Logged-out navigation
  if (!user) {
    return (
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm shadow-elevation-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <NutriSmartLogo />
            <div className="flex items-center space-x-2 sm:space-x-3">
              <LanguageToggle />
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-primary hover:bg-muted transition-smooth font-medium text-sm"
              >
                {t('nav.login')}
              </Link>
              <Link
                href="/user-registration"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth font-medium text-sm"
              >
                {t('nav.getStarted')}
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Logged-in navigation items based on role
  const isAdmin = userRole === 'admin' || userRole === 'institution_admin';

  const patientNavItems = [
    { label: t('nav.dashboard'), path: '/personal-dashboard', icon: 'ChartBarIcon' },
    { label: t('nav.mealPlanning'), path: '/meal-planning', icon: 'CalendarIcon' },
    { label: t('nav.consultations'), path: '/consultation-booking', icon: 'UserGroupIcon' },
  ];

  const adminNavItems = [
    { label: t('nav.adminPortal'), path: '/admin-portal', icon: 'BuildingOfficeIcon' },
    { label: t('nav.dashboard'), path: '/personal-dashboard', icon: 'ChartBarIcon' },
  ];

  const navItems = isAdmin ? adminNavItems : patientNavItems;

  return (
    <header className="sticky top-0 z-50 bg-card shadow-elevation-md">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <NutriSmartLogo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-card-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon as any} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <LanguageToggle />
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-card-foreground transition-smooth text-sm font-medium"
            >
              <Icon name="ArrowRightOnRectangleIcon" size={18} />
              <span>{isSigningOut ? '...' : t('nav.logout')}</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-card-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleSignOut(); }}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-smooth"
              >
                <Icon name="ArrowRightOnRectangleIcon" size={20} />
                <span className="font-medium">{t('nav.logout')}</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;