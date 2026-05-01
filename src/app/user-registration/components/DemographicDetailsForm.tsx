'use client';

import Icon from '@/components/ui/AppIcon';

interface DemographicDetailsFormProps {
  formData: {
    age: string;
    gender: string;
    country: string;
    city: string;
    language: string;
  };
  onUpdate: (field: string, value: string) => void;
  errors: Record<string, string>;
}

const DemographicDetailsForm = ({ formData, onUpdate, errors }: DemographicDetailsFormProps) => {
  const countries = [
    'Rwanda',
    'Kenya',
    'Uganda',
    'Tanzania',
    'Burundi',
    'Ethiopia',
    'South Africa',
    'Nigeria',
    'Ghana',
    'Other',
  ];

  const languages = ['English', 'Kinyarwanda', 'Swahili', 'French', 'Amharic'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-card-foreground mb-2">
            Age <span className="text-error">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              id="age"
              value={formData.age}
              onChange={(e) => onUpdate('age', e.target.value)}
              className={`input-base w-full pl-12 ${
                errors.age ? 'border-error' : 'border-border'
              }`}
              placeholder="Enter your age"
              min="1"
              max="120"
            />
            <Icon
              name="CalendarIcon"
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
          </div>
          {errors.age && <p className="mt-1 text-xs caption text-error">{errors.age}</p>}
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-card-foreground mb-2">
            Gender <span className="text-error">*</span>
          </label>
          <div className="relative">
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) => onUpdate('gender', e.target.value)}
              className={`input-base w-full pl-12 appearance-none ${
                errors.gender ? 'border-error' : 'border-border'
              }`}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            <Icon
              name="UserIcon"
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Icon
              name="ChevronDownIcon"
              size={20}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>
          {errors.gender && <p className="mt-1 text-xs caption text-error">{errors.gender}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-card-foreground mb-2">
          Country <span className="text-error">*</span>
        </label>
        <div className="relative">
          <select
            id="country"
            value={formData.country}
            onChange={(e) => onUpdate('country', e.target.value)}
            className={`input-base w-full pl-12 appearance-none ${
              errors.country ? 'border-error' : 'border-border'
            }`}
          >
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <Icon
            name="GlobeAltIcon"
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Icon
            name="ChevronDownIcon"
            size={20}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>
        {errors.country && <p className="mt-1 text-xs caption text-error">{errors.country}</p>}
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-card-foreground mb-2">
          City/Town <span className="text-error">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => onUpdate('city', e.target.value)}
            className={`input-base w-full pl-12 ${errors.city ? 'border-error' : 'border-border'}`}
            placeholder="Enter your city or town"
          />
          <Icon
            name="MapPinIcon"
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
        </div>
        {errors.city && <p className="mt-1 text-xs caption text-error">{errors.city}</p>}
      </div>

      <div>
        <label htmlFor="language" className="block text-sm font-medium text-card-foreground mb-2">
          Preferred Language <span className="text-error">*</span>
        </label>
        <div className="relative">
          <select
            id="language"
            value={formData.language}
            onChange={(e) => onUpdate('language', e.target.value)}
            className={`input-base w-full pl-12 appearance-none ${
              errors.language ? 'border-error' : 'border-border'
            }`}
          >
            <option value="">Select your preferred language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <Icon
            name="LanguageIcon"
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Icon
            name="ChevronDownIcon"
            size={20}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>
        {errors.language && <p className="mt-1 text-xs caption text-error">{errors.language}</p>}
      </div>
    </div>
  );
};

export default DemographicDetailsForm;