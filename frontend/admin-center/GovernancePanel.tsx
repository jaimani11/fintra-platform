import React from "react";

export const GovernancePanel = () => {
  const mockProof = {
    enabled: true,
    hash: "0xabc123...",
    tx: "tx_abc123",
  };

  if (!mockProof.enabled) return null;

  return (
    <div style={{ background: "white", padding: 20, borderRadius: 8 }}>
      <h3>Governance Proof</h3>
      <p>Decision Hash: {mockProof.hash}</p>
      <p>Blockchain Tx: {mockProof.tx}</p>
    </div>
  );
};
