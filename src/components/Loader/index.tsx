import { FC } from 'react';

import './Loader.css';

export const Loader: FC = (): JSX.Element => (
  <div data-testid='loader' className='wrapper'>
    <div className='dual-ring'/>
  </div>
);