import Icon from '@/components/ui/AppIcon';

interface NutritionTip {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface NutritionTipsCardProps {
  tips: NutritionTip[];
}

const NutritionTipsCard = ({ tips }: NutritionTipsCardProps) => {
  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold font-heading text-card-foreground">
          Personalized Tips
        </h2>
        <Icon name="LightBulbIcon" size={24} className="text-accent" />
      </div>

      <div className="space-y-3">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-background rounded-lg p-4 border border-border hover:shadow-elevation-md transition-smooth"
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${tip.color} flex-shrink-0`}>
                <Icon name={tip.icon as any} size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs caption px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    {tip.category}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-card-foreground mb-1">
                  {tip.title}
                </h3>
                <p className="text-xs caption text-muted-foreground">{tip.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionTipsCard;