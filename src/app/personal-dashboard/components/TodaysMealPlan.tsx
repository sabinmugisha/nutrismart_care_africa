import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Meal {
  id: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  image: string;
  alt: string;
  ingredients: string[];
  isCompleted: boolean;
}

interface TodaysMealPlanProps {
  meals: Meal[];
  onMealComplete: (mealId: string) => void;
}

const TodaysMealPlan = ({ meals, onMealComplete }: TodaysMealPlanProps) => {
  const getMealIcon = (type: string) => {
    switch (type) {
      case 'Breakfast':
        return 'SunIcon';
      case 'Lunch':
        return 'ClockIcon';
      case 'Dinner':
        return 'MoonIcon';
      case 'Snack':
        return 'CakeIcon';
      default:
        return 'ClockIcon';
    }
  };

  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold font-heading text-card-foreground">
          Today's Meal Plan
        </h2>
        <Icon name="CalendarIcon" size={24} className="text-primary" />
      </div>

      <div className="space-y-4">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className={`bg-background rounded-lg border transition-smooth ${
              meal.isCompleted
                ? 'border-success bg-success/5' :'border-border hover:shadow-elevation-md'
            }`}
          >
            <div className="flex flex-col md:flex-row gap-4 p-4">
              <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <AppImage
                  src={meal.image}
                  alt={meal.alt}
                  className="w-full h-full object-cover"
                />
                {meal.isCompleted && (
                  <div className="absolute inset-0 bg-success/80 flex items-center justify-center">
                    <Icon name="CheckCircleIcon" size={40} className="text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon
                        name={getMealIcon(meal.type) as any}
                        size={18}
                        className="text-primary"
                      />
                      <span className="text-xs caption text-muted-foreground">
                        {meal.type} • {meal.time}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground">
                      {meal.name}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-3">
                  <div className="text-center">
                    <p className="text-xs caption text-muted-foreground mb-1">Calories</p>
                    <p className="text-sm font-semibold data-text text-primary">
                      {meal.calories}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs caption text-muted-foreground mb-1">Protein</p>
                    <p className="text-sm font-semibold data-text text-accent">
                      {meal.protein}g
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs caption text-muted-foreground mb-1">Carbs</p>
                    <p className="text-sm font-semibold data-text text-secondary">
                      {meal.carbs}g
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs caption text-muted-foreground mb-1">Fats</p>
                    <p className="text-sm font-semibold data-text text-warning">
                      {meal.fats}g
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs caption text-muted-foreground mb-2">Key Ingredients:</p>
                  <div className="flex flex-wrap gap-2">
                    {meal.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="text-xs caption px-2 py-1 bg-muted rounded-full text-card-foreground"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onMealComplete(meal.id)}
                  disabled={meal.isCompleted}
                  className={`button-base text-sm ${
                    meal.isCompleted
                      ? 'bg-success text-success-foreground cursor-not-allowed'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {meal.isCompleted ? (
                    <>
                      <Icon name="CheckIcon" size={16} className="mr-2" />
                      Completed
                    </>
                  ) : (
                    'Mark as Eaten'
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysMealPlan;