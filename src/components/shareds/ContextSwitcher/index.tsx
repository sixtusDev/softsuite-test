import React, { useState } from 'react';

import './ContextSwitcher.scss';
import { CheckOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';

type Option = { label: string; value: string };

type ContextSwitcherProps = {
  Icon: any;
  label: string;
  selectedOption?: Option;
  options: Option[];
  menuStyle?: React.CSSProperties;
  optionsStyle?: React.CSSProperties;
};

export const ContextSwitcher = ({
  Icon,
  label,
  options,
  menuStyle,
  optionsStyle,
  selectedOption = options[3],
}: ContextSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="ContextSwitcher">
      <div style={menuStyle} className="ContextSwitcher__menu" onClick={handleClick}>
        <Icon />
        <div className="ContextSwitcher__text-block">
          <p className="ContextSwitcher__label">{label}</p>
          <p className="ContextSwitcher__current-context">{selectedOption.label}</p>
        </div>
        {isOpen ? (
          <DownOutlined style={{ height: '12px', width: '12px', marginLeft: 'auto' }} />
        ) : (
          <UpOutlined style={{ height: '12px', width: '12px', marginLeft: 'auto' }} />
        )}
      </div>
      {isOpen ? (
        <div style={optionsStyle} className="ContextSwitcher__options">
          {options.map((option) => (
            <div className="ContextSwitcher__option-block" key={option.value}>
              {option.value === selectedOption.value ? (
                <CheckOutlined style={{ color: '#2d416f', height: '12px', width: '12px' }} />
              ) : (
                <div style={{ height: '12px', width: '12px' }} />
              )}
              <p className="ContextSwitcher__option-item">{option.label}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
