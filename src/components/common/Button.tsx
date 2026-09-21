import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 
    | 'primary' 
    | 'secondary' 
    | 'brand' 
    | 'accent' 
    | 'outline' 
    | 'ghost' 
    | 'destructive' 
    | 'danger' 
    | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg sm:rounded-xl transition-all duration-150 cursor-pointer select-none whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 font-medium',
    md: 'text-xs sm:text-sm px-4 py-2 sm:py-2.5 gap-2 font-semibold',
    lg: 'text-sm sm:text-base px-6 py-3 gap-2.5 font-semibold'
  }[size];

  // Map 'danger' to 'destructive' if passed
  const effectiveVariant = variant === 'danger' ? 'destructive' : variant;

  const variantClasses = {
    primary:
      'bg-[#0B132B] text-white hover:bg-[#162044] focus:ring-[#0B132B]/30 shadow-xs active:bg-[#070D1F]',
    secondary:
      'bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-slate-300 active:bg-slate-300',
    brand:
      'bg-[#10605B] text-white hover:bg-[#0B4541] focus:ring-[#10605B]/30 shadow-xs active:bg-[#072F2C]',
    accent:
      'bg-[#1EC2A4] text-[#0B132B] hover:bg-[#17A88E] focus:ring-[#1EC2A4]/40 font-bold shadow-xs active:bg-[#13907A]',
    outline:
      'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-200 shadow-2xs active:bg-slate-100',
    ghost:
      'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-200 active:bg-slate-200',
    destructive:
      'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500/30 shadow-xs active:bg-rose-800',
    link:
      'bg-transparent text-[#10605B] hover:underline underline-offset-4 focus:ring-transparent p-0 h-auto font-semibold active:scale-100'
  }[effectiveVariant];

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0" aria-hidden="true">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0" aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
