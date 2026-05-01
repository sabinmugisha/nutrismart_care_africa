import Icon from '@/components/ui/AppIcon';

interface NutritionGoal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  icon: string;
  color: string;
}

interface NutritionGoalsCardProps {
  goals: NutritionGoal[];
}

const NutritionGoalsCard = ({ goals }: NutritionGoalsCardProps) => {
  const calculateProgress = (current: number, target: number): number => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold font-heading text-card-foreground">
          Today's Nutrition Goals
        </h2>
        <Icon name="ChartBarIcon" size={24} className="text-primary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.current, goal.target);
          
          return (
            <div
              key={goal.id}
              className="bg-background rounded-lg p-4 border border-border hover:shadow-elevation-md transition-smooth"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${goal.color}`}>
                  <Icon name={goal.icon as any} size={20} className="text-white" />
                </div>
                <span className="text-xs caption text-muted-foreground">
                  {Math.round(progress)}%
                </span>
              </div>

              <h3 className="text-sm font-medium text-card-foreground mb-2">
                {goal.title}
              </h3>

              <div className="mb-2">
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold data-text text-primary">
                    {goal.current}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    / {goal.target} {goal.unit}
                  </span>
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${goal.color} transition-smooth`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NutritionGoalsCard;