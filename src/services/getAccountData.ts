import { Wallet } from '../common/types';

export const getAccountData = (): Wallet => {
  return {
    currencies: {
      'EUR': 1650.55,
      'USD': 3650.45,
      'GBP': 950.46
    },
  }
}