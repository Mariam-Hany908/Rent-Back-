import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading Rent Back details...',
  className = 'py-12'
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
      <p className="mt-3 text-sm font-medium text-stone-500">{message}</p>
    </div>
  );
};
