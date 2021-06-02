import React from 'react';
import { render, screen } from '@testing-library/react';
import Exchanger from './index';

describe('Exchanger tests',() => {
  it('renders Exchanger', () => {
    render(<Exchanger/>);
    const { asFragment } = render(<Exchanger/>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('shows loader', () => {
    render(<Exchanger />);

    const element = screen.getByTestId('loader')
    expect(element).toBeInTheDocument()
  })
})