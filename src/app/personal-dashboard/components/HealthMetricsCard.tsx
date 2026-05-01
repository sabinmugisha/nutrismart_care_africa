import Icon from '@/components/ui/AppIcon';

interface HealthMetric {
  id: string;
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'alert';
  icon: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
}

interface HealthMetricsCardProps {
  metrics: HealthMetric[];
}

const HealthMetricsCard = ({ metrics }: HealthMetricsCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'alert':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-success/10';
      case 'warning':
        return 'bg-warning/10';
      case 'alert':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'ArrowTrendingUpIcon';
      case 'down':
        return 'ArrowTrendingDownIcon';
      default:
        return 'MinusIcon';
    }
  };

  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold font-heading text-card-foreground">
          Health Metrics
        </h2>
        <Icon name="HeartIcon" size={24} className="text-error" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className={`rounded-lg p-4 border transition-smooth ${getStatusBg(
              metric.status
            )} border-border hover:shadow-elevation-md`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getStatusColor(metric.status)} bg-background`}>
                  <Icon name={metric.icon as any} size={20} />
                </div>
                <div>
                  <p className="text-sm caption text-muted-foreground">{metric.label}</p>
                  <div className="flex items-baseline space-x-1 mt-1">
                    <span className="text-2xl font-bold data-text text-card-foreground">
                      {metric.value}
                    </span>
                    <span className="text-sm text-muted-foreground">{metric.unit}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon
                  name={getTrendIcon(metric.trend) as any}
                  size={16}
                  className={getStatusColor(metric.status)}
                />
                <span className={`text-xs caption ${getStatusColor(metric.status)}`}>
                  {metric.change}
                </span>
              </div>
              <span
                className={`text-xs caption px-2 py-1 rounded-full ${getStatusColor(
                  metric.status
                )} ${getStatusBg(metric.status)}`}
              >
                {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthMetricsCard;