export function correlatedShock(
  baseRisk: number,
  severity: string
) {

  let multiplier = 1;

  if (severity === "CRITICAL")
    multiplier = 1.4;
  else if (severity === "HIGH")
    multiplier = 1.25;

  return Math.min(1, baseRisk * multiplier);
}
