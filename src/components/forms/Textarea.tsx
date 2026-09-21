import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  id,
  required,
  className = '',
  rows = 3,
  ...props
}) => {
  const textareaId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-xs font-semibold text-[#0B132B] mb-1.5">
          {label}
          {required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`block w-full rounded-lg sm:rounded-xl border bg-white text-sm text-[#0B132B] placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 py-2.5 px-3.5 transition-all duration-150 ${
          error
            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
            : 'border-slate-200 focus:border-[#10605B] focus:ring-[#10605B]/15'
        } ${className}`}
        {...props}
      />
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};
