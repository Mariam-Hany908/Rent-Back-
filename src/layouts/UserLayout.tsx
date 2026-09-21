import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Heart, 
  Bell, 
  User, 
  ArrowRightLeft,
  ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const UserLayout: React.FC = () => {
  const { user, switchRoleMode } = useAuth();

  const navItems = [
    { label: 'Overview', to: '/user/dashboard', icon: LayoutDashboard },
    { label: 'My Rentals', to: '/user/rentals', icon: ShoppingBag },
    { label: 'Saved Favorites', to: '/user/favorites', icon: Heart },
    { label: 'Notifications', to: '/user/notifications', icon: Bell },
    { label: 'Profile & Identity', to: '/user/profile', icon: User }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B132B]">
      <Navbar />
      
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Header Summary & Role Switcher Banner */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-rentback-card">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B132B] text-white font-bold text-base shadow-xs">
              {user?.name.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#0B132B] tracking-tight">{user?.name}</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F6F5] border border-[#A8E6DC] px-2.5 py-0.5 text-[10px] font-semibold text-[#10605B] uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-[#1EC2A4]" />
                  <span>Renter Account</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {user?.email} • Verified Identity • {user?.rating} ★ ({user?.reviewCount} completed rentals)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => switchRoleMode('owner')}
              className="inline-flex items-center gap-1.5 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-[#0B132B] hover:bg-slate-100 hover:border-slate-300 transition-colors cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#10605B]" />
              <span>Switch to Owner Perspective</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Shell */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <aside className="md:col-span-1 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-rentback-card">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/user/dashboard'}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 rounded-lg sm:rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? 'bg-[#10605B] text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B132B]'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </aside>

          <main className="md:col-span-3">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};
