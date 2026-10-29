import React, { useState } from 'react';
import { ScreenId, UserProfile, CampusBlock } from './types';
import { INITIAL_USER_PROFILE } from './data/campusData';
import { DeviceFrameBar } from './components/DeviceFrameBar';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LoginScreen } from './components/screens/LoginScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { MapScreen } from './components/screens/MapScreen';
import { RouteScreen } from './components/screens/RouteScreen';
import { DirectoryScreen } from './components/screens/DirectoryScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { LiveNavigationModal } from './components/modals/LiveNavigationModal';
import { ShuttleTrackerModal } from './components/modals/ShuttleTrackerModal';
import { ReportIssueModal } from './components/modals/ReportIssueModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [previousScreen, setPreviousScreen] = useState<ScreenId>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [isLiveNavOpen, setIsLiveNavOpen] = useState(false);
  const [isShuttleModalOpen, setIsShuttleModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleNavigate = (screen: ScreenId) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentScreen === 'route') {
      handleNavigate(previousScreen === 'route' ? 'home' : previousScreen);
    } else {
      handleNavigate('home');
    }
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  const handleLoginSuccess = () => {
    handleNavigate('home');
  };

  const handleGuestAccess = () => {
    setUserProfile((prev) => ({
      ...prev,
      name: 'Guest Explorer',
      regId: 'GUEST-2024',
      section: 'Freshmen Tour',
    }));
    handleNavigate('home');
  };

  const handleLogout = () => {
    setUserProfile(INITIAL_USER_PROFILE);
    handleNavigate('login');
  };

  // Check if Header should be displayed
  const showHeader = currentScreen !== 'login';

  // Check if BottomNav should be displayed (screens 2, 3, 5, 6)
  const showBottomNav = ['home', 'map', 'directory', 'profile'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-[#f4f2fd] flex flex-col font-body-md text-body-md text-on-surface">
      {/* Top Testing & Prototype Switcher Bar */}
      <DeviceFrameBar
        currentScreen={currentScreen}
        onSelectScreen={handleNavigate}
        isMobileFrame={isMobileFrame}
        onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
      />

      {/* Main App Container */}
      <div
        className={`flex-1 flex flex-col mx-auto w-full transition-all duration-300 relative ${
          isMobileFrame
            ? 'max-w-[420px] my-4 shadow-2xl rounded-[32px] overflow-hidden border-[6px] border-[#1a1b22] bg-surface min-h-[844px]'
            : 'max-w-xl bg-surface shadow-sm min-h-screen'
        }`}
      >
        {/* Fixed Header */}
        {showHeader && (
          <Header
            currentScreen={currentScreen}
            userProfile={userProfile}
            onNavigate={handleNavigate}
            onBack={handleBack}
            showBack={currentScreen === 'route'}
          />
        )}

        {/* Content Area */}
        <main
          className={`flex-1 flex flex-col w-full relative ${
            showHeader ? 'pt-16' : ''
          }`}
        >
          {currentScreen === 'login' && (
            <LoginScreen
              onLoginSuccess={handleLoginSuccess}
              onGuestAccess={handleGuestAccess}
              onNavigate={handleNavigate}
            />
          )}

          {currentScreen === 'home' && (
            <HomeScreen
              userProfile={userProfile}
              onNavigate={handleNavigate}
              onSelectClassForRoute={() => handleNavigate('route')}
              onOpenShuttleTracker={() => setIsShuttleModalOpen(true)}
            />
          )}

          {currentScreen === 'map' && (
            <MapScreen
              onNavigate={handleNavigate}
              onSelectBlockForRoute={(_block: CampusBlock) => handleNavigate('route')}
            />
          )}

          {currentScreen === 'route' && (
            <RouteScreen
              onNavigate={handleNavigate}
              onOpenLiveNav={() => setIsLiveNavOpen(true)}
            />
          )}

          {currentScreen === 'directory' && (
            <DirectoryScreen onNavigate={handleNavigate} />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
              onLogout={handleLogout}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onOpenShuttleModal={() => setIsShuttleModalOpen(true)}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation */}
        {showBottomNav && (
          <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />
        )}

        {/* Interactive Live Navigation Modal */}
        <LiveNavigationModal
          isOpen={isLiveNavOpen}
          onClose={() => setIsLiveNavOpen(false)}
        />

        {/* Live Shuttle Radar Modal */}
        <ShuttleTrackerModal
          isOpen={isShuttleModalOpen}
          onClose={() => setIsShuttleModalOpen(false)}
        />

        {/* Report Pathway Detour Issue Modal */}
        <ReportIssueModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
        />
      </div>
    </div>
  );
}
