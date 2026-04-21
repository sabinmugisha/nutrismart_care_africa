'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

// ─── Helper Components ────────────────────────────────────────────────────────

interface ProgramMetrics {
  activeParticipants: number;
  completionRate: number;
  healthOutcomes: number;
  costPerParticipant: number;
}

interface ProgramOverviewCardProps {
  programName: string;
  programType: 'Hospital' | 'School' | 'Workplace' | 'NGO';
  metrics: ProgramMetrics;
  status: 'Active' | 'Paused' | 'Completed';
  startDate: string;
}

const ProgramOverviewCard = ({ programName, programType, metrics, status, startDate }: ProgramOverviewCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Paused': return 'bg-warning text-warning-foreground';
      case 'Completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  const getProgramIcon = () => {
    switch (programType) {
      case 'Hospital': return 'BuildingOffice2Icon';
      case 'School': return 'AcademicCapIcon';
      case 'Workplace': return 'BriefcaseIcon';
      case 'NGO': return 'UserGroupIcon';
      default: return 'BuildingOfficeIcon';
    }
  };
  return (
    <div className="card-base hover:shadow-elevation-md transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
            <Icon name={getProgramIcon() as any} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold font-heading text-card-foreground">{programName}</h3>
            <p className="text-sm caption text-muted-foreground">{programType} Program</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs caption font-medium ${getStatusColor()}`}>{status}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 rounded-lg bg-background">
          <div className="flex items-center space-x-2 mb-1"><Icon name="UsersIcon" size={16} className="text-primary" /><p className="text-xs caption text-muted-foreground">Active Participants</p></div>
          <p className="text-2xl font-bold data-text text-card-foreground">{metrics.activeParticipants.toLocaleString()}</p>
        </div>
        <div className="p-3 rounded-lg bg-background">
          <div className="flex items-center space-x-2 mb-1"><Icon name="ChartBarIcon" size={16} className="text-success" /><p className="text-xs caption text-muted-foreground">Completion Rate</p></div>
          <p className="text-2xl font-bold data-text text-card-foreground">{metrics.completionRate}%</p>
        </div>
        <div className="p-3 rounded-lg bg-background">
          <div className="flex items-center space-x-2 mb-1"><Icon name="HeartIcon" size={16} className="text-accent" /><p className="text-xs caption text-muted-foreground">Health Outcomes</p></div>
          <p className="text-2xl font-bold data-text text-card-foreground">+{metrics.healthOutcomes}%</p>
        </div>
        <div className="p-3 rounded-lg bg-background">
          <div className="flex items-center space-x-2 mb-1"><Icon name="CurrencyDollarIcon" size={16} className="text-secondary" /><p className="text-xs caption text-muted-foreground">Cost/Participant</p></div>
          <p className="text-2xl font-bold data-text text-card-foreground">{metrics.costPerParticipant.toLocaleString()} RWF</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2"><Icon name="CalendarIcon" size={16} className="text-muted-foreground" /><p className="text-sm caption text-muted-foreground">Started: {startDate}</p></div>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-smooth">View Details</button>
      </div>
    </div>
  );
};

interface ParticipantGroup {
  id: string;
  name: string;
  count: number;
  demographic: string;
  enrollmentDate: string;
}

interface ParticipantManagementPanelProps {
  groups: ParticipantGroup[];
  totalParticipants: number;
}

const ParticipantManagementPanel = ({ groups, totalParticipants }: ParticipantManagementPanelProps) => (
  <div className="card-base">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold font-heading text-card-foreground mb-1">Participant Management</h2>
        <p className="text-sm caption text-muted-foreground">Total Participants: {totalParticipants.toLocaleString()}</p>
      </div>
      <button className="button-base bg-primary text-primary-foreground hover:bg-primary/90 flex items-center space-x-2">
        <Icon name="PlusIcon" size={20} /><span>Add Group</span>
      </button>
    </div>
    <div className="space-y-3">
      {groups.map((group) => (
        <div key={group.id} className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-muted transition-smooth">
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10"><Icon name="UserGroupIcon" size={20} className="text-primary" /></div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-card-foreground mb-1">{group.name}</h3>
              <div className="flex items-center space-x-4">
                <p className="text-sm caption text-muted-foreground">{group.demographic}</p>
                <span className="text-xs caption text-muted-foreground">•</span>
                <p className="text-sm caption text-muted-foreground">Enrolled: {group.enrollmentDate}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-2xl font-bold data-text text-card-foreground">{group.count.toLocaleString()}</p>
              <p className="text-xs caption text-muted-foreground">Participants</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-card transition-smooth" aria-label="View group details"><Icon name="EyeIcon" size={20} className="text-muted-foreground" /></button>
              <button className="p-2 rounded-lg hover:bg-card transition-smooth" aria-label="Edit group"><Icon name="PencilIcon" size={20} className="text-muted-foreground" /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-6 pt-6 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-smooth"><Icon name="DocumentPlusIcon" size={20} className="text-primary" /><span className="text-sm font-medium text-card-foreground">Bulk Registration</span></button>
        <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-smooth"><Icon name="ClipboardDocumentListIcon" size={20} className="text-primary" /><span className="text-sm font-medium text-card-foreground">Group Meal Plans</span></button>
        <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-smooth"><Icon name="ChartBarSquareIcon" size={20} className="text-primary" /><span className="text-sm font-medium text-card-foreground">Progress Monitor</span></button>
      </div>
    </div>
  </div>
);

interface AnalyticsMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
}

interface AnalyticsWidgetProps {
  metrics: AnalyticsMetric[];
}

const AnalyticsWidget = ({ metrics }: AnalyticsWidgetProps) => {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) { case 'up': return 'ArrowTrendingUpIcon'; case 'down': return 'ArrowTrendingDownIcon'; default: return 'MinusIcon'; }
  };
  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) { case 'up': return 'text-success'; case 'down': return 'text-error'; default: return 'text-muted-foreground'; }
  };
  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold font-heading text-card-foreground">Program Analytics</h2>
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-muted transition-smooth">
          <Icon name="ArrowDownTrayIcon" size={18} className="text-primary" /><span className="text-sm font-medium text-primary">Export Report</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 rounded-lg bg-background">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${metric.color}`}><Icon name={metric.icon as any} size={20} className="text-white" /></div>
              <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
                <Icon name={getTrendIcon(metric.trend) as any} size={16} />
                <span className="text-xs caption font-medium">{metric.change > 0 ? '+' : ''}{metric.change}%</span>
              </div>
            </div>
            <p className="text-2xl font-bold data-text text-card-foreground mb-1">{metric.value}</p>
            <p className="text-sm caption text-muted-foreground">{metric.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2"><Icon name="InformationCircleIcon" size={20} className="text-muted-foreground" /><p className="text-sm caption text-muted-foreground">Data updated as of January 20, 2026</p></div>
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-smooth">View Detailed Analytics</button>
        </div>
      </div>
    </div>
  );
};

interface Resource {
  id: string;
  name: string;
  type: 'Educator' | 'Budget' | 'Material' | 'Facility';
  allocated: number;
  total: number;
  status: 'Available' | 'Limited' | 'Critical';
}

interface ResourceAllocationPanelProps {
  resources: Resource[];
  totalBudget: number;
  spentBudget: number;
}

const ResourceAllocationPanel = ({ resources, totalBudget, spentBudget }: ResourceAllocationPanelProps) => {
  const getStatusColor = (status: string) => {
    switch (status) { case 'Available': return 'bg-success/10 text-success'; case 'Limited': return 'bg-warning/10 text-warning'; case 'Critical': return 'bg-error/10 text-error'; default: return 'bg-muted text-muted-foreground'; }
  };
  const getResourceIcon = (type: string) => {
    switch (type) { case 'Educator': return 'AcademicCapIcon'; case 'Budget': return 'CurrencyDollarIcon'; case 'Material': return 'DocumentTextIcon'; case 'Facility': return 'BuildingOfficeIcon'; default: return 'CubeIcon'; }
  };
  const budgetPercentage = (spentBudget / totalBudget) * 100;
  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold font-heading text-card-foreground">Resource Allocation</h2>
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"><Icon name="PlusIcon" size={18} /><span className="text-sm font-medium">Allocate Resources</span></button>
      </div>
      <div className="p-4 rounded-lg bg-background mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2"><Icon name="CurrencyDollarIcon" size={20} className="text-primary" /><h3 className="text-base font-medium text-card-foreground">Budget Overview</h3></div>
          <p className="text-sm caption text-muted-foreground">{budgetPercentage.toFixed(1)}% utilized</p>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
          <div className={`h-full transition-all ${budgetPercentage > 90 ? 'bg-error' : budgetPercentage > 70 ? 'bg-warning' : 'bg-success'}`} style={{ width: `${budgetPercentage}%` }} />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm caption text-muted-foreground">Spent: {spentBudget.toLocaleString()} RWF</p>
          <p className="text-sm caption text-muted-foreground">Total: {totalBudget.toLocaleString()} RWF</p>
        </div>
      </div>
      <div className="space-y-3">
        {resources.map((resource) => {
          const percentage = (resource.allocated / resource.total) * 100;
          return (
            <div key={resource.id} className="p-4 rounded-lg bg-background">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10"><Icon name={getResourceIcon(resource.type) as any} size={20} className="text-primary" /></div>
                  <div><h3 className="text-base font-medium text-card-foreground">{resource.name}</h3><p className="text-sm caption text-muted-foreground">{resource.type}</p></div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs caption font-medium ${getStatusColor(resource.status)}`}>{resource.status}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2"><div className="h-full bg-primary transition-all" style={{ width: `${percentage}%` }} /></div>
              <div className="flex items-center justify-between">
                <p className="text-sm caption text-muted-foreground">Allocated: {resource.allocated} / {resource.total}</p>
                <p className="text-sm caption font-medium text-card-foreground">{percentage.toFixed(0)}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface ImpactMetric {
  category: string;
  baseline: number;
  current: number;
  improvement: number;
  participants: number;
}

interface ImpactReportingSectionProps {
  metrics: ImpactMetric[];
  reportingPeriod: string;
}

const ImpactReportingSection = ({ metrics, reportingPeriod }: ImpactReportingSectionProps) => (
  <div className="card-base">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold font-heading text-card-foreground mb-1">Impact Reporting</h2>
        <p className="text-sm caption text-muted-foreground">Period: {reportingPeriod}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-smooth"><Icon name="DocumentChartBarIcon" size={18} className="text-primary" /><span className="text-sm font-medium text-card-foreground">Generate Report</span></button>
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"><Icon name="ShareIcon" size={18} /><span className="text-sm font-medium">Share Report</span></button>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <div key={index} className="p-4 rounded-lg bg-background">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-card-foreground">{metric.category}</h3>
            <div className="flex items-center space-x-1 text-success"><Icon name="ArrowTrendingUpIcon" size={16} /><span className="text-sm caption font-medium">+{metric.improvement}%</span></div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div><p className="text-xs caption text-muted-foreground mb-1">Baseline</p><p className="text-lg font-bold data-text text-card-foreground">{metric.baseline}%</p></div>
            <div><p className="text-xs caption text-muted-foreground mb-1">Current</p><p className="text-lg font-bold data-text text-card-foreground">{metric.current}%</p></div>
            <div><p className="text-xs caption text-muted-foreground mb-1">Participants</p><p className="text-lg font-bold data-text text-card-foreground">{metric.participants.toLocaleString()}</p></div>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-success transition-all" style={{ width: `${metric.current}%` }} /></div>
        </div>
      ))}
    </div>
    <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
      <div className="flex items-start space-x-3">
        <Icon name="LightBulbIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-base font-medium text-card-foreground mb-2">Community Impact Highlights</h3>
          <ul className="space-y-2">
            <li className="flex items-start space-x-2"><Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0 mt-0.5" /><p className="text-sm caption text-card-foreground">Reduced malnutrition rates by 34% across 12 communities</p></li>
            <li className="flex items-start space-x-2"><Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0 mt-0.5" /><p className="text-sm caption text-card-foreground">Improved dietary diversity scores in 89% of participating households</p></li>
            <li className="flex items-start space-x-2"><Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0 mt-0.5" /><p className="text-sm caption text-card-foreground">Trained 156 community nutrition educators across Rwanda</p></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  description: string;
  color: string;
}

const QuickActionsPanel = () => {
  const quickActions: QuickAction[] = [
    { id: '1', label: 'Add Program', icon: 'PlusCircleIcon', description: 'Create new nutrition program', color: 'bg-primary' },
    { id: '2', label: 'Assign Educator', icon: 'UserPlusIcon', description: 'Assign nutrition professional', color: 'bg-accent' },
    { id: '3', label: 'Schedule Training', icon: 'CalendarDaysIcon', description: 'Plan educator training session', color: 'bg-secondary' },
    { id: '4', label: 'View Reports', icon: 'DocumentChartBarIcon', description: 'Access program analytics', color: 'bg-success' },
  ];
  return (
    <div className="card-base">
      <h2 className="text-xl font-semibold font-heading text-card-foreground mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <button key={action.id} onClick={() => console.log('Action clicked:', action.id)} className="p-4 rounded-lg border border-border hover:border-primary hover:shadow-elevation-sm transition-smooth text-left">
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${action.color} mb-3`}><Icon name={action.icon as any} size={24} className="text-white" /></div>
            <h3 className="text-base font-medium text-card-foreground mb-1">{action.label}</h3>
            <p className="text-sm caption text-muted-foreground">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Main Interactive Component ───────────────────────────────────────────────

interface ProgramData {
  programName: string;
  programType: 'Hospital' | 'School' | 'Workplace' | 'NGO';
  metrics: ProgramMetrics;
  status: 'Active' | 'Paused' | 'Completed';
  startDate: string;
}

const InstitutionDashboardInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  useState(() => { setIsHydrated(true); });

  const programs: ProgramData[] = [
    { programName: 'Maternal Nutrition Initiative', programType: 'Hospital', metrics: { activeParticipants: 1247, completionRate: 87, healthOutcomes: 42, costPerParticipant: 15000 }, status: 'Active', startDate: '15/03/2025' },
    { programName: 'School Feeding Program', programType: 'School', metrics: { activeParticipants: 3456, completionRate: 94, healthOutcomes: 38, costPerParticipant: 8500 }, status: 'Active', startDate: '01/09/2025' },
    { programName: 'Employee Wellness Program', programType: 'Workplace', metrics: { activeParticipants: 892, completionRate: 76, healthOutcomes: 29, costPerParticipant: 12000 }, status: 'Active', startDate: '10/01/2026' },
    { programName: 'Community Nutrition Outreach', programType: 'NGO', metrics: { activeParticipants: 2134, completionRate: 82, healthOutcomes: 51, costPerParticipant: 6500 }, status: 'Active', startDate: '20/11/2025' },
  ];

  const participantGroups: ParticipantGroup[] = [
    { id: '1', name: 'Pregnant Women - Kigali District', count: 456, demographic: 'Pregnant Women (18-35 years)', enrollmentDate: '15/03/2025' },
    { id: '2', name: 'Primary School Students - Gasabo', count: 1823, demographic: 'Children (6-12 years)', enrollmentDate: '01/09/2025' },
    { id: '3', name: 'Corporate Employees - Tech Sector', count: 567, demographic: 'Working Adults (25-45 years)', enrollmentDate: '10/01/2026' },
    { id: '4', name: 'Rural Community Members - Nyanza', count: 1289, demographic: 'Mixed Demographics', enrollmentDate: '20/11/2025' },
  ];

  const analyticsMetrics: AnalyticsMetric[] = [
    { label: 'Program Effectiveness', value: '87%', change: 12, trend: 'up', icon: 'ChartBarIcon', color: 'bg-primary' },
    { label: 'Cost Efficiency', value: '9,250 RWF', change: -8, trend: 'down', icon: 'CurrencyDollarIcon', color: 'bg-success' },
    { label: 'Health Improvements', value: '+42%', change: 15, trend: 'up', icon: 'HeartIcon', color: 'bg-accent' },
    { label: 'Community Reach', value: '7,729', change: 23, trend: 'up', icon: 'UserGroupIcon', color: 'bg-secondary' },
  ];

  const resources: Resource[] = [
    { id: '1', name: 'Nutrition Educators', type: 'Educator', allocated: 24, total: 30, status: 'Available' },
    { id: '2', name: 'Program Budget Q1 2026', type: 'Budget', allocated: 78500000, total: 95000000, status: 'Available' },
    { id: '3', name: 'Educational Materials', type: 'Material', allocated: 850, total: 1000, status: 'Limited' },
    { id: '4', name: 'Training Facilities', type: 'Facility', allocated: 8, total: 10, status: 'Available' },
  ];

  const impactMetrics: ImpactMetric[] = [
    { category: 'Nutritional Status Improvement', baseline: 52, current: 87, improvement: 35, participants: 4523 },
    { category: 'Dietary Diversity Score', baseline: 48, current: 76, improvement: 28, participants: 3891 },
    { category: 'Health Knowledge Retention', baseline: 61, current: 89, improvement: 28, participants: 5234 },
    { category: 'Behavior Change Adoption', baseline: 44, current: 78, improvement: 34, participants: 4156 },
  ];

  const totalParticipants = participantGroups.reduce((sum, group) => sum + group.count, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 lg:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Institution Dashboard</h1>
          <p className="text-base text-muted-foreground">Manage nutrition programs and monitor community impact</p>
        </div>
        <div className="space-y-8">
          <QuickActionsPanel />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {programs.map((program, index) => (
              <ProgramOverviewCard key={index} programName={program.programName} programType={program.programType} metrics={program.metrics} status={program.status} startDate={program.startDate} />
            ))}
          </div>
          <ParticipantManagementPanel groups={participantGroups} totalParticipants={totalParticipants} />
          <AnalyticsWidget metrics={analyticsMetrics} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResourceAllocationPanel resources={resources} totalBudget={95000000} spentBudget={78500000} />
            <ImpactReportingSection metrics={impactMetrics} reportingPeriod="Q4 2025 - Q1 2026" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionDashboardInteractive;