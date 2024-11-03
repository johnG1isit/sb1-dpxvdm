import React from 'react';
import { DollarSign, Calendar, Trash2 } from 'lucide-react';

interface Payment {
  id: string;
  weekEnding: string;
  amount: number;
  paid: boolean;
}

interface PaymentItemProps {
  payment: Payment;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function PaymentItem({ payment, onToggle, onDelete }: PaymentItemProps) {
  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        payment.paid
          ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
          : 'bg-white dark:bg-gray-900 border-indigo-100 dark:border-indigo-900'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={payment.paid}
            onChange={() => onToggle(payment.id)}
            className="w-5 h-5 rounded text-indigo-600 dark:text-indigo-500 
                     focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
          <div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span
                className={`font-semibold ${
                  payment.paid
                    ? 'text-gray-500 dark:text-gray-400 line-through'
                    : 'text-gray-800 dark:text-gray-200'
                }`}
              >
                {payment.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Week ending: {payment.weekEnding}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(payment.id)}
          className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}