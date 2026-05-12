import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ResultsPanel from './components/ResultsPanel';
import { CalculatorProvider } from './context/CalculatorContext';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark') return true;
    if (localStorage.getItem('theme') === 'light') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <CalculatorProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 p-4 md:p-8 font-sans selection:bg-indigo-500/30">
        <div className="max-w-6xl mx-auto">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
            <div className="lg:col-span-7">
               <InputPanel />
            </div>
            <div className="lg:col-span-5 h-full">
               <ResultsPanel darkMode={darkMode} />
            </div>
          </main>
        </div>
      </div>
    </CalculatorProvider>
  );
}

export default App;
