import React from 'react';

interface RentBackLogoProps {
  variant?: 'full' | 'icon' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark';
  className?: string;
}

export const RentBackLogo: React.FC<RentBackLogoProps> = ({
  variant = 'full',
  size = 'md',
  theme = 'light',
  className = ''
}) => {
  const sizeMap = {
    sm: { icon: 24, text: 'text-base', gap: 'gap-2' },
    md: { icon: 32, text: 'text-xl', gap: 'gap-2.5' },
    lg: { icon: 42, text: 'text-2xl', gap: 'gap-3' },
    xl: { icon: 64, text: 'text-4xl', gap: 'gap-4' }
  };

  const currentSize = sizeMap[size];
  const textColor = theme === 'dark' ? 'text-white' : 'text-[#0B132B]';

  // Precision vector reproduction of the Rent Back circular dual-arrow logo
  const IconMark = (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Top Arrow (Deep Forest Pine Teal #126A66 / #10605B) */}
      {/* Curves from right (approx 78, 40), over the top to left (25, 42) ending in downward-pointing arrow head */}
      <path
        d="M 76.5 44 
           C 74.8 29.5 63.5 18 50 18 
           C 36.5 18 25.2 29.5 23.5 44 
           L 30.5 44 
           C 32 33 40 25 50 25 
           C 60 25 68 33 69.5 44 
           Z"
        fill="#126A66"
      />
      {/* Arrowhead for top arrow (pointing down-left) */}
      <path
        d="M 17 38 L 37 38 L 27 52 Z"
        fill="#126A66"
      />

      {/* Bottom Arrow (Luminous Mint / Turquoise #1FC2A7) */}
      {/* Curves from left (23.5, 56), along the bottom to right (76.5, 56) ending in upward-pointing arrow head */}
      <path
        d="M 23.5 56 
           C 25.2 70.5 36.5 82 50 82 
           C 63.5 82 74.8 70.5 76.5 56 
           L 69.5 56 
           C 68 67 60 75 50 75 
           C 40 75 32 67 30.5 56 
           Z"
        fill="#1FC2A7"
      />
      {/* Arrowhead for bottom arrow (pointing up-right) */}
      <path
        d="M 83 62 L 63 62 L 73 48 Z"
        fill="#1FC2A7"
      />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{IconMark}</div>;
  }

  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center ${className}`}>
        {IconMark}
        <span className={`font-bold tracking-tight font-sans mt-2 ${currentSize.text} ${textColor}`}>
          Rent Back
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${currentSize.gap} ${className}`}>
      {IconMark}
      <span className={`font-bold tracking-tight font-sans ${currentSize.text} ${textColor}`}>
        Rent Back
      </span>
    </div>
  );
};
