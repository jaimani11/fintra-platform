import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Decision } from '../types';

interface DecisionContextType {
  decisions: Decision[];
  setDecisions: React.Dispatch<React.SetStateAction<Decision[]>>;
}

// 1. Initialize with explicit type or null
export const DecisionContext = createContext<DecisionContextType | null>(null);

export const DecisionProvider = ({ children }: { children: ReactNode }) => {
  // 2. State is constrained to the Decision interface from types.ts
  const [decisions, setDecisions] = useState<Decision[]>([]);

  return (
    <DecisionContext.Provider value={{ decisions, setDecisions }}>
      {children}
    </DecisionContext.Provider>
  );
};

// 3. Custom hook for cleaner imports in your Portal components
export const useDecisions = () => {
  const context = useContext(DecisionContext);
  if (!context) {
    throw new Error("useDecisions must be used within a DecisionProvider");
  }
  return context;
};
