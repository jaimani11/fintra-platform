// src/store/financialStore.ts
import { create } from "zustand";

interface FinancialState {
  revenue: number;
  payrollRatio: number;
  otherBurn: number;
  setRevenue: (v: number) => void;
  setPayrollRatio: (v: number) => void;
  setOtherBurn: (v: number) => void;
}

export const useFinancialStore = create<FinancialState>((set) => ({
  revenue: 200000,
  payrollRatio: 0.35,
  otherBurn: 50000,
  setRevenue: (revenue) => set({ revenue }),
  setPayrollRatio: (payrollRatio) => set({ payrollRatio }),
  setOtherBurn: (otherBurn) => set({ otherBurn }),
}));
