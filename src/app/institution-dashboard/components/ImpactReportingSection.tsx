import Icon from '@/components/ui/AppIcon';

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

const ImpactReportingSection = ({ metrics, reportingPeriod }: ImpactReportingSectionProps) => {
  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold font-heading text-card-foreground mb-1">
            Impact Reporting
          </h2>
          <p className="text-sm caption text-muted-foreground">Period: {reportingPeriod}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-smooth">
            <Icon name="DocumentChartBarIcon" size={18} className="text-primary" />
            <span className="text-sm font-medium text-card-foreground">Generate Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth">
            <Icon name="ShareIcon" size={18} />
            <span className="text-sm font-medium">Share Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 rounded-lg bg-background">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-card-foreground">{metric.category}</h3>
              <div className="flex items-center space-x-1 text-success">
                <Icon name="ArrowTrendingUpIcon" size={16} />
                <span className="text-sm caption font-medium">+{metric.improvement}%</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs caption text-muted-foreground mb-1">Baseline</p>
                <p className="text-lg font-bold data-text text-card-foreground">
                  {metric.baseline}%
                </p>
              </div>
              <div>
                <p className="text-xs caption text-muted-foreground mb-1">Current</p>
                <p className="text-lg font-bold data-text text-card-foreground">
                  {metric.current}%
                </p>
              </div>
              <div>
                <p className="text-xs caption text-muted-foreground mb-1">Participants</p>
                <p className="text-lg font-bold data-text text-card-foreground">
                  {metric.participants.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-success transition-all"
                style={{ width: `${metric.current}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="LightBulbIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base font-medium text-card-foreground mb-2">
              Community Impact Highlights
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0 mt-0.5" />
                <p className="text-sm caption text-card-foreground">
                  Reduced malnutrition rates by 34% across 12 communities
                </p>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0 mt-0.5" />
                <p className="text-sm caption text-card-foreground">
                  Improved dietary diversity scores in 89% of participating households
                </p>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0 mt-0.5" />
                <p className="text-sm caption text-card-foreground">
                  Trained 156 community nutrition educators across Rwanda
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactReportingSection;