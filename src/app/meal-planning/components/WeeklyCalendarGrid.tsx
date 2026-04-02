'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  prepTime: number;
  cost: number;
  ingredients: string[];
}

interface DayMeals {
  date: string;
  dayName: string;
  meals: {
    breakfast?: Meal;
    lunch?: Meal;
    dinner?: Meal;
    snack?: Meal;
  };
}

interface WeeklyCalendarGridProps {
  weekData: DayMeals[];
  onMealClick: (meal: Meal, day: string, mealType: string) => void;
  onAddMeal: (day: string, mealType: string) => void;
}

const WeeklyCalendarGrid = ({ weekData, onMealClick, onAddMeal }: WeeklyCalendarGridProps) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const mealTypes = [
    { key: 'breakfast', label: 'Breakfast', icon: 'SunIcon', color: 'text-accent' },
    { key: 'lunch', label: 'Lunch', icon: 'ClockIcon', color: 'text-primary' },
    { key: 'dinner', label: 'MoonIcon', icon: 'MoonIcon', color: 'text-secondary' },
    { key: 'snack', label: 'Snack', icon: 'CakeIcon', color: 'text-warning' },
  ];

  const formatCost = (cost: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(cost);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-sm">
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left">
                <span className="text-sm font-semibold text-card-foreground">Meal Type</span>
              </th>
              {weekData.map((day) => (
                <th key={day.date} className="p-4 text-center min-w-[180px]">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold text-card-foreground">
                      {day.dayName}
                    </span>
                    <span className="text-xs caption text-muted-foreground mt-1">
                      {day.date}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealTypes.map((mealType) => (
              <tr key={mealType.key} className="border-b border-border last:border-b-0">
                <td className="p-4 bg-muted/30">
                  <div className="flex items-center space-x-2">
                    <Icon name={mealType.icon as any} size={20} className={mealType.color} />
                    <span className="text-sm font-medium text-card-foreground">
                      {mealType.label}
                    </span>
                  </div>
                </td>
                {weekData.map((day) => {
                  const meal = day.meals[mealType.key as keyof typeof day.meals];
                  return (
                    <td key={`${day.date}-${mealType.key}`} className="p-2">
                      {meal ? (
                        <button
                          onClick={() => onMealClick(meal, day.date, mealType.key)}
                          className="w-full p-3 bg-background rounded-lg border border-border hover:border-primary hover:shadow-elevation-sm transition-smooth text-left"
                        >
                          <h4 className="text-sm font-medium text-card-foreground mb-2 line-clamp-1">
                            {meal.name}
                          </h4>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs caption text-muted-foreground">
                              <span>{meal.calories} kcal</span>
                              <span>{meal.prepTime} min</span>
                            </div>
                            <div className="text-xs font-medium text-primary">
                              {formatCost(meal.cost)}
                            </div>
                          </div>
                        </button>
                      ) : (
                        <button
                          onClick={() => onAddMeal(day.date, mealType.key)}
                          className="w-full h-24 flex items-center justify-center border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-smooth"
                        >
                          <Icon name="PlusIcon" size={24} className="text-muted-foreground" />
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden">
        <div className="flex overflow-x-auto space-x-2 p-4 border-b border-border">
          {weekData.map((day) => (
            <button
              key={day.date}
              onClick={() => setSelectedDay(day.date)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg transition-smooth ${
                selectedDay === day.date || (!selectedDay && day.date === weekData[0].date)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-card-foreground'
              }`}
            >
              <div className="text-center">
                <div className="text-sm font-semibold">{day.dayName}</div>
                <div className="text-xs caption mt-1">{day.date}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 space-y-4">
          {mealTypes.map((mealType) => {
            const currentDay =
              weekData.find((d) => d.date === selectedDay) || weekData[0];
            const meal = currentDay.meals[mealType.key as keyof typeof currentDay.meals];

            return (
              <div key={mealType.key} className="bg-background rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon name={mealType.icon as any} size={20} className={mealType.color} />
                    <span className="text-sm font-semibold text-card-foreground">
                      {mealType.label}
                    </span>
                  </div>
                  {!meal && (
                    <button
                      onClick={() => onAddMeal(currentDay.date, mealType.key)}
                      className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
                    >
                      <Icon name="PlusIcon" size={20} />
                    </button>
                  )}
                </div>

                {meal ? (
                  <button
                    onClick={() => onMealClick(meal, currentDay.date, mealType.key)}
                    className="w-full text-left"
                  >
                    <h4 className="text-base font-medium text-card-foreground mb-2">
                      {meal.name}
                    </h4>
                    <div className="flex items-center justify-between text-sm caption text-muted-foreground mb-2">
                      <span>{meal.calories} kcal</span>
                      <span>{meal.prepTime} min</span>
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {formatCost(meal.cost)}
                    </div>
                  </button>
                ) : (
                  <p className="text-sm caption text-muted-foreground text-center py-4">
                    No meal planned
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendarGrid;