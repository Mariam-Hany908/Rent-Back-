import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Heart, 
  User as UserIcon, 
  PlusCircle, 
  ArrowLeftRight, 
  Menu, 
  X,
  LogOut,
  LayoutDashboard,
  Settings,
  LogIn,
  UserPlus,
  ShoppingBag,
  Package,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useFavorites } from '../../context/FavoritesContext';
import { CATEGORIES } from '../../utils/categories';
import { RentBackLogo } from '../brand/RentBackLogo';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const { user, activeRoleMode, switchRoleMode, logout, login } = useAuth();
  const { unreadCount } = useNotifications();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const toggleRole = () => {
    const nextMode = activeRoleMode === 'renter' ? 'owner' : 'renter';
    switchRoleMode(nextMode);
    if (nextMode === 'owner' && location.pathname.startsWith('/user')) {
      navigate('/owner/dashboard');
    } else if (nextMode === 'renter' && location.pathname.startsWith('/owner')) {
      navigate('/user/dashboard');
    }
    setUserDropdownOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const handleQuickLogin = async () => {
    await login('omar.khalil@example.com');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      {/* Top Utility Bar - Trust & Escrow Guarantee */}
      <div className="border-b border-slate-100 bg-[#0B132B] text-xs text-slate-300">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-[#1EC2A4] animate-pulse" />
            <span className="hidden sm:inline font-medium text-xs">
              Managed Handover & Hub Quality Inspection • 50% Protected Deposit Escrow
            </span>
            <span className="sm:hidden font-medium text-[11px]">
              Verified Rentals • 50% Deposit Escrow
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <Link to="/how-it-works" className="text-slate-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link to="/faq" className="text-slate-300 hover:text-white transition-colors">
              FAQ
            </Link>

            {user ? (
              <>
                <div className="h-3 w-px bg-slate-700" />
                {/* Perspective Switcher */}
                <button
                  onClick={toggleRole}
                  className="flex items-center gap-1.5 font-semibold text-white hover:text-[#1EC2A4] transition-colors cursor-pointer"
                  title="Toggle Renter / Owner Mode"
                >
                  <ArrowLeftRight className="w-3 h-3 text-[#1EC2A4]" />
                  <span>
                    Mode: <span className="capitalize text-[#1EC2A4]">{activeRoleMode}</span>
                  </span>
                </button>
              </>
            ) : (
              <>
                <div className="h-3 w-px bg-slate-700" />
                <button
                  onClick={handleQuickLogin}
                  className="text-[11px] font-semibold text-[#1EC2A4] hover:underline cursor-pointer"
                  title="Preview with sample user"
                >
                  Demo Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Navigation */}
        <div className="flex items-center gap-8">
          <Link to="/" className="group flex items-center">
            <RentBackLogo variant="full" size="md" />
          </Link>

          {/* Categories Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-[#10605B] transition-colors">
              Home
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/categories/${cat.slug}`}
                className="hover:text-[#10605B] transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <Link to="/how-it-works" className="hover:text-[#10605B] transition-colors">
              How It Works
            </Link>
          </nav>
        </div>

        {/* Global Compact Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search cameras, apparel, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50/80 py-2 pl-10 pr-4 text-xs text-[#0B132B] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#10605B] focus:ring-2 focus:ring-[#10605B]/15 transition-all"
            />
          </div>
        </form>

        {/* Action Controls based on Auth State */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {user ? (
            /* --- LOGGED IN STATE --- */
            <>
              {/* List an Item (Owner Action) */}
              <Link
                to="/owner/listings/new"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-[#10605B] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#0B4541] shadow-xs transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#1EC2A4]" />
                <span>List an Item</span>
              </Link>

              {/* Favorites */}
              <Link
                to="/user/favorites"
                className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-[#0B132B] transition-colors"
                aria-label="Favorites"
              >
                <Heart className="w-4 h-4" />
                {favorites.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-[#10605B]" />
                )}
              </Link>

              {/* Notifications */}
              <Link
                to="/user/notifications"
                className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-[#0B132B] transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#10605B] px-1 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* User Dropdown Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 p-1.5 pr-2.5 hover:bg-slate-50 transition-colors cursor-pointer select-none"
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="true"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8F6F5] text-[#10605B] text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-semibold text-[#0B132B] leading-tight">
                      {user.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-tight capitalize">
                      {activeRoleMode}
                    </span>
                  </div>
                </button>

                {/* Dropdown Card */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-[#0B132B] truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    <div className="py-1 space-y-0.5">
                      <Link
                        to={activeRoleMode === 'owner' ? '/owner/dashboard' : '/user/dashboard'}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#10605B] transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        to="/user/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#10605B] transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        <span>Profile & Verification</span>
                      </Link>

                      <Link
                        to="/user/rentals"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#10605B] transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4 text-slate-400" />
                        <span>My Rentals</span>
                      </Link>

                      <Link
                        to="/owner/listings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#10605B] transition-colors"
                      >
                        <Package className="w-4 h-4 text-slate-400" />
                        <span>My Listings</span>
                      </Link>

                      <Link
                        to="/user/favorites"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#10605B] transition-colors"
                      >
                        <Heart className="w-4 h-4 text-slate-400" />
                        <span>Favorites</span>
                      </Link>

                      <Link
                        to="/owner/listings/new"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#10605B] transition-colors"
                      >
                        <PlusCircle className="w-4 h-4 text-slate-400" />
                        <span>List an Item</span>
                      </Link>

                      <Link
                        to="/user/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#10605B] transition-colors"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>Account Settings</span>
                      </Link>

                      <button
                        type="button"
                        onClick={toggleRole}
                        className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#10605B] transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2.5">
                          <ArrowLeftRight className="w-4 h-4 text-slate-400" />
                          <span>Switch Mode</span>
                        </span>
                        <span className="capitalize font-bold text-[#10605B] text-[10px] bg-[#E8F6F5] px-1.5 py-0.5 rounded">
                          {activeRoleMode === 'renter' ? 'Owner' : 'Renter'}
                        </span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* --- LOGGED OUT STATE --- */
            <>
              {/* Rent Out Your Item (Requires Auth) */}
              <Link
                to="/login"
                state={{ from: { pathname: '/owner/listings/new' } }}
                className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-[#0B132B] hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs"
                title="Sign in to list your equipment"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#10605B]" />
                <span>Rent Out Your Item</span>
              </Link>

              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-[#10605B] px-3 py-2 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-1 rounded-xl bg-[#0B132B] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#162044] shadow-xs transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#1EC2A4]" />
                <span>Sign Up</span>
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search rentals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-xs text-[#0B132B]"
              />
            </div>
          </form>

          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-2 py-2 text-sm font-semibold text-[#0B132B] hover:bg-slate-50"
            >
              Home
            </Link>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 pt-2 pb-1">
              Categories
            </div>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/categories/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#10605B]"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              How It Works
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to={activeRoleMode === 'owner' ? '/owner/dashboard' : '/user/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#0B132B] py-2.5 text-xs font-semibold text-white"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#1EC2A4]" />
                  <span>Go to {activeRoleMode === 'owner' ? 'Owner' : 'Renter'} Dashboard</span>
                </Link>
                <Link
                  to="/owner/listings/new"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#10605B] py-2.5 text-xs font-semibold text-white"
                >
                  <PlusCircle className="w-4 h-4 text-[#1EC2A4]" />
                  <span>List an Item</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    toggleRole();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-[#10605B]" />
                  <span>Switch to {activeRoleMode === 'renter' ? 'Owner' : 'Renter'} Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2.5 text-xs font-semibold text-slate-700"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Log In</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#0B132B] py-2.5 text-xs font-semibold text-white"
                >
                  <UserPlus className="w-4 h-4 text-[#1EC2A4]" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
