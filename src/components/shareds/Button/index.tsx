import React from 'react';
import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import './Button.scss';

type ButtonProps = AntdButtonProps;

export const Button = ({ children, ...rest }: ButtonProps) => {
  const combinedClassName = `Button ${rest.className || ''}`.trim();

  return (
    <AntdButton {...rest} className={combinedClassName}>
      {children}
    </AntdButton>
  );
};
