import React, { useState, useEffect } from 'react';

interface LiveNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveNavigationModal: React.FC<LiveNavigationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [remainingMeters, setRemainingMeters] = useState(150);

  const steps = [
    {
      title: 'Head straight on Central Promenade',
      detail: 'Keep walking on the pedestrian avenue toward Block 34',
      instruction: 'In 90m, approach the South Entrance glass canopy',
      distance: 150,
      icon: 'straight',
    },
    {
      title: 'Turn right into Block 34 South Wing',
      detail: 'Pass through the automated sliding doors into the central atrium',
      instruction: 'Take Lift Bank A on your right (Ground Level)',
      distance: 30,
      icon: 'turn_right',
    },
    {
      title: 'Take Lift Bank A to Floor 3',
      detail: 'Exit elevator right into the East Wing corridor',
      instruction: 'Room 304 is the 2nd door on the left (Apple Mac Lab)',
      distance: 45,
      icon: 'elevator',
    },
    {
      title: 'You have arrived at Room 304!',
      detail: 'CSE205 Data Structures Lecture Hall',
      instruction: 'Door is open • Class starts in 12 mins',
      distance: 0,
      icon: 'done_all',
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      setRemainingMeters(150);
      return;
    }

    const interval = setInterval(() => {
      setRemainingMeters((prev) => {
        if (prev <= 10) {
          setCurrentStepIndex((s) => {
            if (s < steps.length - 1) {
              return s + 1;
            }
            return s;
          });
          return steps[Math.min(currentStepIndex + 1, steps.length - 1)].distance;
        }
        return prev - 8;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isOpen, currentStepIndex]);

  if (!isOpen) return null;

  const currentStep = steps[currentStepIndex];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#1A1A1A] text-white">
      {/* Top Waypoint Strip matching Tangerine Transit design specs */}
      <div className="bg-[#111111] p-4 pt-safe flex items-center justify-between border-b border-white/10 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#EA5A0B] flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined text-[32px]">
              {currentStep.icon}
            </span>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#EA5A0B] font-bold">
              Turn-by-Turn Wayfinder
            </div>
            <div className="font-headline-sm font-bold text-white text-lg leading-tight">
              {currentStepIndex === steps.length - 1
                ? 'Arrived at Destination'
                : `${remainingMeters}m`}
            </div>
            <p className="text-white/80 text-xs truncate max-w-[220px]">
              {currentStep.title}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-label-sm text-xs font-bold transition-colors cursor-pointer"
        >
          Exit Route
        </button>
      </div>

      {/* Main Simulation Viewport */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {/* Animated directional pulsing compass */}
        <div className="relative w-56 h-56 flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-[#EA5A0B]/30 animate-ping"></div>
          <div className="absolute inset-4 rounded-full border border-dashed border-white/20"></div>
          <div className="w-40 h-40 rounded-full bg-black/40 backdrop-blur-md flex flex-col items-center justify-center shadow-2xl border border-white/10">
            <span className="material-symbols-outlined text-[#EA5A0B] text-5xl transform -rotate-45">
              navigation
            </span>
            <span className="font-mono text-xs text-white/70 mt-1 font-bold">WALK 4.8 km/h</span>
          </div>
        </div>

        {/* Step details card */}
        <div className="w-full max-w-sm bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-left shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-label-sm uppercase tracking-wider text-[#EA5A0B] font-bold">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span className="text-white/60 font-mono">GPS Lock: High (3m)</span>
          </div>
          <p className="font-title-md font-bold text-white text-base">
            {currentStep.instruction}
          </p>
          <p className="text-white/70 text-xs">{currentStep.detail}</p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-2 mt-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentStepIndex
                  ? 'w-8 bg-[#EA5A0B]'
                  : i < currentStepIndex
                  ? 'w-2 bg-white/60'
                  : 'w-2 bg-white/20'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Bottom control bar */}
      <div className="bg-[#111111] p-4 pb-safe border-t border-white/10 flex items-center justify-between gap-3 max-w-xl mx-auto w-full">
        <button
          onClick={() => {
            setCurrentStepIndex((prev) => Math.max(0, prev - 1));
            setRemainingMeters(100);
          }}
          disabled={currentStepIndex === 0}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-label-md text-xs font-bold disabled:opacity-40 cursor-pointer"
        >
          Previous Step
        </button>

        <button
          onClick={() => {
            if (currentStepIndex < steps.length - 1) {
              setCurrentStepIndex((prev) => prev + 1);
              setRemainingMeters(steps[currentStepIndex + 1].distance);
            } else {
              onClose();
            }
          }}
          className="flex-1 h-12 rounded-xl bg-[#EA5A0B] hover:bg-[#cb4a00] text-white font-label-md text-sm font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-98 transition-all"
        >
          <span>
            {currentStepIndex === steps.length - 1
              ? 'Complete Navigation'
              : 'Next Step'}
          </span>
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
