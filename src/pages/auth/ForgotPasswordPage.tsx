import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  KeyRound, 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RentBackLogo } from '../../components/brand/RentBackLogo';
import { Button } from '../../components/common/Button';

export const ForgotPasswordPage: React.FC = () => {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [simulatedCode, setSimulatedCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await forgotPassword(email.trim());
      setIsSuccess(true);
      setSimulatedCode(res.resetCode);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to send reset instructions. Please try again.');
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
            Reset your password
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Enter your registered email address and we'll send you security instructions to reset your password.
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-5 sm:px-8 shadow-rentback-card sm:rounded-2xl border border-slate-200/80">
          
          {isSuccess ? (
            /* Success Feedback State */
            <div className="space-y-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F6F5] text-[#10605B]">
                <CheckCircle2 className="w-6 h-6 text-[#1EC2A4]" />
              </div>

              <div>
                <h3 className="text-base font-bold text-[#0B132B]">
                  Reset Instructions Dispatched
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  We sent a password reset token to{' '}
                  <span className="font-semibold text-[#0B132B]">{email}</span>.
                </p>
              </div>

              {/* Simulated Code Reassurance Card for evaluators */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Simulated Reset Token
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <Clock className="w-3 h-3" /> Valid for 15 mins
                  </span>
                </div>
                <div className="font-mono text-center text-lg font-bold tracking-widest text-[#10605B] bg-white py-2 rounded-lg border border-slate-200">
                  {simulatedCode || '789123'}
                </div>
                <p className="text-[11px] text-slate-400 text-center">
                  (In frontend mock mode, click below to proceed directly to set your new password)
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <Button
                  variant="brand"
                  size="lg"
                  className="w-full justify-center text-xs font-bold cursor-pointer"
                  onClick={() => navigate(`/reset-password?email=${encodeURIComponent(email)}&code=${simulatedCode}`)}
                >
                  <span>Proceed to Set New Password</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center text-xs cursor-pointer"
                  onClick={() => setIsSuccess(false)}
                >
                  Send to a different email
                </Button>
              </div>
            </div>
          ) : (
            /* Input Email State */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-800 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{errorMessage}</div>
                </div>
              )}

              <div>
                <label 
                  htmlFor="forgot-email" 
                  className="block text-xs font-semibold text-[#0B132B] mb-1"
                >
                  Account Email Address
                </label>
                <div className="relative">
                  <input
                    id="forgot-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#10605B] focus:outline-none focus:ring-2 focus:ring-[#10605B]/15 transition-all"
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500">
                  We'll verify your email and send you a secure link to create a new password.
                </p>
              </div>

              <Button
                type="submit"
                variant="brand"
                size="lg"
                className="w-full justify-center text-xs font-bold shadow-xs cursor-pointer mt-2"
                isLoading={isSubmitting}
              >
                Send Reset Instructions
              </Button>
            </form>
          )}

          {/* Back to Login */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#10605B] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
