import {
  FC,
  useEffect,
  ChangeEvent,
  useState,
  useRef
} from 'react';
import { Wallet } from '../Wallet';
import { Button } from '../Button';
import { Loader } from '../Loader';
import { useRatesFetcher } from '../../hooks/useRatesFetcher';
import { useWalletsState } from '../../hooks/useWalletsState';
import {
  getCurrencySymbol,
  calculateRate,
  checkOperation,
  toFixed
} from '../../utils';

import './Exchanger.css';

const Exchanger: FC = (): JSX.Element => {
  const [rates, loading] = useRatesFetcher();
  const [store, dispatch] = useWalletsState();
  const [isExchangeAvailable, setExchangeButton] = useState(false);
  const [valueFrom, setValueFrom] = useState<number | string>('');
  const [valueTo, setValueTo] = useState<number| string>('')

  const {
    wallet: {
      currencies
    },
    currencyFrom,
    currencyTo,
  } = store;

  const inputRef = useRef<HTMLInputElement>(null);

  const setFocus = () => {
    if(inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(()=> {
    setFocus();
  },[loading]);

  if (loading) return <Loader/>

  const currencySymbolFrom = getCurrencySymbol(currencyFrom);
  const currencySymbolTo = getCurrencySymbol(currencyTo);
  const [currentRateFrom, currentRateTo] = calculateRate(rates[currencyFrom], rates[currencyTo]);

  const clearInputs = () => {
    if (valueFrom || valueTo) {
      setValueFrom('')
      setValueTo('');
      setExchangeButton(false);
    }
  }

  const setInputValue = (val: string, rate: number, amount: number, wallet: string) => {
    const isCorrectInput = /^[\d]*\.?[\d]{0,2}$/.test(val);
    const res = Number(val) * rate;
    const isOperationCorrect = checkOperation(+val, res, amount);

    setExchangeButton(isOperationCorrect);

    if (isCorrectInput && wallet === 'from') {
      setValueFrom(val ? toFixed(+val) : '');

      if (isOperationCorrect) setValueTo(toFixed(res));
    } else if (isCorrectInput && wallet === 'to'){
      setValueTo(val ? toFixed(+val) : '');

      if (isOperationCorrect) setValueFrom(toFixed(res));
    }

    if (!valueFrom && valueTo) {
      setValueTo('');
    }
  }

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'walletFrom') {
      setInputValue(e.target.value, currentRateFrom, currencies[currencyFrom], 'from')
    } else {
      setInputValue(e.target.value, currentRateTo, currencies[currencyTo], 'to')
    }
  }

  const setCurrentValue = (e: ChangeEvent<HTMLSelectElement>) => {
    const ACTION = e.target.name === 'walletFrom' ? 'CHANGE_FROM': 'CHANGE_TO';
    dispatch({type: ACTION, payload: e.target.value});
    clearInputs();
    setFocus();
  }

  const switchWallets = () => {
    dispatch({type:'SWITCH'});
    clearInputs();
    setFocus();
  }

  const handleExchange = () => {
    const newWallet = {
      currencies: {
        ...currencies,
        [currencyFrom]: toFixed(currencies[currencyFrom] - (+valueFrom)),
        [currencyTo]: toFixed(currencies[currencyTo] + (+valueTo))
      }
    }

    dispatch({type: 'EXCHANGE', payload: newWallet})
    clearInputs();
    setFocus();
  }

  return (
    <div className='exchanger'>
      <div className='header-row'>
        <div className='left' />
        <div className='center'>
          {`${currencySymbolFrom}1 = ${currencySymbolTo}${currentRateFrom.toFixed(2)}`}
        </div>
        <div className='right'>
          <Button
            cname='exchange-btn'
            isActive={isExchangeAvailable}
            text='Exchange'
            onClick={handleExchange}
          />
        </div>
      </div>
      <Wallet
        inputRef={inputRef}
        walletName='walletFrom'
        inputValue={valueFrom}
        currency={currencyFrom}
        currencySymbol={currencySymbolFrom}
        amount={currencies[currencyFrom]}
        onChangeCurrency={setCurrentValue}
        onChangeAmount={handleValueChange}
      />
      <div className='delimiter' />
      <Button cname='switch-wallet' isActive={true} onClick={switchWallets} />
      <Wallet
        walletName='walletTo'
        inputValue={valueTo}
        currency={currencyTo}
        currencySymbol={currencySymbolTo}
        amount={currencies[currencyTo]}
        reteTo={currentRateTo.toFixed(2)}
        symbolFrom={currencySymbolFrom}
        onChangeCurrency={setCurrentValue}
        onChangeAmount={handleValueChange}
      />
    </div>
  );
}



export default Exchanger;