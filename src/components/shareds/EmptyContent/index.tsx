import React from 'react';

import empty from '../../../assets/imgs/empty.png';
import Danger from '../../../assets/icons/danger.svg?react';

import './EmptyContext.scss';

type EmptyContentProps = {
  message: string;
};

export const EmptyContent = ({ message }: EmptyContentProps) => (
  <div className="EmptyContent">
    <img className="EmptyContent__img" src={empty} alt="Empty" />
    <div className="EmptyContent__msg">
      <Danger />
      <p>{message}</p>
    </div>
  </div>
);
