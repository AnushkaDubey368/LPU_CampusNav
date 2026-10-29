import React, { useState } from 'react';
import { ScreenId, UserProfile } from '../../types';
import { TODAY_CLASSES } from '../../data/campusData';

interface HomeScreenProps {
  userProfile: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onSelectClassForRoute?: (courseCode: string) => void;
  onOpenShuttleTracker?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userProfile,
  onNavigate,
  onSelectClassForRoute,
  onOpenShuttleTracker,
}) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerRoute = (destination: string) => {
    setToastMessage(`Routing to ${destination}...`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      if (onSelectClassForRoute) {
        onSelectClassForRoute('CSE205');
      }
      onNavigate('route');
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* Greeting Header */}
      <section className="px-space-md pt-space-md pb-space-sm flex flex-col gap-space-xs max-w-xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Wednesday, 28 August
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Term 1 • Active
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h1 className="font-headline-sm text-headline-sm text-on-surface tracking-tight flex items-center gap-1.5 font-bold">
            <span>Welcome back, {userProfile.name.split(' ')[0]}!</span>
            <span className="text-xl">👋</span>
          </h1>
          <div className="inline-flex items-center self-start px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
            {userProfile.program} (Section {userProfile.section})
          </div>
        </div>
      </section>

      {/* Live Schedule Hero Card */}
      <section className="px-space-md py-space-sm max-w-xl mx-auto w-full">
        <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#EA5A0B] to-[#F26522] p-5 shadow-xl text-white">
          {/* Ambient Decorative Rings */}
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 pointer-events-none blur-2xl"></div>
          <div className="absolute -left-8 -bottom-8 w-40 h-40 rounded-full bg-black/10 pointer-events-none blur-xl"></div>

          <div className="relative z-10 flex flex-col gap-3.5">
            {/* Top Status Row */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md font-label-sm text-label-sm tracking-wider uppercase text-white font-bold">
                <span className="material-symbols-outlined text-[14px]">school</span>
                UPCOMING LECTURE
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#EA5A0B] font-label-sm text-label-sm shadow-sm font-extrabold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#EA5A0B] animate-ping"></span>
                Starts in 15 mins
              </span>
            </div>

            {/* Course & Faculty */}
            <div className="flex flex-col gap-1">
              <h2 className="font-headline-sm text-headline-sm font-bold text-white tracking-tight leading-tight">
                CSE205: Data Structures &amp; Algorithms
              </h2>
              <p className="font-body-md text-body-md text-white/90 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span>Dr. Rajesh Sharma • 10:00 AM - 11:00 AM</span>
              </p>
            </div>

            {/* Location Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/20 backdrop-blur-md text-white font-label-md text-label-md">
                <span className="material-symbols-outlined text-[16px] text-white">location_on</span>
                <span>Block 34 • Room 304 (3rd Floor)</span>
              </div>
              <span className="font-label-sm text-label-sm text-white/80">Est. 4 min walk</span>
            </div>

            {/* Action Button */}
            <button
              className="mt-1 w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] hover:bg-black active:scale-[0.98] transition-all text-white font-label-lg text-label-lg shadow-lg cursor-pointer"
              id="btn-hero-nav"
              onClick={() => triggerRoute('Block 34, Room 304')}
            >
              <span className="material-symbols-outlined text-[20px] text-[#EA5A0B]">near_me</span>
              <span>Get Shortest Route to Room</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Today's Class Timeline */}
      <section className="py-space-sm flex flex-col gap-space-sm max-w-xl mx-auto w-full">
        <div className="px-space-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-title-md text-title-md text-on-surface font-bold">Today's Class Schedule</h3>
            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-semibold">
              {TODAY_CLASSES.length} Total
            </span>
          </div>
          <button
            onClick={() => triggerRoute('Block 34, Rm 304')}
            className="font-label-md text-label-md text-primary font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>View Full</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Horizontal Scroll Carousel */}
        <div className="flex gap-space-sm overflow-x-auto px-space-md py-1 scroll-smooth snap-x snap-mandatory no-scrollbar">
          {/* Slot 1 (Next Up) */}
          <div className="min-w-[260px] max-w-[270px] snap-start flex flex-col justify-between p-4 rounded-2xl bg-surface-container-lowest shadow-md border-l-4 border-[#EA5A0B] relative">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm uppercase font-bold">
                  Next Up
                </span>
                <span className="font-label-sm text-label-sm text-primary font-bold">10:00 - 11:00 AM</span>
              </div>
              <div>
                <h4 className="font-title-md text-title-md font-bold text-on-surface leading-snug">
                  CSE205: Data Structures
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Block 34, Rm 304</p>
              </div>
            </div>
            <div className="mt-3 pt-3 flex items-center justify-between border-t border-surface-container">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">directions_walk</span> 280m away
              </span>
              <button
                onClick={() => triggerRoute('Block 34, Room 304')}
                className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                title="Route to CSE205"
              >
                <span className="material-symbols-outlined text-[18px]">turn_sharp_right</span>
              </button>
            </div>
          </div>

          {/* Slot 2 */}
          <div className="min-w-[260px] max-w-[270px] snap-start flex flex-col justify-between p-4 rounded-2xl bg-surface-container-low shadow-sm border-l-4 border-on-surface">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                  Slot 2
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">11:15 - 12:15 PM</span>
              </div>
              <div>
                <h4 className="font-title-md text-title-md font-bold text-on-surface leading-snug">
                  MTH166: Eng. Math
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Block 32, Rm 201</p>
              </div>
            </div>
            <div className="mt-3 pt-3 flex items-center justify-between border-t border-surface-container">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">person</span> Prof. K. Verma
              </span>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                Upcoming
              </span>
            </div>
          </div>

          {/* Slot 3 */}
          <div className="min-w-[260px] max-w-[270px] snap-start flex flex-col justify-between p-4 rounded-2xl bg-surface-container-low shadow-sm border-l-4 border-on-surface-variant">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                  Slot 3 • Lab
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">01:30 - 03:30 PM</span>
              </div>
              <div>
                <h4 className="font-title-md text-title-md font-bold text-on-surface leading-snug">
                  PHY110: Physics Lab
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Block 38, Lab G-04</p>
              </div>
            </div>
            <div className="mt-3 pt-3 flex items-center justify-between border-t border-surface-container">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">science</span> Dr. Anita Roy
              </span>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                After Lunch
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Quick Action Grid */}
      <section className="px-space-md py-space-sm flex flex-col gap-space-sm max-w-xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <h3 className="font-title-md text-title-md text-on-surface font-bold">Campus Quick Utilities</h3>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Frequent destinations</span>
        </div>
        <div className="grid grid-cols-2 gap-space-sm">
          {/* Quick Action 1: Map */}
          <button
            onClick={() => onNavigate('map')}
            className="flex flex-col p-4 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left gap-3 group border border-surface-container-high/40 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">map</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-title-md text-title-md text-on-surface font-bold">Campus Block Map</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                Interactive 2D navigation &amp; block locator
              </span>
            </div>
          </button>

          {/* Quick Action 2: Mess */}
          <button
            onClick={() => onNavigate('directory')}
            className="flex flex-col p-4 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left gap-3 group border border-surface-container-high/40 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">restaurant</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-title-md text-title-md text-on-surface font-bold">Mess &amp; Food Court</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                Today's active menus, timings &amp; UniMall spots
              </span>
            </div>
          </button>

          {/* Quick Action 3: Helpdesks */}
          <button
            onClick={() => onNavigate('directory')}
            className="flex flex-col p-4 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left gap-3 group border border-surface-container-high/40 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">support_agent</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-title-md text-title-md text-on-surface font-bold">Helpdesks &amp; DSW</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                Division of Student Welfare, Block 30
              </span>
            </div>
          </button>

          {/* Quick Action 4: Offline Routes */}
          <button
            onClick={() => onNavigate('route')}
            className="flex flex-col p-4 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left gap-3 group border border-surface-container-high/40 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">offline_pin</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-title-md text-title-md text-on-surface font-bold">Saved Offline Routes</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                Hostel BH-1 to Block 34, Central Library
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Visual Campus Spotlight Card */}
      <section className="px-space-md py-space-sm max-w-xl mx-auto w-full">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-sm bg-surface-container-low flex flex-col border border-surface-container-high/50">
          <div className="relative h-28 w-full">
            <img
              className="w-full h-full object-cover"
              alt="LPU Academic Avenue"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzuLDs9VB9mBPivdAmcvpbN-R7ACO4EaF9FDzPYh9s8hTNuKhDNXVcbKZJtP6IswozqxuQh7u39v0gbEFSvWrkoOLpSkXNmk9oqouAAqXP9UAHKjH1JAHBmXv_VdswL8vO3IPM_TwAwr9AvWHtrW1XkbbCsdxAf_W46BxpxXdf2XMNa6kOckL7EGOa9nVEIiG7QXsy_YCyf4ctloWhe6lfaMT9KAFw-6yQOAv3k7o"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white font-label-sm text-label-sm">
              Active Waypoint: Central UniMall Walkway
            </span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">navigation</span>
              <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                Campus shuttle arrives at Block 34 in 6m
              </span>
            </div>
            <button
              onClick={() => {
                if (onOpenShuttleTracker) onOpenShuttleTracker();
                else triggerRoute('Shuttle Stop Block 34');
              }}
              className="font-label-sm text-label-sm text-primary font-bold hover:underline cursor-pointer"
            >
              Track Shuttle
            </button>
          </div>
        </div>
      </section>

      {/* Recent Campus Announcements Banner */}
      <section className="px-space-md pt-space-xs pb-space-lg max-w-xl mx-auto w-full">
        <div className="rounded-2xl p-4 bg-tertiary-fixed/30 flex items-start gap-3 shadow-sm border border-primary/20">
          <div className="w-9 h-9 rounded-xl bg-[#EA5A0B]/15 text-[#EA5A0B] flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[20px]">campaign</span>
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                Campus Notice
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Just now</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface leading-snug">
              <strong className="font-semibold text-on-surface">Orientation Week:</strong> Freshmen badge verification open in Shanti Devi Mittal Auditorium (Ground Floor, Desks 1-8).
            </p>
          </div>
        </div>
      </section>

      {/* Toast popup */}
      <div
        className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-[#1A1A1A] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 transition-all duration-300 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'
        }`}
      >
        <span className="material-symbols-outlined text-[18px] text-[#EA5A0B]">near_me</span>
        <span className="font-label-md text-label-md">{toastMessage}</span>
      </div>
    </div>
  );
};
