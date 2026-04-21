'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

// ─── Helper Components ────────────────────────────────────────────────────────

interface RegistrationProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const RegistrationProgress = ({ currentStep, totalSteps, stepLabels }: RegistrationProgressProps) => (
  <div className="w-full mb-8">
    <div className="flex items-center justify-between mb-4">
      {stepLabels.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        return (
          <div key={stepNumber} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${isCompleted ? 'bg-success text-success-foreground' : isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {isCompleted ? <Icon name="CheckIcon" size={20} /> : <span className="text-sm font-semibold">{stepNumber}</span>}
              </div>
              <span className={`mt-2 text-xs caption text-center ${isCurrent ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{label}</span>
            </div>
            {index < totalSteps - 1 && (
              <div className="flex-1 h-1 mx-2 mt-[-24px]"><div className={`h-full transition-smooth ${isCompleted ? 'bg-success' : 'bg-muted'}`} /></div>
            )}
          </div>
        );
      })}
    </div>
    <div className="w-full bg-muted rounded-full h-2"><div className="bg-primary h-2 rounded-full transition-smooth" style={{ width: `${(currentStep / totalSteps) * 100}%` }} /></div>
  </div>
);

interface BasicInfoFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

interface BasicInformationFormProps {
  formData: BasicInfoFormData;
  onUpdate: (field: string, value: string) => void;
  errors: Record<string, string>;
}

const BasicInformationForm = ({ formData, onUpdate, errors }: BasicInformationFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-card-foreground mb-2">Full Name <span className="text-error">*</span></label>
        <div className="relative">
          <input type="text" id="fullName" value={formData.fullName} onChange={(e) => onUpdate('fullName', e.target.value)} className={`input-base w-full pl-12 ${errors.fullName ? 'border-error' : 'border-border'}`} placeholder="Enter your full name" />
          <Icon name="UserIcon" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>
        {errors.fullName && <p className="mt-1 text-xs caption text-error">{errors.fullName}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">Email Address <span className="text-error">*</span></label>
        <div className="relative">
          <input type="email" id="email" value={formData.email} onChange={(e) => onUpdate('email', e.target.value)} className={`input-base w-full pl-12 ${errors.email ? 'border-error' : 'border-border'}`} placeholder="your.email@example.com" />
          <Icon name="EnvelopeIcon" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>
        {errors.email && <p className="mt-1 text-xs caption text-error">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-card-foreground mb-2">Phone Number <span className="text-error">*</span></label>
        <div className="relative">
          <input type="tel" id="phoneNumber" value={formData.phoneNumber} onChange={(e) => onUpdate('phoneNumber', e.target.value)} className={`input-base w-full pl-12 ${errors.phoneNumber ? 'border-error' : 'border-border'}`} placeholder="+250 XXX XXX XXX" />
          <Icon name="PhoneIcon" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>
        {errors.phoneNumber && <p className="mt-1 text-xs caption text-error">{errors.phoneNumber}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-card-foreground mb-2">Password <span className="text-error">*</span></label>
        <div className="relative">
          <input type={showPassword ? 'text' : 'password'} id="password" value={formData.password} onChange={(e) => onUpdate('password', e.target.value)} className={`input-base w-full pl-12 pr-12 ${errors.password ? 'border-error' : 'border-border'}`} placeholder="Create a strong password" />
          <Icon name="LockClosedIcon" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-smooth"><Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} /></button>
        </div>
        {errors.password && <p className="mt-1 text-xs caption text-error">{errors.password}</p>}
        <p className="mt-1 text-xs caption text-muted-foreground">Must be at least 8 characters with uppercase, lowercase, and numbers</p>
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-card-foreground mb-2">Confirm Password <span className="text-error">*</span></label>
        <div className="relative">
          <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" value={formData.confirmPassword} onChange={(e) => onUpdate('confirmPassword', e.target.value)} className={`input-base w-full pl-12 pr-12 ${errors.confirmPassword ? 'border-error' : 'border-border'}`} placeholder="Re-enter your password" />
          <Icon name="LockClosedIcon" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-smooth"><Icon name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} /></button>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-xs caption text-error">{errors.confirmPassword}</p>}
      </div>
    </div>
  );
};

interface DemographicFormData {
  age: string;
  gender: string;
  country: string;
  city: string;
  language: string;
}

interface DemographicDetailsFormProps {
  formData: DemographicFormData;
  onUpdate: (field: string, value: string) => void;
  errors: Record<string, string>;
}

const DemographicDetailsForm = ({ formData, onUpdate, errors }: DemographicDetailsFormProps) => {
  const countries = ['Rwanda', 'Kenya', 'Uganda', 'Tanzania', 'Burundi', 'Ethiopia', 'South Africa', 'Nigeria', 'Ghana', 'Other'];
  const languages = ['English', 'Kinyarwanda', 'Swahili', 'French', 'Amharic'];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-card-foreground mb-2">Age <span className="text-error">*</span></label>
          <div className="relative">
            <input type="number" id="age" value={formData.age} onChange={(e) => onUpdate('age', e.target.value)} className={`input-base w-full pl-12 ${errors.age ? 'border-error' : 'border-border'}`} placeholder="Enter your age" min="1" max="120" />
            <Icon name="CalendarIcon" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
          {errors.age && <p className="mt-1 text-xs caption text-error">{errors.age}</p>}
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-card-foreground mb-2">Gender <span className="text-error">*</span></label>
          <div className="relative">
            <select id="gender" value={formData.gender} onChange={(e) => onUpdate('gender', e.target.value)} className={`input-base w-full pl-12 appearance-none ${errors.gender ? 'border-error' : 'border-border'}`}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            <Icon name="UserIcon" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Icon name="ChevronDownIcon" size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          {errors.gender && <p className="mt-1 text-xs caption text-error">{errors.gender}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-card-foreground mb-2">Country <span className="text-error">*</span></label>
        <div className="relative">
          <select id="country" value={formData.country} onChange={(e) => onUpdate('country', e.target.value)} className={`input-base w-full pl-12 appearance-none ${errors.country ? 'border-error' : 'border-border'}`}>
            <option value="">Select your country</option>
            {countries.map((country) => (<option key={country} value={country}>{country}</option>))}
          </select>
          <Icon name="GlobeAltIcon" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Icon name="ChevronDownIcon" size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
        {errors.country && <p className="mt-1 text-xs caption text-error">{errors.country}</p>}
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-card-foreground mb-2">City/Town <span className="text-error">*</span></label>
        <div className="relative">
          <input type="text" id="city" value={formData.city} onChange={(e) => onUpdate('city', e.target.value)} className={`input-base w-full pl-12 ${errors.city ? 'border-error' : 'border-border'}`} placeholder="Enter your city or town" />
          <Icon name="MapPinIcon" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>
        {errors.city && <p className="mt-1 text-xs caption text-error">{errors.city}</p>}
      </div>
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-card-foreground mb-2">Preferred Language <span className="text-error">*</span></label>
        <div className="relative">
          <select id="language" value={formData.language} onChange={(e) => onUpdate('language', e.target.value)} className={`input-base w-full pl-12 appearance-none ${errors.language ? 'border-error' : 'border-border'}`}>
            <option value="">Select your preferred language</option>
            {languages.map((lang) => (<option key={lang} value={lang}>{lang}</option>))}
          </select>
          <Icon name="LanguageIcon" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Icon name="ChevronDownIcon" size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
        {errors.language && <p className="mt-1 text-xs caption text-error">{errors.language}</p>}
      </div>
    </div>
  );
};

interface HealthFormData {
  healthConditions: string[];
  isPregnant: string;
  allergies: string;
  medications: string;
}

interface HealthConditionsFormProps {
  formData: HealthFormData;
  onUpdate: (field: string, value: string | string[]) => void;
  errors: Record<string, string>;
}

const HealthConditionsForm = ({ formData, onUpdate, errors }: HealthConditionsFormProps) => {
  const healthConditionOptions = [
    { value: 'diabetes', label: 'Diabetes' }, { value: 'hypertension', label: 'Hypertension (High Blood Pressure)' },
    { value: 'heart-disease', label: 'Heart Disease' }, { value: 'kidney-disease', label: 'Kidney Disease' },
    { value: 'obesity', label: 'Obesity' }, { value: 'anemia', label: 'Anemia' },
    { value: 'malnutrition', label: 'Malnutrition' }, { value: 'celiac', label: 'Celiac Disease' },
    { value: 'ibs', label: 'Irritable Bowel Syndrome (IBS)' }, { value: 'none', label: 'None of the above' },
  ];
  const handleConditionToggle = (value: string) => {
    let updatedConditions = [...formData.healthConditions];
    if (value === 'none') { updatedConditions = updatedConditions.includes('none') ? [] : ['none']; }
    else { updatedConditions = updatedConditions.filter((c) => c !== 'none'); if (updatedConditions.includes(value)) { updatedConditions = updatedConditions.filter((c) => c !== value); } else { updatedConditions.push(value); } }
    onUpdate('healthConditions', updatedConditions);
  };
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">Health Conditions <span className="text-error">*</span></label>
        <p className="text-xs caption text-muted-foreground mb-4">Select all that apply to help us provide personalized nutrition guidance</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {healthConditionOptions.map((option) => (
            <label key={option.value} className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-smooth ${formData.healthConditions.includes(option.value) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
              <input type="checkbox" checked={formData.healthConditions.includes(option.value)} onChange={() => handleConditionToggle(option.value)} className="w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary" />
              <span className="text-sm text-card-foreground">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.healthConditions && <p className="mt-2 text-xs caption text-error">{errors.healthConditions}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">Pregnancy Status <span className="text-error">*</span></label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {['yes', 'no', 'not-applicable'].map((value) => (
            <label key={value} className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 cursor-pointer transition-smooth ${formData.isPregnant === value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
              <input type="radio" name="isPregnant" value={value} checked={formData.isPregnant === value} onChange={(e) => onUpdate('isPregnant', e.target.value)} className="w-5 h-5 text-primary border-border focus:ring-2 focus:ring-primary" />
              <span className="text-sm text-card-foreground capitalize">{value === 'not-applicable' ? 'Not Applicable' : value}</span>
            </label>
          ))}
        </div>
        {errors.isPregnant && <p className="mt-2 text-xs caption text-error">{errors.isPregnant}</p>}
      </div>
      <div>
        <label htmlFor="allergies" className="block text-sm font-medium text-card-foreground mb-2">Food Allergies or Intolerances</label>
        <div className="relative">
          <textarea id="allergies" value={formData.allergies} onChange={(e) => onUpdate('allergies', e.target.value)} className="input-base w-full pl-12 pt-3 min-h-[100px] resize-none" placeholder="List any food allergies or intolerances (e.g., peanuts, dairy, gluten)" />
          <Icon name="ExclamationTriangleIcon" size={20} className="absolute left-4 top-4 text-muted-foreground" />
        </div>
        <p className="mt-1 text-xs caption text-muted-foreground">Leave blank if you have no known allergies</p>
      </div>
      <div>
        <label htmlFor="medications" className="block text-sm font-medium text-card-foreground mb-2">Current Medications</label>
        <div className="relative">
          <textarea id="medications" value={formData.medications} onChange={(e) => onUpdate('medications', e.target.value)} className="input-base w-full pl-12 pt-3 min-h-[100px] resize-none" placeholder="List any medications you are currently taking" />
          <Icon name="BeakerIcon" size={20} className="absolute left-4 top-4 text-muted-foreground" />
        </div>
        <p className="mt-1 text-xs caption text-muted-foreground">This helps us avoid potential food-drug interactions</p>
      </div>
    </div>
  );
};

interface LifestyleFormData {
  activityLevel: string;
  dietaryRestrictions: string[];
  mealFrequency: string;
  cookingSkill: string;
  budgetLevel: string;
}

interface LifestyleFactorsFormProps {
  formData: LifestyleFormData;
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
    { value: 'vegetarian', label: 'Vegetarian' }, { value: 'vegan', label: 'Vegan' },
    { value: 'halal', label: 'Halal' }, { value: 'kosher', label: 'Kosher' },
    { value: 'low-carb', label: 'Low Carb' }, { value: 'low-fat', label: 'Low Fat' },
    { value: 'none', label: 'No restrictions' },
  ];
  const handleRestrictionToggle = (value: string) => {
    let updatedRestrictions = [...formData.dietaryRestrictions];
    if (value === 'none') { updatedRestrictions = updatedRestrictions.includes('none') ? [] : ['none']; }
    else { updatedRestrictions = updatedRestrictions.filter((r) => r !== 'none'); if (updatedRestrictions.includes(value)) { updatedRestrictions = updatedRestrictions.filter((r) => r !== value); } else { updatedRestrictions.push(value); } }
    onUpdate('dietaryRestrictions', updatedRestrictions);
  };
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">Activity Level <span className="text-error">*</span></label>
        <div className="space-y-3">
          {activityLevels.map((level) => (
            <label key={level.value} className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-smooth ${formData.activityLevel === level.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
              <input type="radio" name="activityLevel" value={level.value} checked={formData.activityLevel === level.value} onChange={(e) => onUpdate('activityLevel', e.target.value)} className="w-5 h-5 mt-0.5 text-primary border-border focus:ring-2 focus:ring-primary" />
              <div className="flex-1"><p className="text-sm font-medium text-card-foreground">{level.label}</p><p className="text-xs caption text-muted-foreground">{level.description}</p></div>
            </label>
          ))}
        </div>
        {errors.activityLevel && <p className="mt-2 text-xs caption text-error">{errors.activityLevel}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">Dietary Restrictions <span className="text-error">*</span></label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dietaryRestrictionOptions.map((option) => (
            <label key={option.value} className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-smooth ${formData.dietaryRestrictions.includes(option.value) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
              <input type="checkbox" checked={formData.dietaryRestrictions.includes(option.value)} onChange={() => handleRestrictionToggle(option.value)} className="w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary" />
              <span className="text-sm text-card-foreground">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.dietaryRestrictions && <p className="mt-2 text-xs caption text-error">{errors.dietaryRestrictions}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="mealFrequency" className="block text-sm font-medium text-card-foreground mb-2">Meals Per Day <span className="text-error">*</span></label>
          <div className="relative">
            <select id="mealFrequency" value={formData.mealFrequency} onChange={(e) => onUpdate('mealFrequency', e.target.value)} className={`input-base w-full pl-12 appearance-none ${errors.mealFrequency ? 'border-error' : 'border-border'}`}>
              <option value="">Select frequency</option>
              <option value="2">2 meals</option><option value="3">3 meals</option><option value="4">4 meals</option><option value="5">5+ meals</option>
            </select>
            <Icon name="ClockIcon" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Icon name="ChevronDownIcon" size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          {errors.mealFrequency && <p className="mt-1 text-xs caption text-error">{errors.mealFrequency}</p>}
        </div>
        <div>
          <label htmlFor="cookingSkill" className="block text-sm font-medium text-card-foreground mb-2">Cooking Skill Level <span className="text-error">*</span></label>
          <div className="relative">
            <select id="cookingSkill" value={formData.cookingSkill} onChange={(e) => onUpdate('cookingSkill', e.target.value)} className={`input-base w-full pl-12 appearance-none ${errors.cookingSkill ? 'border-error' : 'border-border'}`}>
              <option value="">Select skill level</option>
              <option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option><option value="expert">Expert</option>
            </select>
            <Icon name="FireIcon" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Icon name="ChevronDownIcon" size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          {errors.cookingSkill && <p className="mt-1 text-xs caption text-error">{errors.cookingSkill}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">Monthly Food Budget <span className="text-error">*</span></label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[{ value: 'low', label: 'Low Budget', description: 'Under 50,000 RWF' }, { value: 'medium', label: 'Medium Budget', description: '50,000 - 150,000 RWF' }, { value: 'high', label: 'Flexible Budget', description: 'Above 150,000 RWF' }].map((budget) => (
            <label key={budget.value} className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-smooth ${formData.budgetLevel === budget.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
              <input type="radio" name="budgetLevel" value={budget.value} checked={formData.budgetLevel === budget.value} onChange={(e) => onUpdate('budgetLevel', e.target.value)} className="w-5 h-5 mb-2 text-primary border-border focus:ring-2 focus:ring-primary" />
              <p className="text-sm font-medium text-card-foreground text-center">{budget.label}</p>
              <p className="text-xs caption text-muted-foreground text-center mt-1">{budget.description}</p>
            </label>
          ))}
        </div>
        {errors.budgetLevel && <p className="mt-2 text-xs caption text-error">{errors.budgetLevel}</p>}
      </div>
    </div>
  );
};

interface FoodAccessFormData {
  marketAccess: string;
  preferredFoods: string[];
  avoidedFoods: string;
  nutritionGoals: string[];
}

interface FoodAccessFormProps {
  formData: FoodAccessFormData;
  onUpdate: (field: string, value: string | string[]) => void;
  errors: Record<string, string>;
}

const FoodAccessForm = ({ formData, onUpdate, errors }: FoodAccessFormProps) => {
  const preferredFoodOptions = [
    { value: 'beans', label: 'Beans & Legumes' }, { value: 'cassava', label: 'Cassava' },
    { value: 'sweet-potato', label: 'Sweet Potatoes' }, { value: 'plantain', label: 'Plantains' },
    { value: 'maize', label: 'Maize/Corn' }, { value: 'rice', label: 'Rice' },
    { value: 'fish', label: 'Fish' }, { value: 'chicken', label: 'Chicken' },
    { value: 'beef', label: 'Beef' }, { value: 'vegetables', label: 'Green Vegetables' },
    { value: 'fruits', label: 'Fruits' }, { value: 'dairy', label: 'Dairy Products' },
  ];
  const nutritionGoalOptions = [
    { value: 'weight-loss', label: 'Weight Loss' }, { value: 'weight-gain', label: 'Weight Gain' },
    { value: 'muscle-building', label: 'Muscle Building' }, { value: 'disease-management', label: 'Disease Management' },
    { value: 'pregnancy-nutrition', label: 'Pregnancy Nutrition' }, { value: 'child-nutrition', label: 'Child Nutrition' },
    { value: 'general-health', label: 'General Health Improvement' }, { value: 'energy-boost', label: 'Energy & Vitality' },
  ];
  const handleFoodToggle = (value: string) => { const updatedFoods = formData.preferredFoods.includes(value) ? formData.preferredFoods.filter((f) => f !== value) : [...formData.preferredFoods, value]; onUpdate('preferredFoods', updatedFoods); };
  const handleGoalToggle = (value: string) => { const updatedGoals = formData.nutritionGoals.includes(value) ? formData.nutritionGoals.filter((g) => g !== value) : [...formData.nutritionGoals, value]; onUpdate('nutritionGoals', updatedGoals); };
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">Market Access <span className="text-error">*</span></label>
        <div className="space-y-3">
          {[{ value: 'daily', label: 'Daily Access', description: 'I can visit markets or shops daily' }, { value: 'weekly', label: 'Weekly Access', description: 'I shop once or twice per week' }, { value: 'limited', label: 'Limited Access', description: 'I have limited access to fresh foods' }].map((access) => (
            <label key={access.value} className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-smooth ${formData.marketAccess === access.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
              <input type="radio" name="marketAccess" value={access.value} checked={formData.marketAccess === access.value} onChange={(e) => onUpdate('marketAccess', e.target.value)} className="w-5 h-5 mt-0.5 text-primary border-border focus:ring-2 focus:ring-primary" />
              <div className="flex-1"><p className="text-sm font-medium text-card-foreground">{access.label}</p><p className="text-xs caption text-muted-foreground">{access.description}</p></div>
            </label>
          ))}
        </div>
        {errors.marketAccess && <p className="mt-2 text-xs caption text-error">{errors.marketAccess}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">Preferred Local Foods <span className="text-error">*</span></label>
        <p className="text-xs caption text-muted-foreground mb-4">Select foods you commonly eat and enjoy</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {preferredFoodOptions.map((food) => (
            <label key={food.value} className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-smooth ${formData.preferredFoods.includes(food.value) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
              <input type="checkbox" checked={formData.preferredFoods.includes(food.value)} onChange={() => handleFoodToggle(food.value)} className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary" />
              <span className="text-sm text-card-foreground">{food.label}</span>
            </label>
          ))}
        </div>
        {errors.preferredFoods && <p className="mt-2 text-xs caption text-error">{errors.preferredFoods}</p>}
      </div>
      <div>
        <label htmlFor="avoidedFoods" className="block text-sm font-medium text-card-foreground mb-2">Foods You Avoid</label>
        <div className="relative">
          <textarea id="avoidedFoods" value={formData.avoidedFoods} onChange={(e) => onUpdate('avoidedFoods', e.target.value)} className="input-base w-full pl-12 pt-3 min-h-[100px] resize-none" placeholder="List any foods you prefer not to eat (cultural, personal preference, etc.)" />
          <Icon name="XCircleIcon" size={20} className="absolute left-4 top-4 text-muted-foreground" />
        </div>
        <p className="mt-1 text-xs caption text-muted-foreground">This helps us create meal plans that respect your preferences</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-3">Nutrition Goals <span className="text-error">*</span></label>
        <p className="text-xs caption text-muted-foreground mb-4">Select your primary nutrition objectives</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {nutritionGoalOptions.map((goal) => (
            <label key={goal.value} className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-smooth ${formData.nutritionGoals.includes(goal.value) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
              <input type="checkbox" checked={formData.nutritionGoals.includes(goal.value)} onChange={() => handleGoalToggle(goal.value)} className="w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary" />
              <span className="text-sm text-card-foreground">{goal.label}</span>
            </label>
          ))}
        </div>
        {errors.nutritionGoals && <p className="mt-2 text-xs caption text-error">{errors.nutritionGoals}</p>}
      </div>
    </div>
  );
};

// ─── Main Interactive Component ───────────────────────────────────────────────

interface FormData {
  fullName: string; email: string; password: string; confirmPassword: string; phoneNumber: string;
  age: string; gender: string; country: string; city: string; language: string;
  healthConditions: string[]; isPregnant: string; allergies: string; medications: string;
  activityLevel: string; dietaryRestrictions: string[]; mealFrequency: string; cookingSkill: string; budgetLevel: string;
  marketAccess: string; preferredFoods: string[]; avoidedFoods: string; nutritionGoals: string[];
}

const RegistrationInteractive = () => {
  const router = useRouter();
  const { signUp } = useAuth();
  const supabase = createClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [isHydrated, setIsHydrated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: '', email: '', password: '', confirmPassword: '', phoneNumber: '',
    age: '', gender: '', country: '', city: '', language: '',
    healthConditions: [], isPregnant: '', allergies: '', medications: '',
    activityLevel: '', dietaryRestrictions: [], mealFrequency: '', cookingSkill: '', budgetLevel: '',
    marketAccess: '', preferredFoods: [], avoidedFoods: '', nutritionGoals: [],
  });

  useEffect(() => { setIsHydrated(true); }, []);

  const stepLabels = ['Basic Info', 'Demographics', 'Health', 'Lifestyle', 'Food Access'];

  const handleUpdate = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) { setErrors((prev) => { const newErrors = { ...prev }; delete newErrors[field]; return newErrors; }); }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) { newErrors.email = 'Email is required'; } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { newErrors.email = 'Please enter a valid email address'; }
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.password) { newErrors.password = 'Password is required'; } else if (formData.password.length < 8) { newErrors.password = 'Password must be at least 8 characters'; } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) { newErrors.password = 'Password must contain uppercase, lowercase, and numbers'; }
        if (formData.password !== formData.confirmPassword) { newErrors.confirmPassword = 'Passwords do not match'; }
        break;
      case 2:
        if (!formData.age) { newErrors.age = 'Age is required'; } else if (parseInt(formData.age) < 1 || parseInt(formData.age) > 120) { newErrors.age = 'Please enter a valid age'; }
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.language) newErrors.language = 'Preferred language is required';
        break;
      case 3:
        if (formData.healthConditions.length === 0) { newErrors.healthConditions = 'Please select at least one option'; }
        if (!formData.isPregnant) newErrors.isPregnant = 'Please select an option';
        break;
      case 4:
        if (!formData.activityLevel) newErrors.activityLevel = 'Activity level is required';
        if (formData.dietaryRestrictions.length === 0) { newErrors.dietaryRestrictions = 'Please select at least one option'; }
        if (!formData.mealFrequency) newErrors.mealFrequency = 'Meal frequency is required';
        if (!formData.cookingSkill) newErrors.cookingSkill = 'Cooking skill level is required';
        if (!formData.budgetLevel) newErrors.budgetLevel = 'Budget level is required';
        break;
      case 5:
        if (!formData.marketAccess) newErrors.marketAccess = 'Market access is required';
        if (formData.preferredFoods.length === 0) { newErrors.preferredFoods = 'Please select at least one preferred food'; }
        if (formData.nutritionGoals.length === 0) { newErrors.nutritionGoals = 'Please select at least one nutrition goal'; }
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (validateStep(currentStep)) { setCurrentStep((prev) => Math.min(prev + 1, 5)); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  const handlePrevious = () => { setCurrentStep((prev) => Math.max(prev - 1, 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const authData = await signUp(formData.email, formData.password, { fullName: formData.fullName, role: 'individual' });
      if (authData?.user) {
        const { error: profileError } = await supabase.from('user_profiles').update({ phone_number: formData.phoneNumber, age: parseInt(formData.age) || null, gender: formData.gender, country: formData.country, city: formData.city, preferred_language: formData.language }).eq('id', authData.user.id);
        if (profileError) console.log('Profile update error:', profileError.message);
        const { error: healthError } = await supabase.from('health_profiles').insert({ user_id: authData.user.id, health_conditions: formData.healthConditions, is_pregnant: formData.isPregnant === 'yes', allergies: formData.allergies, medications: formData.medications, activity_level: formData.activityLevel, dietary_restrictions: formData.dietaryRestrictions, meal_frequency: formData.mealFrequency, cooking_skill: formData.cookingSkill, budget_level: formData.budgetLevel, market_access: formData.marketAccess, preferred_foods: formData.preferredFoods, avoided_foods: formData.avoidedFoods, nutrition_goals: formData.nutritionGoals });
        if (healthError) console.log('Health profile error:', healthError.message);
      }
      router.push('/personal-dashboard');
      router.refresh();
    } catch (error: any) {
      setSubmitError(error?.message || 'Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center"><Icon name="ArrowPathIcon" size={48} className="text-primary animate-spin mx-auto mb-4" /><p className="text-muted-foreground">Loading registration form...</p></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/login" className="inline-flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary">
                <svg className="w-7 h-7 text-primary-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-left"><h1 className="text-2xl font-semibold font-heading text-primary">NutriSmart</h1><p className="text-xs caption text-muted-foreground">Care Africa</p></div>
            </Link>
            <h2 className="text-3xl font-heading font-semibold text-card-foreground mb-2">Create Your Account</h2>
            <p className="text-muted-foreground">Join NutriSmart to start your personalized nutrition journey</p>
          </div>
          <div className="card-base">
            <RegistrationProgress currentStep={currentStep} totalSteps={5} stepLabels={stepLabels} />
            {submitError && (
              <div className="mt-4 p-4 bg-error/10 border border-error/20 rounded-lg flex items-start space-x-3">
                <Icon name="ExclamationCircleIcon" size={20} className="text-error flex-shrink-0 mt-0.5" />
                <p className="text-sm text-error">{submitError}</p>
              </div>
            )}
            <div className="mt-8">
              {currentStep === 1 && <BasicInformationForm formData={formData} onUpdate={handleUpdate} errors={errors} />}
              {currentStep === 2 && <DemographicDetailsForm formData={formData} onUpdate={handleUpdate} errors={errors} />}
              {currentStep === 3 && <HealthConditionsForm formData={formData} onUpdate={handleUpdate} errors={errors} />}
              {currentStep === 4 && <LifestyleFactorsForm formData={formData} onUpdate={handleUpdate} errors={errors} />}
              {currentStep === 5 && <FoodAccessForm formData={formData} onUpdate={handleUpdate} errors={errors} />}
            </div>
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              {currentStep > 1 ? (
                <button onClick={handlePrevious} className="flex items-center space-x-2 px-6 py-3 rounded-lg border-2 border-border text-card-foreground hover:bg-muted transition-smooth"><Icon name="ChevronLeftIcon" size={20} /><span className="font-medium">Previous</span></button>
              ) : <div />}
              {currentStep < 5 ? (
                <button onClick={handleNext} className="flex items-center space-x-2 button-base bg-primary text-primary-foreground hover:bg-primary/90"><span className="font-medium">Continue</span><Icon name="ChevronRightIcon" size={20} /></button>
              ) : (
                <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center space-x-2 button-base bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? (<><Icon name="ArrowPathIcon" size={20} className="animate-spin" /><span className="font-medium">Creating Account...</span></>) : (<><span className="font-medium">Create Account</span><Icon name="CheckIcon" size={20} /></>)}
                </button>
              )}
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">Already have an account?{' '}<Link href="/login" className="text-primary hover:text-primary/80 font-medium">Sign in here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationInteractive;