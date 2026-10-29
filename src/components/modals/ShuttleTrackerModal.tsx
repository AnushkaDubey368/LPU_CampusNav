import React, { useState } from 'react';

interface ShuttleTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShuttleTrackerModal: React.FC<ShuttleTrackerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedRoute, setSelectedRoute] = useState<'shuttle' | 'erickshaw'>('shuttle');

  if (!isOpen) return null;

  const shuttles = [
    {
      bus: 'Shuttle Bus 4',
      route: 'Gate 1 ➔ UniMall ➔ Block 34 ➔ Hostels',
      status: 'En-route to Block 34',
      eta: '4 mins away',
      crowd: 'Seating Available',
      crowdLevel: 'low',
    },
    {
      bus: 'Shuttle Bus 2',
      route: 'Central Library ➔ UniMall ➔ Sports Complex',
      status: 'At UniMall Station',
      eta: '8 mins away',
      crowd: 'Moderate Rush',
      crowdLevel: 'med',
    },
    {
      bus: 'E-Rickshaw Stand B',
      route: 'Hostel BH-1 ➔ Block 30 DSW ➔ Main Gate',
      status: 'Ready at Porch Stand',
      eta: 'Departing now',
      crowd: '3 seats left',
      crowdLevel: 'low',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-surface-container-high space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">directions_bus</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-base font-bold text-on-surface">
                Campus Transit Radar
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Live LPU internal shuttle &amp; e-rickshaw tracker
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 p-1 bg-surface-container-low rounded-xl border border-surface-container-high/40">
          <button
            onClick={() => setSelectedRoute('shuttle')}
            className={`py-2 rounded-lg font-label-md text-xs font-bold transition-all cursor-pointer ${
              selectedRoute === 'shuttle'
                ? 'bg-primary text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Free Campus Shuttles
          </button>
          <button
            onClick={() => setSelectedRoute('erickshaw')}
            className={`py-2 rounded-lg font-label-md text-xs font-bold transition-all cursor-pointer ${
              selectedRoute === 'erickshaw'
                ? 'bg-primary text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            ₹10 E-Rickshaws
          </button>
        </div>

        {/* Active Vehicles List */}
        <div className="space-y-3">
          {shuttles.map((s, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-title-md font-bold text-on-surface text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  {s.bus}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] font-bold">
                  {s.eta}
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant">{s.route}</p>
              <div className="flex items-center justify-between pt-1 border-t border-surface-container text-xs">
                <span className="font-semibold text-primary">{s.status}</span>
                <span className="text-on-surface-variant">{s.crowd}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-inverse-surface text-inverse-on-surface font-label-md font-bold cursor-pointer"
        >
          Close Transit Radar
        </button>
      </div>
    </div>
  );
};
