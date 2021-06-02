import {
  getCurrencySymbol,
  checkOperation,
  toFixed,
  calculateRate,
} from './index';


describe('Utils functions tests', () => {
  it('getCurrencySymbol gets currency symbol', () => {
    expect(getCurrencySymbol('GBP')).toBe('£');
    expect(getCurrencySymbol('EUR')).toBe('€');
    expect(getCurrencySymbol('USD')).toBe('$');
  });

  it ( 'checkOperation validates the correctness of exchange operations', () => {
    const right = {
      val: 100,
      res: 80,
      amount: 150,
      currencyFrom: 'USD',
      currencyTo: 'EUR'
    };

    const {
      val,
      res,
      amount,
      currencyFrom,
      currencyTo
    } = right;

    const wrong = {
      val1: 1,
      res1: 0.00,
      amount1: 0,
      currencyFrom1: 'USD',
      currencyTo1: 'EUR'
    };

    const {
      val1,
      res1,
      amount1,
      currencyFrom1,
      currencyTo1
    } = wrong;

    expect(checkOperation(val, res, amount, currencyFrom, currencyTo)).toBe(true);
    expect(checkOperation(val1, res1, amount1, currencyFrom1, currencyTo1)).toBe(false);
  });

  it('toFixed formats a number', () => {
    expect(toFixed(10.101010)).toEqual(10.10)
  });

  it('calculateRates calculates rates', () => {
    expect(calculateRate(1.20, 0.80)).toBeInstanceOf(Array);
  });
});