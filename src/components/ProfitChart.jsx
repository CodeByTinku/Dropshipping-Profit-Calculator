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

const ProfitChart = ({ darkMode }) => {
  const { revenue, totalSpends, netProfit } = useContext(CalculatorContext);

  const data = {
    labels: ['Revenue', 'Spends', 'Net Profit'],
    datasets: [
      {
        label: 'Amount (₹)',
        data: [revenue, totalSpends, netProfit],
        backgroundColor: [
          darkMode ? 'rgba(6, 182, 212, 0.6)' : 'rgba(6, 182, 212, 0.8)', // Cyan
          darkMode ? 'rgba(239, 68, 68, 0.6)' : 'rgba(239, 68, 68, 0.8)',  // Red
          darkMode ? 'rgba(34, 197, 94, 0.6)' : 'rgba(34, 197, 94, 0.8)',  // Green
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
        backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: darkMode ? '#f8fafc' : '#0f172a',
        bodyColor: darkMode ? '#cbd5e1' : '#334155',
        borderColor: darkMode ? '#475569' : '#e2e8f0',
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
          color: darkMode ? 'rgba(51, 65, 85, 0.8)' : 'rgba(226, 232, 240, 0.8)',
        },
        ticks: {
          color: darkMode ? '#94a3b8' : '#64748b',
          callback: function(value) {
            return '₹' + value;
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: darkMode ? '#94a3b8' : '#64748b',
        }
      }
    }
  };

  // We add a key using darkMode to force re-render of canvas on theme toggle
  return (
    <div className="h-64 mt-6">
      <Bar key={darkMode ? 'dark' : 'light'} data={data} options={options} />
    </div>
  );
};

export default ProfitChart;
