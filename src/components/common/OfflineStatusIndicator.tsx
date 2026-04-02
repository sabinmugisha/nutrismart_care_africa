'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface OfflineStatusIndicatorProps {
  onStatusChange?: (isOnline: boolean) => void;
}

const OfflineStatusIndicator = ({ onStatusChange }: OfflineStatusIndicatorProps) => {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsSyncing(true);
      onStatusChange?.(true);

      setTimeout(() => {
        setIsSyncing(false);
      }, 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsSyncing(false);
      onStatusChange?.(false);
    };

    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onStatusChange]);

  const getStatusColor = () => {
    if (!isOnline) return 'bg-error';
    if (isSyncing) return 'bg-warning';
    return 'bg-success';
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline - Data will sync when connection is restored';
    if (isSyncing) return 'Syncing data...';
    return 'Online - All data synced';
  };

  const getStatusIcon = () => {
    if (!isOnline) return 'WifiIcon';
    if (isSyncing) return 'ArrowPathIcon';
    return 'CheckCircleIcon';
  };

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-smooth"
        aria-label="Connection status"
      >
        <div className="relative">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
          {isSyncing && (
            <div className={`absolute inset-0 w-3 h-3 rounded-full ${getStatusColor()} animate-ping`} />
          )}
        </div>
        <Icon
          name={getStatusIcon() as any}
          size={18}
          className={`hidden sm:block ${
            !isOnline ? 'text-error' : isSyncing ? 'text-warning' : 'text-success'
          } ${isSyncing ? 'animate-spin' : ''}`}
        />
      </button>

      {showTooltip && (
        <div className="absolute right-0 mt-2 w-64 bg-popover rounded-lg shadow-elevation-lg border border-border p-4 z-200 animate-fade-in">
          <div className="flex items-start space-x-3">
            <Icon
              name={getStatusIcon() as any}
              size={20}
              className={
                !isOnline ? 'text-error' : isSyncing ? 'text-warning' : 'text-success'
              }
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-popover-foreground mb-1">
                {!isOnline ? 'Offline Mode' : isSyncing ? 'Syncing' : 'Connected'}
              </p>
              <p className="text-xs caption text-muted-foreground">{getStatusText()}</p>
              {!isOnline && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs caption text-muted-foreground">
                    Available offline features:
                  </p>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center space-x-2 text-xs caption text-muted-foreground">
                      <Icon name="CheckIcon" size={14} className="text-success" />
                      <span>View saved meal plans</span>
                    </li>
                    <li className="flex items-center space-x-2 text-xs caption text-muted-foreground">
                      <Icon name="CheckIcon" size={14} className="text-success" />
                      <span>Access nutrition data</span>
                    </li>
                    <li className="flex items-center space-x-2 text-xs caption text-muted-foreground">
                      <Icon name="CheckIcon" size={14} className="text-success" />
                      <span>Track daily intake</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflineStatusIndicator;