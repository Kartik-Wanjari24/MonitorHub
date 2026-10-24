import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { StaffLayout } from '../../layouts/StaffLayout';
import { staffStore } from '../../services/staffStore';
import type { StaffNotification } from '../../types/staff';
import {
  Bell,
  CheckCheck,
  UserPlus,
  CalendarDays,
  ListOrdered,
  AlertOctagon,
  Info,
  Clock,
} from 'lucide-react';

export const StaffNotificationsPage: React.FC = () => {
  const { t } = useLanguage();
  const ts = t.staffPortal;

  const [notifications, setNotifications] = useState<StaffNotification[]>(
    staffStore.getNotifications()
  );
  const [filterUnread, setFilterUnread] = useState(false);

  const filteredNotifs = notifications.filter((n) => (!filterUnread ? true : !n.read));

  const handleMarkAllRead = () => {
    staffStore.markAllNotificationsRead();
    setNotifications(staffStore.getNotifications());
  };

  const handleMarkSingleRead = (id: string) => {
    staffStore.markNotificationRead(id);
    setNotifications(staffStore.getNotifications());
  };

  const getNotifIcon = (type: StaffNotification['type']) => {
    switch (type) {
      case 'emergency':
        return <AlertOctagon className="w-5 h-5 text-rose-600" />;
      case 'appointment':
        return <CalendarDays className="w-5 h-5 text-indigo-600" />;
      case 'queue':
        return <ListOrdered className="w-5 h-5 text-sky-600" />;
      case 'registration':
        return <UserPlus className="w-5 h-5 text-emerald-600" />;
      default:
        return <Info className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <StaffLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {ts.notifTitle}
            </h1>
            <p className="text-sm text-slate-500 mt-1">{ts.notifSubtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all"
            >
              <CheckCheck className="w-4 h-4 text-sky-600" />
              <span>{ts.markAllRead}</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterUnread(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              !filterUnread
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {ts.filterAllNotifs}
          </button>
          <button
            type="button"
            onClick={() => setFilterUnread(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterUnread
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {ts.filterUnreadOnly}
          </button>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {filteredNotifs.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>{ts.noNotifications}</p>
            </div>
          ) : (
            filteredNotifs.map((n) => (
              <div
                key={n.id}
                onClick={() => handleMarkSingleRead(n.id)}
                className={`p-4 sm:p-5 flex items-start gap-4 transition-colors cursor-pointer ${
                  !n.read ? 'bg-sky-50/40' : 'hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    n.type === 'emergency'
                      ? 'bg-rose-100'
                      : n.type === 'appointment'
                      ? 'bg-indigo-100'
                      : n.type === 'registration'
                      ? 'bg-emerald-100'
                      : 'bg-sky-100'
                  }`}
                >
                  {getNotifIcon(n.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`text-sm font-bold truncate ${
                        !n.read ? 'text-slate-900' : 'text-slate-700'
                      }`}
                    >
                      {n.title}
                    </p>
                    <span className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {n.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>

                  {n.relatedId && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        Reference: {n.relatedId}
                      </span>
                      {n.relatedId.startsWith('TMH') && (
                        <Link
                          to={`/staff/records?search=${n.relatedId}`}
                          className="text-[11px] text-sky-600 font-semibold hover:underline"
                        >
                          Open record →
                        </Link>
                      )}
                      {n.relatedId.startsWith('EMG') && (
                        <Link
                          to="/staff/emergency"
                          className="text-[11px] text-rose-600 font-semibold hover:underline"
                        >
                          View emergency board →
                        </Link>
                      )}
                    </div>
                  )}
                </div>

                {!n.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600 shrink-0 self-center" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </StaffLayout>
  );
};
