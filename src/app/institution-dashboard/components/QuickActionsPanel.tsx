'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  description: string;
  color: string;
}

const QuickActionsPanel = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useState(() => {
    setIsHydrated(true);
  });

  const quickActions: QuickAction[] = [
    {
      id: '1',
      label: 'Add Program',
      icon: 'PlusCircleIcon',
      description: 'Create new nutrition program',
      color: 'bg-primary',
    },
    {
      id: '2',
      label: 'Assign Educator',
      icon: 'UserPlusIcon',
      description: 'Assign nutrition professional',
      color: 'bg-accent',
    },
    {
      id: '3',
      label: 'Schedule Training',
      icon: 'CalendarDaysIcon',
      description: 'Plan educator training session',
      color: 'bg-secondary',
    },
    {
      id: '4',
      label: 'View Reports',
      icon: 'DocumentChartBarIcon',
      description: 'Access program analytics',
      color: 'bg-success',
    },
  ];

  const handleActionClick = (actionId: string) => {
    if (!isHydrated) return;
    console.log('Action clicked:', actionId);
  };

  if (!isHydrated) {
    return (
      <div className="card-base">
        <h2 className="text-xl font-semibold font-heading text-card-foreground mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <div
              key={action.id}
              className="p-4 rounded-lg border border-border hover:border-primary hover:shadow-elevation-sm transition-smooth cursor-pointer"
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${action.color} mb-3`}>
                <Icon name={action.icon as any} size={24} className="text-white" />
              </div>
              <h3 className="text-base font-medium text-card-foreground mb-1">{action.label}</h3>
              <p className="text-sm caption text-muted-foreground">{action.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card-base">
      <h2 className="text-xl font-semibold font-heading text-card-foreground mb-6">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.id)}
            className="p-4 rounded-lg border border-border hover:border-primary hover:shadow-elevation-sm transition-smooth text-left"
          >
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${action.color} mb-3`}>
              <Icon name={action.icon as any} size={24} className="text-white" />
            </div>
            <h3 className="text-base font-medium text-card-foreground mb-1">{action.label}</h3>
            <p className="text-sm caption text-muted-foreground">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;