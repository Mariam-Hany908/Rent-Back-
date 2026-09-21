import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  User, 
  Store, 
  KeyRound,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { RentBackLogo } from '../../components/brand/RentBackLogo';
import { Button } from '../../components/common/Button';

export const LoginPage: React.FC = () => {
  const { login, demoAccounts, demoLogin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const [email, setEmail] = useState('kareem.tarek@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  // Extract destination from location state or query params
  const destination = (location.state as { from?: { pathname: string; search?: string } })?.from?.pathname || 
    new URLSearchParams(location.search).get('redirect') || 
    '/user/dashboard';

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Please enter your account password.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const loggedUser = await login(email, password);
      toast.success(
        `Welcome back, ${loggedUser.name.split(' ')[0]}!`,
        'Successfully signed in to your unified Rent Back account.'
      );
      
      // Determine redirection: if original destination was default dashboard, route by role
      let targetPath = destination;
      if (targetPath === '/user/dashboard' && loggedUser.activeRoleMode === 'owner') {
        targetPath = '/owner/dashboard';
      }
      navigate(targetPath, { replace: true });
    } catch (err: any) {
      setErrorMessage(err?.message || 'Authentication failed. Please check your email and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoSelect = async (accountType: 'renter' | 'owner' | 'unverified') => {
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      const loggedUser = await demoLogin(accountType);
      toast.success(
        `Signed in as ${loggedUser.name}!`,
        accountType === 'unverified' 
          ? 'Notice: This mock account is unverified to test identity confirmation.'
          : 'Unified Rent Back session active.'
      );
      
      if (accountType === 'unverified') {
        navigate(`/verify?email=${encodeURIComponent(loggedUser.email)}`, { replace: true });
        return;
      }

      let targetPath = destination;
      if (targetPath === '/user/dashboard' && loggedUser.activeRoleMode === 'owner') {
        targetPath = '/owner/dashboard';
      }
      navigate(targetPath, { replace: true });
    } catch (err: any) {
      setErrorMessage(err?.message || 'Quick demo login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillCredentials = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage('');
    setFieldErrors({});
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex justify-center mb-4">
            <RentBackLogo variant="full" size="lg" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B132B]">
            Sign in to your account
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            One unified account for renting premium equipment and listing your own gear.
          </p>
        </div>

        {/* Security / Escrow Guarantee Badge */}
        <div className="mt-4 mx-auto max-w-sm flex items-center justify-center gap-1.5 rounded-full bg-[#E8F6F5] border border-[#10605B]/20 px-3 py-1 text-[11px] font-semibold text-[#10605B]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1EC2A4]" />
          <span>Managed Hub Handover • 50% Protected Escrow</span>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-5 sm:px-8 shadow-rentback-card sm:rounded-2xl border border-slate-200/80">
          
          {/* Main Error Alert */}
          {errorMessage && (
            <div className="mb-5 rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label 
                htmlFor="login-email" 
                className="block text-xs font-semibold text-[#0B132B] mb-1"
              >
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
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

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label 
                  htmlFor="login-password" 
                  className="block text-xs font-semibold text-[#0B132B]"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-[#10605B] hover:text-[#0B4541] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: undefined });
                  }}
                  placeholder="••••••••"
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
              {fieldErrors.password && (
                <p className="mt-1 text-[11px] text-rose-600 font-medium">{fieldErrors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#10605B] focus:ring-[#10605B]/20"
                />
                <span className="text-xs text-slate-600">Remember this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="brand"
              size="lg"
              className="w-full justify-center text-sm font-bold shadow-xs cursor-pointer mt-2"
              isLoading={isSubmitting || authLoading}
            >
              Sign In
            </Button>
          </form>

          {/* Quick Demo Accounts Helper */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#1EC2A4]" />
                <span>Demo Test Accounts</span>
              </span>
              <span className="text-[10px] text-slate-400">1-Click Sign-In</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoSelect('renter')}
                disabled={isSubmitting}
                className="flex flex-col items-start p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-[#E8F6F5] hover:border-[#10605B]/40 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B132B] group-hover:text-[#10605B]">
                  <User className="w-3.5 h-3.5 text-[#10605B]" />
                  <span>Kareem</span>
                </div>
                <span className="text-[10px] text-slate-500">Verified Renter</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoSelect('owner')}
                disabled={isSubmitting}
                className="flex flex-col items-start p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-amber-50/80 hover:border-amber-300 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B132B] group-hover:text-amber-800">
                  <Store className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nour</span>
                </div>
                <span className="text-[10px] text-slate-500">Verified Owner</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoSelect('unverified')}
                disabled={isSubmitting}
                className="flex flex-col items-start p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-blue-50 hover:border-blue-300 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B132B] group-hover:text-blue-800">
                  <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                  <span>Laila</span>
                </div>
                <span className="text-[10px] text-slate-500">Unverified Test</span>
              </button>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Don't have an account yet?{' '}
              <Link
                to={`/register${location.search}`}
                className="font-bold text-[#10605B] hover:text-[#0B4541] hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
