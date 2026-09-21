import React from 'react';

export interface SwitchProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string | React.ReactNode;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  id,
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  className = ''
}) => {
  const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;

  const trackSizes = size === 'sm' ? 'w-8 h-4.5 p-0.5' : 'w-10 h-6 p-0.5';
  const thumbSizes = size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5';
  const translateClass = size === 'sm' ? 'translate-x-3.5' : 'translate-x-4';

  return (
    <div className={`flex items-start gap-3 select-none ${className}`}>
      <button
        type="button"
        role="switch"
        id={switchId}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10605B] focus-visible:ring-offset-2 ${trackSizes} ${
          checked ? 'bg-[#10605B]' : 'bg-slate-200'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span
          className={`pointer-events-none inline-block rounded-full bg-white shadow-md transform ring-0 transition duration-200 ease-in-out ${thumbSizes} ${
            checked ? translateClass : 'translate-x-0'
          }`}
        />
      </button>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={switchId}
              className={`text-xs font-semibold cursor-pointer ${
                disabled ? 'cursor-not-allowed text-slate-400' : 'text-[#0B132B]'
              }`}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
