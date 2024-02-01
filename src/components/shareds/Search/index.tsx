import React from 'react';

import './Search.scss';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

type SearchInputProps = {
  style?: React.CSSProperties;
  placeholder?: string;
};

export const Search = ({ style, placeholder = 'Search...' }: SearchInputProps) => (
  <div className="Search" style={style}>
    <Input className="Search__input" placeholder={placeholder} />
    <Button className="Search__btn" icon={<SearchOutlined style={{ color: '#fff' }} />} />
  </div>
);
