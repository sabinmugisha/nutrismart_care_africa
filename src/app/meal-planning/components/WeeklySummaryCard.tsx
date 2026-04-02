import Icon from '@/components/ui/AppIcon';

interface NutritionSummary {
  totalCalories: number;
  avgCaloriesPerDay: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  totalCost: number;
  mealsPlanned: number;
  totalMeals: number;
}

interface WeeklySummaryCardProps {
  summary: NutritionSummary;
}

const WeeklySummaryCard = ({ summary }: WeeklySummaryCardProps) => {
  const formatCost = (cost: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(cost);
  };

  const completionPercentage = Math.round((summary.mealsPlanned / summary.totalMeals) * 100);

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold font-heading text-card-foreground">
          Weekly Summary
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">{completionPercentage}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="ChartBarIcon" size={20} className="text-primary" />
              <span className="text-sm font-medium text-card-foreground">Plan Progress</span>
            </div>
            <span className="text-sm font-bold text-primary">
              {summary.mealsPlanned}/{summary.totalMeals}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="FireIcon" size={18} className="text-accent" />
              <span className="text-xs caption text-muted-foreground">Total Calories</span>
            </div>
            <div className="text-xl font-bold text-card-foreground">
              {summary.totalCalories.toLocaleString()}
            </div>
            <div className="text-xs caption text-muted-foreground mt-1">
              ~{summary.avgCaloriesPerDay} per day
            </div>
          </div>

          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CurrencyDollarIcon" size={18} className="text-success" />
              <span className="text-xs caption text-muted-foreground">Total Cost</span>
            </div>
            <div className="text-xl font-bold text-card-foreground">
              {formatCost(summary.totalCost)}
            </div>
            <div className="text-xs caption text-muted-foreground mt-1">
              {formatCost(summary.totalCost / 7)} per day
            </div>
          </div>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <h4 className="text-sm font-medium text-card-foreground mb-3">
            Macronutrient Breakdown
          </h4>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs caption text-muted-foreground">Protein</span>
                <span className="text-xs font-medium text-primary">{summary.totalProtein}g</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className="bg-primary rounded-full h-1.5"
                  style={{
                    width: `${(summary.totalProtein / (summary.totalProtein + summary.totalCarbs + summary.totalFats)) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs caption text-muted-foreground">Carbs</span>
                <span className="text-xs font-medium text-secondary">{summary.totalCarbs}g</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className="bg-secondary rounded-full h-1.5"
                  style={{
                    width: `${(summary.totalCarbs / (summary.totalProtein + summary.totalCarbs + summary.totalFats)) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs caption text-muted-foreground">Fats</span>
                <span className="text-xs font-medium text-accent">{summary.totalFats}g</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className="bg-accent rounded-full h-1.5"
                  style={{
                    width: `${(summary.totalFats / (summary.totalProtein + summary.totalCarbs + summary.totalFats)) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummaryCard;