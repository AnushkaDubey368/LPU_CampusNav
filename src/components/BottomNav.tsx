import React from 'react';
import { ScreenId } from '../types';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const tabs: { id: ScreenId; label: string; icon: string }[] = [
    { id: 'home', label: 'HOME', icon: 'dashboard' },
    { id: 'map', label: 'MAP', icon: 'map' },
    { id: 'directory', label: 'DIRECTORY', icon: 'menu_book' },
    { id: 'profile', label: 'PROFILE', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)] border-t border-surface-container-high/50">
      <div className="flex justify-around items-center h-16 px-space-sm max-w-xl mx-auto">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[64px] h-12 rounded-xl transition-all group cursor-pointer select-none ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-6 rounded-full transition-colors ${
                  isActive ? 'bg-primary/10' : 'group-hover:bg-surface-container'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
              </div>
              <span className="font-label-sm text-label-sm tracking-wider mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
