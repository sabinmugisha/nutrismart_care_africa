'use client';

import Icon from '@/components/ui/AppIcon';

interface HealthConditionsFormProps {
  formData: {
    healthConditions: string[];
    isPregnant: string;
    allergies: string;
    medications: string;
  };
  onUpdate: (field: string, value: string | string[]) => void;
  errors: Record<string, string>;
}

const HealthConditionsForm = ({ formData, onUpdate, errors }: HealthConditionsFormProps) => {
  const healthConditionOptions = [
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'hypertension', label: 'Hypertension (High Blood Pressure)' },
    { value: 'heart-disease', label: 'Heart Disease' },
    { value: 'kidney-disease', label: 'Kidney Disease' },
    { value: 'obesity', label: 'Obesity' },
    { value: 'anemia', label: 'Anemia' },
    { value: 'malnutrition', label: 'Malnutrition' },
    { value: 'celiac', label: 'Celiac Disease' },
    { value: 'ibs', label: 'Irritable Bowel Syndrome (IBS)' },
    { value: 'none', label: 'None of the above' },
  ];

  const handleConditionToggle = (value: string) => {
    let updatedConditions = [...formData.healthConditions];

    if (value === 'none') {
      updatedConditions = updatedConditions.includes('none') ? [] : ['none'];
    } else {
      updatedConditions = updatedConditions.filter((c) => c !== 'none');
      if (updatedConditions.includes(value)) {
        updatedConditions = updatedConditions.filter((c) => c !== value);
      } else {
        updatedConditions.push(value);
      }
    }

    onUpdate('healthConditions', updatedConditions);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">
          Health Conditions <span className="text-error">*</span>
        </label>
        <p className="text-xs caption text-muted-foreground mb-4">
          Select all that apply to help us provide personalized nutrition guidance
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {healthConditionOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                formData.healthConditions.includes(option.value)
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.healthConditions.includes(option.value)}
                onChange={() => handleConditionToggle(option.value)}
                className="w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm text-card-foreground">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.healthConditions && (
          <p className="mt-2 text-xs caption text-error">{errors.healthConditions}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">
          Pregnancy Status <span className="text-error">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {['yes', 'no', 'not-applicable'].map((value) => (
            <label
              key={value}
              className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                formData.isPregnant === value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="radio"
                name="isPregnant"
                value={value}
                checked={formData.isPregnant === value}
                onChange={(e) => onUpdate('isPregnant', e.target.value)}
                className="w-5 h-5 text-primary border-border focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm text-card-foreground capitalize">
                {value === 'not-applicable' ? 'Not Applicable' : value}
              </span>
            </label>
          ))}
        </div>
        {errors.isPregnant && (
          <p className="mt-2 text-xs caption text-error">{errors.isPregnant}</p>
        )}
      </div>

      <div>
        <label htmlFor="allergies" className="block text-sm font-medium text-card-foreground mb-2">
          Food Allergies or Intolerances
        </label>
        <div className="relative">
          <textarea
            id="allergies"
            value={formData.allergies}
            onChange={(e) => onUpdate('allergies', e.target.value)}
            className="input-base w-full pl-12 pt-3 min-h-[100px] resize-none"
            placeholder="List any food allergies or intolerances (e.g., peanuts, dairy, gluten)"
          />
          <Icon
            name="ExclamationTriangleIcon"
            size={20}
            className="absolute left-4 top-4 text-muted-foreground"
          />
        </div>
        <p className="mt-1 text-xs caption text-muted-foreground">
          Leave blank if you have no known allergies
        </p>
      </div>

      <div>
        <label
          htmlFor="medications"
          className="block text-sm font-medium text-card-foreground mb-2"
        >
          Current Medications
        </label>
        <div className="relative">
          <textarea
            id="medications"
            value={formData.medications}
            onChange={(e) => onUpdate('medications', e.target.value)}
            className="input-base w-full pl-12 pt-3 min-h-[100px] resize-none"
            placeholder="List any medications you are currently taking"
          />
          <Icon
            name="BeakerIcon"
            size={20}
            className="absolute left-4 top-4 text-muted-foreground"
          />
        </div>
        <p className="mt-1 text-xs caption text-muted-foreground">
          This helps us avoid potential food-drug interactions
        </p>
      </div>
    </div>
  );
};

export default HealthConditionsForm;