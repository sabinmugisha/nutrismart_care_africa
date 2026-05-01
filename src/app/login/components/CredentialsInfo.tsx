'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Credential {
  role: string;
  email: string;
  password: string;
  description: string;
}

const CredentialsInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const credentials: Credential[] = [
    {
      role: 'Individual User',
      email: 'patient@nutrismart.rw',
      password: 'Patient@2026',
      description: 'Access personal nutrition dashboard and meal planning',
    },
    {
      role: 'Healthcare Provider',
      email: 'provider@nutrismart.rw',
      password: 'Provider@2026',
      description: 'Manage consultations and patient nutrition programs',
    },
    {
      role: 'Institution Admin',
      email: 'admin@nutrismart.rw',
      password: 'Admin@2026',
      description: 'Oversee institutional nutrition programs and analytics',
    },
  ];

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full p-4 bg-accent/10 rounded-lg hover:bg-accent/20 transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <Icon name="InformationCircleIcon" size={20} className="text-accent" />
          <span className="text-sm font-medium text-card-foreground">Demo Credentials</span>
        </div>
        <Icon
          name="ChevronDownIcon"
          size={20}
          className={`text-accent transition-smooth ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4 animate-fade-in">
          {credentials.map((cred, index) => (
            <div
              key={index}
              className="p-4 bg-card rounded-lg border border-primary/10 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-primary">{cred.role}</h4>
                <span className="text-xs caption px-2 py-1 bg-primary/10 text-primary rounded">
                  Demo Account
                </span>
              </div>
              <p className="text-xs caption text-muted-foreground">{cred.description}</p>
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="EnvelopeIcon" size={14} className="text-muted-foreground" />
                  <code className="text-xs data-text text-card-foreground bg-muted px-2 py-1 rounded">
                    {cred.email}
                  </code>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="LockClosedIcon" size={14} className="text-muted-foreground" />
                  <code className="text-xs data-text text-card-foreground bg-muted px-2 py-1 rounded">
                    {cred.password}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CredentialsInfo;