'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ReminderSettings {
  mealLogging: boolean;
  mealLoggingTime: string;
  upcomingConsultations: boolean;
  consultationReminderHours: number;
  healthMilestones: boolean;
}

interface NotificationPermissionPromptProps {
  onClose?: () => void;
}

const NotificationPermissionPrompt = ({ onClose }: NotificationPermissionPromptProps) => {
  const [step, setStep] = useState<'prompt' | 'settings' | 'success' | 'denied'>('prompt');
  const [permissionState, setPermissionState] = useState<NotificationPermission | 'unsupported'>('default');
  const [isRequesting, setIsRequesting] = useState(false);
  const [settings, setSettings] = useState<ReminderSettings>({
    mealLogging: true,
    mealLoggingTime: '08:00',
    upcomingConsultations: true,
    consultationReminderHours: 24,
    healthMilestones: true,
  });

  useEffect(() => {
    if (!('Notification' in window)) {
      setPermissionState('unsupported');
      return;
    }
    setPermissionState(Notification.permission);
    if (Notification.permission === 'granted') {
      // Load saved settings
      const saved = localStorage.getItem('nutrismart_notification_settings');
      if (saved) {
        try { setSettings(JSON.parse(saved)); } catch {}
      }
      setStep('settings');
    } else if (Notification.permission === 'denied') {
      setStep('denied');
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) return;
    setIsRequesting(true);
    try {
      const result = await Notification.requestPermission();
      setPermissionState(result);
      if (result === 'granted') {
        setStep('settings');
        // Show a test notification
        new Notification('NutriSmart Care Africa', {
          body: 'Notifications enabled! You\'ll receive meal, consultation, and milestone reminders.',
          icon: '/public/favicon.png',
        });
      } else {
        setStep('denied');
      }
    } catch {
      setStep('denied');
    } finally {
      setIsRequesting(false);
    }
  };

  const saveSettings = () => {
    localStorage.setItem('nutrismart_notification_settings', JSON.stringify(settings));
    setStep('success');
    setTimeout(() => {
      onClose?.();
    }, 2000);
  };

  const toggleSetting = (key: keyof Pick<ReminderSettings, 'mealLogging' | 'upcomingConsultations' | 'healthMilestones'>) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (permissionState === 'unsupported') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl shadow-elevation-xl border border-border w-full max-w-md overflow-hidden animate-fade-in">

        {/* Prompt Step */}
        {step === 'prompt' && (
          <div className="p-6">
            <div className="flex justify-end mb-2">
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-smooth">
                <Icon name="XMarkIcon" size={20} className="text-muted-foreground" />
              </button>
            </div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="BellIcon" size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold font-heading text-card-foreground mb-2">Stay on Track</h2>
              <p className="text-sm text-muted-foreground">Enable push notifications to receive timely reminders for your health journey.</p>
            </div>
            <div className="space-y-3 mb-6">
              {[
                { icon: 'ClockIcon', color: 'bg-primary/10 text-primary', title: 'Meal Logging Reminders', desc: 'Get reminded to log your meals on time' },
                { icon: 'CalendarDaysIcon', color: 'bg-accent/10 text-accent', title: 'Consultation Alerts', desc: 'Never miss an upcoming consultation' },
                { icon: 'TrophyIcon', color: 'bg-success/10 text-success', title: 'Health Milestones', desc: 'Celebrate your nutrition achievements' },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={item.icon as any} size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={requestPermission}
                disabled={isRequesting}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-smooth disabled:opacity-60"
              >
                {isRequesting ? 'Requesting...' : 'Enable Notifications'}
              </button>
              <button onClick={onClose} className="w-full py-2 text-sm text-muted-foreground hover:text-card-foreground transition-smooth">
                Not now
              </button>
            </div>
          </div>
        )}

        {/* Settings Step */}
        {step === 'settings' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold font-heading text-card-foreground">Reminder Settings</h2>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-smooth">
                <Icon name="XMarkIcon" size={20} className="text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Meal Logging */}
              <div className="p-4 bg-muted/40 rounded-xl border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="ClockIcon" size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">Meal Logging</p>
                      <p className="text-xs text-muted-foreground">Daily meal reminders</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSetting('mealLogging')}
                    className={`relative w-11 h-6 rounded-full transition-smooth ${settings.mealLogging ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${settings.mealLogging ? 'left-5' : 'left-0.5'}`} />
                  </button>
                </div>
                {settings.mealLogging && (
                  <div className="flex items-center space-x-2 mt-2">
                    <label className="text-xs text-muted-foreground">Reminder time:</label>
                    <input
                      type="time"
                      value={settings.mealLoggingTime}
                      onChange={e => setSettings(prev => ({ ...prev, mealLoggingTime: e.target.value }))}
                      className="text-xs border border-border rounded-lg px-2 py-1 bg-background text-card-foreground"
                    />
                  </div>
                )}
              </div>

              {/* Consultations */}
              <div className="p-4 bg-muted/40 rounded-xl border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="CalendarDaysIcon" size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">Upcoming Consultations</p>
                      <p className="text-xs text-muted-foreground">Consultation reminders</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSetting('upcomingConsultations')}
                    className={`relative w-11 h-6 rounded-full transition-smooth ${settings.upcomingConsultations ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${settings.upcomingConsultations ? 'left-5' : 'left-0.5'}`} />
                  </button>
                </div>
                {settings.upcomingConsultations && (
                  <div className="flex items-center space-x-2 mt-2">
                    <label className="text-xs text-muted-foreground">Remind me:</label>
                    <select
                      value={settings.consultationReminderHours}
                      onChange={e => setSettings(prev => ({ ...prev, consultationReminderHours: Number(e.target.value) }))}
                      className="text-xs border border-border rounded-lg px-2 py-1 bg-background text-card-foreground"
                    >
                      <option value={1}>1 hour before</option>
                      <option value={2}>2 hours before</option>
                      <option value={24}>1 day before</option>
                      <option value={48}>2 days before</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Health Milestones */}
              <div className="p-4 bg-muted/40 rounded-xl border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="TrophyIcon" size={18} className="text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">Health Milestones</p>
                      <p className="text-xs text-muted-foreground">Achievement notifications</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSetting('healthMilestones')}
                    className={`relative w-11 h-6 rounded-full transition-smooth ${settings.healthMilestones ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${settings.healthMilestones ? 'left-5' : 'left-0.5'}`} />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={saveSettings}
              className="w-full mt-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-smooth"
            >
              Save Settings
            </button>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircleIcon" size={36} className="text-success" />
            </div>
            <h2 className="text-xl font-bold font-heading text-card-foreground mb-2">All Set!</h2>
            <p className="text-sm text-muted-foreground">Your notification preferences have been saved.</p>
          </div>
        )}

        {/* Denied Step */}
        {step === 'denied' && (
          <div className="p-6 text-center">
            <div className="flex justify-end mb-2">
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-smooth">
                <Icon name="XMarkIcon" size={20} className="text-muted-foreground" />
              </button>
            </div>
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="BellSlashIcon" size={32} className="text-warning" />
            </div>
            <h2 className="text-xl font-bold font-heading text-card-foreground mb-2">Notifications Blocked</h2>
            <p className="text-sm text-muted-foreground mb-4">
              To enable notifications, please update your browser settings and allow notifications for this site.
            </p>
            <button onClick={onClose} className="w-full py-3 bg-muted text-card-foreground rounded-xl font-semibold text-sm hover:bg-muted/80 transition-smooth">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPermissionPrompt;
