import React from 'react';
import { ScreenId } from '../types';

interface DeviceFrameBarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
}

export const DeviceFrameBar: React.FC<DeviceFrameBarProps> = ({
  currentScreen,
  onSelectScreen,
  isMobileFrame,
  onToggleFrame,
}) => {
  const screens: { id: ScreenId; label: string; num: string }[] = [
    { id: 'login', label: '1. Login Portal', num: 'S1' },
    { id: 'home', label: '2. Central Home', num: 'S2' },
    { id: 'map', label: '3. 2D Block Map', num: 'S3' },
    { id: 'route', label: '4. Indoor Route', num: 'S4' },
    { id: 'directory', label: '5. Survival Guide', num: 'S5' },
    { id: 'profile', label: '6. Nav Settings', num: 'S6' },
  ];

  return (
    <div className="w-full bg-[#1A1A1A] text-white text-xs py-1.5 px-3 flex flex-wrap items-center justify-between gap-2 z-[60] shadow-md border-b border-white/10 select-none">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 font-bold tracking-wider uppercase text-[#EA5A0B] font-mono">
          <span className="w-2 h-2 rounded-full bg-[#EA5A0B] animate-pulse"></span>
          Tangerine Transit
        </span>
        <span className="text-white/40 hidden sm:inline">•</span>
        <span className="text-white/70 hidden sm:inline text-[11px]">6 Prototype Screens</span>
      </div>

      {/* Screen selector chips */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
        {screens.map((s) => {
          const isActive = currentScreen === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelectScreen(s.id)}
              className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#EA5A0B] text-white font-bold shadow-sm ring-1 ring-white/30'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
              title={s.label}
            >
              <span className="sm:hidden">{s.num}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Viewport Width toggle */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onToggleFrame}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/90 text-[11px] transition-colors cursor-pointer"
          title="Toggle between Mobile device view and Full responsive width"
        >
          <span className="material-symbols-outlined text-[14px]">
            {isMobileFrame ? 'devices' : 'smartphone'}
          </span>
          <span className="hidden md:inline">
            {isMobileFrame ? 'Fluid Width' : 'Mobile View'}
          </span>
        </button>
      </div>
    </div>
  );
};
