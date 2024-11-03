import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  currentDate: Date;
  onMonthChange: (date: Date) => void;
  payments: Array<{
    id: string;
    weekEnding: string;
    amount: number;
    paid: boolean;
  }>;
  onDayClick: (date: string) => void;
}

export function Calendar({ currentDate, onMonthChange, payments, onDayClick }: CalendarProps) {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getPaymentForDate = (date: Date) => {
    return payments.find(p => p.weekEnding === formatDate(date));
  };

  const days = getDaysInMonth(currentDate);
  const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{monthYear}</h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-14" />;
          }

          const payment = getPaymentForDate(day);
          const isToday = formatDate(day) === formatDate(new Date());

          return (
            <button
              key={day.getTime()}
              onClick={() => onDayClick(formatDate(day))}
              className={`h-14 p-1 rounded-lg border transition-all ${
                isToday
                  ? 'border-indigo-500 dark:border-indigo-400'
                  : 'border-transparent'
              } ${
                payment
                  ? payment.paid
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-indigo-50 dark:bg-indigo-900/20'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex flex-col h-full">
                <span className={`text-sm ${
                  isToday
                    ? 'font-bold text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {day.getDate()}
                </span>
                {payment && (
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    ${payment.amount}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}