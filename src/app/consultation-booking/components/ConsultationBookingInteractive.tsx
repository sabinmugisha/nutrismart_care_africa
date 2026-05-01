'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '../../../lib/supabase/client';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

// ─── Helper Components ────────────────────────────────────────────────────────

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

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

// ProviderCard
interface ProviderCardProps {
  provider: Provider;
  isSelected: boolean;
  onSelect: () => void;
}

const ProviderCard = ({ provider, isSelected, onSelect }: ProviderCardProps) => (
  <button
    onClick={onSelect}
    className={`w-full bg-card rounded-xl p-6 border transition-smooth text-left ${
      isSelected ? 'border-primary shadow-elevation-md' : 'border-primary/10 hover:border-primary/30 shadow-elevation-sm'
    }`}
  >
    <div className="flex items-start space-x-4">
      <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-muted">
        <AppImage src={provider.image} alt={provider.alt} className="w-full h-full object-cover" />
        {isSelected && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Icon name="CheckIcon" size={20} className="text-primary-foreground" />
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold font-heading text-card-foreground">{provider.name}</h3>
            <p className="text-sm caption text-muted-foreground">{provider.credentials}</p>
          </div>
          <div className="flex items-center space-x-1 bg-accent/10 px-2 py-1 rounded">
            <Icon name="StarIcon" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">{provider.rating}</span>
            <span className="text-xs caption text-muted-foreground">({provider.reviewCount})</span>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-xs caption text-muted-foreground mb-1">Specializations:</p>
            <div className="flex flex-wrap gap-2">
              {provider.specializations.map((spec, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs caption rounded">{spec}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="LanguageIcon" size={16} className="text-muted-foreground" />
                <span className="text-sm caption text-muted-foreground">{provider.languages.join(', ')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="ClockIcon" size={16} className="text-muted-foreground" />
                <span className="text-sm caption text-muted-foreground">{provider.availability}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold data-text text-primary">{provider.consultationFee.toLocaleString()} RWF</p>
              <p className="text-xs caption text-muted-foreground">per session</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </button>
);

// ConsultationCalendar
interface ConsultationCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onTimeSlotSelect: (slot: TimeSlot) => void;
  selectedTimeSlot: TimeSlot | null;
}

const ConsultationCalendar = ({ selectedDate, onDateChange, onTimeSlotSelect, selectedTimeSlot }: ConsultationCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1));
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '08:00 AM', available: true },
    { id: '2', time: '09:00 AM', available: true },
    { id: '3', time: '10:00 AM', available: false },
    { id: '4', time: '11:00 AM', available: true },
    { id: '5', time: '02:00 PM', available: true },
    { id: '6', time: '03:00 PM', available: true },
    { id: '7', time: '04:00 PM', available: false },
    { id: '8', time: '05:00 PM', available: true },
  ];
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };
  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const isToday = (date: Date | null) => { if (!date) return false; const today = new Date(2026, 0, 20); return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear(); };
  const isSelected = (date: Date | null) => { if (!date) return false; return date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear(); };
  const isPastDate = (date: Date | null) => { if (!date) return false; const today = new Date(2026, 0, 20); today.setHours(0,0,0,0); const compareDate = new Date(date); compareDate.setHours(0,0,0,0); return compareDate < today; };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-elevation-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold font-heading text-card-foreground">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
          <div className="flex items-center space-x-2">
            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="p-2 rounded-lg hover:bg-muted transition-smooth" aria-label="Previous month"><Icon name="ChevronLeftIcon" size={20} /></button>
            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="p-2 rounded-lg hover:bg-muted transition-smooth" aria-label="Next month"><Icon name="ChevronRightIcon" size={20} /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (<div key={day} className="text-center text-sm font-medium caption text-muted-foreground py-2">{day}</div>))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <button key={index} onClick={() => day && !isPastDate(day) && onDateChange(day)} disabled={!day || isPastDate(day)}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-smooth ${!day ? 'invisible' : isPastDate(day) ? 'text-muted-foreground/40 cursor-not-allowed opacity-50' : isSelected(day) ? 'bg-primary text-primary-foreground font-semibold' : isToday(day) ? 'bg-accent/20 text-accent font-medium' : 'hover:bg-muted text-card-foreground'}`}>
              {day?.getDate()}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-elevation-sm">
        <h3 className="text-lg font-semibold font-heading text-card-foreground mb-4">Available Time Slots</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {timeSlots.map((slot) => (
            <button key={slot.id} onClick={() => slot.available && onTimeSlotSelect(slot)} disabled={!slot.available}
              className={`p-3 rounded-lg text-sm font-medium transition-smooth ${!slot.available ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50' : selectedTimeSlot?.id === slot.id ? 'bg-primary text-primary-foreground' : 'bg-input hover:bg-muted text-card-foreground'}`}>
              {slot.time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// BookingForm
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
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSubmit(formData); };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-elevation-sm">
        <h3 className="text-lg font-semibold font-heading text-card-foreground mb-4">Consultation Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Consultation Type *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {consultationTypes.map((type) => (
                <button key={type.value} type="button" onClick={() => setFormData({ ...formData, consultationType: type.value })} disabled={isEmergency && type.value !== 'emergency'}
                  className={`flex items-center space-x-3 p-4 rounded-lg border transition-smooth ${formData.consultationType === type.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'} ${isEmergency && type.value !== 'emergency' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <Icon name={type.icon as any} size={20} className="text-primary" />
                  <span className="text-sm font-medium text-card-foreground">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Preferred Communication Method *</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {communicationMethods.map((method) => (
                <button key={method.value} type="button" onClick={() => setFormData({ ...formData, communicationMethod: method.value })}
                  className={`flex items-center space-x-3 p-4 rounded-lg border transition-smooth ${formData.communicationMethod === method.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
                  <Icon name={method.icon as any} size={20} className="text-primary" />
                  <span className="text-sm font-medium text-card-foreground">{method.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="healthConcerns" className="block text-sm font-medium text-card-foreground mb-2">Specific Health Concerns *</label>
            <textarea id="healthConcerns" value={formData.healthConcerns} onChange={(e) => setFormData({ ...formData, healthConcerns: e.target.value })} rows={4} className="w-full input-base resize-none focus-ring" placeholder="Please describe your dietary concerns, health conditions, or nutrition goals..." required />
          </div>
        </div>
      </div>
      <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-elevation-sm">
        <h3 className="text-lg font-semibold font-heading text-card-foreground mb-4">Insurance & Emergency Contact</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="insuranceProvider" className="block text-sm font-medium text-card-foreground mb-2">Insurance Provider (Optional)</label>
              <input type="text" id="insuranceProvider" value={formData.insuranceProvider} onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })} className="w-full input-base focus-ring" placeholder="e.g., RSSB, MMI, Britam" />
            </div>
            <div>
              <label htmlFor="insuranceNumber" className="block text-sm font-medium text-card-foreground mb-2">Insurance Number (Optional)</label>
              <input type="text" id="insuranceNumber" value={formData.insuranceNumber} onChange={(e) => setFormData({ ...formData, insuranceNumber: e.target.value })} className="w-full input-base focus-ring" placeholder="Enter your insurance number" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="emergencyContact" className="block text-sm font-medium text-card-foreground mb-2">Emergency Contact Name *</label>
              <input type="text" id="emergencyContact" value={formData.emergencyContact} onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })} className="w-full input-base focus-ring" placeholder="Full name" required />
            </div>
            <div>
              <label htmlFor="emergencyPhone" className="block text-sm font-medium text-card-foreground mb-2">Emergency Contact Phone *</label>
              <input type="tel" id="emergencyPhone" value={formData.emergencyPhone} onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })} className="w-full input-base focus-ring" placeholder="+250 XXX XXX XXX" required />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm caption text-muted-foreground">* Required fields</p>
        <button type="submit" disabled={isSubmitting} className="button-base bg-primary text-primary-foreground hover:bg-primary/90 focus-ring flex items-center space-x-2 disabled:opacity-50">
          <span>Continue to Payment</span>
          <Icon name="ArrowRightIcon" size={20} />
        </button>
      </div>
    </form>
  );
};

// PricingInfo
const PricingInfo = () => {
  const pricingTiers: PricingTier[] = [
    { name: 'Standard', price: 15000, description: 'Basic nutrition consultation', features: ['30-minute consultation', 'Basic meal plan', 'Email follow-up support', 'General nutrition guidance'] },
    { name: 'Premium', price: 25000, description: 'Comprehensive nutrition care', features: ['60-minute consultation', 'Personalized meal plan', 'Weekly follow-up calls', 'Condition-specific guidance', 'Family nutrition planning'], recommended: true },
    { name: 'Emergency', price: 35000, description: 'Immediate nutrition support', features: ['Same-day consultation', 'Priority scheduling', 'Urgent dietary intervention', '24/7 emergency support'] },
  ];
  return (
    <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-elevation-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold font-heading text-card-foreground">Consultation Pricing</h3>
        <div className="flex items-center space-x-2 bg-accent/10 px-3 py-1 rounded-lg">
          <Icon name="InformationCircleIcon" size={16} className="text-accent" />
          <span className="text-xs caption text-accent">Sliding scale available</span>
        </div>
      </div>
      <div className="space-y-4">
        {pricingTiers.map((tier) => (
          <div key={tier.name} className={`p-4 rounded-lg border transition-smooth ${tier.recommended ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-base font-semibold font-heading text-card-foreground">{tier.name}</h4>
                  {tier.recommended && (<span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs caption rounded">Recommended</span>)}
                </div>
                <p className="text-sm caption text-muted-foreground">{tier.description}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold data-text text-primary">{tier.price.toLocaleString()}</p>
                <p className="text-xs caption text-muted-foreground">RWF</p>
              </div>
            </div>
            <ul className="space-y-2">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm caption text-card-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="CurrencyDollarIcon" size={20} className="text-secondary flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-card-foreground mb-1">Sliding Scale Pricing</p>
            <p className="text-xs caption text-muted-foreground">We offer reduced rates based on income level to ensure nutrition care is accessible to all. Insurance partnerships available with RSSB, MMI, and Britam.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Interactive Component ───────────────────────────────────────────────

const PROVIDER_IMAGES = [
  { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1976d9436-1772772182293.png", alt: 'Professional African woman nutritionist in white medical coat with stethoscope smiling warmly in modern clinic' },
  { image: "https://images.unsplash.com/photo-1675270714610-11a5cadcc7b3", alt: 'African male nutritionist in professional attire holding clipboard in bright medical office' },
  { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1659539c2-1772878164446.png", alt: 'Smiling African woman healthcare provider in green scrubs with tablet in hospital setting' },
];

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

  useEffect(() => { setIsHydrated(true); }, []);
  useEffect(() => { if (isHydrated) loadProviders(); }, [isHydrated]);

  const loadProviders = async () => {
    setIsLoadingProviders(true);
    const { data, error } = await supabase.from('nutrition_providers').select(`*, profile:user_id (full_name, avatar_url)`).order('rating', { ascending: false });
    const fallback: Provider[] = [
      { id: '1', name: 'Dr. Aisha Uwimana', image: PROVIDER_IMAGES[0].image, alt: PROVIDER_IMAGES[0].alt, credentials: 'PhD in Clinical Nutrition, RD', specializations: ['Diabetes Management', 'Pregnancy Nutrition', 'Weight Management'], languages: ['English', 'Kinyarwanda'], rating: 4.9, reviewCount: 127, consultationFee: 25000, availability: 'Available Today' },
      { id: '2', name: 'Jean-Paul Nkurunziza', image: PROVIDER_IMAGES[1].image, alt: PROVIDER_IMAGES[1].alt, credentials: 'MSc Nutrition Science, CDN', specializations: ['Pediatric Nutrition', 'Sports Nutrition', 'Food Allergies'], languages: ['English', 'Kinyarwanda', 'French'], rating: 4.8, reviewCount: 98, consultationFee: 20000, availability: 'Available Tomorrow' },
      { id: '3', name: 'Grace Mukamana', image: PROVIDER_IMAGES[2].image, alt: PROVIDER_IMAGES[2].alt, credentials: 'BSc Dietetics, Certified Nutritionist', specializations: ['Hypertension', 'Heart Health', 'Family Nutrition'], languages: ['English', 'Kinyarwanda'], rating: 4.7, reviewCount: 84, consultationFee: 18000, availability: 'Available This Week' },
    ];
    if (error || !data || data.length === 0) {
      setProviders(fallback);
    } else {
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
        availability: p.availability_status === 'available' ? 'Available Today' : 'Available This Week',
      })));
    }
    setIsLoadingProviders(false);
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
      const consultationTypeMap: Record<string, string> = { 'Video Call': 'video_call', 'Phone Call': 'phone_call', 'In-Person': 'in_person' };
      const { error } = await supabase.from('consultations').insert({
        patient_id: user.id, provider_id: selectedProvider, consultation_type: consultationTypeMap[data.communicationMethod] || 'video_call',
        status: 'pending', scheduled_at: scheduledAt.toISOString(), health_concerns: data.healthConcerns,
        insurance_provider: data.insuranceProvider, insurance_number: data.insuranceNumber,
        emergency_contact: data.emergencyContact, emergency_phone: data.emergencyPhone, is_emergency: isEmergency,
      });
      if (error) { setBookingError('Failed to book consultation. Please try again.'); } else { setBookingSuccess(true); }
    } catch (err: any) {
      setBookingError(err?.message || 'Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse space-y-6 p-6">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-64 bg-muted rounded" />
          <div className="h-96 bg-muted rounded" />
        </div>
      </div>
    );
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
          <button onClick={() => { setBookingSuccess(false); setShowBookingForm(false); setSelectedProvider(null); setSelectedTimeSlot(null); setIsEmergency(false); }} className="button-base bg-primary text-primary-foreground hover:bg-primary/90">
            Book Another Consultation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 lg:px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Book a Consultation</h1>
              <p className="text-muted-foreground">Schedule an appointment with certified nutrition professionals for personalized dietary guidance</p>
            </div>
            <button onClick={() => { setIsEmergency(true); setShowBookingForm(true); }} className="button-base bg-error text-error-foreground hover:bg-error/90 focus-ring flex items-center space-x-2">
              <Icon name="ExclamationTriangleIcon" size={20} />
              <span>Emergency Consultation</span>
            </button>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <Icon name="InformationCircleIcon" size={24} className="text-accent flex-shrink-0" />
            <p className="text-sm caption text-card-foreground">All consultations include automatic SMS and email reminders. Video consultations use secure WebRTC technology for remote areas with limited connectivity.</p>
          </div>
        </div>

        {bookingError && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-start space-x-3">
            <Icon name="ExclamationCircleIcon" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <p className="text-sm text-error">{bookingError}</p>
          </div>
        )}

        {!showBookingForm ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold font-heading text-foreground mb-4">Select a Nutrition Professional</h2>
                {isLoadingProviders ? (
                  <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />)}</div>
                ) : (
                  <div className="space-y-4">
                    {providers.map((provider) => (
                      <ProviderCard key={provider.id} provider={provider} isSelected={selectedProvider === provider.id} onSelect={() => setSelectedProvider(provider.id)} />
                    ))}
                  </div>
                )}
              </div>
              {selectedProvider && (
                <div>
                  <h2 className="text-xl font-semibold font-heading text-foreground mb-4">Choose Date & Time</h2>
                  <ConsultationCalendar selectedDate={selectedDate} onDateChange={setSelectedDate} onTimeSlotSelect={setSelectedTimeSlot} selectedTimeSlot={selectedTimeSlot} />
                </div>
              )}
              {selectedProvider && selectedDate && selectedTimeSlot && (
                <div className="flex justify-end">
                  <button onClick={() => setShowBookingForm(true)} className="button-base bg-primary text-primary-foreground hover:bg-primary/90 focus-ring flex items-center space-x-2">
                    <span>Continue to Booking Details</span>
                    <Icon name="ArrowRightIcon" size={20} />
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <PricingInfo />
              <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-elevation-sm">
                <h3 className="text-lg font-semibold font-heading text-card-foreground mb-4">Why Book with NutriSmart?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3"><Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" /><span className="text-sm caption text-card-foreground">Certified nutrition professionals with African dietary expertise</span></li>
                  <li className="flex items-start space-x-3"><Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" /><span className="text-sm caption text-card-foreground">Culturally appropriate meal planning with local foods</span></li>
                  <li className="flex items-start space-x-3"><Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" /><span className="text-sm caption text-card-foreground">Flexible consultation methods: video, phone, or in-person</span></li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <BookingForm onSubmit={handleBookingSubmit} isEmergency={isEmergency} isSubmitting={isSubmitting} onBack={() => setShowBookingForm(false)} />
        )}
      </div>
    </div>
  );
};

export default ConsultationBookingInteractive;