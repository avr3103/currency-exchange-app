import { FC } from 'react';

import './Button.css';

type Props = {
  text?: string;
  isActive: boolean;
  onClick: () => void;
  cname?: string;
}

export const Button: FC<Props> = ({text, onClick, isActive, cname}): JSX.Element => {
  const disabled = isActive ? '' : 'disabled';
  return (
    <button
      className={`btn ${cname} ${disabled}`}
      disabled={!isActive}
      onClick={onClick}
    >
      {text}
    </button>
  );
}