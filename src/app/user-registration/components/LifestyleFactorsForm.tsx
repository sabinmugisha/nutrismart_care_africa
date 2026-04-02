'use client';

import Icon from '@/components/ui/AppIcon';

interface LifestyleFactorsFormProps {
  formData: {
    activityLevel: string;
    dietaryRestrictions: string[];
    mealFrequency: string;
    cookingSkill: string;
    budgetLevel: string;
  };
  onUpdate: (field: string, value: string | string[]) => void;
  errors: Record<string, string>;
}

const LifestyleFactorsForm = ({ formData, onUpdate, errors }: LifestyleFactorsFormProps) => {
  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
    { value: 'light', label: 'Lightly Active', description: 'Exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderately Active', description: 'Exercise 3-5 days/week' },
    { value: 'very', label: 'Very Active', description: 'Exercise 6-7 days/week' },
    { value: 'extra', label: 'Extra Active', description: 'Physical job + exercise' },
  ];

  const dietaryRestrictionOptions = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'halal', label: 'Halal' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'low-carb', label: 'Low Carb' },
    { value: 'low-fat', label: 'Low Fat' },
    { value: 'none', label: 'No restrictions' },
  ];

  const handleRestrictionToggle = (value: string) => {
    let updatedRestrictions = [...formData.dietaryRestrictions];

    if (value === 'none') {
      updatedRestrictions = updatedRestrictions.includes('none') ? [] : ['none'];
    } else {
      updatedRestrictions = updatedRestrictions.filter((r) => r !== 'none');
      if (updatedRestrictions.includes(value)) {
        updatedRestrictions = updatedRestrictions.filter((r) => r !== value);
      } else {
        updatedRestrictions.push(value);
      }
    }

    onUpdate('dietaryRestrictions', updatedRestrictions);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">
          Activity Level <span className="text-error">*</span>
        </label>
        <div className="space-y-3">
          {activityLevels.map((level) => (
            <label
              key={level.value}
              className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                formData.activityLevel === level.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="radio"
                name="activityLevel"
                value={level.value}
                checked={formData.activityLevel === level.value}
                onChange={(e) => onUpdate('activityLevel', e.target.value)}
                className="w-5 h-5 mt-0.5 text-primary border-border focus:ring-2 focus:ring-primary"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">{level.label}</p>
                <p className="text-xs caption text-muted-foreground">{level.description}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.activityLevel && (
          <p className="mt-2 text-xs caption text-error">{errors.activityLevel}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">
          Dietary Restrictions <span className="text-error">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dietaryRestrictionOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                formData.dietaryRestrictions.includes(option.value)
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.dietaryRestrictions.includes(option.value)}
                onChange={() => handleRestrictionToggle(option.value)}
                className="w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm text-card-foreground">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.dietaryRestrictions && (
          <p className="mt-2 text-xs caption text-error">{errors.dietaryRestrictions}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="mealFrequency"
            className="block text-sm font-medium text-card-foreground mb-2"
          >
            Meals Per Day <span className="text-error">*</span>
          </label>
          <div className="relative">
            <select
              id="mealFrequency"
              value={formData.mealFrequency}
              onChange={(e) => onUpdate('mealFrequency', e.target.value)}
              className={`input-base w-full pl-12 appearance-none ${
                errors.mealFrequency ? 'border-error' : 'border-border'
              }`}
            >
              <option value="">Select frequency</option>
              <option value="2">2 meals</option>
              <option value="3">3 meals</option>
              <option value="4">4 meals</option>
              <option value="5">5+ meals</option>
            </select>
            <Icon
              name="ClockIcon"
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Icon
              name="ChevronDownIcon"
              size={20}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>
          {errors.mealFrequency && (
            <p className="mt-1 text-xs caption text-error">{errors.mealFrequency}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="cookingSkill"
            className="block text-sm font-medium text-card-foreground mb-2"
          >
            Cooking Skill Level <span className="text-error">*</span>
          </label>
          <div className="relative">
            <select
              id="cookingSkill"
              value={formData.cookingSkill}
              onChange={(e) => onUpdate('cookingSkill', e.target.value)}
              className={`input-base w-full pl-12 appearance-none ${
                errors.cookingSkill ? 'border-error' : 'border-border'
              }`}
            >
              <option value="">Select skill level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
            <Icon
              name="FireIcon"
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Icon
              name="ChevronDownIcon"
              size={20}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>
          {errors.cookingSkill && (
            <p className="mt-1 text-xs caption text-error">{errors.cookingSkill}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">
          Monthly Food Budget <span className="text-error">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { value: 'low', label: 'Low Budget', description: 'Under 50,000 RWF' },
            { value: 'medium', label: 'Medium Budget', description: '50,000 - 150,000 RWF' },
            { value: 'high', label: 'Flexible Budget', description: 'Above 150,000 RWF' },
          ].map((budget) => (
            <label
              key={budget.value}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                formData.budgetLevel === budget.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="radio"
                name="budgetLevel"
                value={budget.value}
                checked={formData.budgetLevel === budget.value}
                onChange={(e) => onUpdate('budgetLevel', e.target.value)}
                className="w-5 h-5 mb-2 text-primary border-border focus:ring-2 focus:ring-primary"
              />
              <p className="text-sm font-medium text-card-foreground text-center">
                {budget.label}
              </p>
              <p className="text-xs caption text-muted-foreground text-center mt-1">
                {budget.description}
              </p>
            </label>
          ))}
        </div>
        {errors.budgetLevel && (
          <p className="mt-2 text-xs caption text-error">{errors.budgetLevel}</p>
        )}
      </div>
    </div>
  );
};

export default LifestyleFactorsForm;