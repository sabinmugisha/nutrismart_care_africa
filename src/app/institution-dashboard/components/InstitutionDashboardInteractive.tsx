'use client';

import { useState } from 'react';
import ProgramOverviewCard from './ProgramOverviewCard';
import ParticipantManagementPanel from './ParticipantManagementPanel';
import AnalyticsWidget from './AnalyticsWidget';
import ResourceAllocationPanel from './ResourceAllocationPanel';
import ImpactReportingSection from './ImpactReportingSection';
import QuickActionsPanel from './QuickActionsPanel';

interface ProgramData {
  programName: string;
  programType: 'Hospital' | 'School' | 'Workplace' | 'NGO';
  metrics: {
    activeParticipants: number;
    completionRate: number;
    healthOutcomes: number;
    costPerParticipant: number;
  };
  status: 'Active' | 'Paused' | 'Completed';
  startDate: string;
}

interface ParticipantGroup {
  id: string;
  name: string;
  count: number;
  demographic: string;
  enrollmentDate: string;
}

interface AnalyticsMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
}

interface Resource {
  id: string;
  name: string;
  type: 'Educator' | 'Budget' | 'Material' | 'Facility';
  allocated: number;
  total: number;
  status: 'Available' | 'Limited' | 'Critical';
}

interface ImpactMetric {
  category: string;
  baseline: number;
  current: number;
  improvement: number;
  participants: number;
}

const InstitutionDashboardInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useState(() => {
    setIsHydrated(true);
  });

  const programs: ProgramData[] = [
    {
      programName: 'Maternal Nutrition Initiative',
      programType: 'Hospital',
      metrics: {
        activeParticipants: 1247,
        completionRate: 87,
        healthOutcomes: 42,
        costPerParticipant: 15000,
      },
      status: 'Active',
      startDate: '15/03/2025',
    },
    {
      programName: 'School Feeding Program',
      programType: 'School',
      metrics: {
        activeParticipants: 3456,
        completionRate: 94,
        healthOutcomes: 38,
        costPerParticipant: 8500,
      },
      status: 'Active',
      startDate: '01/09/2025',
    },
    {
      programName: 'Employee Wellness Program',
      programType: 'Workplace',
      metrics: {
        activeParticipants: 892,
        completionRate: 76,
        healthOutcomes: 29,
        costPerParticipant: 12000,
      },
      status: 'Active',
      startDate: '10/01/2026',
    },
    {
      programName: 'Community Nutrition Outreach',
      programType: 'NGO',
      metrics: {
        activeParticipants: 2134,
        completionRate: 82,
        healthOutcomes: 51,
        costPerParticipant: 6500,
      },
      status: 'Active',
      startDate: '20/11/2025',
    },
  ];

  const participantGroups: ParticipantGroup[] = [
    {
      id: '1',
      name: 'Pregnant Women - Kigali District',
      count: 456,
      demographic: 'Pregnant Women (18-35 years)',
      enrollmentDate: '15/03/2025',
    },
    {
      id: '2',
      name: 'Primary School Students - Gasabo',
      count: 1823,
      demographic: 'Children (6-12 years)',
      enrollmentDate: '01/09/2025',
    },
    {
      id: '3',
      name: 'Corporate Employees - Tech Sector',
      count: 567,
      demographic: 'Working Adults (25-45 years)',
      enrollmentDate: '10/01/2026',
    },
    {
      id: '4',
      name: 'Rural Community Members - Nyanza',
      count: 1289,
      demographic: 'Mixed Demographics',
      enrollmentDate: '20/11/2025',
    },
  ];

  const analyticsMetrics: AnalyticsMetric[] = [
    {
      label: 'Program Effectiveness',
      value: '87%',
      change: 12,
      trend: 'up',
      icon: 'ChartBarIcon',
      color: 'bg-primary',
    },
    {
      label: 'Cost Efficiency',
      value: '9,250 RWF',
      change: -8,
      trend: 'down',
      icon: 'CurrencyDollarIcon',
      color: 'bg-success',
    },
    {
      label: 'Health Improvements',
      value: '+42%',
      change: 15,
      trend: 'up',
      icon: 'HeartIcon',
      color: 'bg-accent',
    },
    {
      label: 'Community Reach',
      value: '7,729',
      change: 23,
      trend: 'up',
      icon: 'UserGroupIcon',
      color: 'bg-secondary',
    },
  ];

  const resources: Resource[] = [
    {
      id: '1',
      name: 'Nutrition Educators',
      type: 'Educator',
      allocated: 24,
      total: 30,
      status: 'Available',
    },
    {
      id: '2',
      name: 'Program Budget Q1 2026',
      type: 'Budget',
      allocated: 78500000,
      total: 95000000,
      status: 'Available',
    },
    {
      id: '3',
      name: 'Educational Materials',
      type: 'Material',
      allocated: 850,
      total: 1000,
      status: 'Limited',
    },
    {
      id: '4',
      name: 'Training Facilities',
      type: 'Facility',
      allocated: 8,
      total: 10,
      status: 'Available',
    },
  ];

  const impactMetrics: ImpactMetric[] = [
    {
      category: 'Nutritional Status Improvement',
      baseline: 52,
      current: 87,
      improvement: 35,
      participants: 4523,
    },
    {
      category: 'Dietary Diversity Score',
      baseline: 48,
      current: 76,
      improvement: 28,
      participants: 3891,
    },
    {
      category: 'Health Knowledge Retention',
      baseline: 61,
      current: 89,
      improvement: 28,
      participants: 5234,
    },
    {
      category: 'Behavior Change Adoption',
      baseline: 44,
      current: 78,
      improvement: 34,
      participants: 4156,
    },
  ];

  const totalParticipants = participantGroups.reduce((sum, group) => sum + group.count, 0);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-4 lg:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-heading text-foreground mb-2">
              Institution Dashboard
            </h1>
            <p className="text-base text-muted-foreground">
              Manage nutrition programs and monitor community impact
            </p>
          </div>

          <div className="space-y-8">
            <QuickActionsPanel />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {programs.map((program, index) => (
                <ProgramOverviewCard
                  key={index}
                  programName={program.programName}
                  programType={program.programType}
                  metrics={program.metrics}
                  status={program.status}
                  startDate={program.startDate}
                />
              ))}
            </div>

            <ParticipantManagementPanel
              groups={participantGroups}
              totalParticipants={totalParticipants}
            />

            <AnalyticsWidget metrics={analyticsMetrics} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResourceAllocationPanel
                resources={resources}
                totalBudget={95000000}
                spentBudget={78500000}
              />
              <ImpactReportingSection
                metrics={impactMetrics}
                reportingPeriod="Q4 2025 - Q1 2026"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 lg:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-foreground mb-2">
            Institution Dashboard
          </h1>
          <p className="text-base text-muted-foreground">
            Manage nutrition programs and monitor community impact
          </p>
        </div>

        <div className="space-y-8">
          <QuickActionsPanel />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {programs.map((program, index) => (
              <ProgramOverviewCard
                key={index}
                programName={program.programName}
                programType={program.programType}
                metrics={program.metrics}
                status={program.status}
                startDate={program.startDate}
              />
            ))}
          </div>

          <ParticipantManagementPanel
            groups={participantGroups}
            totalParticipants={totalParticipants}
          />

          <AnalyticsWidget metrics={analyticsMetrics} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResourceAllocationPanel
              resources={resources}
              totalBudget={95000000}
              spentBudget={78500000}
            />
            <ImpactReportingSection
              metrics={impactMetrics}
              reportingPeriod="Q4 2025 - Q1 2026"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionDashboardInteractive;