import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  action?: ToastAction;
  duration?: number; // ms
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'>) => string;
  dismissToast: (id: string) => void;
  success: (title: string, message?: string, action?: ToastAction) => string;
  error: (title: string, message?: string, action?: ToastAction) => string;
  warning: (title: string, message?: string, action?: ToastAction) => string;
  info: (title: string, message?: string, action?: ToastAction) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const duration = toast.duration !== undefined ? toast.duration : 4000;

      const newToast: ToastItem = { ...toast, id };
      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }

      return id;
    },
    [dismissToast]
  );

  const success = useCallback(
    (title: string, message?: string, action?: ToastAction) =>
      showToast({ type: 'success', title, message, action }),
    [showToast]
  );

  const error = useCallback(
    (title: string, message?: string, action?: ToastAction) =>
      showToast({ type: 'error', title, message, action }),
    [showToast]
  );

  const warning = useCallback(
    (title: string, message?: string, action?: ToastAction) =>
      showToast({ type: 'warning', title, message, action }),
    [showToast]
  );

  const info = useCallback(
    (title: string, message?: string, action?: ToastAction) =>
      showToast({ type: 'info', title, message, action }),
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        dismissToast,
        success,
        error,
        warning,
        info
      }}
    >
      {children}

      {/* Global Toast Stack */}
      <div
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        aria-live="polite"
      >
        {toasts.map((toast) => {
          const config = {
            success: {
              border: 'border-emerald-200',
              bg: 'bg-white',
              iconBg: 'bg-emerald-50 text-emerald-600',
              icon: CheckCircle2
            },
            error: {
              border: 'border-rose-200',
              bg: 'bg-white',
              iconBg: 'bg-rose-50 text-rose-600',
              icon: AlertCircle
            },
            warning: {
              border: 'border-amber-200',
              bg: 'bg-white',
              iconBg: 'bg-amber-50 text-amber-600',
              icon: AlertTriangle
            },
            info: {
              border: 'border-[#A8E6DC]',
              bg: 'bg-white',
              iconBg: 'bg-[#E8F6F5] text-[#10605B]',
              icon: Info
            }
          }[toast.type];

          const IconComponent = config.icon;

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg transition-all duration-200 ${config.bg} ${config.border}`}
              role="alert"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.iconBg}`}
              >
                <IconComponent className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <h4 className="text-xs font-bold text-[#0B132B]">{toast.title}</h4>
                {toast.message && (
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {toast.message}
                  </p>
                )}
                {toast.action && (
                  <button
                    type="button"
                    onClick={() => {
                      toast.action?.onClick();
                      dismissToast(toast.id);
                    }}
                    className="mt-2 text-xs font-bold text-[#10605B] hover:underline cursor-pointer"
                  >
                    {toast.action.label}
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="shrink-0 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
