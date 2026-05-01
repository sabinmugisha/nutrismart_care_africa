'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  image: string;
  alt: string;
  healthStatus: 'good' | 'monitoring' | 'attention';
  lastUpdated: string;
}

interface FamilyMembersCardProps {
  members: FamilyMember[];
}

const FamilyMembersCard = ({ members }: FamilyMembersCardProps) => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-success bg-success/10';
      case 'monitoring':
        return 'text-warning bg-warning/10';
      case 'attention':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold font-heading text-card-foreground">
          Family Nutrition
        </h2>
        <button className="button-base text-sm bg-primary text-primary-foreground hover:bg-primary/90">
          <Icon name="PlusIcon" size={16} className="mr-2" />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <button
            key={member.id}
            onClick={() => setSelectedMember(member.id)}
            className={`bg-background rounded-lg p-4 border transition-smooth text-left ${
              selectedMember === member.id
                ? 'border-primary shadow-elevation-md'
                : 'border-border hover:shadow-elevation-md'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <AppImage
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-card-foreground truncate">
                  {member.name}
                </h3>
                <p className="text-xs caption text-muted-foreground">
                  {member.relation} • {member.age} years
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`text-xs caption px-2 py-1 rounded-full ${getHealthStatusColor(
                  member.healthStatus
                )}`}
              >
                {member.healthStatus === 'good' ?'Healthy'
                  : member.healthStatus === 'monitoring' ?'Monitoring' :'Needs Attention'}
              </span>
              <span className="text-xs caption text-muted-foreground">
                {member.lastUpdated}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FamilyMembersCard;