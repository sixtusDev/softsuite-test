import React, { useState } from 'react';

import { Search } from '../../../../components/shareds/Search';
import { Button } from '../../../../components/shareds/Button';

import FilterIcon from '../../../../assets/icons/filter.svg?react';
import PlusIcon from '../../../../assets/icons/plus.svg?react';
import { CreateElementLink } from '../CreateElementLink';

type ElementLinksToolBarProps = {
  elementId: string;
};

export const ElementLinksToolBar = ({ elementId }: ElementLinksToolBarProps) => {
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
          <Search placeholder="Search for element links" style={{ minWidth: '250px' }} />
          <FilterIcon />
        </div>
        <div className="ToolBar__right">
          <Button className="Button--primary" onClick={showCreateElementForm}>
            <span>Create Element Links</span> <PlusIcon />
          </Button>
        </div>
      </div>
      <CreateElementLink
        elementId={elementId}
        isModalOpen={isModalOpen}
        onCloseModal={handleCloseModal}
      />
    </>
  );
};
