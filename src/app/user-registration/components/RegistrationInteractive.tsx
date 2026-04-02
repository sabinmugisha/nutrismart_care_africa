'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import RegistrationProgress from './RegistrationProgress';
import BasicInformationForm from './BasicInformationForm';
import DemographicDetailsForm from './DemographicDetailsForm';
import HealthConditionsForm from './HealthConditionsForm';
import LifestyleFactorsForm from './LifestyleFactorsForm';
import FoodAccessForm from './FoodAccessForm';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  age: string;
  gender: string;
  country: string;
  city: string;
  language: string;
  healthConditions: string[];
  isPregnant: string;
  allergies: string;
  medications: string;
  activityLevel: string;
  dietaryRestrictions: string[];
  mealFrequency: string;
  cookingSkill: string;
  budgetLevel: string;
  marketAccess: string;
  preferredFoods: string[];
  avoidedFoods: string;
  nutritionGoals: string[];
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
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    age: '',
    gender: '',
    country: '',
    city: '',
    language: '',
    healthConditions: [],
    isPregnant: '',
    allergies: '',
    medications: '',
    activityLevel: '',
    dietaryRestrictions: [],
    mealFrequency: '',
    cookingSkill: '',
    budgetLevel: '',
    marketAccess: '',
    preferredFoods: [],
    avoidedFoods: '',
    nutritionGoals: [],
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const stepLabels = [
    'Basic Info',
    'Demographics',
    'Health',
    'Lifestyle',
    'Food Access',
  ];

  const handleUpdate = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
          newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;

      case 2:
        if (!formData.age) {
          newErrors.age = 'Age is required';
        } else if (parseInt(formData.age) < 1 || parseInt(formData.age) > 120) {
          newErrors.age = 'Please enter a valid age';
        }
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.language) newErrors.language = 'Preferred language is required';
        break;

      case 3:
        if (formData.healthConditions.length === 0) {
          newErrors.healthConditions = 'Please select at least one option';
        }
        if (!formData.isPregnant) newErrors.isPregnant = 'Please select an option';
        break;

      case 4:
        if (!formData.activityLevel) newErrors.activityLevel = 'Activity level is required';
        if (formData.dietaryRestrictions.length === 0) {
          newErrors.dietaryRestrictions = 'Please select at least one option';
        }
        if (!formData.mealFrequency) newErrors.mealFrequency = 'Meal frequency is required';
        if (!formData.cookingSkill) newErrors.cookingSkill = 'Cooking skill level is required';
        if (!formData.budgetLevel) newErrors.budgetLevel = 'Budget level is required';
        break;

      case 5:
        if (!formData.marketAccess) newErrors.marketAccess = 'Market access is required';
        if (formData.preferredFoods.length === 0) {
          newErrors.preferredFoods = 'Please select at least one preferred food';
        }
        if (formData.nutritionGoals.length === 0) {
          newErrors.nutritionGoals = 'Please select at least one nutrition goal';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Sign up with Supabase Auth
      const authData = await signUp(formData.email, formData.password, {
        fullName: formData.fullName,
        role: 'individual',
      });

      if (authData?.user) {
        // Update user profile with additional details
        const { error: profileError } = await supabase
          .from('user_profiles')
          .update({
            phone_number: formData.phoneNumber,
            age: parseInt(formData.age) || null,
            gender: formData.gender,
            country: formData.country,
            city: formData.city,
            preferred_language: formData.language,
          })
          .eq('id', authData.user.id);

        if (profileError) {
          console.log('Profile update error:', profileError.message);
        }

        // Create health profile
        const { error: healthError } = await supabase
          .from('health_profiles')
          .insert({
            user_id: authData.user.id,
            health_conditions: formData.healthConditions,
            is_pregnant: formData.isPregnant === 'yes',
            allergies: formData.allergies,
            medications: formData.medications,
            activity_level: formData.activityLevel,
            dietary_restrictions: formData.dietaryRestrictions,
            meal_frequency: formData.mealFrequency,
            cooking_skill: formData.cookingSkill,
            budget_level: formData.budgetLevel,
            market_access: formData.marketAccess,
            preferred_foods: formData.preferredFoods,
            avoided_foods: formData.avoidedFoods,
            nutrition_goals: formData.nutritionGoals,
          });

        if (healthError) {
          console.log('Health profile error:', healthError.message);
        }
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
        <div className="text-center">
          <Icon name="ArrowPathIcon" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading registration form...</p>
        </div>
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
                <svg
                  className="w-7 h-7 text-primary-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-semibold font-heading text-primary">NutriSmart</h1>
                <p className="text-xs caption text-muted-foreground">Care Africa</p>
              </div>
            </Link>
            <h2 className="text-3xl font-heading font-semibold text-card-foreground mb-2">
              Create Your Account
            </h2>
            <p className="text-muted-foreground">
              Join NutriSmart to start your personalized nutrition journey
            </p>
          </div>

          <div className="card-base">
            <RegistrationProgress
              currentStep={currentStep}
              totalSteps={5}
              stepLabels={stepLabels}
            />

            {submitError && (
              <div className="mt-4 p-4 bg-error/10 border border-error/20 rounded-lg flex items-start space-x-3">
                <Icon name="ExclamationCircleIcon" size={20} className="text-error flex-shrink-0 mt-0.5" />
                <p className="text-sm text-error">{submitError}</p>
              </div>
            )}

            <div className="mt-8">
              {currentStep === 1 && (
                <BasicInformationForm
                  formData={formData}
                  onUpdate={handleUpdate}
                  errors={errors}
                />
              )}
              {currentStep === 2 && (
                <DemographicDetailsForm
                  formData={formData}
                  onUpdate={handleUpdate}
                  errors={errors}
                />
              )}
              {currentStep === 3 && (
                <HealthConditionsForm
                  formData={formData}
                  onUpdate={handleUpdate}
                  errors={errors}
                />
              )}
              {currentStep === 4 && (
                <LifestyleFactorsForm
                  formData={formData}
                  onUpdate={handleUpdate}
                  errors={errors}
                />
              )}
              {currentStep === 5 && (
                <FoodAccessForm formData={formData} onUpdate={handleUpdate} errors={errors} />
              )}
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              {currentStep > 1 ? (
                <button
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg border-2 border-border text-card-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name="ChevronLeftIcon" size={20} />
                  <span className="font-medium">Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 button-base bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <span className="font-medium">Continue</span>
                  <Icon name="ChevronRightIcon" size={20} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 button-base bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                      <span className="font-medium">Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span className="font-medium">Create Account</span>
                      <Icon name="CheckIcon" size={20} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationInteractive;