import { synthesize } from "../chiefofStaff";
import { useFinancialStore } from "../store/useFinancialStore";
// Ensure the case matches your file system exactly


export default function ExecutiveIntelligence() {
  const { viewMode, simulatedRevenue, simulatedPayrollRatio } = useFinancialStore();

import { 
  CEONarrative, 
  CFOCapitalView, 
  COOOperationsView, 
  CROGovernanceView // Ensure this is explicitly named here
} from "../components/ExecutiveViews";
  
  // 1. Compile the synthesis using your chiefOfStaff logic
  const decision = synthesize(
    mockModules, // Data from Fintra/FairTix
    simulatedRevenue, 
    simulatedPayrollRatio, 
    50000 // otherBurn
  );

  return (
    <div className="space-y-6">
      {/* 2. Persona-Specific Output */}
      {viewMode === 'CEO' && <CEONarrative data={decision} />}
      {viewMode === 'CFO' && <CFOCapitalView data={decision} />}
      {viewMode === 'COO' && <COOOperationsView data={decision} />}
      {viewMode === 'Risk' && <CROGovernanceView data={decision} />}
    </div>
  );
}
