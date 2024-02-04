import React from 'react';

import './Button.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...rest }: ButtonProps) => {
  const combinedClassName = `Button ${rest.className || ''}`.trim();

  return (
    <button {...rest} className={combinedClassName}>
      {children}
    </button>
  );
};
