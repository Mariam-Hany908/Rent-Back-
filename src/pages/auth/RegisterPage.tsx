import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  UserCheck,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { RentBackLogo } from '../../components/brand/RentBackLogo';
import { Button } from '../../components/common/Button';

export const RegisterPage: React.FC = () => {
  const { register, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: 'Empty', color: 'bg-slate-200' };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', color: 'bg-rose-500' };
      case 2:
        return { score: 2, label: 'Fair', color: 'bg-amber-500' };
      case 3:
        return { score: 3, label: 'Good', color: 'bg-blue-500' };
      case 4:
        return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
      default:
        return { score: 0, label: 'Weak', color: 'bg-rose-400' };
    }
  }, [password]);

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      errors.name = 'Please enter your full legal name.';
    }

    if (!email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please provide a valid email format (e.g. name@example.com).';
    }

    if (!phone.trim()) {
      errors.phone = 'Phone number is required for rental pickup coordination.';
    } else if (phone.trim().replace(/\D/g, '').length < 8) {
      errors.phone = 'Please enter a valid telephone or mobile number.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm your password.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (!agreeTerms) {
      errors.agreeTerms = 'You must accept the Rent Back Terms of Service & Escrow Agreement.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await register({
        name,
        email,
        phone,
        password
      });

      toast.success(
        'Account Created Successfully!',
        `A 6-digit verification code has been simulated for ${email}. (Code: ${res.verificationCode})`
      );

      // Redirect to verification flow
      navigate(`/verify?email=${encodeURIComponent(email)}&registered=true`);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="inline-flex justify-center mb-4">
            <RentBackLogo variant="full" size="lg" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B132B]">
            Create your Rent Back account
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            One account for both renting equipment and listing your own gear.
          </p>
        </div>

        {/* Dual-Role Reassurance Card */}
        <div className="mt-4 rounded-xl bg-[#E8F6F5] border border-[#10605B]/20 p-3 text-xs text-[#10605B] flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#10605B] shrink-0 mt-0.5" />
          <p className="leading-snug">
            <span className="font-bold">Unified Membership:</span> You do not need separate accounts. You can rent gear anytime or switch to Owner mode to list items whenever you choose.
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-5 sm:px-8 shadow-rentback-card sm:rounded-2xl border border-slate-200/80">
          
          {errorMessage && (
            <div className="mb-5 rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label 
                htmlFor="register-name" 
                className="block text-xs font-semibold text-[#0B132B] mb-1"
              >
                Full Legal Name
              </label>
              <input
                id="register-name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                }}
                placeholder="e.g. Kareem Tarek"
                className={`w-full rounded-xl border ${
                  fieldErrors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                } px-3.5 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#10605B] focus:outline-none focus:ring-2 focus:ring-[#10605B]/15 transition-all`}
              />
              {fieldErrors.name && (
                <p className="mt-1 text-[11px] text-rose-600 font-medium">{fieldErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label 
                htmlFor="register-email" 
                className="block text-xs font-semibold text-[#0B132B] mb-1"
              >
                Email Address
              </label>
              <input
                id="register-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                }}
                placeholder="name@example.com"
                className={`w-full rounded-xl border ${
                  fieldErrors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                } px-3.5 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#10605B] focus:outline-none focus:ring-2 focus:ring-[#10605B]/15 transition-all`}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-[11px] text-rose-600 font-medium">{fieldErrors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label 
                htmlFor="register-phone" 
                className="block text-xs font-semibold text-[#0B132B] mb-1"
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="register-phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: '' });
                  }}
                  placeholder="+20 100 123 4567"
                  className={`w-full rounded-xl border ${
                    fieldErrors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  } px-3.5 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#10605B] focus:outline-none focus:ring-2 focus:ring-[#10605B]/15 transition-all`}
                />
              </div>
              {fieldErrors.phone ? (
                <p className="mt-1 text-[11px] text-rose-600 font-medium">{fieldErrors.phone}</p>
              ) : (
                <p className="mt-1 text-[10px] text-slate-400">Used strictly for delivery & hub handover coordination.</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label 
                htmlFor="register-password" 
                className="block text-xs font-semibold text-[#0B132B] mb-1"
              >
                Create Password
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
                  }}
                  placeholder="At least 6 characters"
                  className={`w-full rounded-xl border ${
                    fieldErrors.password ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  } px-3.5 py-2.5 pr-10 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#10605B] focus:outline-none focus:ring-2 focus:ring-[#10605B]/15 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {password && (
                <div className="mt-1.5 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">Security strength:</span>
                    <span className="font-bold text-[#0B132B]">{passwordStrength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full flex-1 rounded-full ${passwordStrength.score >= 1 ? passwordStrength.color : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 rounded-full ${passwordStrength.score >= 2 ? passwordStrength.color : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 rounded-full ${passwordStrength.score >= 3 ? passwordStrength.color : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 rounded-full ${passwordStrength.score >= 4 ? passwordStrength.color : 'bg-slate-200'}`} />
                  </div>
                </div>
              )}

              {fieldErrors.password && (
                <p className="mt-1 text-[11px] text-rose-600 font-medium">{fieldErrors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label 
                htmlFor="register-confirm-password" 
                className="block text-xs font-semibold text-[#0B132B] mb-1"
              >
                Confirm Password
              </label>
              <input
                id="register-confirm-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: '' });
                }}
                placeholder="Re-enter password"
                className={`w-full rounded-xl border ${
                  fieldErrors.confirmPassword ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                } px-3.5 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#10605B] focus:outline-none focus:ring-2 focus:ring-[#10605B]/15 transition-all`}
              />
              {fieldErrors.confirmPassword && (
                <p className="mt-1 text-[11px] text-rose-600 font-medium">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and conditions */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (fieldErrors.agreeTerms) setFieldErrors({ ...fieldErrors, agreeTerms: '' });
                  }}
                  className="h-4 w-4 mt-0.5 rounded border-slate-300 text-[#10605B] focus:ring-[#10605B]/20"
                />
                <span className="text-xs text-slate-600 leading-normal">
                  I agree to the Rent Back{' '}
                  <Link to="/faq" className="text-[#10605B] font-semibold hover:underline">
                    Terms of Service
                  </Link>
                  , Equipment Rental Guidelines, and{' '}
                  <Link to="/faq" className="text-[#10605B] font-semibold hover:underline">
                    Escrow Deposit Policy
                  </Link>
                  .
                </span>
              </label>
              {fieldErrors.agreeTerms && (
                <p className="mt-1 text-[11px] text-rose-600 font-medium">{fieldErrors.agreeTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="brand"
              size="lg"
              className="w-full justify-center text-sm font-bold shadow-xs cursor-pointer mt-2"
              isLoading={isSubmitting || authLoading}
            >
              Create Account
            </Button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <Link
                to={`/login${location.search}`}
                className="font-bold text-[#10605B] hover:text-[#0B4541] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
