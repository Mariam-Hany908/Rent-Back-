import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to load content',
  message = 'We encountered an issue connecting to the Rent Back service. Please check your connection and try again.',
  onRetry,
  className = 'py-12 sm:py-16'
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-4 rounded-2xl border border-rose-200/80 bg-rose-50/40 ${className}`}
      role="alert"
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 mb-4 shadow-2xs">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-[#0B132B]">{title}</h3>
      <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-slate-600 leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <div className="mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-slate-500" />}
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};
