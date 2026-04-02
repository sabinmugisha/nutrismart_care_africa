'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface BasicInformationFormProps {
  formData: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
  };
  onUpdate: (field: string, value: string) => void;
  errors: Record<string, string>;
}

const BasicInformationForm = ({ formData, onUpdate, errors }: BasicInformationFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-card-foreground mb-2">
          Full Name <span className="text-error">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => onUpdate('fullName', e.target.value)}
            className={`input-base w-full pl-12 ${
              errors.fullName ? 'border-error' : 'border-border'
            }`}
            placeholder="Enter your full name"
          />
          <Icon
            name="UserIcon"
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
        </div>
        {errors.fullName && (
          <p className="mt-1 text-xs caption text-error">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
          Email Address <span className="text-error">*</span>
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => onUpdate('email', e.target.value)}
            className={`input-base w-full pl-12 ${
              errors.email ? 'border-error' : 'border-border'
            }`}
            placeholder="your.email@example.com"
          />
          <Icon
            name="EnvelopeIcon"
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
        </div>
        {errors.email && <p className="mt-1 text-xs caption text-error">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-card-foreground mb-2">
          Phone Number <span className="text-error">*</span>
        </label>
        <div className="relative">
          <input
            type="tel"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => onUpdate('phoneNumber', e.target.value)}
            className={`input-base w-full pl-12 ${
              errors.phoneNumber ? 'border-error' : 'border-border'
            }`}
            placeholder="+250 XXX XXX XXX"
          />
          <Icon
            name="PhoneIcon"
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
        </div>
        {errors.phoneNumber && (
          <p className="mt-1 text-xs caption text-error">{errors.phoneNumber}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-card-foreground mb-2">
          Password <span className="text-error">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={formData.password}
            onChange={(e) => onUpdate('password', e.target.value)}
            className={`input-base w-full pl-12 pr-12 ${
              errors.password ? 'border-error' : 'border-border'
            }`}
            placeholder="Create a strong password"
          />
          <Icon
            name="LockClosedIcon"
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-smooth"
          >
            <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs caption text-error">{errors.password}</p>}
        <p className="mt-1 text-xs caption text-muted-foreground">
          Must be at least 8 characters with uppercase, lowercase, and numbers
        </p>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-card-foreground mb-2"
        >
          Confirm Password <span className="text-error">*</span>
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => onUpdate('confirmPassword', e.target.value)}
            className={`input-base w-full pl-12 pr-12 ${
              errors.confirmPassword ? 'border-error' : 'border-border'
            }`}
            placeholder="Re-enter your password"
          />
          <Icon
            name="LockClosedIcon"
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-smooth"
          >
            <Icon name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-xs caption text-error">{errors.confirmPassword}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInformationForm;