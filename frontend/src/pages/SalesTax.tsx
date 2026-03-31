import { create } from "zustand";

type ExecutiveMode = 'CEO' | 'CFO' | 'COO' | 'Risk';

export interface Notification {
  id: string;
  type: 'CRITICAL' | 'INFO';
  message: string;
  timestamp: Date;
}

interface FinancialState {
  // Theme State
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Real Data State
  revenue: number;
  payrollRatio: number;
  otherBurn: number;
  isLoading: boolean;
  error: string | null;

  // Simulation State
  isSimulationMode: boolean;
  simulatedRevenue: number;
  simulatedPayrollRatio: number;
  simulatedOtherBurn: number;
  viewMode: ExecutiveMode;

  // Notification State
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Setters & Actions
  setRevenue: (n: number) => void;
  setSimulatedRevenue: (n: number) => void;
  setSimulatedPayrollRatio: (n: number) => void;
  setViewMode: (mode: ExecutiveMode) => void;
  toggleSimulation: () => void;
  resetToLive: () => void;
  fetchFinancials: () => Promise<void>;
  triggerShock: () => void;
  
  // Mitigation Action
  executeMitigation: (id: string) => void;
}

export const useFinancialStore = create<FinancialState>((set) => ({
  // Initial Theme State
  theme: 'dark',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'dark' ? 'light' : 'dark' 
  })),

  // Initial Financial State
  revenue: 200000,
  payrollRatio: 0.35,
  otherBurn: 50000,
  isLoading: false,
  error: null,
  isSimulationMode: false,
  simulatedRevenue: 200000,
  simulatedPayrollRatio: 0.35,
  simulatedOtherBurn: 50000,
  viewMode: 'CEO',

  // Notifications Implementation
  notifications: [],
  addNotification: (n) => set((state) => ({ 
    notifications: [{ ...n, timestamp: new Date() }, ...state.notifications].slice(0, 5) 
  })),
  removeNotification: (id) => set((state) => ({ 
    notifications: state.notifications.filter(nt => nt.id !== id) 
  })),
  clearNotifications: () => set({ notifications: [] }),

  // Actions
  setRevenue: (n) => set({ revenue: n }),
  setSimulatedRevenue: (n) => set({ simulatedRevenue: n }),
  setSimulatedPayrollRatio: (n) => set({ simulatedPayrollRatio: n }),
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleSimulation: () => set((state) => ({ isSimulationMode: !state.isSimulationMode })),
  
  triggerShock: () => set((state) => ({
    isSimulationMode: true,
    simulatedRevenue: state.revenue * 0.5,
    viewMode: 'Risk' 
  })),

  // Mitigation Logic: Resets revenue and moves view to Risk to assess impact
  executeMitigation: (id) => {
    set((state) => ({
      simulatedRevenue: state.revenue,
      viewMode: 'CFO', // Move to CFO to review capital
      notifications: state.notifications.filter(nt => nt.id !== id)
    }));
  },

  resetToLive: () => set((state) => ({
    simulatedRevenue: state.revenue,
    simulatedPayrollRatio: state.payrollRatio,
    simulatedOtherBurn: state.otherBurn,
    isSimulationMode: false
  })),

  fetchFinancials: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/financials');
      if (!response.ok) throw new Error(`Gateway Error: ${response.status}`);
      const data = await response.json();
      set({ 
        revenue: data.revenue ?? 200000,
        payrollRatio: data.payrollRatio ?? 0.35,
        otherBurn: data.otherBurn ?? 50000,
        isLoading: false 
      });
    } catch (err: any) {
      set({ error: "Sync unavailable. Using local cache.", isLoading: false });
    }
  },
}));
