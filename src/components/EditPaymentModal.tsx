import React from 'react';
import { X } from 'lucide-react';

interface EditPaymentModalProps {
  payment: {
    id: string;
    weekEnding: string;
    amount: number;
    paid: boolean;
  } | null;
  onClose: () => void;
  onSave: (payment: { weekEnding: string; amount: number }) => void;
}

export function EditPaymentModal({ payment, onClose, onSave }: EditPaymentModalProps) {
  const [amount, setAmount] = React.useState(payment ? payment.amount.toString() : '');
  const [weekEnding, setWeekEnding] = React.useState(payment ? payment.weekEnding : '');

  if (!payment) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      weekEnding,
      amount: parseFloat(amount),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Edit Payment
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                       focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                       focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Week Ending
            </label>
            <input
              type="date"
              value={weekEnding}
              onChange={(e) => setWeekEnding(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                       focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                       focus:border-transparent transition"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 
                       dark:hover:bg-gray-800 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg 
                       hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}