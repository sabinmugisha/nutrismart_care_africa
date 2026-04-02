'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Notification {
  id: string;
  type: 'appointment' | 'meal' | 'program' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationCenterProps {
  onNotificationClick?: (notification: Notification) => void;
  onMarkAllRead?: () => void;
}

const NotificationCenter = ({
  onNotificationClick,
  onMarkAllRead,
}: NotificationCenterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'Upcoming Consultation',
      message: 'Your nutrition consultation is scheduled for tomorrow at 10:00 AM',
      timestamp: '2 hours ago',
      isRead: false,
    },
    {
      id: '2',
      type: 'meal',
      title: 'Meal Reminder',
      message: 'Time for your afternoon snack - Check your meal plan',
      timestamp: '4 hours ago',
      isRead: false,
    },
    {
      id: '3',
      type: 'program',
      title: 'Program Update',
      message: 'New nutrition guidelines have been added to your program',
      timestamp: '1 day ago',
      isRead: true,
    },
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleNotificationClick = (notification: Notification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
    );
    onNotificationClick?.(notification);
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    onMarkAllRead?.();
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'appointment':
        return 'CalendarIcon';
      case 'meal':
        return 'ClockIcon';
      case 'program':
        return 'DocumentTextIcon';
      case 'alert':
        return 'ExclamationTriangleIcon';
      default:
        return 'BellIcon';
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'appointment':
        return 'text-accent';
      case 'meal':
        return 'text-primary';
      case 'program':
        return 'text-secondary';
      case 'alert':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={togglePanel}
        className="relative p-2 rounded-lg hover:bg-muted transition-smooth"
        aria-label="Notifications"
      >
        <Icon name="BellIcon" size={24} className="text-card-foreground" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-primary-foreground bg-error rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 lg:absolute lg:inset-auto lg:right-0 lg:mt-2 lg:w-96 bg-popover lg:rounded-lg lg:shadow-elevation-xl lg:border lg:border-border z-250 overflow-hidden animate-fade-in">
          <div className="flex flex-col h-full lg:h-auto lg:max-h-[600px]">
            <div className="flex items-center justify-between p-4 border-b border-border bg-card lg:bg-transparent">
              <h3 className="text-lg font-semibold font-heading text-popover-foreground">
                Notifications
              </h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs caption text-primary hover:text-primary/80 transition-smooth"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="lg:hidden p-1 rounded hover:bg-muted transition-smooth"
                  aria-label="Close notifications"
                >
                  <Icon name="XMarkIcon" size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <Icon name="BellIcon" size={48} className="text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground text-center">
                    No notifications yet
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`w-full flex items-start space-x-3 p-4 hover:bg-muted transition-smooth text-left ${
                        !notification.isRead ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 ${getNotificationColor(notification.type)}`}
                      >
                        <Icon name={getNotificationIcon(notification.type) as any} size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <p className="text-sm font-medium text-popover-foreground">
                            {notification.title}
                          </p>
                          {!notification.isRead && (
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary ml-2 mt-1" />
                          )}
                        </div>
                        <p className="text-xs caption text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs caption text-muted-foreground">
                          {notification.timestamp}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 border-t border-border bg-card lg:bg-transparent">
                <button className="w-full text-sm font-medium text-primary hover:text-primary/80 transition-smooth">
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;