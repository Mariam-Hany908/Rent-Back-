/**
 * Rent Back Design System
 * 
 * Synthesized from brand identity references:
 * - Circular loop logo mark: Deep Forest Teal (#10605B) & Vibrant Mint Cyan (#1EC2A4)
 * - Deep Architectural Slate Navy: #0B132B
 * - Crisp High-Contrast White Surface: #FFFFFF
 * - Cool Canvas Neutral: #F8FAFC
 * - Typography: Geometric Sans (Plus Jakarta Sans)
 */

export const RENT_BACK_THEME = {
  colors: {
    // Brand Core
    primary: {
      default: '#10605B', // Deep Forest Teal (Top Arrow & Core Trust)
      hover: '#0B4541',
      light: '#E8F6F5',
      subtle: '#F0FAF9',
    },
    accent: {
      default: '#1EC2A4', // Luminous Mint / Turquoise (Bottom Arrow & Activity)
      hover: '#169E85',
      light: '#EBFBF7',
      subtle: '#F4FDFB',
    },
    dark: {
      default: '#0B132B', // Deep Midnight Slate (Trades / Hously grounding)
      subtle: '#1E293B',
      muted: '#334155',
    },
    // Neutrals
    canvas: '#F8FAFC',
    surface: '#FFFFFF',
    border: {
      default: '#E2E8F0',
      subtle: '#F1F5F9',
      strong: '#CBD5E1',
      focus: '#10605B',
    },
    text: {
      primary: '#0B132B',
      secondary: '#475569',
      muted: '#64748B',
      subtle: '#94A3B8',
      inverse: '#FFFFFF',
    },
    // Functional States
    status: {
      pending: {
        text: '#92400E',
        bg: '#FEF3C7',
        border: '#FDE68A',
        dot: '#D97706',
        label: 'Pending Review',
      },
      approved: {
        text: '#065F46',
        bg: '#D1FAE5',
        border: '#A7F3D0',
        dot: '#059669',
        label: 'Approved',
      },
      depositRequired: {
        text: '#075985',
        bg: '#E0F2FE',
        border: '#BAE6FD',
        dot: '#0284C7',
        label: 'Deposit Required',
      },
      confirmed: {
        text: '#065F46',
        bg: '#ECFDF5',
        border: '#6EE7B7',
        dot: '#10B981',
        label: 'Booking Confirmed',
      },
      inHandover: {
        text: '#0F5B57',
        bg: '#E8F6F5',
        border: '#99E6DB',
        dot: '#10605B',
        label: 'In Custody Handover',
      },
      active: {
        text: '#115E59',
        bg: '#CCFBF1',
        border: '#5EEAD4',
        dot: '#0D9488',
        label: 'Active Rental',
      },
      returned: {
        text: '#1E293B',
        bg: '#F1F5F9',
        border: '#CBD5E1',
        dot: '#64748B',
        label: 'Returned & Inspected',
      },
      cancelled: {
        text: '#991B1B',
        bg: '#FEE2E2',
        border: '#FECACA',
        dot: '#DC2626',
        label: 'Cancelled',
      },
      dispute: {
        text: '#831843',
        bg: '#FCE7F3',
        border: '#FBCFE8',
        dot: '#DB2777',
        label: 'Damage Case',
      },
      deposit50Badge: {
        text: '#10605B',
        bg: '#E8F6F5',
        border: '#A8E6DC',
        label: '50% Security Deposit Held',
      }
    }
  },

  typography: {
    fontFamily: {
      sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    scale: {
      display: 'text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight',
      h1: 'text-2xl sm:text-3xl font-bold tracking-tight text-[#0B132B]',
      h2: 'text-xl sm:text-2xl font-bold tracking-tight text-[#0B132B]',
      h3: 'text-lg sm:text-xl font-semibold text-[#0B132B]',
      h4: 'text-sm sm:text-base font-semibold text-[#0B132B]',
      bodyLead: 'text-base sm:text-lg text-slate-600 leading-relaxed',
      body: 'text-sm sm:text-base text-slate-600 leading-normal',
      small: 'text-xs text-slate-500 leading-normal',
      micro: 'text-[11px] font-semibold uppercase tracking-wider text-slate-400',
    }
  },

  radii: {
    badge: 'rounded-full',
    button: 'rounded-lg sm:rounded-xl',
    card: 'rounded-xl',
    cardLarge: 'rounded-2xl',
    modal: 'rounded-2xl',
  },

  shadows: {
    subtle: 'shadow-[0_1px_3px_rgba(11,19,43,0.04),0_1px_2px_rgba(11,19,43,0.02)]',
    card: 'shadow-[0_4px_12px_rgba(11,19,43,0.03),0_1px_3px_rgba(11,19,43,0.05)]',
    hover: 'shadow-[0_12px_28px_rgba(11,19,43,0.08),0_4px_8px_rgba(11,19,43,0.04)]',
    dropdown: 'shadow-[0_10px_30px_rgba(11,19,43,0.12),0_4px_6px_rgba(11,19,43,0.05)]',
  },

  spacing: {
    pageContainer: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionSpacing: 'py-10 sm:py-14 lg:py-20',
    cardPadding: 'p-5 sm:p-6',
    cardCompact: 'p-4',
  }
} as const;
