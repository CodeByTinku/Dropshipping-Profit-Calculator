import React, { createContext, useState } from 'react';

export const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
  const [state, setState] = useState({
    productCost: "",
    sellingPrice: "",
    expectedOrders: "",
    confirmedOrders: "",
    expectedDelivery: "",
    adSpendPerOrder: "",
  });

  const updateField = (field, value) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  // Safe Number helper
  const getNum = (val) => Number(val) || 0;

  // Calculations
  const calcConfirmedOrders = Math.floor(getNum(state.expectedOrders) * (getNum(state.confirmedOrders) / 100));
  // Not strictly used in base calc but good for advanced metrics
  const calcDeliveredOrders = Math.floor(calcConfirmedOrders * (getNum(state.expectedDelivery) / 100)); 
  
  const revenue = calcDeliveredOrders * getNum(state.sellingPrice);
  const productCostTotal = calcDeliveredOrders * getNum(state.productCost);
  const adSpendTotal = calcConfirmedOrders * getNum(state.adSpendPerOrder);
  const totalSpends = productCostTotal + adSpendTotal;
  
  const netProfit = revenue - totalSpends;
  const netProfitPerOrder = calcDeliveredOrders > 0 ? (netProfit / calcDeliveredOrders).toFixed(2) : 0;

  const value = {
    ...state,
    state,
    updateField,
    calcConfirmedOrders,
    calcDeliveredOrders,
    revenue,
    totalSpends,
    netProfit,
    netProfitPerOrder
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
};
