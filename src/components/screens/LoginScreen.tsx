import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { CAMPUS_LOGO_URL } from '../../data/campusData';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onGuestAccess: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onGuestAccess,
  onNavigate,
}) => {
  const [regId, setRegId] = useState('12304892');
  const [password, setPassword] = useState('ums@lpu2024');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regId.trim()) {
      setErrorMsg('Please enter your University Registration ID');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your UMS portal password');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 600);
  };

  return (
    <div className="flex flex-col relative w-full pt-safe pb-safe bg-surface min-h-screen">
      <div className="flex flex-col w-full px-margin pb-space-lg max-w-md mx-auto">
        {/* Emblem & Welcome Header */}
        <div className="flex flex-col items-center text-center mt-space-md mb-space-lg">
          <div className="relative flex items-center justify-center mb-space-md">
            <div className="absolute inset-0 rounded-full bg-primary/15 blur-md transform scale-110"></div>
            <div className="relative w-20 h-20 rounded-full p-1 bg-surface-container-lowest shadow-md flex items-center justify-center ring-1 ring-black/5">
              <img
                alt="LPU CampusNav Sunburst Emblem"
                className="w-full h-full object-contain rounded-full"
                src={CAMPUS_LOGO_URL}
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed mb-space-sm shadow-sm">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider">
              Official Student &amp; Freshmen Portal
            </span>
          </div>
          <h1 className="font-display-lg-mobile text-display-lg-mobile text-on-surface tracking-tight font-extrabold">
            LPU CampusNav
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mt-space-xs">
            Navigate Blocks, Schedules &amp; Campus Life seamlessly
          </p>
        </div>

        {/* Login Form Container Card */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col border border-surface-container-high/40">
          <div className="flex items-center gap-space-sm pb-space-md">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                school
              </span>
            </div>
            <div>
              <h2 className="font-title-md text-title-md text-on-surface leading-tight font-bold">
                Sign In with University Credentials
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Connect your official UMS student profile
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-3 p-2.5 rounded-lg bg-error-container text-on-error-container font-body-sm text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
            {/* Registration ID Input */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="reg-id">
                University Registration ID
              </label>
              <div className="relative flex items-center bg-surface-container-low rounded-xl focus-within:bg-surface-container-lowest focus-within:shadow-sm focus-within:ring-2 focus-within:ring-primary/40 transition-all duration-150">
                <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-xl pointer-events-none">
                  badge
                </span>
                <input
                  className="w-full h-[52px] pl-11 pr-4 bg-transparent rounded-xl font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none"
                  id="reg-id"
                  inputMode="numeric"
                  placeholder="e.g. 12104892"
                  type="text"
                  value={regId}
                  onChange={(e) => setRegId(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="ums-pwd">
                Password / UMS Portal Password
              </label>
              <div className="relative flex items-center bg-surface-container-low rounded-xl focus-within:bg-surface-container-lowest focus-within:shadow-sm focus-within:ring-2 focus-within:ring-primary/40 transition-all duration-150">
                <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-xl pointer-events-none">
                  lock
                </span>
                <input
                  className="w-full h-[52px] pl-11 pr-12 bg-transparent rounded-xl font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none"
                  id="ums-pwd"
                  placeholder="••••••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  aria-label="Toggle password visibility"
                  className="absolute right-2.5 p-2 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Checkbox and Forgot password */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  checked={rememberMe}
                  className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"
                  id="remember-me"
                  type="checkbox"
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="font-body-sm text-body-sm text-on-surface-variant">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="font-label-sm text-label-sm text-primary hover:underline font-semibold cursor-pointer"
              >
                Forgot UMS Password?
              </button>
            </div>

            {/* Primary Log In Button */}
            <button
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-space-sm active:scale-[0.98] transition-all shadow-md shadow-primary/20 cursor-pointer disabled:opacity-75"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                  <span>Verifying UMS Profile...</span>
                </>
              ) : (
                <>
                  <span>Log In via UMS</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-space-md">
            <div className="flex-1 h-px bg-surface-container-high"></div>
            <span className="px-space-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              OR EXPLORE CAMPUS
            </span>
            <div className="flex-1 h-px bg-surface-container-high"></div>
          </div>

          {/* Guest / Tour Access Button */}
          <button
            className="w-full h-12 rounded-xl bg-inverse-surface hover:bg-black text-inverse-on-surface font-label-lg text-label-lg flex items-center justify-center gap-space-sm active:scale-[0.98] transition-all shadow-sm cursor-pointer"
            onClick={onGuestAccess}
            type="button"
          >
            <span
              className="material-symbols-outlined text-lg text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              explore
            </span>
            <span>Guest / Freshmen Tour Access</span>
          </button>
        </div>

        {/* Assistance Card */}
        <div className="mt-space-md p-space-md rounded-xl bg-surface-container flex items-start gap-space-sm border border-surface-container-high/60">
          <span className="material-symbols-outlined text-primary text-xl mt-0.5 flex-shrink-0">
            support_agent
          </span>
          <div className="flex flex-col">
            <p className="font-body-sm text-body-sm text-on-surface">
              Need assistance? Visit <span className="font-semibold text-on-surface">Division of Student Welfare (Block 30)</span>
            </p>
            <div className="flex items-center gap-2 mt-1">
              <a
                className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary font-semibold hover:underline"
                href="tel:18001024431"
              >
                <span className="material-symbols-outlined text-sm">call</span>
                <span>Helpline 1800-102-4431</span>
              </a>
              <span className="text-on-surface-variant text-xs">•</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">24/7 Desk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-surface-container-high space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-title-md text-on-surface font-bold">Reset UMS Password</h3>
              <button
                onClick={() => setShowForgotModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <p className="font-body-sm text-on-surface-variant">
              To reset your university credentials, an OTP will be dispatched to your registered student mobile (+91-98****4892) &amp; student email.
            </p>
            <div className="p-3 bg-surface-container-low rounded-xl text-xs space-y-1 text-on-surface">
              <p className="font-semibold">Visit DSW Helpdesk Block 30</p>
              <p className="text-on-surface-variant">
                If your phone number has changed, visit Counter 4 (Student Welfare) with your physical Admission Letter.
              </p>
            </div>
            <button
              onClick={() => {
                setShowForgotModal(false);
                alert('OTP sent to registered student mobile number.');
              }}
              className="w-full h-11 rounded-xl bg-primary text-on-primary font-label-md font-bold cursor-pointer"
            >
              Send Password Reset OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
