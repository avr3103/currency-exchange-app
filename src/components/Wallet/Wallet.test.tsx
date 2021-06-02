import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Wallet } from './index';

describe('Wallet component', () => {
  const changeValue = jest.fn();
  const changeCurrency = jest.fn();

  const props = {
    inputValue: 100,
    currency:'USD',
    walletName: 'walletFrom',
    amount:1000,
    currencySymbol:'$',
    onChangeAmount:changeValue,
    onChangeCurrency: changeCurrency
  };

  it('renders Wallet', () => {
    const { asFragment } = render(<Wallet {...props}/>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('changes Wallet currency option', () => {
    render(<Wallet {...props}/>);

    const select = screen.getByRole('combobox');
    fireEvent.select(select, {target: {value: 'GBP'}});
    expect(select).toHaveProperty('value', 'GBP');
  });

  it('input sign is exist', () => {
    render(<Wallet {...props}/>);

    expect(screen.getByText(`-`)).toBeInTheDocument();
  })
});