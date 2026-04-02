'use client';

import Icon from '@/components/ui/AppIcon';

interface FoodAccessFormProps {
  formData: {
    marketAccess: string;
    preferredFoods: string[];
    avoidedFoods: string;
    nutritionGoals: string[];
  };
  onUpdate: (field: string, value: string | string[]) => void;
  errors: Record<string, string>;
}

const FoodAccessForm = ({ formData, onUpdate, errors }: FoodAccessFormProps) => {
  const preferredFoodOptions = [
    { value: 'beans', label: 'Beans & Legumes' },
    { value: 'cassava', label: 'Cassava' },
    { value: 'sweet-potato', label: 'Sweet Potatoes' },
    { value: 'plantain', label: 'Plantains' },
    { value: 'maize', label: 'Maize/Corn' },
    { value: 'rice', label: 'Rice' },
    { value: 'fish', label: 'Fish' },
    { value: 'chicken', label: 'Chicken' },
    { value: 'beef', label: 'Beef' },
    { value: 'vegetables', label: 'Green Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'dairy', label: 'Dairy Products' },
  ];

  const nutritionGoalOptions = [
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'weight-gain', label: 'Weight Gain' },
    { value: 'muscle-building', label: 'Muscle Building' },
    { value: 'disease-management', label: 'Disease Management' },
    { value: 'pregnancy-nutrition', label: 'Pregnancy Nutrition' },
    { value: 'child-nutrition', label: 'Child Nutrition' },
    { value: 'general-health', label: 'General Health Improvement' },
    { value: 'energy-boost', label: 'Energy & Vitality' },
  ];

  const handleFoodToggle = (value: string) => {
    const updatedFoods = formData.preferredFoods.includes(value)
      ? formData.preferredFoods.filter((f) => f !== value)
      : [...formData.preferredFoods, value];
    onUpdate('preferredFoods', updatedFoods);
  };

  const handleGoalToggle = (value: string) => {
    const updatedGoals = formData.nutritionGoals.includes(value)
      ? formData.nutritionGoals.filter((g) => g !== value)
      : [...formData.nutritionGoals, value];
    onUpdate('nutritionGoals', updatedGoals);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">
          Market Access <span className="text-error">*</span>
        </label>
        <div className="space-y-3">
          {[
            {
              value: 'daily',
              label: 'Daily Access',
              description: 'I can visit markets or shops daily',
            },
            {
              value: 'weekly',
              label: 'Weekly Access',
              description: 'I shop once or twice per week',
            },
            {
              value: 'limited',
              label: 'Limited Access',
              description: 'I have limited access to fresh foods',
            },
          ].map((access) => (
            <label
              key={access.value}
              className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                formData.marketAccess === access.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="radio"
                name="marketAccess"
                value={access.value}
                checked={formData.marketAccess === access.value}
                onChange={(e) => onUpdate('marketAccess', e.target.value)}
                className="w-5 h-5 mt-0.5 text-primary border-border focus:ring-2 focus:ring-primary"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">{access.label}</p>
                <p className="text-xs caption text-muted-foreground">{access.description}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.marketAccess && (
          <p className="mt-2 text-xs caption text-error">{errors.marketAccess}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">
          Preferred Local Foods <span className="text-error">*</span>
        </label>
        <p className="text-xs caption text-muted-foreground mb-4">
          Select foods you commonly eat and enjoy
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {preferredFoodOptions.map((food) => (
            <label
              key={food.value}
              className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-smooth ${
                formData.preferredFoods.includes(food.value)
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.preferredFoods.includes(food.value)}
                onChange={() => handleFoodToggle(food.value)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm text-card-foreground">{food.label}</span>
            </label>
          ))}
        </div>
        {errors.preferredFoods && (
          <p className="mt-2 text-xs caption text-error">{errors.preferredFoods}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="avoidedFoods"
          className="block text-sm font-medium text-card-foreground mb-2"
        >
          Foods You Avoid
        </label>
        <div className="relative">
          <textarea
            id="avoidedFoods"
            value={formData.avoidedFoods}
            onChange={(e) => onUpdate('avoidedFoods', e.target.value)}
            className="input-base w-full pl-12 pt-3 min-h-[100px] resize-none"
            placeholder="List any foods you prefer not to eat (cultural, personal preference, etc.)"
          />
          <Icon
            name="XCircleIcon"
            size={20}
            className="absolute left-4 top-4 text-muted-foreground"
          />
        </div>
        <p className="mt-1 text-xs caption text-muted-foreground">
          This helps us create meal plans that respect your preferences
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">
          Nutrition Goals <span className="text-error">*</span>
        </label>
        <p className="text-xs caption text-muted-foreground mb-4">
          Select your primary nutrition objectives
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {nutritionGoalOptions.map((goal) => (
            <label
              key={goal.value}
              className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                formData.nutritionGoals.includes(goal.value)
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.nutritionGoals.includes(goal.value)}
                onChange={() => handleGoalToggle(goal.value)}
                className="w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm text-card-foreground">{goal.label}</span>
            </label>
          ))}
        </div>
        {errors.nutritionGoals && (
          <p className="mt-2 text-xs caption text-error">{errors.nutritionGoals}</p>
        )}
      </div>
    </div>
  );
};

export default FoodAccessForm;