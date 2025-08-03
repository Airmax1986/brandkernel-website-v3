// lib/waitlist-counter.ts

const INITIAL_COUNT = 67;
const START_DATE = '2025-08-03'; // August 3, 2025

/**
 * Calculates the current waitlist count based on initial count + days since start
 */
export function getWaitlistCount(): number {
  const startDate = new Date(START_DATE);
  const currentDate = new Date();
  
  // Calculate days difference
  const timeDiff = currentDate.getTime() - startDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  
  // Add days to initial count (minimum is initial count)
  const currentCount = INITIAL_COUNT + Math.max(0, daysDiff);
  
  return currentCount;
}

/**
 * Formats the waitlist count for display
 */
export function formatWaitlistCount(): string {
  const count = getWaitlistCount();
  return `${count}+ people already joined`;
}