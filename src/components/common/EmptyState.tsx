import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  icon,
  className = 'py-12 sm:py-16'
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-4 rounded-2xl border border-dashed border-slate-200 bg-white/60 ${className}`}
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E8F6F5] text-[#10605B] mb-4 shadow-2xs">
        {icon || <PackageOpen className="w-7 h-7" />}
      </div>
      <h3 className="text-base font-bold text-[#0B132B]">{title}</h3>
      <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-slate-500 leading-relaxed">
        {description}
      </p>

      {(actionLabel || secondaryActionLabel) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {actionLabel && onAction && (
            <Button variant="brand" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <Button variant="outline" size="sm" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
