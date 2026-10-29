import React, { useState } from 'react';
import { ScreenId, CampusBlock } from '../../types';
import { CAMPUS_BLOCKS } from '../../data/campusData';

interface MapScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectBlockForRoute?: (block: CampusBlock) => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({
  onNavigate,
  onSelectBlockForRoute,
}) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string>('blk34');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('Block 34');
  const [mapMode, setMapMode] = useState<'outdoor' | 'indoor'>('outdoor');
  const [indoorFloor, setIndoorFloor] = useState<number>(3);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [gpsCentered, setGpsCentered] = useState<boolean>(true);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>('');

  const selectedBlock =
    CAMPUS_BLOCKS.find((b) => b.id === selectedBlockId) || CAMPUS_BLOCKS[0];

  const handleSelectBlock = (block: CampusBlock) => {
    setSelectedBlockId(block.id);
    setSearchQuery(block.code);
  };

  const handleRecenter = () => {
    setGpsCentered(true);
    setToastText('GPS location re-centered to Hostel BH-1');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleCalculateRoute = () => {
    if (onSelectBlockForRoute) {
      onSelectBlockForRoute(selectedBlock);
    }
    onNavigate('route');
  };

  const categoryChips = [
    { id: 'all', label: 'All Blocks', icon: 'domain' },
    { id: 'academic', label: 'Academic Wings', icon: 'school' },
    { id: 'hostel', label: 'Hostels (BH/GH)', icon: 'hotel' },
    { id: 'food', label: 'UniMall & Food', icon: 'storefront' },
    { id: 'library', label: 'Libraries', icon: 'local_library' },
    { id: 'emergency', label: 'Emergency', icon: 'emergency' },
  ];

  return (
    <div className="flex flex-col w-full relative pb-28 pt-1">
      {/* Top Utility Bar: Search & Voice Input */}
      <div className="px-space-md pt-space-xs pb-space-sm w-full z-20 max-w-xl mx-auto">
        <div className="relative flex items-center w-full h-[52px] bg-surface-container-lowest rounded-xl shadow-md px-space-md gap-space-sm border border-surface-container-high/50">
          <span className="material-symbols-outlined text-primary text-[22px] flex-shrink-0">
            search
          </span>
          <input
            className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-on-secondary-container focus:outline-none min-w-0"
            placeholder="Search Block (e.g., 34, 38), UniMall, Gate 1..."
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              const found = CAMPUS_BLOCKS.find(
                (b) =>
                  b.code.toLowerCase().includes(e.target.value.toLowerCase()) ||
                  b.name.toLowerCase().includes(e.target.value.toLowerCase())
              );
              if (found) setSelectedBlockId(found.id);
            }}
          />
          <button
            aria-label="Voice Search"
            onClick={() => {
              setToastText('Listening... Say "Navigate to Block 34"');
              setShowToast(true);
              setTimeout(() => setShowToast(false), 2500);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors flex-shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">mic</span>
          </button>
          <button
            aria-label="Filter Map Layers"
            onClick={() => {
              setToastText('Map Layers: Showing Pedestrian & Wheelchair Colonnades');
              setShowToast(true);
              setTimeout(() => setShowToast(false), 2000);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors flex-shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
      </div>

      {/* Quick Category Filter Chips */}
      <div className="w-full overflow-x-auto no-scrollbar px-space-md pb-space-sm flex items-center gap-space-xs z-20 max-w-xl mx-auto">
        {categoryChips.map((chip) => {
          const isActive = activeCategory === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setActiveCategory(chip.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[16px] ${
                  isActive ? 'text-white' : chip.id === 'emergency' ? 'text-error' : 'text-on-surface-variant'
                }`}
              >
                {chip.icon}
              </span>
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive 2D Stylized Campus Graphic Canvas Area */}
      <div className="relative w-full h-[410px] overflow-hidden bg-surface-container-low select-none touch-pan-x touch-pan-y max-w-xl mx-auto rounded-2xl shadow-inner border border-surface-container-high/60">
        {/* Floating Mode Toggle: Outdoor vs Indoor Floor Plans */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center p-1 bg-surface-container-lowest/90 backdrop-blur-md rounded-full shadow-md border border-surface-container-high/50">
          <button
            className={`px-3 py-1 rounded-full font-label-sm text-label-sm transition-all flex items-center gap-1 cursor-pointer ${
              mapMode === 'outdoor'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => setMapMode('outdoor')}
          >
            <span className="material-symbols-outlined text-[14px]">nature_people</span>
            <span>Campus Paths</span>
          </button>
          <button
            className={`px-3 py-1 rounded-full font-label-sm text-label-sm transition-all flex items-center gap-1 cursor-pointer ${
              mapMode === 'indoor'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => setMapMode('indoor')}
          >
            <span className="material-symbols-outlined text-[14px]">layers</span>
            <span>Indoor (Floors G–8)</span>
          </button>
        </div>

        {/* Floor Level Quick-Pills for Indoor View */}
        {mapMode === 'indoor' && (
          <div className="absolute left-3 top-14 z-10 flex flex-col gap-1 bg-surface-container-lowest/90 backdrop-blur-md p-1 rounded-xl shadow-md border border-surface-container-high/50">
            {[4, 3, 2, 1, 0].map((fl) => (
              <button
                key={fl}
                onClick={() => setIndoorFloor(fl)}
                className={`w-7 h-7 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                  indoorFloor === fl
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {fl === 0 ? 'G' : `F${fl}`}
              </button>
            ))}
          </div>
        )}

        {/* Right Utility Buttons: GPS Recenter & Compass */}
        <div className="absolute right-3 top-14 z-10 flex flex-col gap-2">
          {/* GPS Recenter Button */}
          <button
            aria-label="Center GPS location"
            onClick={handleRecenter}
            className="relative w-11 h-11 rounded-full bg-surface-container-lowest text-primary shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer border border-surface-container-high/50"
          >
            <span className="material-symbols-outlined text-[24px]">my_location</span>
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </button>
          {/* Compass */}
          <button
            aria-label="North orientation"
            onClick={() => {
              setToastText('Oriented North 0°');
              setShowToast(true);
              setTimeout(() => setShowToast(false), 1500);
            }}
            className="w-11 h-11 rounded-full bg-surface-container-lowest text-on-surface shadow-lg flex items-center justify-center hover:bg-surface-container-high transition-colors cursor-pointer border border-surface-container-high/50"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">explore</span>
          </button>
        </div>

        {/* Stylized 2D Vector Map Architecture Canvas SVG */}
        <svg
          className="w-full h-full object-cover"
          fill="none"
          viewBox="0 0 600 480"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern height="16" id="lawnDots" patternUnits="userSpaceOnUse" width="16" x="0" y="0">
              <circle cx="2" cy="2" fill="#a23a00" fillOpacity="0.06" r="1.5"></circle>
            </pattern>
            <linearGradient id="routeGrad" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#cb4a00"></stop>
              <stop offset="100%" stopColor="#a23a00"></stop>
            </linearGradient>
            <filter height="140%" id="softGlow" width="140%" x="-20%" y="-20%">
              <feDropShadow dx="0" dy="4" floodColor="#a23a00" floodOpacity="0.3" stdDeviation="4"></feDropShadow>
            </filter>
            <filter height="120%" id="cardShadow" width="120%" x="-10%" y="-10%">
              <feDropShadow dx="0" dy="2" floodColor="#1a1b22" floodOpacity="0.1" stdDeviation="3"></feDropShadow>
            </filter>
          </defs>

          {/* Campus Ground Base */}
          <rect fill="#f4f2fd" height="480" width="600"></rect>

          {/* Lawns & Botanical Zones */}
          {/* Baldev Raj Central Greens */}
          <path
            d="M40 70 Q90 50 170 80 Q240 100 280 60 L290 140 Q210 160 130 140 Q60 130 40 70 Z"
            fill="#e8e7f1"
          ></path>
          <path
            d="M40 70 Q90 50 170 80 Q240 100 280 60 L290 140 Q210 160 130 140 Q60 130 40 70 Z"
            fill="url(#lawnDots)"
          ></path>
          <text fill="#5a4138" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="11" fontWeight="600" opacity="0.8" x="110" y="110">
            University Oval Park
          </text>

          {/* South Lawn & UniLake Water Body */}
          <path
            d="M380 320 C420 300 480 300 520 340 C560 380 540 440 480 450 C420 460 360 410 380 320 Z"
            fill="#e3e1ec"
          ></path>
          <path
            d="M395 335 C430 315 470 315 505 345 C540 375 525 425 475 435 C425 445 380 400 395 335 Z"
            fill="#cb4a00"
            fillOpacity="0.08"
          ></path>
          <text fill="#5a4138" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="11" fontWeight="600" x="430" y="380">
            UniLake Gardens
          </text>

          {/* Campus Boulevards and Road Grid */}
          <path d="M-20 420 L620 180" stroke="#dad9e3" strokeLinecap="round" strokeWidth="26"></path>
          <path d="M-20 420 L620 180" stroke="#ffffff" strokeLinecap="round" strokeWidth="20"></path>

          {/* University Promenade */}
          <path d="M120 -10 L180 500" stroke="#ffffff" strokeLinecap="round" strokeWidth="16"></path>
          <path d="M120 -10 L180 500" stroke="#e8e7f1" strokeDasharray="6 6" strokeWidth="2"></path>

          {/* Cross Connector Avenue */}
          <path d="M160 210 L560 270" stroke="#ffffff" strokeLinecap="round" strokeWidth="14"></path>

          {/* Primary Active Navigation Path (User to Block 34 or destination) */}
          <path
            className="animate-pulse"
            d="M80 380 Q130 340 160 290 T260 240 T320 200"
            fill="none"
            id="active-path"
            stroke="url(#routeGrad)"
            strokeDasharray="8 8"
            strokeLinecap="round"
            strokeWidth="6"
          ></path>

          {/* CAMPUS BUILDINGS */}

          {/* Unipolis */}
          <g
            filter="url(#cardShadow)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleSelectBlock(CAMPUS_BLOCKS.find((b) => b.id === 'unipolis')!)}
          >
            <polygon fill="#ffffff" points="30,170 110,150 130,220 50,240"></polygon>
            <text fill="#1a1b22" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700" x="44" y="200">
              UNIPOLIS
            </text>
            <text fill="#5a4138" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="8" x="44" y="212">
              Open Arena
            </text>
          </g>

          {/* UniMall Complex */}
          <g
            filter="url(#cardShadow)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleSelectBlock(CAMPUS_BLOCKS.find((b) => b.id === 'unimall')!)}
          >
            <rect fill="#ffffff" height="55" rx="6" width="85" x="220" y="40"></rect>
            <rect fill="#a23a00" height="6" rx="3" width="85" x="220" y="40"></rect>
            <text fill="#1a1b22" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700" x="232" y="65">
              UniMall
            </text>
            <text fill="#5a4138" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="8" x="232" y="78">
              Shopping &amp; Food
            </text>
          </g>

          {/* Central Library */}
          <g
            filter="url(#cardShadow)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleSelectBlock(CAMPUS_BLOCKS.find((b) => b.id === 'library')!)}
          >
            <rect fill="#ffffff" height="50" rx="6" width="80" x="340" y="55"></rect>
            <text fill="#1a1b22" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700" x="350" y="78">
              Central Library
            </text>
            <text fill="#5a4138" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="8" x="350" y="90">
              Digital Archives
            </text>
          </g>

          {/* Hostels: BH-1 & BH-2 */}
          <g
            filter="url(#cardShadow)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleSelectBlock(CAMPUS_BLOCKS.find((b) => b.id === 'hostels')!)}
          >
            <rect fill="#ffffff" height="60" rx="6" width="95" x="450" y="70"></rect>
            <text fill="#1a1b22" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700" x="460" y="95">
              BH-1 &amp; BH-2
            </text>
            <text fill="#5a4138" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="8" x="460" y="108">
              Student Residence
            </text>
          </g>

          {/* Block 38 */}
          <g
            filter="url(#cardShadow)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleSelectBlock(CAMPUS_BLOCKS.find((b) => b.id === 'blk38')!)}
          >
            <rect fill="#ffffff" height="60" rx="6" width="90" x="240" y="270"></rect>
            <text fill="#1a1b22" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700" x="250" y="296">
              Block 38
            </text>
            <text fill="#5a4138" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="8" x="250" y="309">
              Polytechnic Dept
            </text>
          </g>

          {/* Block 32 */}
          <g
            filter="url(#cardShadow)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleSelectBlock(CAMPUS_BLOCKS.find((b) => b.id === 'blk32')!)}
          >
            <rect fill="#ffffff" height="70" rx="6" width="100" x="370" y="160"></rect>
            <text fill="#1a1b22" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700" x="382" y="190">
              Block 32
            </text>
            <text fill="#5a4138" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="8" x="382" y="203">
              Engineering Wing
            </text>
          </g>

          {/* TARGET: Block 34 (School of CSE) */}
          <g
            filter="url(#cardShadow)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleSelectBlock(CAMPUS_BLOCKS.find((b) => b.id === 'blk34')!)}
          >
            <rect fill="#ffffff" height="68" rx="8" width="105" x="290" y="150"></rect>
            <rect fill="#a23a00" fillOpacity="0.08" height="68" rx="8" width="105" x="290" y="150"></rect>
            <path
              d="M290 158 C290 153.5 293.5 150 298 150 L395 150 C399.5 150 403 153.5 403 158 L403 162 L290 162 Z"
              fill="#a23a00"
            ></path>
            <text fill="#1a1b22" fontFamily="'Space Grotesk', sans-serif" fontSize="12" fontWeight="700" x="302" y="180">
              Block 34
            </text>
            <text fill="#a23a00" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="9" fontWeight="700" x="302" y="195">
              Comp. Science &amp; Eng.
            </text>
          </g>

          {/* Destination Marker Pin atop Block 34 */}
          <g filter="url(#softGlow)" transform="translate(340, 138)">
            <circle cx="0" cy="0" fill="#a23a00" r="14"></circle>
            <circle cx="0" cy="0" fill="#ffffff" r="6"></circle>
          </g>

          {/* Current User Live GPS Origin Pin */}
          <g transform="translate(80, 380)">
            <circle className="animate-ping" cx="0" cy="0" fill="#a23a00" fillOpacity="0.25" r="20"></circle>
            <circle cx="0" cy="0" fill="#cb4a00" r="12"></circle>
            <circle cx="0" cy="0" fill="#ffffff" r="5"></circle>
            <rect fill="#1a1b22" height="20" rx="10" width="84" x="-42" y="16"></rect>
            <text fill="#ffffff" fontFamily="'Space Grotesk', sans-serif" fontSize="9" fontWeight="700" textAnchor="middle" x="0" y="30">
              YOU ARE HERE
            </text>
          </g>

          {/* Campus Shuttle Indicator */}
          <g transform="translate(200, 375)">
            <rect fill="#1a1b22" height="14" rx="4" width="28" x="0" y="0"></rect>
            <circle cx="6" cy="14" fill="#a23a00" r="2.5"></circle>
            <circle cx="22" cy="14" fill="#a23a00" r="2.5"></circle>
            <text fill="#ffffff" fontFamily="'Space Grotesk', sans-serif" fontSize="7" fontWeight="700" textAnchor="middle" x="14" y="10">
              BUS 4
            </text>
          </g>
        </svg>
      </div>

      {/* Selected Location Bottom Sheet Card */}
      <div className="px-space-md -mt-4 pb-space-lg w-full z-30 max-w-xl mx-auto">
        <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xl p-space-md flex flex-col gap-space-sm relative border border-surface-container-high/40">
          {/* Sheet Grab Handle */}
          <div className="w-10 h-1 rounded-full bg-surface-container-highest mx-auto mb-1"></div>

          {/* Header: Title and Status */}
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-xs mb-0.5">
                <span className="px-2 py-0.5 rounded bg-on-surface text-on-primary font-label-sm text-label-sm">
                  {selectedBlock.code}
                </span>
                <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  {selectedBlock.openStatus}
                </span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate font-bold">
                {selectedBlock.name}
              </h2>
            </div>
            <button
              aria-label="Bookmark Location"
              onClick={() => {
                setIsBookmarked(!isBookmarked);
                setToastText(!isBookmarked ? 'Saved to Bookmarks' : 'Removed from Bookmarks');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 1500);
              }}
              className={`w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer ${
                isBookmarked ? 'text-primary' : 'text-on-surface hover:text-primary'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                bookmark
              </span>
            </button>
          </div>

          {/* Distance and Walk ETA Metric */}
          <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-primary text-[18px]">directions_walk</span>
            <span className="font-label-md text-label-md text-on-surface font-bold">
              {selectedBlock.distanceMeters}m away
            </span>
            <span>•</span>
            <span>~{selectedBlock.walkTimeMins} min walk from your current spot</span>
          </div>

          {/* Facility Badges / Tags */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {selectedBlock.facilities.map((fac, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px] text-primary">
                  {idx === 0 ? 'elevator' : idx === 1 ? 'local_cafe' : 'accessible'}
                </span>
                <span>{fac}</span>
              </span>
            ))}
          </div>

          {/* Block Highlights List */}
          <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-container-high/40">
            <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
              <span className="material-symbols-outlined text-[15px] text-primary">hub</span>
              Key Facilities Housed
            </div>
            <p className="font-body-sm text-body-sm text-on-surface">
              {selectedBlock.keyHighlights}
            </p>
          </div>

          {/* Primary Action CTA */}
          <button
            onClick={handleCalculateRoute}
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-space-sm shadow-md hover:opacity-95 active:scale-[0.98] transition-all mt-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">navigation</span>
            <span>Calculate Route Here</span>
          </button>
        </div>
      </div>

      {/* Floating Toast Notification */}
      <div
        className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 transition-all duration-300 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'
        }`}
      >
        <span className="material-symbols-outlined text-[18px] text-[#EA5A0B]">info</span>
        <span className="font-label-md text-label-md">{toastText}</span>
      </div>
    </div>
  );
};
