import {roundNumber} from './round-number.util';

describe('roundNumber', () => {

  it('should round to 2 decimals', () => {
    expect(roundNumber(3.14159, 2)).toBe(3.14);
  });

  it('should round to 0 decimals', () => {
    expect(roundNumber(3.7, 0)).toBe(4);
  });

  it('should round to negative decimals (rounding to 100)', () => {
    expect(roundNumber(1234.567, -2)).toBe(1200);
  });

  it('should round to negative decimals (rounding to 1000)', () => {
    expect(roundNumber(1234.567, -3)).toBe(1000);
  });

  it('should handle zero value', () => {
    expect(roundNumber(0, 2)).toBe(0);
  });

  it('should handle negative value', () => {
    expect(roundNumber(-1234.567, 2)).toBe(-1234.57);
  });

  it('should return NaN for invalid input', () => {
    expect(roundNumber(NaN, 2)).toBeNaN();
    expect(roundNumber(Infinity, 2)).toBe(Infinity);
  });

});
