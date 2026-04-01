import React from "react";

const mockWorkspaces = [
  { id: "org1", name: "Austin Accounting LLC", role: "Owner" },
  { id: "org2", name: "Fintra Demo Co", role: "Accountant" },
];

export const WorkspaceSwitcher = () => {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ fontSize: 12, color: "#475569" }}>Workspace</label>
      <select style={{ marginLeft: 10 }}>
        {mockWorkspaces.map((w) => (
          <option key={w.id} value={w.id}>
            {w.name} ({w.role})
          </option>
        ))}
      </select>
    </div>
  );
};
