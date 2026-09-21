import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { RentBackLogo } from '../../components/brand/RentBackLogo';
import { Button } from '../../components/common/Button';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const toast = useToast();

  const emailParam = searchParams.get('email') || 'kareem.tarek@example.com';
  const codeParam = searchParams.get('code') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Password strength check
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('The passwords entered do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(emailParam, password);
      setIsSuccess(true);
      toast.success(
        'Password Reset Successful!',
        'You can now sign in with your new password credentials.'
      );
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to update password. Please try again.');
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
            Set new password
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Choose a strong, unique password to secure your rentals and escrow transactions.
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-5 sm:px-8 shadow-rentback-card sm:rounded-2xl border border-slate-200/80">
          
          {isSuccess ? (
            /* Success State */
            <div className="space-y-5 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F6F5] text-[#10605B]">
                <CheckCircle2 className="w-8 h-8 text-[#1EC2A4]" />
              </div>

              <div>
                <h3 className="text-base font-bold text-[#0B132B]">
                  Password Successfully Changed
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Your credentials for <span className="font-semibold text-[#0B132B]">{emailParam}</span> have been updated. You can now access your account.
                </p>
              </div>

              <div className="pt-3">
                <Button
                  variant="brand"
                  size="lg"
                  className="w-full justify-center text-xs font-bold cursor-pointer"
                  onClick={() => navigate('/login')}
                >
                  <span>Sign In to Rent Back</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-800 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{errorMessage}</div>
                </div>
              )}

              {/* Account Identifier Badge */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs flex items-center justify-between">
                <span className="text-slate-500 font-medium">Resetting account:</span>
                <span className="font-semibold text-[#0B132B] truncate max-w-[200px]">{emailParam}</span>
              </div>

              {/* New Password */}
              <div>
                <label 
                  htmlFor="reset-new-password" 
                  className="block text-xs font-semibold text-[#0B132B] mb-1"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="reset-new-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 pr-10 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#10605B] focus:outline-none focus:ring-2 focus:ring-[#10605B]/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

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
              </div>

              {/* Confirm New Password */}
              <div>
                <label 
                  htmlFor="reset-confirm-password" 
                  className="block text-xs font-semibold text-[#0B132B] mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  id="reset-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#10605B] focus:outline-none focus:ring-2 focus:ring-[#10605B]/15 transition-all"
                />
              </div>

              <Button
                type="submit"
                variant="brand"
                size="lg"
                className="w-full justify-center text-xs font-bold shadow-xs cursor-pointer mt-2"
                isLoading={isSubmitting}
              >
                Update Password
              </Button>
            </form>
          )}

          {/* Back to Login */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <Link
              to="/login"
              className="text-xs font-semibold text-[#10605B] hover:text-[#0B4541] hover:underline"
            >
              Cancel and Return to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
