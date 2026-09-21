import React from 'react';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rounded',
  width,
  height
}) => {
  const variantClasses = {
    text: 'rounded h-3 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl'
  }[variant];

  const inlineStyles: React.CSSProperties = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {})
  };

  return (
    <div
      className={`bg-slate-200 animate-pulse ${variantClasses} ${className}`}
      style={inlineStyles}
      aria-hidden="true"
    />
  );
};
