'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface ConsultationCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onTimeSlotSelect: (slot: TimeSlot) => void;
  selectedTimeSlot: TimeSlot | null;
}

const ConsultationCalendar = ({
  selectedDate,
  onDateChange,
  onTimeSlotSelect,
  selectedTimeSlot,
}: ConsultationCalendarProps) => {
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
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date(2026, 0, 20);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date | null) => {
    if (!date) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isPastDate = (date: Date | null) => {
    if (!date) return false;
    const today = new Date(2026, 0, 20);
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-elevation-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold font-heading text-card-foreground">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePreviousMonth}
              className="p-2 rounded-lg hover:bg-muted transition-smooth"
              aria-label="Previous month"
            >
              <Icon name="ChevronLeftIcon" size={20} />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg hover:bg-muted transition-smooth"
              aria-label="Next month"
            >
              <Icon name="ChevronRightIcon" size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium caption text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => day && !isPastDate(day) && onDateChange(day)}
              disabled={!day || isPastDate(day)}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-smooth ${
                !day
                  ? 'invisible'
                  : isPastDate(day)
                  ? 'text-muted-foreground/40 cursor-not-allowed'
                  : isSelected(day)
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : isToday(day)
                  ? 'bg-accent/20 text-accent font-medium' :'hover:bg-muted text-card-foreground'
              }`}
            >
              {day?.getDate()}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-elevation-sm">
        <h3 className="text-lg font-semibold font-heading text-card-foreground mb-4">
          Available Time Slots
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => slot.available && onTimeSlotSelect(slot)}
              disabled={!slot.available}
              className={`p-3 rounded-lg text-sm font-medium transition-smooth ${
                !slot.available
                  ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  : selectedTimeSlot?.id === slot.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-input hover:bg-muted text-card-foreground'
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultationCalendar;