// src/memory.ts
export function recordDecision(decision: any) {
  // For now, we'll log to console. 
  // Later, this will sync with your Supabase "decisions" table.
  console.log("Decision recorded in Fintra Memory:", {
    timestamp: new Date().toISOString(),
    priority: decision.executive_priority,
    runway: decision.projected_runway
  });
}
