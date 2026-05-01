'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface BookingFormData {
  consultationType: string;
  communicationMethod: string;
  healthConcerns: string;
  insuranceProvider: string;
  insuranceNumber: string;
  emergencyContact: string;
  emergencyPhone: string;
}

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
  isEmergency?: boolean;
  isSubmitting?: boolean;
  onBack?: () => void;
}

const BookingForm = ({ onSubmit, isEmergency = false, isSubmitting = false, onBack }: BookingFormProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    consultationType: isEmergency ? 'emergency' : '',
    communicationMethod: '',
    healthConcerns: '',
    insuranceProvider: '',
    insuranceNumber: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const consultationTypes = [
    { value: 'initial', label: 'Initial Assessment', icon: 'DocumentTextIcon' },
    { value: 'followup', label: 'Follow-up Consultation', icon: 'ArrowPathIcon' },
    { value: 'family', label: 'Family Planning', icon: 'UserGroupIcon' },
    { value: 'emergency', label: 'Emergency Consultation', icon: 'ExclamationTriangleIcon' },
  ];

  const communicationMethods = [
    { value: 'video', label: 'Video Call', icon: 'VideoCameraIcon' },
    { value: 'phone', label: 'Phone Call', icon: 'PhoneIcon' },
    { value: 'inperson', label: 'In-Person', icon: 'BuildingOfficeIcon' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-elevation-sm">
        <h3 className="text-lg font-semibold font-heading text-card-foreground mb-4">
          Consultation Details
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Consultation Type *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {consultationTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, consultationType: type.value })
                  }
                  disabled={isEmergency && type.value !== 'emergency'}
                  className={`flex items-center space-x-3 p-4 rounded-lg border transition-smooth ${
                    formData.consultationType === type.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/30'
                  } ${
                    isEmergency && type.value !== 'emergency' ?'opacity-50 cursor-not-allowed' :''
                  }`}
                >
                  <Icon name={type.icon as any} size={20} className="text-primary" />
                  <span className="text-sm font-medium text-card-foreground">
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Preferred Communication Method *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {communicationMethods.map((method) => (
                <button
                  key={method.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, communicationMethod: method.value })
                  }
                  className={`flex items-center space-x-3 p-4 rounded-lg border transition-smooth ${
                    formData.communicationMethod === method.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/30'
                  }`}
                >
                  <Icon name={method.icon as any} size={20} className="text-primary" />
                  <span className="text-sm font-medium text-card-foreground">
                    {method.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="healthConcerns"
              className="block text-sm font-medium text-card-foreground mb-2"
            >
              Specific Health Concerns *
            </label>
            <textarea
              id="healthConcerns"
              value={formData.healthConcerns}
              onChange={(e) =>
                setFormData({ ...formData, healthConcerns: e.target.value })
              }
              rows={4}
              className="w-full input-base resize-none focus-ring"
              placeholder="Please describe your dietary concerns, health conditions, or nutrition goals..."
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-elevation-sm">
        <h3 className="text-lg font-semibold font-heading text-card-foreground mb-4">
          Insurance & Emergency Contact
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="insuranceProvider"
                className="block text-sm font-medium text-card-foreground mb-2"
              >
                Insurance Provider (Optional)
              </label>
              <input
                type="text"
                id="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={(e) =>
                  setFormData({ ...formData, insuranceProvider: e.target.value })
                }
                className="w-full input-base focus-ring"
                placeholder="e.g., RSSB, MMI, Britam"
              />
            </div>

            <div>
              <label
                htmlFor="insuranceNumber"
                className="block text-sm font-medium text-card-foreground mb-2"
              >
                Insurance Number (Optional)
              </label>
              <input
                type="text"
                id="insuranceNumber"
                value={formData.insuranceNumber}
                onChange={(e) =>
                  setFormData({ ...formData, insuranceNumber: e.target.value })
                }
                className="w-full input-base focus-ring"
                placeholder="Enter your insurance number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="emergencyContact"
                className="block text-sm font-medium text-card-foreground mb-2"
              >
                Emergency Contact Name *
              </label>
              <input
                type="text"
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) =>
                  setFormData({ ...formData, emergencyContact: e.target.value })
                }
                className="w-full input-base focus-ring"
                placeholder="Full name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="emergencyPhone"
                className="block text-sm font-medium text-card-foreground mb-2"
              >
                Emergency Contact Phone *
              </label>
              <input
                type="tel"
                id="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={(e) =>
                  setFormData({ ...formData, emergencyPhone: e.target.value })
                }
                className="w-full input-base focus-ring"
                placeholder="+250 XXX XXX XXX"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm caption text-muted-foreground">* Required fields</p>
        <button
          type="submit"
          className="button-base bg-primary text-primary-foreground hover:bg-primary/90 focus-ring flex items-center space-x-2"
        >
          <span>Continue to Payment</span>
          <Icon name="ArrowRightIcon" size={20} />
        </button>
      </div>
    </form>
  );
};

export default BookingForm;