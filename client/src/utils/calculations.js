// This is a simple utility to calculate Profit and Loss
// We use this for unit testing examples

export const calculatePnL = (avgPrice, currentPrice, quantity) => {
  if (quantity < 0) return 0;
  return (currentPrice - avgPrice) * quantity;
};

export const formatCurrency = (amount) => {
  return "₹" + amount.toLocaleString(undefined, { minimumFractionDigits: 2 });
};
