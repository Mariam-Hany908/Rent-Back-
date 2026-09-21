import React from 'react';
import { FoundationPlaceholder } from '../../components/common/FoundationPlaceholder';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Star } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <FoundationPlaceholder
        title="User Profile & Identity Verification"
        category="Unified Account Settings"
        description="Unified profile reflecting dual Renter & Owner capabilities: identity verification status, historical reviews, ratings, and trust metrics."
        targetPhase="National ID / Passport upload & verified badge management"
        dataEntities={['User', 'VerificationStatus', 'Review', 'TrustScore']}
        suggestedActions={[
          { label: 'Switch to Owner Perspective', to: '/owner/dashboard' },
          { label: 'My Rentals', to: '/user/rentals' }
        ]}
      />

      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center text-xl">
            {user?.name.charAt(0) || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-stone-900">{user?.name}</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified</span>
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">{user?.email} • Member since {user?.memberSince}</p>
            <div className="flex items-center gap-1 text-xs text-stone-700 mt-1 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{user?.rating} rating ({user?.reviewCount} completed rentals)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
