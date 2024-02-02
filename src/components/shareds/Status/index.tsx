import React from 'react';
import { Status as EStatus } from '../../../store/slices/element.slice';

import './Status.scss';

type StatusProps = {
  value: EStatus;
};

export const Status = ({ value }: StatusProps) => (
  <div className={`Status ${value === EStatus.Active ? 'Status--active' : 'Status--inactive'}`}>
    <p
      className={`Status__text ${
        value === EStatus.Active ? 'Status__text--active' : 'Status__text--inactive'
      }`}
    >
      {value === EStatus.Active ? 'Active' : 'Inactive'}
    </p>
  </div>
);
