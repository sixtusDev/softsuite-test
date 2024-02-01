import React from 'react';

import './Button.scss';

type ButtonProps = {
  children: React.ReactNode;
};

export const Button = ({ children }: ButtonProps) => <button className="Button">{children}</button>;
