import { calculatePnL, formatCurrency } from './calculations';

describe('Zerodha Clone Calculations', () => {
  
  test('calculates profit correctly', () => {
    // Buy 10 shares at 100, current price 110 -> should be 100 profit
    const pnl = calculatePnL(100, 110, 10);
    expect(pnl).toBe(100);
  });

  test('calculates loss correctly', () => {
    // Buy 10 shares at 100, current price 90 -> should be -100 loss
    const pnl = calculatePnL(100, 90, 10);
    expect(pnl).toBe(-100);
  });

  test('returns 0 for zero quantity', () => {
    const pnl = calculatePnL(100, 110, 0);
    expect(pnl).toBe(0);
  });

  test('formats currency with rupee symbol', () => {
    const formatted = formatCurrency(1250.5);
    expect(formatted).toBe('₹1,250.50');
  });

});
