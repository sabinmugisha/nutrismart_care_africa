import Icon from '@/components/ui/AppIcon';

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

const ProgramOverviewCard = ({
  programName,
  programType,
  metrics,
  status,
  startDate,
}: ProgramOverviewCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Active':
        return 'bg-success text-success-foreground';
      case 'Paused':
        return 'bg-warning text-warning-foreground';
      case 'Completed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getProgramIcon = () => {
    switch (programType) {
      case 'Hospital':
        return 'BuildingOffice2Icon';
      case 'School':
        return 'AcademicCapIcon';
      case 'Workplace':
        return 'BriefcaseIcon';
      case 'NGO':
        return 'UserGroupIcon';
      default:
        return 'BuildingOfficeIcon';
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
            <h3 className="text-lg font-semibold font-heading text-card-foreground">
              {programName}
            </h3>
            <p className="text-sm caption text-muted-foreground">{programType} Program</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs caption font-medium ${getStatusColor()}`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 rounded-lg bg-background">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="UsersIcon" size={16} className="text-primary" />
            <p className="text-xs caption text-muted-foreground">Active Participants</p>
          </div>
          <p className="text-2xl font-bold data-text text-card-foreground">
            {metrics.activeParticipants.toLocaleString()}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-background">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="ChartBarIcon" size={16} className="text-success" />
            <p className="text-xs caption text-muted-foreground">Completion Rate</p>
          </div>
          <p className="text-2xl font-bold data-text text-card-foreground">
            {metrics.completionRate}%
          </p>
        </div>

        <div className="p-3 rounded-lg bg-background">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="HeartIcon" size={16} className="text-accent" />
            <p className="text-xs caption text-muted-foreground">Health Outcomes</p>
          </div>
          <p className="text-2xl font-bold data-text text-card-foreground">
            +{metrics.healthOutcomes}%
          </p>
        </div>

        <div className="p-3 rounded-lg bg-background">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="CurrencyDollarIcon" size={16} className="text-secondary" />
            <p className="text-xs caption text-muted-foreground">Cost/Participant</p>
          </div>
          <p className="text-2xl font-bold data-text text-card-foreground">
            {metrics.costPerParticipant.toLocaleString()} RWF
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="CalendarIcon" size={16} className="text-muted-foreground" />
          <p className="text-sm caption text-muted-foreground">Started: {startDate}</p>
        </div>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-smooth">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProgramOverviewCard;