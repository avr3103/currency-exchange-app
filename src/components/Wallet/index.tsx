import { FC, ChangeEvent, RefObject } from 'react';
import { blockInvalidChar } from '../../utils';
import { AVAILABLE_CURRENCIES } from '../../constants';

import './Wallet.css';

type Props = {
  inputRef?: RefObject<HTMLInputElement>
  walletName: string;
  inputValue: number | string;
  currency: string;
  currencySymbol: string;
  amount: number;
  reteTo?: string;
  symbolFrom?: string;
  onChangeCurrency: (e:ChangeEvent<HTMLSelectElement>) => void;
  onChangeAmount: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Wallet: FC<Props> = (props): JSX.Element => {
  const options = AVAILABLE_CURRENCIES.map(item =>
    <option key={item} value={item}>{item}</option>
  );

  const sign = props.walletName === 'walletFrom' ? '-' : '+';

  return (
    <div className='wallet'>
      <div className='row'>
        <select
          className='wallet-currency'
          value={props.currency}
          onChange={props.onChangeCurrency}
          name={props.walletName}
        >
          {options}
        </select>
        <div>
          {props.inputValue
            ? <span className='wallet-operation-sign'>{sign}</span>
            : null
          }
          <input
            className='wallet-input'
            type="number"
            name={props.walletName}
            value={props.inputValue}
            onKeyDown={blockInvalidChar}
            onChange={props.onChangeAmount}
            ref={props.inputRef}
          />
        </div>
      </div>
      <div className='row'>
        <span className='wallet-amount'>
          You have: {`${props.amount}${props.currencySymbol}`}
        </span>
        {props.reteTo
          ?
            <span className='wallet-amount'>
              {`1${props.currencySymbol} = ${props.symbolFrom}${props.reteTo}`}
            </span>
          : null
        }
      </div>
    </div>
  );
}