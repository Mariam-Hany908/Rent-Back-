import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertCircle, AlertTriangle } from 'lucide-react';

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  isLoading = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      <div className="flex gap-3.5">
        <div
          className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl ${
            isDestructive ? 'bg-rose-50 text-rose-600' : 'bg-[#E8F6F5] text-[#10605B]'
          }`}
        >
          {isDestructive ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
        </div>
        <div className="flex-1 text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
          {message}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-2.5 pt-4 border-t border-slate-100">
        <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
          {cancelLabel}
        </Button>
        <Button
          variant={isDestructive ? 'destructive' : 'brand'}
          size="sm"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};
