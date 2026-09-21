import React from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string | React.ReactNode;
  description?: string;
  error?: string;
  helperText?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  error,
  helperText,
  id,
  className = '',
  disabled,
  checked,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={`flex items-start gap-3 select-none ${className}`}>
      <div className="relative flex items-center pt-0.5">
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className={`flex h-4.5 w-4.5 items-center justify-center rounded-md border transition-all duration-150 cursor-pointer ${
            disabled ? 'cursor-not-allowed opacity-50 bg-slate-100 border-slate-300' : ''
          } ${
            error
              ? 'border-rose-400 peer-checked:bg-rose-600 peer-checked:border-rose-600'
              : 'border-slate-300 bg-white peer-checked:bg-[#10605B] peer-checked:border-[#10605B] peer-focus-visible:ring-2 peer-focus-visible:ring-[#10605B]/30 hover:border-slate-400'
          }`}
        >
          <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 stroke-[3] transition-opacity duration-150" />
        </label>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor={checkboxId}
          className={`text-xs font-semibold cursor-pointer ${
            disabled ? 'cursor-not-allowed text-slate-400' : 'text-[#0B132B]'
          }`}
        >
          {label}
        </label>
        {description && (
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{description}</p>
        )}
        {error ? (
          <p className="text-[11px] font-medium text-rose-600 mt-1">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-slate-400 mt-0.5">{helperText}</p>
        ) : null}
      </div>
    </div>
  );
};
