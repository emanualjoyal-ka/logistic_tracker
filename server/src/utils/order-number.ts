/*
 Generate a human-readable order number.
 Example: LF-20260909-AB12CD
 */
export function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  return `LF-${year}${month}${day}-${randomPart}`;
}