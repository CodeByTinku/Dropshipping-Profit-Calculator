import React, { useContext } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import { 
  CurrencyDollarIcon, 
  TagIcon, 
  ShoppingCartIcon, 
  CheckCircleIcon, 
  TruckIcon, 
  MegaphoneIcon 
} from '@heroicons/react/24/outline';

const InputField = ({ label, id, value, onChange, icon: Icon, unit, isPercentage = false }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-slate-700">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
        <Icon className="h-5 w-5" />
      </div>
      <input
        type="number"
        id={id}
        min="0"
        max={isPercentage ? "100" : undefined}
        value={value}
        onChange={(e) => {
          let strVal = e.target.value;
          if (strVal === "") {
            onChange("");
            return;
          }
          let val = parseFloat(strVal);
          if (isPercentage && val > 100) {
            strVal = "100";
          } else if (val < 0) {
            strVal = "0";
          }
          onChange(strVal);
        }}
        className="block w-full pl-10 pr-12 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm outline-none"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span className="text-slate-500 sm:text-sm">{unit}</span>
      </div>
    </div>
  </div>
);

const InputPanel = () => {
  const { state, updateField } = useContext(CalculatorContext);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-800">
        <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
        Input Parameters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Product Cost"
          id="productCost"
          value={state.productCost}
          onChange={(val) => updateField('productCost', val)}
          icon={CurrencyDollarIcon}
          unit="$"
        />
        <InputField
          label="Selling Price"
          id="sellingPrice"
          value={state.sellingPrice}
          onChange={(val) => updateField('sellingPrice', val)}
          icon={TagIcon}
          unit="$"
        />
        <InputField
          label="Expected Orders"
          id="expectedOrders"
          value={state.expectedOrders}
          onChange={(val) => updateField('expectedOrders', val)}
          icon={ShoppingCartIcon}
          unit="Qty"
        />
        <InputField
          label="Confirmed Orders"
          id="confirmedOrders"
          value={state.confirmedOrders}
          onChange={(val) => updateField('confirmedOrders', val)}
          icon={CheckCircleIcon}
          unit="%"
          isPercentage={true}
        />
        <InputField
          label="Expected Delivery"
          id="expectedDelivery"
          value={state.expectedDelivery}
          onChange={(val) => updateField('expectedDelivery', val)}
          icon={TruckIcon}
          unit="%"
          isPercentage={true}
        />
        <InputField
          label="Ad Spend per Order"
          id="adSpendPerOrder"
          value={state.adSpendPerOrder}
          onChange={(val) => updateField('adSpendPerOrder', val)}
          icon={MegaphoneIcon}
          unit="$"
        />
      </div>
    </div>
  );
};

export default InputPanel;
