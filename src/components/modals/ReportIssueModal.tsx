import React, { useState } from 'react';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [issueType, setIssueType] = useState('closed_pathway');
  const [locationName, setLocationName] = useState('Block 34, 3rd Floor Stairwell');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-5 shadow-2xl border border-surface-container-high space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">report_problem</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-base font-bold text-on-surface">
                Report Campus Pathway Issue
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Alert university operations to update navigation maps
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

        {submitted ? (
          <div className="p-6 text-center space-y-2 bg-primary-fixed/20 rounded-xl">
            <span className="material-symbols-outlined text-4xl text-primary animate-bounce">
              check_circle
            </span>
            <h4 className="font-title-md font-bold text-on-surface">Report Logged!</h4>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Ticket #NAV-8291 created. Campus Estate Maintenance has been notified to inspect and re-route paths.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-xs font-semibold text-on-surface">
                Issue Category
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full h-11 bg-surface-container-low text-on-surface font-body-sm text-xs rounded-xl px-3 border border-surface-container-high/60 focus:outline-none"
              >
                <option value="closed_pathway">Construction or Closed Corridor</option>
                <option value="broken_lift">Elevator Out of Service</option>
                <option value="wrong_room">Room Renumbered or Swapped</option>
                <option value="ramp_blocked">Wheelchair Ramp Obstructed</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-xs font-semibold text-on-surface">
                Specific Location / Room
              </label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g. Block 34, East Wing Lift Bank"
                className="w-full h-11 bg-surface-container-low text-on-surface font-body-sm text-xs rounded-xl px-3 border border-surface-container-high/60 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-xs font-semibold text-on-surface">
                Additional Notes
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe detour details or temporary wooden ramp installed..."
                className="w-full bg-surface-container-low text-on-surface font-body-sm text-xs rounded-xl p-3 border border-surface-container-high/60 focus:outline-none resize-none"
              ></textarea>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 rounded-xl bg-surface-container text-on-surface font-label-md font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 h-11 rounded-xl bg-primary text-on-primary font-label-md font-bold cursor-pointer hover:bg-primary-container"
              >
                Submit Flag
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
