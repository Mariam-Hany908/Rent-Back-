import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requiredRoleMode?: 'renter' | 'owner';
  requireVerification?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoleMode,
  requireVerification = false
}) => {
  const { user, isLoading, activeRoleMode } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <LoadingSpinner size="lg" color="primary" />
        <p className="mt-4 text-xs font-semibold text-slate-500 animate-pulse">
          Verifying session credentials...
        </p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login preserving the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireVerification && user.verificationStatus === 'unverified') {
    return <Navigate to={`/verify?email=${encodeURIComponent(user.email)}`} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
