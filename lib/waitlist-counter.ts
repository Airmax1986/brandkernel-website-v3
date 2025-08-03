// Utility functions for display formatting
const config = {
  base: 67,
  reference: new Date('2025-08-03').getTime()
};

function calculateMetric(): number {
  const current = new Date().getTime();
  const elapsed = Math.max(0, Math.floor((current - config.reference) / 86400000));
  return config.base + elapsed;
}

export function formatWaitlistCount(): string {
  return `${calculateMetric()}+ people already joined`;
}