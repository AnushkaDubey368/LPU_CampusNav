import React, { useState } from 'react';
import { ScreenId, RoutePreference } from '../../types';

interface RouteScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenLiveNav: () => void;
}

export const RouteScreen: React.FC<RouteScreenProps> = ({
  onNavigate,
  onOpenLiveNav,
}) => {
  const [preference, setPreference] = useState<RoutePreference>('fastest');
  const [shareToast, setShareToast] = useState(false);

  const getStats = () => {
    switch (preference) {
      case 'rain':
        return { walkTime: '7 mins', eta: '09:52 AM', tag: 'Covered Walkways' };
      case 'accessible':
        return { walkTime: '6 mins', eta: '09:51 AM', tag: 'Ramps & Lift Bank A' };
      case 'fastest':
      default:
        return { walkTime: '5 mins', eta: '09:50 AM', tag: '10 min early!' };
    }
  };

  const currentStats = getStats();

  const handleShare = () => {
    setShareToast(true);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        'LPU CampusNav: Route to Block 34 Room 304 from Hostel BH-1. ETA: 5 mins. https://campusnav.lpu.in/r/34-304'
      );
    }
    setTimeout(() => setShareToast(false), 2500);
  };

  return (
    <div className="flex flex-col w-full pb-36 pt-1 max-w-xl mx-auto">
      {/* Interactive Wayfinder Context Header */}
      <section className="px-space-md pt-space-md pb-space-sm">
        <div className="flex items-center justify-between gap-space-sm mb-space-xs">
          <div className="flex items-center gap-space-xs min-w-0">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm font-label-sm font-bold">
              3/4
            </span>
            <h1 className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
              Route to Room 304
            </h1>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            Live GPS Active
          </span>
        </div>
        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-3/4 rounded-full transition-all duration-500 ease-out"></div>
        </div>
      </section>

      {/* Route Planner Card */}
      <section className="px-space-md py-space-xs">
        <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-md flex flex-col gap-space-md border border-surface-container-high/40">
          {/* Origin & Destination Inputs */}
          <div className="relative flex flex-col gap-space-sm">
            {/* Connecting decorative dotted path */}
            <div className="absolute left-[19px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-outline-variant pointer-events-none"></div>

            {/* Origin Item */}
            <div className="flex items-start gap-space-sm z-10">
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center flex-shrink-0 mt-0.5 border border-surface-container-high/50">
                <span className="w-3.5 h-3.5 rounded-full bg-primary-fixed-dim ring-4 ring-primary-fixed/40"></span>
              </div>
              <div className="flex-1 bg-surface-container-low rounded-lg p-2.5 min-w-0">
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-0.5 font-bold">
                  Origin (Porch)
                </div>
                <p className="font-title-md text-title-md text-on-surface font-semibold truncate">
                  Current Location (Hostel BH-1)
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Main Porch • Ground Level
                </p>
              </div>
            </div>

            {/* Destination Item */}
            <div className="flex items-start gap-space-sm z-10">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0 mt-0.5">
                <span
                  className="material-symbols-outlined text-primary text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
              </div>
              <div className="flex-1 bg-surface-container-low rounded-lg p-2.5 min-w-0">
                <div className="font-label-sm text-label-sm text-primary uppercase tracking-wider mb-0.5 font-bold">
                  Destination Room
                </div>
                <p className="font-title-md text-title-md text-on-surface font-semibold truncate">
                  Block 34, 3rd Floor, Room 304
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Dept. of Computer Science &amp; Engineering
                </p>
              </div>
            </div>
          </div>

          {/* Optimization Tabs */}
          <div className="flex flex-col gap-1.5 pt-1">
            <label className="font-label-md text-label-md text-on-surface-variant font-semibold">
              Routing Preference
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="tablist">
              {/* Fastest Tab */}
              <button
                onClick={() => setPreference('fastest')}
                aria-selected={preference === 'fastest'}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full font-label-md text-label-md transition-all active:scale-95 cursor-pointer ${
                  preference === 'fastest'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                <span>Fastest Walk (5 min)</span>
              </button>

              {/* Rain Shield Tab */}
              <button
                onClick={() => setPreference('rain')}
                aria-selected={preference === 'rain'}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full font-label-md text-label-md transition-all active:scale-95 cursor-pointer ${
                  preference === 'rain'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">umbrella</span>
                <span>Rain Shield (7 min)</span>
              </button>

              {/* Accessible Tab */}
              <button
                onClick={() => setPreference('accessible')}
                aria-selected={preference === 'accessible'}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full font-label-md text-label-md transition-all active:scale-95 cursor-pointer ${
                  preference === 'accessible'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">accessible_forward</span>
                <span>Accessible / Lifts (6 min)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Route Statistics Bar (3 Metric Tiles) */}
      <section className="px-space-md py-space-sm">
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex flex-col items-center text-center border border-surface-container-high/40">
            <span className="material-symbols-outlined text-primary text-[20px] mb-1">straighten</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Distance
            </span>
            <span className="font-title-md text-title-md font-bold text-on-surface">420 m</span>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex flex-col items-center text-center border border-surface-container-high/40">
            <span className="material-symbols-outlined text-primary text-[20px] mb-1">directions_walk</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Walk Time
            </span>
            <span className="font-title-md text-title-md font-bold text-on-surface">
              {currentStats.walkTime}
            </span>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex flex-col items-center text-center border border-surface-container-high/40">
            <span className="material-symbols-outlined text-primary text-[20px] mb-1">alarm_on</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Arrival ETA
            </span>
            <span className="font-title-md text-title-md font-bold text-on-surface">
              {currentStats.eta}
            </span>
            <span className="font-label-sm text-label-sm text-primary font-bold mt-0.5 truncate">
              {currentStats.tag}
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Map / Campus Blueprint Visualizer */}
      <section className="px-space-md py-space-xs">
        <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-md flex flex-col gap-space-sm border border-surface-container-high/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">map</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Campus &amp; Indoor Blueprint
              </h2>
            </div>
            <span className="font-label-sm text-label-sm px-2 py-0.5 bg-surface-container-high text-on-surface-variant rounded-md font-bold">
              2D Multi-Level
            </span>
          </div>

          {/* Blueprint Multi-Zone Schematic SVG / Map Container */}
          <div className="relative w-full rounded-xl overflow-hidden bg-surface-container-high p-3 border border-surface-container-highest">
            <svg
              className="w-full h-auto"
              fill="none"
              viewBox="0 0 340 180"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="walkGrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#a23a00" stopOpacity="0.3"></stop>
                  <stop offset="100%" stopColor="#a23a00" stopOpacity="1"></stop>
                </linearGradient>
                <filter height="120%" id="shadowFilter" width="120%" x="-10%" y="-10%">
                  <feDropShadow dx="0" dy="2" floodColor="#1a1b22" floodOpacity="0.12" stdDeviation="3"></feDropShadow>
                </filter>
              </defs>

              {/* Zone 1: Outdoor Boulevard */}
              <rect fill="#eeedf7" filter="url(#shadowFilter)" height="160" rx="8" width="130" x="10" y="10"></rect>
              <text fill="#5a4138" fontFamily="Space Grotesk" fontSize="10" fontWeight="700" x="20" y="30">
                ZONE 1: PROMENADE
              </text>
              <text fill="#1a1b22" fontFamily="Plus Jakarta Sans" fontSize="9" x="20" y="44">
                BH-1 Garden Path
              </text>

              {/* Zone 2: Block 34 Atrium & Vertical Shaft */}
              <rect fill="#ffffff" filter="url(#shadowFilter)" height="160" rx="8" width="90" x="150" y="10"></rect>
              <text fill="#5a4138" fontFamily="Space Grotesk" fontSize="10" fontWeight="700" x="158" y="30">
                ZONE 2: ATRIUM
              </text>
              <text fill="#1a1b22" fontFamily="Plus Jakarta Sans" fontSize="9" x="158" y="44">
                Block 34 Entry
              </text>

              {/* Elevator Shaft Indicator */}
              <rect fill="#f4f2fd" height="42" rx="6" stroke="none" width="60" x="165" y="70"></rect>
              <text fill="#a23a00" fontFamily="Space Grotesk" fontSize="8" fontWeight="700" x="172" y="86">
                LIFT BANK A
              </text>
              <text fill="#5a4138" fontFamily="Plus Jakarta Sans" fontSize="8" x="172" y="100">
                G → 3rd Flr
              </text>

              {/* Zone 3: 3rd Floor East Wing (Destination) */}
              <rect fill="#ffdbce" filter="url(#shadowFilter)" height="160" rx="8" width="80" x="250" y="10"></rect>
              <text fill="#7f2b00" fontFamily="Space Grotesk" fontSize="10" fontWeight="700" x="256" y="30">
                ZONE 3: 3RD FLR
              </text>
              <rect fill="#ffffff" height="60" rx="6" width="64" x="258" y="60"></rect>
              <text fill="#1a1b22" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" x="264" y="80">
                ROOM 304
              </text>
              <text fill="#a23a00" fontFamily="Space Grotesk" fontSize="8" fontWeight="600" x="264" y="94">
                CSE LAB
              </text>
              <circle cx="290" cy="108" fill="#a23a00" r="4"></circle>

              {/* Dynamic Route Polyline from Origin to Room */}
              <path
                d="M 40 140 L 95 140 L 95 90 L 165 90"
                stroke="url(#walkGrad)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              ></path>
              <path
                d="M 195 90 L 225 90 L 225 90 L 260 90"
                stroke="#a23a00"
                strokeDasharray="4 3"
                strokeLinecap="round"
                strokeWidth="4"
              ></path>

              {/* Marker 1: Origin */}
              <circle cx="40" cy="140" fill="#ffffff" r="7" stroke="#a23a00" strokeWidth="3"></circle>
              <circle cx="40" cy="140" fill="#a23a00" r="3"></circle>

              {/* Marker 2: Transit Node (Elevator) */}
              <circle cx="195" cy="90" fill="#a23a00" r="5"></circle>

              {/* Marker 3: Destination Pin */}
              <circle cx="290" cy="90" fill="#cb4a00" r="7"></circle>
              <circle cx="290" cy="90" fill="#ffffff" r="3"></circle>
            </svg>

            <div className="flex items-center justify-between mt-2 pt-2 bg-surface-container-lowest/80 rounded-lg px-2.5 py-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-on-surface font-body-sm text-body-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                <span>Outdoor: 150m</span>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface font-body-sm text-body-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                <span>Vertical: Lift to L3</span>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface font-body-sm text-body-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-outline"></span>
                <span>Indoor: 45m</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Waypoint Guidance */}
      <section className="px-space-md py-space-sm flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Turn-by-Turn Waypoints
          </h2>
          <span className="font-label-md text-label-md text-primary font-semibold">
            3 Steps Remaining
          </span>
        </div>

        {/* Step 1 Card */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-start gap-space-md border border-surface-container-high/40">
          <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[24px]">directions_walk</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">
                Step 1 • Outdoor Walk
              </span>
              <span className="font-label-md text-label-md text-primary font-semibold">150 m</span>
            </div>
            <p className="font-title-md text-title-md text-on-surface font-bold mb-1">
              Central Promenade Walk
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Head straight along the Central Boulevard towards Block 34. Flat terrain with paved walkway.
            </p>
          </div>
        </div>

        {/* Step 2 Card */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-start gap-space-md border border-surface-container-high/40">
          <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[24px]">door_front</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">
                Step 2 • Building Entry
              </span>
              <span className="font-label-md text-label-md text-primary font-semibold">Turn Right</span>
            </div>
            <p className="font-title-md text-title-md text-on-surface font-bold mb-1">
              Block 34 South Entrance
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Enter through the South Wing automated porch doors and walk 20 paces to Lift Bank A on your right.
            </p>
          </div>
        </div>

        {/* Step 3 Card */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-start gap-space-md border border-surface-container-high/40">
          <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[24px]">elevator</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">
                Step 3 • Indoor Transit
              </span>
              <span className="font-label-md text-label-md text-primary font-semibold">Floor 3</span>
            </div>
            <p className="font-title-md text-title-md text-on-surface font-bold mb-1">
              Lift to 3rd Floor → Room 304
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Take elevator or Stairwell B to Floor 3; exit right into East Wing corridor. Room 304 is the 2nd door on the left.
            </p>
          </div>
        </div>
      </section>

      {/* Campus Landmark Photo Preview */}
      <section className="px-space-md py-space-xs">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-2 border border-surface-container-high/40">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant font-semibold">
              Visual Landmark Reference
            </span>
            <span className="font-label-sm text-label-sm text-primary font-bold uppercase">
              South Wing Facade
            </span>
          </div>
          <div className="w-full h-36 rounded-lg overflow-hidden relative border border-surface-container-high">
            <img
              className="w-full h-full object-cover"
              alt="Block 34 South Wing Facade"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhwzCnxTmVdfmif6gXBNHS29fglbZqk4XsWnv_61ziF3IvZjmcqgBdQUJ7CtfTLXrpJJToSSxXTPpxrDNKLBVQjm4fLFI1eP4NXD21W72WYkFDrqbLuf-WgyNsz99hX9lFQ6Md7tPa2NQGAx4reHJj_tpi04A8K-_OG28-kcg74VulQfvDefg4OPoseSMuBtNkkCNRY-Pb8ClmZ7Y8WGLBosclOvBJ8--4noFRVtE"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-inverse-surface/85 backdrop-blur-md rounded-md px-3 py-1.5 flex items-center justify-between text-inverse-on-surface">
              <span className="font-body-sm text-body-sm font-medium truncate">
                Look for the Glass Canopy &amp; CSE Display
              </span>
              <span className="material-symbols-outlined text-inverse-on-surface text-[18px]">
                verified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-lg px-space-md py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex flex-col gap-2 border-t border-surface-container-high/60 max-w-xl mx-auto">
        <button
          onClick={onOpenLiveNav}
          className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.98] cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">explore</span>
          <span>Start Live Step-by-Step Walking Directions</span>
        </button>
        <button
          onClick={handleShare}
          className="w-full py-1 text-center font-label-md text-label-md text-on-surface-variant hover:text-on-surface flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">share</span>
          <span>Share Route with Classmate</span>
        </button>
      </div>

      {/* Share Toast */}
      {shareToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A] text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-[#EA5A0B] text-sm">check_circle</span>
          <span className="font-label-sm text-xs">Route link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
};
