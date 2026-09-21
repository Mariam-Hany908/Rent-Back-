import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Info, 
  AlertTriangle,
  Lock,
  Clock
} from 'lucide-react';
import { AvailabilityStatus } from '../../types';

export interface CalendarProps {
  startDate?: string;
  returnDate?: string;
  onSelectDates: (startDate: string, returnDate: string) => void;
  availabilitySchedule: Record<string, { status: AvailabilityStatus; label?: string }>;
  minDate?: string; // YYYY-MM-DD (defaults to today)
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  startDate,
  returnDate,
  onSelectDates,
  availabilitySchedule,
  minDate,
  className = ''
}) => {
  // Determine initial month view: if startDate exists, show that month; otherwise current month
  const initialMonth = useMemo(() => {
    if (startDate) {
      const d = new Date(startDate);
      if (!isNaN(d.getTime())) return new Date(d.getFullYear(), d.getMonth(), 1);
    }
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }, [startDate]);

  const [currentMonth, setCurrentMonth] = useState<Date>(initialMonth);
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Today string YYYY-MM-DD
  const todayStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  const effectiveMinDate = minDate || todayStr;

  // Month navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setErrorMessage(null);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setErrorMessage(null);
  };

  // Days grid generation for currentMonth
  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Number of days in month
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days: { dateStr: string; dayNum: number; isCurrentMonth: boolean }[] = [];

    // Previous month padding
    const prevMonthTotalDays = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthTotalDays - i;
      const prevDate = new Date(year, month - 1, d);
      const str = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ dateStr: str, dayNum: d, isCurrentMonth: false });
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      const str = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ dateStr: str, dayNum: d, isCurrentMonth: true });
    }

    // Trailing days padding to complete standard 35 or 42 grid cells
    const remaining = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      const nextDate = new Date(year, month + 1, d);
      const str = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ dateStr: str, dayNum: d, isCurrentMonth: false });
    }

    return days;
  }, [currentMonth]);

  // Check if a date string is unavailable
  const isDateDisabled = (dateStr: string) => {
    if (dateStr < effectiveMinDate) return true;
    const item = availabilitySchedule[dateStr];
    if (!item) return false;
    return item.status === 'booked' || item.status === 'held' || item.status === 'unavailable';
  };

  // Helper to check range conflicts
  const hasConflictInRange = (startStr: string, endStr: string) => {
    const cur = new Date(startStr);
    const end = new Date(endStr);
    cur.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    while (cur <= end) {
      const str = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}-${String(cur.getDate()).padStart(2, '0')}`;
      const status = availabilitySchedule[str]?.status;
      if (status === 'booked' || status === 'held' || status === 'unavailable') {
        return true;
      }
      cur.setDate(cur.getDate() + 1);
    }
    return false;
  };

  // Day click handler
  const handleDateClick = (dateStr: string) => {
    if (isDateDisabled(dateStr)) return;

    setErrorMessage(null);

    // If no start date, or both start & return already selected: start fresh
    if (!startDate || (startDate && returnDate)) {
      onSelectDates(dateStr, '');
      return;
    }

    // We have a start date and are choosing return date
    if (startDate && !returnDate) {
      if (dateStr < startDate) {
        // User clicked an earlier date, treat it as new start date
        onSelectDates(dateStr, '');
        return;
      }

      // Check if any blocked day exists between startDate and dateStr
      if (hasConflictInRange(startDate, dateStr)) {
        setErrorMessage('Cannot select range: contains booked or held dates.');
        return;
      }

      onSelectDates(startDate, dateStr);
    }
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className={`rounded-2xl border border-stone-200 bg-white p-5 select-none ${className}`}>
      {/* Calendar Header with Month Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-[#10605B]" />
          <h3 className="font-bold text-stone-900 text-base">{monthName}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center py-2 text-[11px] font-semibold text-stone-400">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {daysInMonth.map(({ dateStr, dayNum, isCurrentMonth }) => {
          const isPast = dateStr < effectiveMinDate;
          const scheduleEntry = availabilitySchedule[dateStr];
          const isBooked = scheduleEntry?.status === 'booked';
          const isHeld = scheduleEntry?.status === 'held';
          const isUnavailable = scheduleEntry?.status === 'unavailable';
          const isDisabled = isPast || isBooked || isHeld || isUnavailable;

          const isStart = dateStr === startDate;
          const isEnd = dateStr === returnDate;
          const isSelectedRange =
            startDate && returnDate && dateStr >= startDate && dateStr <= returnDate;

          const isHoveringRange =
            startDate &&
            !returnDate &&
            hoverDate &&
            hoverDate >= startDate &&
            dateStr >= startDate &&
            dateStr <= hoverDate &&
            !isDisabled;

          let cellStyle = 'text-stone-800 hover:bg-teal-50/70 hover:text-[#10605B]';

          if (!isCurrentMonth) {
            cellStyle = 'text-stone-300 opacity-40';
          }

          if (isPast) {
            cellStyle = 'text-stone-300 line-through cursor-not-allowed bg-transparent';
          } else if (isBooked || isUnavailable) {
            cellStyle =
              'text-stone-400 bg-stone-100/90 line-through cursor-not-allowed border border-stone-200/50';
          } else if (isHeld) {
            cellStyle =
              'text-amber-700 bg-amber-50/80 border border-amber-200/70 cursor-not-allowed';
          } else if (isStart || isEnd) {
            cellStyle = 'bg-[#10605B] text-white font-bold shadow-xs';
          } else if (isSelectedRange) {
            cellStyle = 'bg-[#10605B]/15 text-[#10605B] font-semibold';
          } else if (isHoveringRange) {
            cellStyle = 'bg-teal-50 text-[#10605B] border-y border-dashed border-[#10605B]/40';
          }

          return (
            <button
              key={dateStr}
              type="button"
              disabled={isDisabled}
              onClick={() => handleDateClick(dateStr)}
              onMouseEnter={() => !isDisabled && setHoverDate(dateStr)}
              onMouseLeave={() => setHoverDate(null)}
              className={`relative h-10 w-full rounded-lg text-xs font-medium flex flex-col items-center justify-center transition-all ${cellStyle}`}
              title={
                isBooked
                  ? 'Booked by confirmed renter'
                  : isHeld
                  ? 'Temporarily held pending Rent Back approval'
                  : isPast
                  ? 'Past date'
                  : isStart
                  ? 'Rental Start Date'
                  : isEnd
                  ? 'Rental Return Date'
                  : 'Available'
              }
            >
              <span>{dayNum}</span>

              {/* Status Mini Indicator Icons */}
              {isBooked && (
                <Lock className="w-2.5 h-2.5 text-stone-400 absolute bottom-1" />
              )}
              {isHeld && (
                <Clock className="w-2.5 h-2.5 text-amber-500 absolute bottom-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Validation Error Notification */}
      {errorMessage && (
        <div className="mt-3.5 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Calendar Legend */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-white border border-stone-300" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[#10605B]" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-amber-100 border border-amber-300" />
          <span>Held (Pending)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-stone-100 border border-stone-300 line-through" />
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};
