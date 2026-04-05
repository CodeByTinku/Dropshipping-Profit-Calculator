import React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/solid';

const Header = () => {
  return (
    <header className="flex items-center gap-4 py-8 mb-4 border-b border-slate-200">
      <div className="p-3 bg-indigo-100 rounded-xl">
        <ChartBarIcon className="w-8 h-8 text-indigo-600" />
      </div>
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-cyan-600 bg-clip-text text-transparent">
          Dropshipping Profit Calculator
        </h1>
        <p className="text-slate-500 mt-1">Estimate your business performance instantly.</p>
      </div>
    </header>
  );
};

export default Header;
