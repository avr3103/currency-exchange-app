export const API_URL = 'https://openexchangerates.org/api';
export const API_KEY = process.env.REACT_APP_API_KEY;
export const AVAILABLE_CURRENCIES = ['EUR', 'USD', 'GBP'];
export const CURRENCY_SYMBOLS: {[key: string]:string} = {'USD': '$', 'EUR': '€', 'GBP': '£'};
export const REFRESH_TIME = 10000;
