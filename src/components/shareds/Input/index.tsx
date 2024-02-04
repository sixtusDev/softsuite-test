import React from 'react';
import { InputProps as AntdInputProps, Input as AntdInput } from 'antd';

type InputProps = AntdInputProps;

export const Input = ({ className, ...rest }: InputProps) => {
  const combinedClassName = `Input ${className || ''}`.trim();

  return <AntdInput {...rest} className={combinedClassName} />;
};
