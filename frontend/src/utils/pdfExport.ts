import { jsPDF } from "jspdf";

export const exportExecutivePDF = (data: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(22);
  doc.text("Fintra Executive Board Report", 20, 20);
  doc.setFontSize(12);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
  
  // Strategic Summary
  doc.setFontSize(16);
  doc.text("Strategic Directive", 20, 50);
  doc.setFontSize(10);
  const splitSummary = doc.splitTextToSize(data.executive_summary, 170);
  doc.text(splitSummary, 20, 60);

  // Risk Horizon
  doc.setFontSize(16);
  doc.text("Risk Forecast Horizon", 20, 100);
  doc.setFontSize(10);
  doc.text(`30 Days: ${data.forecast['30d']}`, 20, 110);
  doc.text(`90 Days: ${data.forecast['90d']}`, 20, 120);
  doc.text(`180 Days: ${data.forecast['180d']}`, 20, 130);

  doc.save(`Fintra_Board_Report_${Date.now()}.pdf`);
};
