import React from 'react';

export interface RadioOption {
  value: string | number;
  label: string | React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  orientation = 'vertical',
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <span className="block text-xs font-semibold text-[#0B132B] mb-2">
          {label}
          {required && <span className="text-rose-500 ml-0.5">*</span>}
        </span>
      )}

      <div
        className={`flex ${orientation === 'horizontal' ? 'flex-row flex-wrap gap-4' : 'flex-col gap-2.5'}`}
        role="radiogroup"
        aria-label={label}
      >
        {options.map((option) => {
          const isSelected = value === option.value;
          const isOptionDisabled = disabled || option.disabled;
          const optionId = `radio-${name}-${option.value}`;

          return (
            <label
              key={String(option.value)}
              htmlFor={optionId}
              className={`flex items-start gap-3 select-none cursor-pointer p-2 rounded-lg border transition-all duration-150 ${
                isSelected
                  ? 'border-[#10605B] bg-[#E8F6F5]/40'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              } ${isOptionDisabled ? 'opacity-50 cursor-not-allowed bg-slate-50' : ''}`}
            >
              <div className="relative flex items-center pt-0.5">
                <input
                  type="radio"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  disabled={isOptionDisabled}
                  onChange={() => onChange(option.value)}
                  className="sr-only"
                />
                <div
                  className={`flex h-4.5 w-4.5 items-center justify-center rounded-full border transition-all duration-150 ${
                    isSelected
                      ? 'border-[#10605B] bg-[#10605B]'
                      : 'border-slate-300 bg-white'
                  } ${error ? 'border-rose-400' : ''}`}
                >
                  {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
              </div>

              <div className="flex flex-col">
                <span
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-[#0B132B]' : 'text-slate-700'
                  }`}
                >
                  {option.label}
                </span>
                {option.description && (
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {option.description}
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {error ? (
        <p className="text-[11px] font-medium text-rose-600 mt-1.5">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-400 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};
