import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckSquare, 
  FileText, 
  CalendarClock, 
  Truck, 
  AlertOctagon, 
  ArrowLeft 
} from 'lucide-react';
import { RentBackLogo } from '../components/brand/RentBackLogo';

export const AdminLayout: React.FC = () => {
  const adminNavItems = [
    { label: 'Overview', to: '/admin/dashboard', icon: ShieldCheck },
    { label: 'Listing Approvals', to: '/admin/listings', icon: CheckSquare },
    { label: 'Rental Requests', to: '/admin/requests', icon: FileText },
    { label: 'Bookings & Escrow', to: '/admin/bookings', icon: CalendarClock },
    { label: 'Handover & Returns', to: '/admin/handovers', icon: Truck },
    { label: 'Damage & Disputes', to: '/admin/disputes', icon: AlertOctagon },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B132B]">
      {/* Top Admin Header */}
      <header className="border-b border-slate-800 bg-[#0B132B] text-white px-4 sm:px-6 py-3.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <RentBackLogo variant="icon" size="sm" theme="dark" />
            <span className="rounded bg-rose-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              Internal Staff
            </span>
            <h1 className="text-xs sm:text-sm font-semibold text-slate-200">
              Platform Administration & Escrow Engine
            </h1>
          </div>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Marketplace</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <aside className="md:col-span-1 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-rentback-card">
            <div className="px-3.5 py-2 text-[11px] font-bold uppercase text-slate-400 tracking-wider">
              Staff Operations
            </div>
            <nav className="flex flex-col space-y-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/admin/dashboard'}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 rounded-lg sm:rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? 'bg-[#0B132B] text-white shadow-xs'
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
    </div>
  );
};
