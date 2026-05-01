'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface UserContextHeaderProps {
  userName?: string;
  userRole?: 'Individual' | 'Healthcare Provider' | 'Institution Admin';
  avatarUrl?: string;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

const UserContextHeader = ({
  userName = 'Guest User',
  userRole = 'Individual',
  avatarUrl,
  onProfileClick,
  onLogoutClick,
}: UserContextHeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const getRoleBadgeColor = () => {
    switch (userRole) {
      case 'Healthcare Provider':
        return 'bg-accent text-accent-foreground';
      case 'Institution Admin':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-smooth"
        aria-label="User menu"
      >
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-medium text-card-foreground">{userName}</span>
          <span className={`text-xs caption px-2 py-0.5 rounded ${getRoleBadgeColor()}`}>
            {userRole}
          </span>
        </div>
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
          {avatarUrl ? (
            <AppImage
              src={avatarUrl}
              alt={`${userName} avatar`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground">
              <Icon name="UserIcon" size={20} />
            </div>
          )}
        </div>
        <Icon
          name="ChevronDownIcon"
          size={16}
          className={`hidden md:block transition-smooth ${isDropdownOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover rounded-lg shadow-elevation-lg border border-border z-200 animate-fade-in">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                {avatarUrl ? (
                  <AppImage
                    src={avatarUrl}
                    alt={`${userName} avatar`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground">
                    <Icon name="UserIcon" size={24} />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-popover-foreground">{userName}</p>
                <span className={`text-xs caption px-2 py-0.5 rounded ${getRoleBadgeColor()}`}>
                  {userRole}
                </span>
              </div>
            </div>
          </div>

          <div className="py-2">
            <button
              onClick={() => {
                onProfileClick?.();
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-muted transition-smooth text-popover-foreground"
            >
              <Icon name="UserCircleIcon" size={20} />
              <span className="text-sm">Profile Settings</span>
            </button>

            <button
              onClick={() => {
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-muted transition-smooth text-popover-foreground"
            >
              <Icon name="LanguageIcon" size={20} />
              <span className="text-sm">Language</span>
            </button>

            <button
              onClick={() => {
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-muted transition-smooth text-popover-foreground"
            >
              <Icon name="Cog6ToothIcon" size={20} />
              <span className="text-sm">Settings</span>
            </button>
          </div>

          <div className="py-2 border-t border-border">
            <button
              onClick={() => {
                onLogoutClick?.();
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-muted transition-smooth text-error"
            >
              <Icon name="ArrowRightOnRectangleIcon" size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContextHeader;