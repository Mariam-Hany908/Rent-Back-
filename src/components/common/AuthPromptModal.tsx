import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { LogIn, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin?: () => void;
}

export const AuthPromptModal: React.FC<AuthPromptModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin
}) => {
  const { login, isLoading } = useAuth();

  const handleOneClickLogin = async (email: string) => {
    await login(email);
    onClose();
    if (onSuccessLogin) onSuccessLogin();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sign in to Request Rental"
      description="You must be signed in to an authenticated Rent Back account to request items and place date holds."
      maxWidth="sm"
    >
      <div className="space-y-4 pt-1">
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200/80 text-xs text-teal-900 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#10605B] shrink-0 mt-0.5" />
          <p className="leading-tight">
            Rent Back guarantees verified identities for both renters and owners to protect equipment and escrow deposits.
          </p>
        </div>

        <div className="space-y-2">
          <Button
            type="button"
            variant="brand"
            className="w-full justify-center"
            onClick={() => handleOneClickLogin('kareem.tarek@example.com')}
            isLoading={isLoading}
            leftIcon={<User className="w-4 h-4" />}
          >
            Sign in as Kareem Tarek (Verified Renter)
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full justify-center"
            onClick={() => handleOneClickLogin('nour.photo@example.com')}
            isLoading={isLoading}
            leftIcon={<LogIn className="w-4 h-4" />}
          >
            Sign in as Nour El-Din (Owner / Host)
          </Button>
        </div>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-stone-500 hover:text-stone-800 hover:underline"
          >
            Continue browsing items
          </button>
        </div>
      </div>
    </Modal>
  );
};
