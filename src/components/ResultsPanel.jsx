import React, { useContext } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import { motion, AnimatePresence } from 'framer-motion';
import ProfitChart from './ProfitChart';

const ResultCard = ({ title, value, type = 'default' }) => {
  const getColors = () => {
    switch (type) {
      case 'success': return 'text-green-700 bg-green-50 border-green-200';
      case 'danger': return 'text-red-700 bg-red-50 border-red-200';
      case 'info': return 'text-cyan-700 bg-cyan-50 border-cyan-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className={`p-4 rounded-xl border ${getColors()} flex flex-col justify-center items-start shadow-sm`}>
      <span className="text-sm font-medium opacity-80 mb-1">{title}</span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="text-2xl font-bold tracking-tight inline-block"
        >
          {String(value).includes('$') || String(value).includes('%') || String(value).includes('Qty') ? value : `$${Number(value).toLocaleString()}`}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const ResultsPanel = () => {
  const { 
    revenue, 
    totalSpends, 
    netProfit, 
    netProfitPerOrder,
    calcConfirmedOrders,
    calcDeliveredOrders 
  } = useContext(CalculatorContext);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50 flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-800">
        <span className="w-2 h-6 bg-cyan-500 rounded-full"></span>
        Performance Overview
      </h2>
      
      <div className="grid grid-cols-2 gap-4 flex-1">
        <ResultCard 
          title="Total Earnings" 
          value={revenue} 
          type="info" 
        />
        <ResultCard 
          title="Total Spends" 
          value={totalSpends} 
          type="danger" 
        />
        <ResultCard 
          title="Net Profit" 
          value={netProfit} 
          type={netProfit >= 0 ? "success" : "danger"} 
        />
        <ResultCard 
          title="Profit per Order" 
          value={netProfitPerOrder} 
          type="default" 
        />
        <ResultCard 
          title="Confirmed Orders Qty" 
          value={`${calcConfirmedOrders} units`} 
          type="default" 
        />
        <ResultCard 
          title="Delivered Orders Qty" 
          value={`${calcDeliveredOrders} units`} 
          type="default" 
        />
      </div>

      <div className="mt-8 border-t border-slate-200 pt-6">
        <h3 className="text-sm font-medium text-slate-500 mb-2">Metrics Chart</h3>
        <ProfitChart />
      </div>
    </div>
  );
};

export default ResultsPanel;
