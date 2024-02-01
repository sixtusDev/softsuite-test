import React from 'react';
import { Search } from '../../../components/shareds/Search';

import FilterIcon from '../../../assets/icons/filter.svg?react';
import PlusIcon from '../../../assets/icons/plus.svg?react';
import { Button } from '../../../components/shareds/Button';

import './ToolBar.scss';

export const ToolBar = () => (
  <div className="ToolBar">
    <div className="ToolBar__left">
      <Search placeholder="Search for element" style={{ minWidth: '250px' }} />
      <FilterIcon />
    </div>
    <div className="ToolBar__right">
      <Button>
        <span>Create Element</span> <PlusIcon />
      </Button>
    </div>
  </div>
);
