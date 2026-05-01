'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const NavigationBreadcrumbs = () => {
  const pathname = usePathname();

  const routeMap: Record<string, BreadcrumbItem[]> = {
    '/personal-dashboard': [
      { label: 'Home', path: '/personal-dashboard' },
      { label: 'My Nutrition', path: '/personal-dashboard' },
    ],
    '/meal-planning': [
      { label: 'Home', path: '/personal-dashboard' },
      { label: 'Meal Planning', path: '/meal-planning' },
    ],
    '/consultation-booking': [
      { label: 'Home', path: '/personal-dashboard' },
      { label: 'Consultations', path: '/consultation-booking' },
    ],
    '/institution-dashboard': [
      { label: 'Home', path: '/personal-dashboard' },
      { label: 'Programs', path: '/institution-dashboard' },
    ],
  };

  const breadcrumbs = routeMap[pathname] || [
    { label: 'Home', path: '/personal-dashboard' },
  ];

  if (pathname === '/login' || pathname === '/user-registration') {
    return null;
  }

  return (
    <nav className="bg-background border-b border-border" aria-label="Breadcrumb">
      <div className="px-4 lg:px-6 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isFirst = index === 0;

            return (
              <li key={crumb.path} className="flex items-center">
                {!isFirst && (
                  <Icon
                    name="ChevronRightIcon"
                    size={16}
                    className="mx-2 text-muted-foreground"
                  />
                )}
                {isLast ? (
                  <span className="font-medium text-primary">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default NavigationBreadcrumbs;