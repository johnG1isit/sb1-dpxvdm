import React from 'react';
import { DollarSign } from 'lucide-react';

interface TotalUnpaidProps {
  total: number;
}

export function TotalUnpaid({ total }: TotalUnpaidProps) {
  return (
    <div className="bg-indigo-50 dark:bg-indigo-950 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Unpaid</h2>
        <div className="flex items-center text-xl font-bold text-indigo-600 dark:text-indigo-400">
          <DollarSign className="w-5 h-5" />
          {total.toFixed(2)}
        </div>
      </div>
    </div>
  );
}