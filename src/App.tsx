/**
 * Rent Back - Frontend Architectural Foundation & Visual Design System
 * 
 * Sets up routing, global context providers, layout wrappers, and design showcase.
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { UserLayout } from './layouts/UserLayout';
import { OwnerLayout } from './layouts/OwnerLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { SearchResultsPage } from './pages/public/SearchResultsPage';
import { CategoryPage } from './pages/public/CategoryPage';
import { ProductDetailsPage } from './pages/public/ProductDetailsPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { AboutPage } from './pages/public/AboutPage';
import { FaqPage } from './pages/public/FaqPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { VerificationPage } from './pages/auth/VerificationPage';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { DesignSystemShowcase } from './components/design-system/DesignSystemShowcase';

// Renter Pages
import { UserDashboardPage } from './pages/renter/UserDashboardPage';
import { MyRentalsPage } from './pages/renter/MyRentalsPage';
import { RentalDetailsPage } from './pages/renter/RentalDetailsPage';
import { FavoritesPage } from './pages/renter/FavoritesPage';
import { ProfilePage } from './pages/renter/ProfilePage';
import { NotificationsPage } from './pages/renter/NotificationsPage';

// Owner Pages
import { OwnerDashboardPage } from './pages/owner/OwnerDashboardPage';
import { MyListingsPage } from './pages/owner/MyListingsPage';
import { AddListingPage } from './pages/owner/AddListingPage';
import { RentalActivityPage } from './pages/owner/RentalActivityPage';
import { EarningsPage } from './pages/owner/EarningsPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import {
  AdminListingsPage,
  AdminBookingsPage,
  AdminHandoversPage,
  AdminDisputesPage
} from './pages/admin/AdminOperationsPages';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <FavoritesProvider>
            <ToastProvider>
              <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="design-system" element={<DesignSystemShowcase />} />
                <Route path="search" element={<SearchResultsPage />} />
                <Route path="categories/:categoryId" element={<CategoryPage />} />
                <Route path="products/:productId" element={<ProductDetailsPage />} />
                <Route path="how-it-works" element={<HowItWorksPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
                <Route path="reset-password" element={<ResetPasswordPage />} />
                <Route path="verify" element={<VerificationPage />} />
              </Route>

              {/* User / Renter Routes (Protected) */}
              <Route path="user" element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<UserDashboardPage />} />
                <Route path="rentals" element={<MyRentalsPage />} />
                <Route path="rentals/:rentalId" element={<RentalDetailsPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="notifications" element={<NotificationsPage />} />
              </Route>

              {/* Owner Routes (Protected) */}
              <Route path="owner" element={<ProtectedRoute><OwnerLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<OwnerDashboardPage />} />
                <Route path="listings" element={<MyListingsPage />} />
                <Route path="listings/new" element={<AddListingPage />} />
                <Route path="activity" element={<RentalActivityPage />} />
                <Route path="earnings" element={<EarningsPage />} />
              </Route>

              {/* Admin Routes */}
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="listings" element={<AdminListingsPage />} />
                <Route path="requests" element={<AdminBookingsPage />} />
                <Route path="bookings" element={<AdminBookingsPage />} />
                <Route path="handovers" element={<AdminHandoversPage />} />
                <Route path="disputes" element={<AdminDisputesPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ToastProvider>
        </FavoritesProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
