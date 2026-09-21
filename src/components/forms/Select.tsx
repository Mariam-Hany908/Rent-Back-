import React from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: (string | SelectOption)[];
  error?: string;
  helperText?: string;
  placeholder?: string;
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  placeholder,
  id,
  required,
  className = '',
  ...props
}) => {
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold text-[#0B132B] mb-1.5">
          {label}
          {required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={`block w-full rounded-lg sm:rounded-xl border text-sm text-[#0B132B] bg-white focus:outline-none focus:ring-2 py-2 sm:py-2.5 px-3.5 disabled:bg-slate-50 disabled:text-slate-400 transition-all duration-150 ${
          error
            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
            : 'border-slate-200 focus:border-[#10605B] focus:ring-[#10605B]/15'
        } ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => {
          const isObj = typeof opt === 'object' && opt !== null;
          const val = isObj ? opt.value : opt;
          const lab = isObj ? opt.label : opt;
          return (
            <option key={String(val)} value={val}>
              {lab}
            </option>
          );
        })}
      </select>
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};
