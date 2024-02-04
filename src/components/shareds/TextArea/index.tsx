import React from 'react';
import { Input } from 'antd';
import { TextAreaProps as AntdTextAreaProps } from 'antd/es/input/TextArea';

type TextAreaProps = AntdTextAreaProps;

const { TextArea: AntdTextArea } = Input;

export const TextArea = ({ className, ...rest }: TextAreaProps) => {
  const combinedClassName = `TextArea ${className || ''}`.trim();

  return <AntdTextArea {...rest} className={combinedClassName} />;
};
