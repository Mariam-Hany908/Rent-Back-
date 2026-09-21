import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight, 
  Mail, 
  KeyRound,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { RentBackLogo } from '../../components/brand/RentBackLogo';
import { Button } from '../../components/common/Button';

export const VerificationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, verifyCode, resendVerificationCode } = useAuth();
  const toast = useToast();

  const emailParam = searchParams.get('email') || user?.email || 'kareem.tarek@example.com';
  const isNewlyRegistered = searchParams.get('registered') === 'true';

  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(45);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto focus first empty input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer for resending
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleDigitChange = (index: number, val: string) => {
    // Clean numeric value
    const numericVal = val.replace(/\D/g, '');
    if (!numericVal && val !== '') return;

    const newDigits = [...digits];
    
    // Handle single digit entry
    if (numericVal.length === 1) {
      newDigits[index] = numericVal;
      setDigits(newDigits);
      setErrorMessage('');

      // Auto advance
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (numericVal.length > 1) {
      // Handle paste
      const pasted = numericVal.slice(0, 6).split('');
      pasted.forEach((ch, idx) => {
        if (index + idx < 6) {
          newDigits[index + idx] = ch;
        }
      });
      setDigits(newDigits);
      const nextIdx = Math.min(5, index + pasted.length);
      inputRefs.current[nextIdx]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newDigits = [...digits];
    for (let i = 0; i < pastedData.length; i++) {
      newDigits[i] = pastedData[i];
    }
    setDigits(newDigits);
    setErrorMessage('');
    const focusIdx = Math.min(5, pastedData.length);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleVerifySubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const fullCode = digits.join('');
    if (fullCode.length < 6) {
      setErrorMessage('Please enter all 6 digits of the verification code.');
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyCode(emailParam, fullCode);
      setIsVerified(true);
      toast.success(
        'Identity Verified Successfully!',
        'Your Rent Back account is now verified for equipment rentals and escrow protection.'
      );
    } catch (err: any) {
      setErrorMessage(err?.message || 'Invalid verification code. Please try 123456.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || isResending) return;
    setIsResending(true);
    try {
      const code = await resendVerificationCode(emailParam);
      setCountdown(45);
      toast.info(
        'New Code Dispatched',
        `A new mock verification code (Code: ${code}) was sent to ${emailParam}.`
      );
    } catch (err) {
      toast.error('Failed to Resend', 'Could not dispatch code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleQuickFillDemo = () => {
    setDigits(['1', '2', '3', '4', '5', '6']);
    setErrorMessage('');
    inputRefs.current[5]?.focus();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="inline-flex justify-center mb-4">
            <RentBackLogo variant="full" size="lg" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B132B]">
            {isVerified ? 'Verification Complete' : 'Verify your account'}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            {isVerified
              ? 'Your identity is confirmed. You now have full access to Rent Back.'
              : 'Enter the 6-digit security code sent to verify your identity and protect escrow deposits.'}
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-5 sm:px-8 shadow-rentback-card sm:rounded-2xl border border-slate-200/80">
          
          {isVerified ? (
            /* Verified Success View */
            <div className="space-y-5 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F6F5] text-[#10605B]">
                <ShieldCheck className="w-8 h-8 text-[#1EC2A4]" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Identity Status
                </span>
                <h3 className="mt-3 text-base font-bold text-[#0B132B]">
                  Welcome to Rent Back!
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Your identity has been authenticated. You can now request items with our 50% deposit guarantee or switch to Owner mode to list your gear.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <Button
                  variant="brand"
                  size="lg"
                  className="w-full justify-center text-xs font-bold cursor-pointer"
                  onClick={() => navigate(user?.activeRoleMode === 'owner' ? '/owner/dashboard' : '/user/dashboard')}
                >
                  <span>Go to My Dashboard</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center text-xs cursor-pointer"
                  onClick={() => navigate('/search')}
                >
                  Explore Rental Marketplace
                </Button>
              </div>
            </div>
          ) : (
            /* Code Entry View */
            <div>
              {errorMessage && (
                <div className="mb-5 rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-800 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{errorMessage}</div>
                </div>
              )}

              {/* Email Reassurance Box */}
              <div className="mb-5 rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 truncate pr-2">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-slate-600 font-medium truncate">{emailParam}</span>
                </div>
                <Link
                  to="/register"
                  className="text-[11px] font-bold text-[#10605B] hover:underline shrink-0"
                >
                  Edit
                </Link>
              </div>

              {/* 6-Digit Inputs Form */}
              <form onSubmit={handleVerifySubmit} className="space-y-5">
                <div className="flex items-center justify-between gap-2 sm:gap-2.5">
                  {digits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-11 h-13 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-xl border border-slate-300 text-[#0B132B] focus:border-[#10605B] focus:ring-2 focus:ring-[#10605B]/15 focus:outline-none transition-all shadow-2xs"
                    />
                  ))}
                </div>

                {/* Demo Shortcut Card */}
                <div className="rounded-xl bg-[#E8F6F5]/50 border border-[#10605B]/15 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#1EC2A4]" />
                    <span className="text-xs text-slate-700">
                      Mock test code: <span className="font-mono font-bold text-[#10605B]">123456</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleQuickFillDemo}
                    className="text-[11px] font-bold text-[#10605B] hover:text-[#0B4541] hover:underline cursor-pointer"
                  >
                    Auto-fill
                  </button>
                </div>

                <Button
                  type="submit"
                  variant="brand"
                  size="lg"
                  className="w-full justify-center text-xs font-bold shadow-xs cursor-pointer"
                  isLoading={isSubmitting}
                >
                  Confirm & Verify Code
                </Button>
              </form>

              {/* Resend Code Action */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Didn't receive code?</span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={countdown > 0 || isResending}
                  className={`font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                    countdown > 0
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-[#10605B] hover:text-[#0B4541] hover:underline'
                  }`}
                >
                  <RefreshCw className={`w-3 h-3 ${isResending ? 'animate-spin' : ''}`} />
                  <span>
                    {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Footer Back Link */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-center">
            <Link
              to="/login"
              className="text-xs font-medium text-slate-500 hover:text-[#0B132B] hover:underline"
            >
              Return to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
