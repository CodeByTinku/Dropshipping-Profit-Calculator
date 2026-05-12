import React from 'react';
import { ChartBarIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="flex items-center justify-between py-8 mb-4 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
          <ChartBarIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Dropshipping Profit Calculator
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Estimate your business performance instantly.</p>
        </div>
      </div>
      <button 
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
      </button>
    </header>
  );
};

export default Header;
