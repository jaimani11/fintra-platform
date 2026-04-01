import React, { useState } from "react";

const initialModules = [
  { key: "payroll", enabled: true },
  { key: "accounting", enabled: true },
  { key: "sales_tax", enabled: false },
  { key: "stock_comp", enabled: false },
  { key: "commissions", enabled: true },
];

export const ModuleManager = () => {
  const [modules, setModules] = useState(initialModules);

  const toggle = (key: string) => {
    setModules((prev) =>
      prev.map((m) =>
        m.key === key ? { ...m, enabled: !m.enabled } : m
      )
    );
  };

  return (
    <div style={{ background: "white", padding: 20, borderRadius: 8 }}>
      <h3>Enabled Modules</h3>
      {modules.map((m) => (
        <div
          key={m.key}
          style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}
        >
          <span>{m.key}</span>
          <input
            type="checkbox"
            checked={m.enabled}
            onChange={() => toggle(m.key)}
          />
        </div>
      ))}
    </div>
  );
};
