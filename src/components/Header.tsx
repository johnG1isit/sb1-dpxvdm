import React from 'react';
import { Wallet, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

export function Header({ isDark, toggleDarkMode }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Wallet className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Weekly Payment Tracker</h1>
      </div>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>
    </div>
  );
}