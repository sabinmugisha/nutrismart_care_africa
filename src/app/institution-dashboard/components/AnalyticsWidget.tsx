import Icon from '@/components/ui/AppIcon';

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
    switch (trend) {
      case 'up':
        return 'ArrowTrendingUpIcon';
      case 'down':
        return 'ArrowTrendingDownIcon';
      case 'stable':
        return 'MinusIcon';
      default:
        return 'MinusIcon';
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      case 'stable':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold font-heading text-card-foreground">
          Program Analytics
        </h2>
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-muted transition-smooth">
          <Icon name="ArrowDownTrayIcon" size={18} className="text-primary" />
          <span className="text-sm font-medium text-primary">Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 rounded-lg bg-background">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${metric.color}`}>
                <Icon name={metric.icon as any} size={20} className="text-white" />
              </div>
              <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
                <Icon name={getTrendIcon(metric.trend) as any} size={16} />
                <span className="text-xs caption font-medium">
                  {metric.change > 0 ? '+' : ''}
                  {metric.change}%
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold data-text text-card-foreground mb-1">
              {metric.value}
            </p>
            <p className="text-sm caption text-muted-foreground">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="InformationCircleIcon" size={20} className="text-muted-foreground" />
            <p className="text-sm caption text-muted-foreground">
              Data updated as of January 20, 2026
            </p>
          </div>
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-smooth">
            View Detailed Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;