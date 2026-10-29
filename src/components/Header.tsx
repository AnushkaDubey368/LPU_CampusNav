import React, { useState } from 'react';
import { ScreenId, UserProfile } from '../types';
import { CAMPUS_LOGO_URL } from '../data/campusData';

interface HeaderProps {
  currentScreen: ScreenId;
  userProfile: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onBack?: () => void;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  userProfile,
  onNavigate,
  onBack,
  showBack = false,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const getSubTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Home';
      case 'map':
        return 'Map';
      case 'route':
        return 'Route';
      case 'directory':
        return 'Directory';
      case 'profile':
        return 'Profile';
      default:
        return 'CampusNav';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/60 transition-colors">
      <div className="h-16 px-space-md max-w-xl mx-auto flex items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm min-w-0">
          {showBack && onBack ? (
            <button
              aria-label="Go Back"
              className="w-11 h-11 -ml-2 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors active:scale-95 cursor-pointer"
              onClick={onBack}
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          ) : null}

          <div
            className="flex items-center gap-space-sm min-w-0 cursor-pointer select-none"
            onClick={() => onNavigate('home')}
          >
            <img
              alt="LPU CampusNav Sunburst Emblem"
              className="h-8 w-auto object-contain flex-shrink-0"
              src={CAMPUS_LOGO_URL}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-label-lg text-label-lg text-on-surface tracking-tight truncate">
                LPU CampusNav
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                {getSubTitle()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          {/* Notifications button */}
          <div className="relative">
            <button
              aria-label="Notifications"
              className="relative w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors active:scale-95 cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary ring-2 ring-surface"></span>
            </button>

            {/* Notification popup */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-2xl shadow-xl p-4 border border-surface-container-high z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-container">
                  <span className="font-title-md text-on-surface font-bold text-sm">Notifications</span>
                  <span className="font-label-sm text-primary font-semibold">2 New</span>
                </div>
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-xl bg-primary-fixed/25 flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">near_me</span>
                    <div>
                      <p className="font-body-sm text-on-surface font-semibold leading-tight">
                        Next Class in 15 mins
                      </p>
                      <p className="font-body-sm text-on-surface-variant text-xs mt-0.5">
                        CSE205 in Block 34, Rm 304. Walk time is approx 4 mins.
                      </p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-container-low flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px] mt-0.5">directions_bus</span>
                    <div>
                      <p className="font-body-sm text-on-surface font-semibold leading-tight">
                        Campus Shuttle Bus 4
                      </p>
                      <p className="font-body-sm text-on-surface-variant text-xs mt-0.5">
                        Arriving at Block 34 stop in 6 mins.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-full mt-3 py-1.5 text-center font-label-sm text-on-surface-variant hover:text-on-surface text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* Student Profile Avatar */}
          <button
            aria-label="Student Profile"
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors active:scale-95 cursor-pointer"
            onClick={() => onNavigate('profile')}
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
              src={userProfile.avatarUrl}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
