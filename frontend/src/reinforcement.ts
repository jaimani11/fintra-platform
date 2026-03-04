let weightAdjustment = 0;

export function reinforcementUpdate(
  outcomeSuccess: boolean
) {
  weightAdjustment += outcomeSuccess
    ? -0.02
    : 0.03;
}

export function getReinforcementWeight() {
  return weightAdjustment;
}
