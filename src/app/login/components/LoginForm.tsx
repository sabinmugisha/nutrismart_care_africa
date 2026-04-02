'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';

interface LoginFormProps {
  onLanguageChange?: (language: string) => void;
}

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm = ({ onLanguageChange }: LoginFormProps) => {
  const router = useRouter();
  const { signIn } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setIsHydrated(true);
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const translations = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to continue your nutrition journey',
      email: 'Email Address',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      signIn: 'Sign In',
      signingIn: 'Signing in...',
      noAccount: "Don\'t have an account?",
      createAccount: 'Create Account',
      emailRequired: 'Email address is required',
      emailInvalid: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      invalidCredentials: 'Invalid email or password. Please check your credentials and try again.',
    },
    rw: {
      title: 'Murakaza Neza',
      subtitle: 'Injira kugirango ukomeze urugendo rwawe rwo kurya neza',
      email: 'Aderesi ya Email',
      password: 'Ijambo Ryibanga',
      rememberMe: 'Nyibuka',
      forgotPassword: 'Wibagiwe ijambo ryibanga?',
      signIn: 'Injira',
      signingIn: 'Urarinjira...',
      noAccount: 'Ntufite konti?',
      createAccount: 'Fungura Konti',
      emailRequired: 'Aderesi ya email irakenewe',
      emailInvalid: 'Injiza aderesi ya email yemewe',
      passwordRequired: 'Ijambo ryibanga rirakenewe',
      invalidCredentials: 'Email cyangwa ijambo ryibanga bitemewe. Reba neza hanyuma ugerageze.',
    },
  };

  const t = translations[currentLanguage as keyof typeof translations];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.emailInvalid;
    }

    if (!formData.password.trim()) {
      newErrors.password = t.passwordRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  const getRoleRedirect = (role: string): string => {
    switch (role) {
      case 'provider':
        return '/consultation-booking';
      case 'admin': case'institution_admin':
        return '/institution-dashboard';
      default:
        return '/personal-dashboard';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const data = await signIn(formData.email, formData.password);
      if (isHydrated && formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      }
      const role = data?.user?.user_metadata?.role || 'individual';
      router.push(getRoleRedirect(role));
      router.refresh();
    } catch (error: any) {
      setErrors({ general: t.invalidCredentials });
      setIsLoading(false);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'rw' : 'en';
    setCurrentLanguage(newLanguage);
    if (isHydrated) {
      localStorage.setItem('preferredLanguage', newLanguage);
    }
    onLanguageChange?.(newLanguage);
  };

  if (!isHydrated) {
    return (
      <div className="w-full max-w-md mx-auto p-8 bg-card rounded-xl shadow-elevation-md">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="space-y-4">
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
          </div>
          <div className="h-12 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-card rounded-xl shadow-elevation-md border border-primary/10">
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleLanguage}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted transition-smooth text-sm"
          aria-label="Toggle language"
        >
          <Icon name="LanguageIcon" size={18} />
          <span className="font-medium text-card-foreground">
            {currentLanguage === 'en' ? 'Kinyarwanda' : 'English'}
          </span>
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-heading text-primary mb-2">{t.title}</h1>
        <p className="text-sm caption text-muted-foreground">{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg flex items-start space-x-3">
            <Icon name="ExclamationCircleIcon" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <p className="text-sm text-error">{errors.general}</p>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-card-foreground">
            {t.email}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon name="EnvelopeIcon" size={20} className="text-muted-foreground" />
            </div>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`input-base w-full pl-12 ${
                errors.email ? 'border-error focus:ring-error' : 'focus:ring-primary'
              }`}
              placeholder="example@nutrismart.rw"
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="text-xs caption text-error flex items-center space-x-1 mt-1">
              <Icon name="ExclamationCircleIcon" size={14} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-card-foreground">
            {t.password}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon name="LockClosedIcon" size={20} className="text-muted-foreground" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`input-base w-full pl-12 pr-12 ${
                errors.password ? 'border-error focus:ring-error' : 'focus:ring-primary'
              }`}
              placeholder="••••••••"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <Icon
                name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'}
                size={20}
                className="text-muted-foreground hover:text-card-foreground transition-smooth"
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-xs caption text-error flex items-center space-x-1 mt-1">
              <Icon name="ExclamationCircleIcon" size={14} />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
              disabled={isLoading}
            />
            <span className="text-sm text-card-foreground">{t.rememberMe}</span>
          </label>
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-smooth"
            disabled={isLoading}
          >
            {t.forgotPassword}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="button-base w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
              <span>{t.signingIn}</span>
            </>
          ) : (
            <>
              <Icon name="ArrowRightOnRectangleIcon" size={20} />
              <span>{t.signIn}</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          {t.noAccount}{' '}
          <button
            onClick={() => router.push('/user-registration')}
            className="text-primary hover:text-primary/80 transition-smooth font-medium"
            disabled={isLoading}
          >
            {t.createAccount}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;