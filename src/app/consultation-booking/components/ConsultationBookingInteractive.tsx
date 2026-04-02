'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '../../../lib/supabase/client';
import ConsultationCalendar from './ConsultationCalendar';
import ProviderCard from './ProviderCard';
import BookingForm from './BookingForm';
import PricingInfo from './PricingInfo';
import Icon from '@/components/ui/AppIcon';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface Provider {
  id: string;
  name: string;
  image: string;
  alt: string;
  credentials: string;
  specializations: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  consultationFee: number;
  availability: string;
}

interface BookingFormData {
  consultationType: string;
  communicationMethod: string;
  healthConcerns: string;
  insuranceProvider: string;
  insuranceNumber: string;
  emergencyContact: string;
  emergencyPhone: string;
}

const PROVIDER_IMAGES = [
{ image: "https://img.rocket.new/generatedImages/rocket_gen_img_1976d9436-1772772182293.png", alt: 'Professional African woman nutritionist in white medical coat with stethoscope smiling warmly in modern clinic' },
{ image: "https://images.unsplash.com/photo-1675270714610-11a5cadcc7b3", alt: 'African male nutritionist in professional attire holding clipboard in bright medical office' },
{ image: "https://img.rocket.new/generatedImages/rocket_gen_img_1659539c2-1772878164446.png", alt: 'Smiling African woman healthcare provider in green scrubs with tablet in hospital setting' }];


const ConsultationBookingInteractive = () => {
  const { user } = useAuth();
  const supabase = createClient();
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoadingProviders, setIsLoadingProviders] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      loadProviders();
    }
  }, [isHydrated]);

  const loadProviders = async () => {
    setIsLoadingProviders(true);
    const { data, error } = await supabase.
    from('nutrition_providers').
    select(`
        *,
        profile:user_id (
          full_name,
          avatar_url
        )
      `).
    order('rating', { ascending: false });

    if (error) {
      console.log('Providers load error:', error.message);
      // Fallback providers
      setProviders([
      { id: '1', name: 'Dr. Aisha Uwimana', image: PROVIDER_IMAGES[0].image, alt: PROVIDER_IMAGES[0].alt, credentials: 'PhD in Clinical Nutrition, RD', specializations: ['Diabetes Management', 'Pregnancy Nutrition', 'Weight Management'], languages: ['English', 'Kinyarwanda'], rating: 4.9, reviewCount: 127, consultationFee: 25000, availability: 'Available Today' },
      { id: '2', name: 'Jean-Paul Nkurunziza', image: PROVIDER_IMAGES[1].image, alt: PROVIDER_IMAGES[1].alt, credentials: 'MSc Nutrition Science, CDN', specializations: ['Pediatric Nutrition', 'Sports Nutrition', 'Food Allergies'], languages: ['English', 'Kinyarwanda', 'French'], rating: 4.8, reviewCount: 98, consultationFee: 20000, availability: 'Available Tomorrow' },
      { id: '3', name: 'Grace Mukamana', image: PROVIDER_IMAGES[2].image, alt: PROVIDER_IMAGES[2].alt, credentials: 'BSc Dietetics, Certified Nutritionist', specializations: ['Hypertension', 'Heart Health', 'Family Nutrition'], languages: ['English', 'Kinyarwanda'], rating: 4.7, reviewCount: 84, consultationFee: 18000, availability: 'Available This Week' }]
      );
    } else if (data && data.length > 0) {
      setProviders(data.map((p, i) => ({
        id: p.user_id,
        name: (p.profile as any)?.full_name || 'Nutrition Expert',
        image: PROVIDER_IMAGES[i % PROVIDER_IMAGES.length].image,
        alt: PROVIDER_IMAGES[i % PROVIDER_IMAGES.length].alt,
        credentials: p.credentials || 'Certified Nutritionist',
        specializations: p.specializations || [],
        languages: p.languages || ['English'],
        rating: Number(p.rating) || 4.5,
        reviewCount: p.review_count || 0,
        consultationFee: p.consultation_fee || 20000,
        availability: p.availability_status === 'available' ? 'Available Today' : 'Available This Week'
      })));
    } else {
      setProviders([
      { id: '1', name: 'Dr. Aisha Uwimana', image: PROVIDER_IMAGES[0].image, alt: PROVIDER_IMAGES[0].alt, credentials: 'PhD in Clinical Nutrition, RD', specializations: ['Diabetes Management', 'Pregnancy Nutrition', 'Weight Management'], languages: ['English', 'Kinyarwanda'], rating: 4.9, reviewCount: 127, consultationFee: 25000, availability: 'Available Today' },
      { id: '2', name: 'Jean-Paul Nkurunziza', image: PROVIDER_IMAGES[1].image, alt: PROVIDER_IMAGES[1].alt, credentials: 'MSc Nutrition Science, CDN', specializations: ['Pediatric Nutrition', 'Sports Nutrition', 'Food Allergies'], languages: ['English', 'Kinyarwanda', 'French'], rating: 4.8, reviewCount: 98, consultationFee: 20000, availability: 'Available Tomorrow' },
      { id: '3', name: 'Grace Mukamana', image: PROVIDER_IMAGES[2].image, alt: PROVIDER_IMAGES[2].alt, credentials: 'BSc Dietetics, Certified Nutritionist', specializations: ['Hypertension', 'Heart Health', 'Family Nutrition'], languages: ['English', 'Kinyarwanda'], rating: 4.7, reviewCount: 84, consultationFee: 18000, availability: 'Available This Week' }]
      );
    }
    setIsLoadingProviders(false);
  };

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
  };

  const handleContinueToBooking = () => {
    if (selectedProvider && selectedDate && selectedTimeSlot) {
      setShowBookingForm(true);
    }
  };

  const handleBookingSubmit = async (data: BookingFormData) => {
    if (!user) return;
    setIsSubmitting(true);
    setBookingError(null);

    try {
      const scheduledAt = new Date(selectedDate);
      if (selectedTimeSlot) {
        const [time, period] = selectedTimeSlot.time.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : period === 'AM' && hours === 12 ? 0 : hours;
        scheduledAt.setHours(adjustedHours, minutes || 0, 0, 0);
      }

      const consultationTypeMap: Record<string, string> = {
        'Video Call': 'video_call',
        'Phone Call': 'phone_call',
        'In-Person': 'in_person'
      };

      const { error } = await supabase.
      from('consultations').
      insert({
        patient_id: user.id,
        provider_id: selectedProvider,
        consultation_type: consultationTypeMap[data.communicationMethod] || 'video_call',
        status: 'pending',
        scheduled_at: scheduledAt.toISOString(),
        health_concerns: data.healthConcerns,
        insurance_provider: data.insuranceProvider,
        insurance_number: data.insuranceNumber,
        emergency_contact: data.emergencyContact,
        emergency_phone: data.emergencyPhone,
        is_emergency: isEmergency
      });

      if (error) {
        console.log('Booking error:', error.message);
        setBookingError('Failed to book consultation. Please try again.');
      } else {
        setBookingSuccess(true);
      }
    } catch (err: any) {
      setBookingError(err?.message || 'Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmergencyBooking = () => {
    setIsEmergency(true);
    setShowBookingForm(true);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse space-y-6 p-6">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-64 bg-muted rounded" />
          <div className="h-96 bg-muted rounded" />
        </div>
      </div>);

  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircleIcon" size={48} className="text-success" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-foreground mb-3">Consultation Booked!</h2>
          <p className="text-muted-foreground mb-6">Your consultation has been successfully scheduled. You will receive a confirmation shortly.</p>
          <button
            onClick={() => {setBookingSuccess(false);setShowBookingForm(false);setSelectedProvider(null);setSelectedTimeSlot(null);setIsEmergency(false);}}
            className="button-base bg-primary text-primary-foreground hover:bg-primary/90">
            
            Book Another Consultation
          </button>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 lg:px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold font-heading text-foreground mb-2">
                Book a Consultation
              </h1>
              <p className="text-muted-foreground">
                Schedule an appointment with certified nutrition professionals for personalized
                dietary guidance
              </p>
            </div>
            <button
              onClick={handleEmergencyBooking}
              className="button-base bg-error text-error-foreground hover:bg-error/90 focus-ring flex items-center space-x-2">
              
              <Icon name="ExclamationTriangleIcon" size={20} />
              <span>Emergency Consultation</span>
            </button>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <Icon name="InformationCircleIcon" size={24} className="text-accent flex-shrink-0" />
            <p className="text-sm caption text-card-foreground">
              All consultations include automatic SMS and email reminders. Video consultations
              use secure WebRTC technology for remote areas with limited connectivity.
            </p>
          </div>
        </div>

        {bookingError &&
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-start space-x-3">
            <Icon name="ExclamationCircleIcon" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <p className="text-sm text-error">{bookingError}</p>
          </div>
        }

        {!showBookingForm ?
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold font-heading text-foreground mb-4">
                  Select a Nutrition Professional
                </h2>
                {isLoadingProviders ?
              <div className="space-y-4">
                    {[1, 2, 3].map((i) =>
                <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />
                )}
                  </div> :

              <div className="space-y-4">
                    {providers.map((provider) =>
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  isSelected={selectedProvider === provider.id}
                  onSelect={() => handleProviderSelect(provider.id)} />

                )}
                  </div>
              }
              </div>

              {selectedProvider &&
            <div>
                  <h2 className="text-xl font-semibold font-heading text-foreground mb-4">
                    Choose Date & Time
                  </h2>
                  <ConsultationCalendar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onTimeSlotSelect={setSelectedTimeSlot}
                selectedTimeSlot={selectedTimeSlot} />
              
                </div>
            }

              {selectedProvider && selectedDate && selectedTimeSlot &&
            <div className="flex justify-end">
                  <button
                onClick={handleContinueToBooking}
                className="button-base bg-primary text-primary-foreground hover:bg-primary/90 focus-ring flex items-center space-x-2">
                
                    <span>Continue to Booking Details</span>
                    <Icon name="ArrowRightIcon" size={20} />
                  </button>
                </div>
            }
            </div>

            <div className="space-y-6">
              <PricingInfo />

              <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-elevation-sm">
                <h3 className="text-lg font-semibold font-heading text-card-foreground mb-4">
                  Why Book with NutriSmart?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm caption text-card-foreground">Certified nutrition professionals with African dietary expertise</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm caption text-card-foreground">Culturally appropriate meal planning with local foods</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm caption text-card-foreground">Flexible consultation methods: video, phone, or in-person</span>
                  </li>
                </ul>
              </div>
            </div>
          </div> :

        <BookingForm
          onSubmit={handleBookingSubmit}
          isEmergency={isEmergency}
          isSubmitting={isSubmitting}
          onBack={() => setShowBookingForm(false)} />

        }
      </div>
    </div>);

};

export default ConsultationBookingInteractive;