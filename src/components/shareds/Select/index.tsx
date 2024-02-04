import React from 'react';
import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';

type SelectProps = AntdSelectProps;

export const Select = ({ className, ...rest }: SelectProps) => {
  const combinedClassName = `Select ${className || ''}`.trim();

  return <AntdSelect {...rest} className={combinedClassName} />;
};
