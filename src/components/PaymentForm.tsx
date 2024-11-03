import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface PaymentFormProps {
  defaultAmount: string;
  setDefaultAmount: (amount: string) => void;
  onAdd: () => void;
  onDeletePaid: () => void;
  hasPaidPayments: boolean;
}

export function PaymentForm({ 
  defaultAmount, 
  setDefaultAmount, 
  onAdd, 
  onDeletePaid,
  hasPaidPayments 
}: PaymentFormProps) {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Default Weekly Amount
          </label>
          <input
            type="number"
            value={defaultAmount}
            onChange={(e) => setDefaultAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                     focus:border-transparent transition"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={onAdd}
            disabled={!defaultAmount}
            className="px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg 
                     hover:bg-indigo-700 dark:hover:bg-indigo-600 transition flex items-center gap-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            Add Payment
          </button>
        </div>
      </div>
      
      {hasPaidPayments && (
        <button
          onClick={onDeletePaid}
          className="w-full px-4 py-2 text-red-600 dark:text-red-400 border border-red-200 
                   dark:border-red-900 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 
                   transition flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Clear Paid Payments
        </button>
      )}
    </div>
  );
}