import React, { useState } from 'react';
import { Search } from '../../../components/shareds/Search';

import FilterIcon from '../../../assets/icons/filter.svg?react';
import PlusIcon from '../../../assets/icons/plus.svg?react';
import { Button } from '../../../components/shareds/Button';
import { ElementForm } from './ElementForm';

import './ToolBar.scss';

export const ToolBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showCreateElementForm = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="ToolBar">
        <div className="ToolBar__left">
          <Search placeholder="Search for element" style={{ minWidth: '250px' }} />
          <FilterIcon />
        </div>
        <div className="ToolBar__right">
          <Button className="Button--primary" onClick={showCreateElementForm}>
            <span>Create Element</span> <PlusIcon />
          </Button>
        </div>
      </div>
      <ElementForm isModalOpen={isModalOpen} onCloseModal={handleCloseModal} />
    </>
  );
};
