import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { EMERGENCY_CONTACTS } from '../../data/campusData';

interface DirectoryScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const DirectoryScreen: React.FC<DirectoryScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);
  const [buddyChatState, setBuddyChatState] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [activeCallContact, setActiveCallContact] = useState<string | null>(null);

  const accordions = [
    {
      id: 1,
      title: 'Hostel & Room Allotment Desks',
      subtitle: 'Unipolis • Shanti Devi Auditorium • BH/GH Wardens',
      icon: 'apartment',
      isPrimaryIcon: true,
      content: (
        <div className="rounded-xl bg-surface-container-low p-space-sm space-y-space-sm border border-surface-container-high/40">
          <div className="flex items-start gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 flex-shrink-0">
              pin_drop
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface uppercase font-bold">
                Central Reporting Venues
              </span>
              <p className="font-body-sm text-body-sm text-on-surface">
                Reporting primarily stationed at <strong className="font-semibold">Baldev Raj Mittal Unipolis</strong> &amp; <strong className="font-semibold">Shanti Devi Auditorium</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 flex-shrink-0">
              badge
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface uppercase font-bold">
                Required Checklist
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Carry printed allotment slip, original Aadhaar/Govt ID, and complete biometric photo verification before receiving your key slip.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-semibold">
              BH-1 to BH-8 • GH-1 to GH-6
            </span>
            <button
              onClick={() => onNavigate('map')}
              className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-bold hover:underline cursor-pointer"
            >
              <span>View Desk Map</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Mess & Dining Schedules & Menus',
      subtitle: '4 Meal Slots • UniMall Open till 11 PM',
      icon: 'restaurant',
      isPrimaryIcon: false,
      content: (
        <div className="rounded-xl bg-surface-container-low p-space-sm space-y-space-sm border border-surface-container-high/40">
          <div className="grid grid-cols-2 gap-space-xs font-body-sm text-body-sm">
            <div className="p-2 rounded-lg bg-surface-container-lowest flex flex-col shadow-xs">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold">Breakfast</span>
              <span className="font-title-md text-title-md text-on-surface font-semibold">7:30 - 9:30 AM</span>
              <span className="text-on-surface-variant text-[11px]">South/North rotation</span>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-lowest flex flex-col shadow-xs">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold">Lunch</span>
              <span className="font-title-md text-title-md text-on-surface font-semibold">12:00 - 2:30 PM</span>
              <span className="text-on-surface-variant text-[11px]">Salad bar + Main course</span>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-lowest flex flex-col shadow-xs">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold">Snacks</span>
              <span className="font-title-md text-title-md text-on-surface font-semibold">5:00 - 6:30 PM</span>
              <span className="text-on-surface-variant text-[11px]">Tea, Coffee &amp; Finger Food</span>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-lowest flex flex-col shadow-xs">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold">Dinner</span>
              <span className="font-title-md text-title-md text-on-surface font-semibold">7:30 - 9:45 PM</span>
              <span className="text-on-surface-variant text-[11px]">Special Sweet Weekend</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-primary-fixed/30 flex items-center justify-between text-on-surface border border-primary/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">storefront</span>
              <span className="font-body-sm text-body-sm">
                Catered food courts in <strong className="font-semibold">UniMall</strong>
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-primary font-bold">Open till 11:00 PM</span>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Admin & Fee Verification Counters',
      subtitle: 'Block 30 Ground Floor • Counters 1-12 Active',
      icon: 'receipt_long',
      isPrimaryIcon: false,
      content: (
        <div className="rounded-xl bg-surface-container-low p-space-sm space-y-space-sm border border-surface-container-high/40">
          <p className="font-body-sm text-body-sm text-on-surface">
            Division of Student Welfare (DSW), Block 30 (Ground Floor). Document cross-checks, scholarship endorsements, and ID issuance.
          </p>
          {/* Live Token Status Meter */}
          <div className="p-3 rounded-lg bg-surface-container-lowest flex items-center justify-between shadow-sm border border-surface-container-high/50">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-primary animate-ping"></span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">CURRENT QUEUE MONITOR</span>
                <span className="font-title-md text-title-md text-on-surface font-semibold">Counter 07 • 8 Students Ahead</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-bold">
              ~12 mins wait
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Campus Wi-Fi Setup & Device Reg',
      subtitle: 'SSID: LPU-STUDENT-WIFI • UMS Portal Auth',
      icon: 'wifi',
      isPrimaryIcon: false,
      content: (
        <div className="rounded-xl bg-surface-container-low p-space-sm space-y-space-sm border border-surface-container-high/40">
          <div className="flex items-center justify-between bg-surface-container-lowest p-2.5 rounded-lg border border-surface-container-high/50">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">SSID NETWORK NAME</span>
              <span className="font-label-lg text-label-lg text-primary font-mono font-bold">LPU-STUDENT-WIFI</span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">wifi_lock</span>
          </div>
          <ol className="space-y-1.5 pl-4 list-decimal font-body-sm text-body-sm text-on-surface-variant">
            <li>Connect to <span className="font-mono text-on-surface font-bold">LPU-STUDENT-WIFI</span> on your smartphone/laptop.</li>
            <li>Browser auto-redirects to <span className="text-on-surface font-semibold">internet.lpu.in</span> login portal.</li>
            <li>Enter your <span className="font-semibold text-on-surface">UMS Registration ID</span> and password.</li>
            <li>Register device MAC-Address (up to 3 devices allowed per student ID).</li>
          </ol>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Laundry & Ironing Kiosks',
      subtitle: 'Automated Basements • 48-Hour Return Cycle',
      icon: 'local_laundry_service',
      isPrimaryIcon: false,
      content: (
        <div className="rounded-xl bg-surface-container-low p-space-sm space-y-space-sm border border-surface-container-high/40">
          <p className="font-body-sm text-body-sm text-on-surface">
            Central automated laundry points operate in the basements of <strong className="font-semibold">BH-2</strong>, <strong className="font-semibold">BH-5</strong>, and <strong className="font-semibold">GH-2</strong>.
          </p>
          <div className="grid grid-cols-2 gap-space-xs font-body-sm text-body-sm">
            <div className="p-2 rounded bg-surface-container-lowest border border-surface-container-high/40">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">Drop-Off Timings</span>
              <p className="font-semibold text-on-surface mt-0.5">8:00 AM – 1:00 PM</p>
            </div>
            <div className="p-2 rounded bg-surface-container-lowest border border-surface-container-high/40">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">Pickup Guarantee</span>
              <p className="font-semibold text-on-surface mt-0.5">Within 48 Hours</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleBuddyChat = () => {
    setBuddyChatState('connecting');
    setTimeout(() => {
      setBuddyChatState('connected');
      setTimeout(() => {
        setBuddyChatState('idle');
      }, 3500);
    }, 900);
  };

  const filteredAccordions = accordions.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full px-space-md py-space-sm space-y-space-lg pb-32 max-w-xl mx-auto">
      {/* Header Banner & Quick Search Section */}
      <section className="flex flex-col space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider font-bold">
                Orientation 2024
              </span>
              <span className="flex items-center gap-1 font-label-sm text-label-sm text-primary font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Live Desks Active
              </span>
            </div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface tracking-tight mt-1 font-bold">
              Student Support &amp; Helpdesk
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              First-15-Days Survival Hub • Direct access to warden desks, health, mess, and campus utilities.
            </p>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            className="w-full h-[52px] pl-11 pr-10 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md shadow-sm transition-all focus:outline-none focus:bg-surface-container-low border border-surface-container-high/50"
            id="directorySearch"
            placeholder="Search departments, helplines, blocks, mess..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              aria-label="Clear search"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-on-surface cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>
      </section>

      {/* High-Visibility Emergency Contacts Carousel */}
      <section className="flex flex-col space-y-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">emergency</span>
            <h2 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider font-bold">
              24/7 Rapid Response
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
            Instant Hotlines
          </span>
        </div>

        {/* Horizontal Swipe Emergency Cards */}
        <div className="flex gap-space-sm overflow-x-auto pb-2 pt-1 -mx-space-md px-space-md no-scrollbar snap-x snap-mandatory">
          {EMERGENCY_CONTACTS.map((item) => (
            <article
              key={item.id}
              className="flex-shrink-0 w-[270px] snap-center rounded-xl bg-inverse-surface text-inverse-on-surface p-space-md flex flex-col justify-between shadow-md relative overflow-hidden"
            >
              <div
                className={`absolute -right-4 -top-4 w-20 h-20 rounded-full blur-xl pointer-events-none ${
                  item.color === 'error' ? 'bg-error/15' : 'bg-primary/15'
                }`}
              ></div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`p-2 rounded-lg text-white ${
                      item.color === 'error' ? 'bg-error' : 'bg-white/10'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${
                      item.color === 'error'
                        ? 'bg-white/15 text-inverse-on-surface'
                        : 'bg-primary text-on-primary'
                    }`}
                  >
                    {item.ext}
                  </span>
                </div>
                <h3 className="font-title-md text-title-md text-inverse-on-surface pt-2 font-bold">
                  {item.title}
                </h3>
                <p className="font-body-sm text-body-sm text-inverse-on-surface/80">{item.subtitle}</p>
              </div>
              <button
                onClick={() => setActiveCallContact(`${item.title}: ${item.phone}`)}
                className={`mt-4 inline-flex items-center justify-center gap-2 w-full h-11 rounded-lg font-label-md text-label-md font-bold transition-all active:scale-[0.98] cursor-pointer ${
                  item.color === 'error'
                    ? 'bg-error hover:bg-error-container text-on-error'
                    : 'bg-primary hover:bg-primary-container text-on-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>Dial Now</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Campus Survival Guide & Onboarding Accordions */}
      <section className="flex flex-col space-y-space-sm" id="accordionGroup">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">auto_stories</span>
            <h2 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider font-bold">
              Freshmen Survival Guide
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
            {filteredAccordions.length} Checkpoints
          </span>
        </div>

        {filteredAccordions.length === 0 ? (
          <div className="p-6 text-center bg-surface-container rounded-xl text-on-surface-variant font-body-sm">
            No matching guide checkpoints found for "{searchQuery}".
          </div>
        ) : (
          filteredAccordions.map((item) => {
            const isOpen = openAccordion === item.id;
            return (
              <div
                key={item.id}
                className="accordion-item rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden transition-all duration-200 border border-surface-container-high/40"
              >
                <button
                  aria-expanded={isOpen}
                  onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                  className="accordion-toggle w-full px-space-md py-3.5 flex items-center justify-between text-left transition-colors hover:bg-surface-container-low cursor-pointer"
                  type="button"
                >
                  <div className="flex items-center gap-space-sm min-w-0 pr-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        item.isPrimaryIcon
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'bg-surface-container-high text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-title-md text-title-md text-on-surface truncate font-bold">
                        {item.title}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 accordion-arrow flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isOpen && (
                  <div className="accordion-content px-space-md pb-space-md pt-1 block animate-in fade-in duration-150">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* Campus Snap Gallery: Key Helpdesk Locations */}
      <section className="flex flex-col space-y-space-xs">
        <div className="flex items-center justify-between">
          <h2 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider font-bold">
            Helpdesk Landmarks
          </h2>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
            Visual Locator
          </span>
        </div>
        <div className="grid grid-cols-2 gap-space-sm">
          <div className="flex flex-col rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm border border-surface-container-high/40">
            <img
              className="w-full h-28 object-cover"
              alt="Baldev Raj Mittal Unipolis"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQcsewL5vI9_cBSlaChdEql7wNq76ZgURU1ME3ynsXCSwpqNdYF6BotbI5pkonX4RONNhsG6DcABZzo_lGeJDspATNogOxIMXNMvRU7z8G6TWuYhL3Khhl3_sAYhsI-7k2iA3QNHmaPg9Oy2Va1j2t307Hb9snldcJbr-_RkgKO8b7KIxVy8HZs7OUkdbP5TdLkPxu7mPgOnnQVg5aiIsKs3tPJRyy0g1ncAOu2iI"
            />
            <div className="p-2.5 flex flex-col">
              <span className="font-title-md text-title-md text-on-surface truncate font-bold">
                Unipolis Atrium
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Central Check-in Zone
              </span>
            </div>
          </div>
          <div className="flex flex-col rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm border border-surface-container-high/40">
            <img
              className="w-full h-28 object-cover"
              alt="Block 30 DSW"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwz6Hh2ZGqqajOvohy7H84h_KW8htCYW0WfyTcP_eCZk7O-IkWx7YV0WrXZpT-CxHAB3uLjr40Pg94PyVwtG6hWAdVvCRxV3Gy5Df9QmwR9qm6aSxOQOk2fJy-y1Frexrjkrio3iVUSDgAR_3xGLxAOEoz0Zea54mZ9nRbjg3Sscx7HjUHDBgDHiMdMsjXfbMOv1ylu0oweCSJ1bBP6TltSfnP6HBKq4LklHx7ZPs"
            />
            <div className="p-2.5 flex flex-col">
              <span className="font-title-md text-title-md text-on-surface truncate font-bold">
                Block 30 DSW
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Admin &amp; Hospital Floor
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Floating Assistance Card */}
      <section className="w-full pt-space-xs">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-container text-on-primary p-space-md shadow-lg flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[28px] text-white">support_agent</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-white/90 font-bold">
                Student Peer Network
              </span>
              <p className="font-title-md text-title-md font-bold text-white leading-tight">
                Need instant student buddy help?
              </p>
              <span className="font-body-sm text-body-sm text-white/90 truncate">
                Connect with Campus Seniors Helpdesk
              </span>
            </div>
          </div>
          <button
            onClick={handleBuddyChat}
            disabled={buddyChatState !== 'idle'}
            className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-white text-primary hover:bg-surface-container font-label-md text-label-md font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:opacity-80"
            id="buddyChatBtn"
            type="button"
          >
            {buddyChatState === 'idle' && (
              <>
                <span>Chat</span>
                <span className="material-symbols-outlined text-[16px]">chat</span>
              </>
            )}
            {buddyChatState === 'connecting' && (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                <span>Connecting</span>
              </>
            )}
            {buddyChatState === 'connected' && (
              <>
                <span className="material-symbols-outlined text-[16px]">check</span>
                <span>In Queue #3</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Call Confirmation Dialog */}
      {activeCallContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-surface-container-high space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">call</span>
              </div>
              <div>
                <h3 className="font-title-md font-bold text-on-surface">Emergency Call</h3>
                <p className="font-body-sm text-on-surface-variant text-xs">Direct campus patrol hotline</p>
              </div>
            </div>
            <p className="font-body-md text-on-surface font-semibold py-1">
              Calling {activeCallContact}
            </p>
            <p className="text-xs text-on-surface-variant">
              In actual device environment, this connects directly via university telephone network.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setActiveCallContact(null)}
                className="flex-1 h-11 rounded-xl bg-surface-container text-on-surface font-label-md font-bold cursor-pointer hover:bg-surface-container-high"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Simulating call to ${activeCallContact}... Connected to Campus Desk.`);
                  setActiveCallContact(null);
                }}
                className="flex-1 h-11 rounded-xl bg-primary text-on-primary font-label-md font-bold cursor-pointer hover:bg-primary-container"
              >
                Connect Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
