'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  action: string;
}

interface QuickActionsPanelProps {
  actions: QuickAction[];
}

const QuickActionsPanel = ({ actions }: QuickActionsPanelProps) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleActionClick = (actionId: string) => {
    setSelectedAction(actionId);
    setTimeout(() => setSelectedAction(null), 300);
  };

  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold font-heading text-card-foreground">
          Quick Actions
        </h2>
        <Icon name="BoltIcon" size={24} className="text-accent" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.id)}
            className={`bg-background rounded-lg p-4 border border-border hover:shadow-elevation-md transition-smooth text-left ${
              selectedAction === action.id ? 'scale-95' : 'hover:scale-105'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
              <Icon name={action.icon as any} size={24} className="text-white" />
            </div>
            <h3 className="text-sm font-semibold text-card-foreground mb-1">
              {action.title}
            </h3>
            <p className="text-xs caption text-muted-foreground">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;