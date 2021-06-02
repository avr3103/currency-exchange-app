import React from 'react';
import { render } from '@testing-library/react';
import { Loader } from './index';

it('renders Loader', () => {
  const { asFragment } = render(<Loader />);
  expect(asFragment()).toMatchSnapshot();
});

