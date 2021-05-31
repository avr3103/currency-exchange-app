import { useReducer, Dispatch } from 'react';
import { Wallet } from '../common/types';
import { getAccountData} from '../services/getAccountData';

type WalletsState = {
  wallet: Wallet;
  currencyFrom: string;
  currencyTo: string;
}

type WalletsExchangeAction = {
  type: 'EXCHANGE';
  payload: Wallet;
}

type WalletsSwitchCurrentAction = {
  type: 'SWITCH';
}

type WalletsChangeCurrencyFromAction = {
  type: 'CHANGE_FROM';
  payload: string;
}

type WalletsChangeCurrencyToAction = {
  type: 'CHANGE_TO';
  payload: string;
}

type WalletsAction = | WalletsExchangeAction
  | WalletsSwitchCurrentAction
  | WalletsChangeCurrencyFromAction
  | WalletsChangeCurrencyToAction;

const walletsReducer = (
  state: WalletsState,
  action: WalletsAction
) => {
  switch (action.type) {
    case 'EXCHANGE':
      return {
        ...state,
        wallet: {
          ...state.wallet,
          ...action.payload
        }
      }
    case 'SWITCH':
      return {
        ...state,
        currencyFrom: state.currencyTo,
        currencyTo: state.currencyFrom
      }
    case 'CHANGE_FROM':
      return {
        ...state,
        currencyFrom: action.payload

      }
    case 'CHANGE_TO':
      return {
        ...state,
        currencyTo: action.payload
      }
    default:
      return {
        ...state
      };
  }
}

const initialState = {
  wallet: getAccountData(),
  currencyFrom: 'USD',
  currencyTo: 'EUR'
}

export const useWalletsState = ():[WalletsState, Dispatch<WalletsAction>] => {
  const [store, dispatch] = useReducer(walletsReducer, initialState);

  return [store, dispatch];
}