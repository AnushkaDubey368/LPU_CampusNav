import React, { useState } from 'react';
import { ScreenId, UserProfile, CampusBase, RoutingMode } from '../../types';

interface ProfileScreenProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onLogout: () => void;
  onOpenReportModal: () => void;
  onOpenShuttleModal: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userProfile,
  onUpdateProfile,
  onLogout,
  onOpenReportModal,
  onOpenShuttleModal,
}) => {
  const [isUpdatingOffline, setIsUpdatingOffline] = useState(false);
  const [isSyncingRfid, setIsSyncingRfid] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleUpdateOffline = () => {
    setIsUpdatingOffline(true);
    showToast('Checking latest campus indoor blueprints (v2.4.1)...');
    setTimeout(() => {
      setIsUpdatingOffline(false);
      onUpdateProfile({ offlinePackUpdated: true });
      showToast('Offline Campus Pack successfully updated (86.4 MB)');
    }, 1200);
  };

  const handleSyncRfid = () => {
    setIsSyncingRfid(true);
    showToast('Hold Student RFID Card near phone NFC reader...');
    setTimeout(() => {
      setIsSyncingRfid(false);
      showToast('NFC Card synced: ID #12304892 (UID: 04:A3:89:FE)');
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full px-space-md py-space-sm space-y-space-md pb-32 max-w-xl mx-auto pt-1">
      {/* Header Profile Card */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-md relative overflow-hidden border border-surface-container-high/40">
        <div className="flex items-start gap-space-sm">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full p-0.5 bg-primary flex items-center justify-center">
              <img
                alt="Ananya Sharma Profile"
                className="w-full h-full rounded-full object-cover"
                src={userProfile.avatarUrl}
              />
            </div>
            <span
              className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm"
              title="Verified RFID Sync"
            >
              <span
                className="material-symbols-outlined text-[13px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check
              </span>
            </span>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between gap-space-xs">
              <h2 className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                {userProfile.name}
              </h2>
              <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0 font-bold">
                Active
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-0.5">
              Reg ID: {userProfile.regId} • Section {userProfile.section}
            </p>
            <div className="flex items-center gap-1 mt-1 text-primary">
              <span className="material-symbols-outlined text-[15px] flex-shrink-0">apartment</span>
              <span className="font-body-sm text-body-sm truncate text-on-surface-variant font-medium">
                {userProfile.school}
              </span>
            </div>
          </div>
        </div>

        {/* RFID Sync Status Strip & Action */}
        <div className="mt-space-md pt-space-sm flex items-center justify-between gap-space-sm bg-surface-container-low rounded-lg p-2.5 border border-surface-container-high/40">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-primary text-[18px]">contactless</span>
            <span className="font-body-sm text-body-sm text-on-surface truncate font-medium">
              NFC Smart-Card Synced
            </span>
          </div>
          <button
            onClick={handleSyncRfid}
            disabled={isSyncingRfid}
            className="bg-primary hover:bg-primary-container text-on-primary px-3 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-1 active:scale-95 transition-transform flex-shrink-0 shadow-sm cursor-pointer disabled:opacity-75 font-semibold"
          >
            <span className={`material-symbols-outlined text-[15px] ${isSyncingRfid ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{isSyncingRfid ? 'Scanning...' : 'Edit & Sync'}</span>
          </button>
        </div>
      </div>

      {/* Section 1: Route & Campus Navigation Customization */}
      <div className="flex flex-col space-y-space-sm">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
            <span className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider font-bold">
              Navigation Tuning
            </span>
          </div>
          <span className="font-label-sm text-label-sm bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full font-semibold">
            UMS Link Active
          </span>
        </div>

        {/* Container Card for Navigation Preferences */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md border border-surface-container-high/40">
          {/* Preference 1: Primary Campus Base Dropdown */}
          <div className="flex flex-col space-y-1.5">
            <label className="font-title-md text-title-md text-on-surface flex items-center justify-between font-bold">
              <span>Primary Campus Base</span>
              <span className="font-label-sm text-label-sm text-primary font-bold">DEFAULT ORIGIN</span>
            </label>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Used to compute morning commute &amp; return paths
            </p>
            <div className="relative mt-1">
              <select
                value={userProfile.campusBase}
                onChange={(e) => onUpdateProfile({ campusBase: e.target.value as CampusBase })}
                className="w-full h-12 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg px-3 pr-10 appearance-none focus:outline-none border border-surface-container-high/50 cursor-pointer"
              >
                <option value="BH-1">Hostel BH-1 (Boys Hub 1)</option>
                <option value="GH-2">Girls Hostel GH-2 (Courtyard Wing)</option>
                <option value="GATE-1">Day Scholar Gate 1 Entry (GT Road)</option>
                <option value="GATE-4">Uni-Mall East Access (Gate 4)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">expand_more</span>
              </div>
            </div>
          </div>

          {/* Preference 2: Preferred Routing Mode */}
          <div className="flex flex-col space-y-2 pt-2 border-t border-surface-container">
            <label className="font-title-md text-title-md text-on-surface flex items-center justify-between font-bold">
              <span>Preferred Routing Mode</span>
              <span className="material-symbols-outlined text-primary text-[18px]">directions_walk</span>
            </label>
            <div className="grid grid-cols-1 gap-2">
              {/* Option 1: Standard Walk */}
              <label
                onClick={() => onUpdateProfile({ routingMode: 'standard' })}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border ${
                  userProfile.routingMode === 'standard'
                    ? 'bg-primary-fixed text-on-primary-fixed border-primary shadow-sm'
                    : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">hiking</span>
                  <div className="flex flex-col">
                    <span className="font-title-md text-title-md font-semibold">Standard Walk</span>
                    <span className="font-body-sm text-body-sm opacity-80">
                      Balanced speed &amp; scenic campus lawns
                    </span>
                  </div>
                </div>
                <input
                  checked={userProfile.routingMode === 'standard'}
                  onChange={() => onUpdateProfile({ routingMode: 'standard' })}
                  className="accent-primary w-4 h-4"
                  name="route_mode"
                  type="radio"
                  value="standard"
                />
              </label>

              {/* Option 2: Brisk / Late to Class */}
              <label
                onClick={() => onUpdateProfile({ routingMode: 'brisk' })}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border ${
                  userProfile.routingMode === 'brisk'
                    ? 'bg-primary-fixed text-on-primary-fixed border-primary shadow-sm'
                    : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-primary">bolt</span>
                  <div className="flex flex-col">
                    <span className="font-title-md text-title-md font-bold">Brisk / Late to Class</span>
                    <span className="font-body-sm text-body-sm opacity-90 font-medium">
                      Cuts through Block 33/34 atriums &amp; breezeways
                    </span>
                  </div>
                </div>
                <input
                  checked={userProfile.routingMode === 'brisk'}
                  onChange={() => onUpdateProfile({ routingMode: 'brisk' })}
                  className="accent-primary w-4 h-4"
                  name="route_mode"
                  type="radio"
                  value="brisk"
                />
              </label>

              {/* Option 3: Accessible */}
              <label
                onClick={() => onUpdateProfile({ routingMode: 'accessible' })}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border ${
                  userProfile.routingMode === 'accessible'
                    ? 'bg-primary-fixed text-on-primary-fixed border-primary shadow-sm'
                    : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">accessible</span>
                  <div className="flex flex-col">
                    <span className="font-title-md text-title-md font-semibold">
                      Accessible / Ramp Priority
                    </span>
                    <span className="font-body-sm text-body-sm opacity-80">
                      Avoids stairwells; connects elevator banks
                    </span>
                  </div>
                </div>
                <input
                  checked={userProfile.routingMode === 'accessible'}
                  onChange={() => onUpdateProfile({ routingMode: 'accessible' })}
                  className="accent-primary w-4 h-4"
                  name="route_mode"
                  type="radio"
                  value="accessible"
                />
              </label>
            </div>
          </div>

          {/* Preference 3: Timetable Sync */}
          <div className="flex items-center justify-between gap-space-sm pt-2 border-t border-surface-container">
            <div className="flex flex-col pr-2">
              <span className="font-title-md text-title-md text-on-surface font-semibold">
                Timetable Sync
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Auto-sync class timings &amp; emergency room swaps from University ERP
              </span>
            </div>
            <button
              onClick={() => onUpdateProfile({ timetableSync: !userProfile.timetableSync })}
              aria-pressed={userProfile.timetableSync}
              className={`w-12 h-7 rounded-full relative p-0.5 flex-shrink-0 transition-colors focus:outline-none cursor-pointer ${
                userProfile.timetableSync ? 'bg-primary' : 'bg-secondary-fixed'
              }`}
              id="toggle-erp"
              type="button"
            >
              <span
                className={`w-6 h-6 bg-on-primary rounded-full block shadow-sm transform transition-transform ${
                  userProfile.timetableSync ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></span>
            </button>
          </div>

          {/* Preference 4: Pre-Class Reminders Segmented Pill */}
          <div className="flex flex-col space-y-1.5 pt-2 border-t border-surface-container">
            <div className="flex items-center justify-between">
              <span className="font-title-md text-title-md text-on-surface font-semibold">
                Pre-Class Navigation Alert
              </span>
              <span className="font-label-md text-label-md text-primary font-bold">
                {userProfile.preClassAlertMinutes} MIN
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Get route prompt before bell rings with real-time hallway density
            </p>
            <div className="grid grid-cols-3 gap-2 bg-surface-container-low p-1 rounded-lg mt-1 border border-surface-container-high/40">
              {[5, 10, 15].map((mins) => (
                <button
                  key={mins}
                  onClick={() => onUpdateProfile({ preClassAlertMinutes: mins })}
                  className={`py-2 rounded-md font-label-md text-label-md transition-all text-center cursor-pointer ${
                    userProfile.preClassAlertMinutes === mins
                      ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          {/* Preference 5: Avoid Weather-Exposed Paths */}
          <div className="flex items-center justify-between gap-space-sm pt-2 border-t border-surface-container">
            <div className="flex flex-col pr-2">
              <div className="flex items-center gap-1.5">
                <span className="font-title-md text-title-md text-on-surface font-semibold">
                  All-Weather Corridor Routing
                </span>
                <span className="material-symbols-outlined text-[16px] text-primary">umbrella</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Prefers covered colonnades and skywalk bridges during sun or rain
              </span>
            </div>
            <button
              onClick={() =>
                onUpdateProfile({ weatherCorridorRouting: !userProfile.weatherCorridorRouting })
              }
              aria-pressed={userProfile.weatherCorridorRouting}
              className={`w-12 h-7 rounded-full relative p-0.5 flex-shrink-0 transition-colors focus:outline-none cursor-pointer ${
                userProfile.weatherCorridorRouting ? 'bg-primary' : 'bg-secondary-fixed'
              }`}
              id="toggle-weather"
              type="button"
            >
              <span
                className={`w-6 h-6 bg-on-primary rounded-full block shadow-sm transform transition-transform ${
                  userProfile.weatherCorridorRouting ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Offline & Storage */}
      <div className="flex flex-col space-y-space-sm">
        <div className="flex items-center gap-1.5 px-1">
          <span className="material-symbols-outlined text-primary text-[20px]">cloud_sync</span>
          <span className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider font-bold">
            Offline &amp; Campus Data
          </span>
        </div>
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md border border-surface-container-high/40">
          {/* Download Complete Offline Campus Map */}
          <div className="flex items-start justify-between gap-space-sm bg-surface-container-low p-space-sm rounded-lg border border-surface-container-high/40">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 text-primary">
                <span className="material-symbols-outlined text-[20px]">download_done</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-title-md text-title-md text-on-surface truncate font-semibold">
                    Full Campus Offline Pack
                  </span>
                  <span
                    className="material-symbols-outlined text-primary text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Installed: 84 MB • All Blocks 1-55 &amp; Indoor Blueprints Saved
                </span>
              </div>
            </div>
            <button
              onClick={handleUpdateOffline}
              disabled={isUpdatingOffline}
              className="bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm px-2.5 py-1.5 rounded-lg flex items-center gap-1 flex-shrink-0 active:scale-95 transition-all cursor-pointer font-semibold"
            >
              <span className={`material-symbols-outlined text-[14px] ${isUpdatingOffline ? 'animate-spin' : ''}`}>
                refresh
              </span>
              <span>{isUpdatingOffline ? 'Updating' : 'Update'}</span>
            </button>
          </div>

          {/* Report Incorrect Room Action */}
          <button
            onClick={onOpenReportModal}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer text-left"
            type="button"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">report_problem</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-title-md text-title-md text-on-surface truncate group-hover:text-primary transition-colors font-semibold">
                  Report Inaccurate Room or Closed Pathway
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Flag construction detours, broken lifts, or room renumbering
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-0.5 transition-transform flex-shrink-0">
              chevron_right
            </span>
          </button>

          {/* Campus Transit & Bus Tracker Settings */}
          <button
            onClick={onOpenShuttleModal}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer text-left"
            type="button"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">directions_bus</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-title-md text-title-md text-on-surface truncate group-hover:text-primary transition-colors font-semibold">
                  Campus Transit &amp; Shuttle Settings
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Internal e-rickshaw routes, shuttle radar &amp; live stop alerts
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-0.5 transition-transform flex-shrink-0">
              chevron_right
            </span>
          </button>
        </div>
      </div>

      {/* Section 3: App Information & Account Actions */}
      <div className="flex flex-col space-y-space-sm pt-1">
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md border border-surface-container-high/40">
          {/* App Meta Information */}
          <div className="flex flex-col items-center justify-center text-center py-2 space-y-1">
            <div className="flex items-center gap-1.5 text-on-surface font-label-md text-label-md tracking-wider font-bold">
              <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
              <span>LPU CAMPUSNAV SYSTEM</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Version 2.4.0 (Build 2024.1) • LPU Information Technology Services
            </p>
            <p className="font-label-sm text-label-sm text-outline font-mono">
              Encrypted Session ID: #SEC-9842-GH2
            </p>
          </div>

          {/* Primary Logout Button */}
          <button
            onClick={onLogout}
            className="w-full h-12 rounded-xl bg-inverse-surface hover:bg-black text-inverse-on-surface flex items-center justify-center gap-2 font-label-lg text-label-lg active:scale-[0.99] transition-transform shadow-md cursor-pointer font-bold"
          >
            <span className="material-symbols-outlined text-[20px] text-error-container">logout</span>
            <span>Log Out of UMS Account</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-[#EA5A0B] text-base">check_circle</span>
          <span className="font-label-md text-xs">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
