import {KeyboardEvent} from 'react';
import {CURRENCY_SYMBOLS} from '../constants';

export const getCurrencySymbol = (name: string) => (CURRENCY_SYMBOLS[name]);

export const blockInvalidChar = (e:KeyboardEvent) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

export const calculateRate = (from: number, to: number): [number, number] => {
  const fromToUsd = 1 / from;
  const toToUsd = 1 / to;
  return [fromToUsd/toToUsd, toToUsd/fromToUsd];
};

export const toFixed = (num: number): number => {
  const strRes = String(num);
  const getDot = strRes.indexOf(".");
  return getDot !== -1 ? +strRes.slice(0, (strRes.indexOf(".")) + 3) : num;
}

export const checkOperation = (val: number, result: number, amount: number): boolean => {
  return !(result < 0.01 || val > amount);
}


