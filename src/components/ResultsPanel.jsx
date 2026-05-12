import React, { useContext, useState, useRef } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import { motion, AnimatePresence } from 'framer-motion';
import ProfitChart from './ProfitChart';
import html2canvas from 'html2canvas';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const ResultCard = ({ title, value, type = 'default' }) => {
  const getColors = () => {
    switch (type) {
      case 'success': return 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800';
      case 'danger': return 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      case 'info': return 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/30 border-cyan-200 dark:border-cyan-800';
      default: return 'text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700';
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
          {String(value).includes('$') || String(value).includes('%') || String(value).includes('Qty') ? value : `₹${Number(value).toLocaleString()}`}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const ResultsPanel = ({ darkMode }) => {
  const { 
    revenue, 
    totalSpends, 
    netProfit, 
    netProfitPerOrder,
    calcConfirmedOrders,
    calcDeliveredOrders,
    rtoOrders,
    roas
  } = useContext(CalculatorContext);

  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef(null);

  const exportToPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // High resolution
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Download as PNG Image
      const link = document.createElement('a');
      link.download = 'dropshipping-profit-report.png';
      link.href = imgData;
      link.click();

    } catch (error) {
      console.error("Failed to export Image", error);
      alert("Failed to export report. " + (error.message || "Please try again."));
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col h-full relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-100">
          <span className="w-2 h-6 bg-cyan-500 dark:bg-cyan-400 rounded-full"></span>
          Performance Overview
        </h2>
        <button 
          onClick={exportToPDF}
          disabled={isExporting}
          className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          {isExporting ? 'Exporting...' : 'Export Image'}
        </button>
      </div>

      <div ref={reportRef} className="flex-1 flex flex-col bg-white dark:bg-slate-800 p-2">
      
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

      <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Metrics Chart</h3>
        <ProfitChart darkMode={darkMode} />
      </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
