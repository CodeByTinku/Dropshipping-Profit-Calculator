import React, { useContext } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProfitChart = () => {
  const { revenue, totalSpends, netProfit } = useContext(CalculatorContext);

  const data = {
    labels: ['Revenue', 'Spends', 'Net Profit'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [revenue, totalSpends, netProfit],
        backgroundColor: [
          'rgba(6, 182, 212, 0.8)', // Cyan 500
          'rgba(239, 68, 68, 0.8)',  // Red 500
          'rgba(34, 197, 94, 0.8)',  // Green 500
        ],
        borderColor: [
          'rgba(8, 145, 178, 1)', // Cyan 600
          'rgba(220, 38, 38, 1)', // Red 600
          'rgba(22, 163, 74, 1)', // Green 600
        ],
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#0f172a',    // slate-900
        bodyColor: '#334155',     // slate-700
        borderColor: '#e2e8f0',   // slate-200
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.8)', // slate-200
        },
        ticks: {
          color: '#64748b', // slate-500
          callback: function(value) {
            return '$' + value;
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748b', // slate-500
        }
      }
    }
  };

  return (
    <div className="h-64 mt-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProfitChart;
