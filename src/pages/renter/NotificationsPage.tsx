import React from 'react';
import { FoundationPlaceholder } from '../../components/common/FoundationPlaceholder';
import { useNotifications } from '../../context/NotificationContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Bell, CheckCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotificationsPage: React.FC = () => {
  const { notifications, markAllAsRead, markAsRead } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <FoundationPlaceholder
          title="Notifications & Alerts"
          category="Communications Center"
          description="Real-time alerts for rental request approvals, temporary hold expirations, handover schedules, and deposit releases."
          targetPhase="Live WebSocket / SSE updates & push notification toggles"
          dataEntities={['Notification', 'RentalRequest', 'HandoverSchedule']}
          suggestedActions={[{ label: 'View Bookings', to: '/user/rentals' }]}
        />
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <h3 className="text-sm font-semibold text-stone-900">Activity Updates</h3>
          <button
            onClick={markAllAsRead}
            className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all as read</span>
          </button>
        </div>

        <div className="space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`p-3.5 rounded-lg border text-xs transition-colors flex items-start gap-3 cursor-pointer ${
                notif.isRead ? 'border-stone-100 bg-white' : 'border-stone-200 bg-stone-50/80'
              }`}
            >
              <div className="p-1.5 rounded-full bg-stone-100 text-stone-600 shrink-0">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-stone-900">{notif.title}</h4>
                  <span className="text-[10px] text-stone-400">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-stone-600 mt-0.5">{notif.message}</p>
                {notif.actionUrl && (
                  <Link
                    to={notif.actionUrl}
                    className="mt-2 inline-block font-semibold text-stone-900 hover:underline"
                  >
                    View Details →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
