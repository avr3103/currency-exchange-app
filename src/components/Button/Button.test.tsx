import React from 'react';
import { render } from '@testing-library/react';
import { Button } from './index';

const handleClick = jest.fn();

it('renders Button', () => {
  const { asFragment } = render(<Button isActive={true} onClick={handleClick} />);
  expect(asFragment()).toMatchSnapshot();
});

it('Button must be disabled', () => {
  const { asFragment } = render(<Button isActive={false} onClick={handleClick} />);
  expect(asFragment().firstChild).toHaveClass('disabled');
});

it('Button must be enabled', () => {
  const { asFragment } = render(<Button isActive={true} onClick={handleClick} />);
  expect(asFragment().firstChild).not.toHaveClass('disabled');
});




