import Icon from '@/components/ui/AppIcon';

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

const ResourceAllocationPanel = ({
  resources,
  totalBudget,
  spentBudget,
}: ResourceAllocationPanelProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-success/10 text-success';
      case 'Limited':
        return 'bg-warning/10 text-warning';
      case 'Critical':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'Educator':
        return 'AcademicCapIcon';
      case 'Budget':
        return 'CurrencyDollarIcon';
      case 'Material':
        return 'DocumentTextIcon';
      case 'Facility':
        return 'BuildingOfficeIcon';
      default:
        return 'CubeIcon';
    }
  };

  const budgetPercentage = (spentBudget / totalBudget) * 100;

  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold font-heading text-card-foreground">
          Resource Allocation
        </h2>
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth">
          <Icon name="PlusIcon" size={18} />
          <span className="text-sm font-medium">Allocate Resources</span>
        </button>
      </div>

      <div className="p-4 rounded-lg bg-background mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="CurrencyDollarIcon" size={20} className="text-primary" />
            <h3 className="text-base font-medium text-card-foreground">Budget Overview</h3>
          </div>
          <p className="text-sm caption text-muted-foreground">
            {budgetPercentage.toFixed(1)}% utilized
          </p>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
          <div
            className={`h-full transition-all ${
              budgetPercentage > 90
                ? 'bg-error'
                : budgetPercentage > 70
                ? 'bg-warning' :'bg-success'
            }`}
            style={{ width: `${budgetPercentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm caption text-muted-foreground">
            Spent: {spentBudget.toLocaleString()} RWF
          </p>
          <p className="text-sm caption text-muted-foreground">
            Total: {totalBudget.toLocaleString()} RWF
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {resources.map((resource) => {
          const percentage = (resource.allocated / resource.total) * 100;
          return (
            <div key={resource.id} className="p-4 rounded-lg bg-background">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                    <Icon
                      name={getResourceIcon(resource.type) as any}
                      size={20}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-card-foreground">{resource.name}</h3>
                    <p className="text-sm caption text-muted-foreground">{resource.type}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs caption font-medium ${getStatusColor(
                    resource.status
                  )}`}
                >
                  {resource.status}
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm caption text-muted-foreground">
                  Allocated: {resource.allocated} / {resource.total}
                </p>
                <p className="text-sm caption font-medium text-card-foreground">
                  {percentage.toFixed(0)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResourceAllocationPanel;