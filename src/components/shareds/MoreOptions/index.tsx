import React from 'react';
import { DropDownProps, Dropdown, MenuProps } from 'antd';

type MoreOptionsProps = {
  children: React.ReactNode;
  items: MenuProps['items'];
  placement?: DropDownProps['placement'];
};

export const MoreOptions = ({ children, items, placement = 'bottom' }: MoreOptionsProps) => (
  <Dropdown menu={{ items }} placement={placement} trigger={['click']}>
    <div style={{ cursor: 'pointer', width: 'fit-content' }}>{children}</div>
  </Dropdown>
);
