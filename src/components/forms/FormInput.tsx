import React from 'react';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightElement,
  id,
  required,
  className = '',
  ...props
}) => {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-[#0B132B] mb-1.5">
          {label}
          {required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative rounded-lg sm:rounded-xl">
        {leftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`block w-full rounded-lg sm:rounded-xl border bg-white text-sm text-[#0B132B] placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 py-2 sm:py-2.5 transition-all duration-150 ${
            leftIcon ? 'pl-10' : 'pl-3.5'
          } ${rightElement ? 'pr-12' : 'pr-3.5'} ${
            error
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-200 focus:border-[#10605B] focus:ring-[#10605B]/15'
          } ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightElement}
          </div>
        )}
      </div>
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};
