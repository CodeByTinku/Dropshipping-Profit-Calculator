import React from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ResultsPanel from './components/ResultsPanel';
import { CalculatorProvider } from './context/CalculatorContext';

function App() {
  return (
    <CalculatorProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans selection:bg-indigo-500/30">
        <div className="max-w-6xl mx-auto">
          <Header />
          <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
            <div className="lg:col-span-7">
               <InputPanel />
            </div>
            <div className="lg:col-span-5 h-full">
               <ResultsPanel />
            </div>
          </main>
        </div>
      </div>
    </CalculatorProvider>
  );
}

export default App;
