import React from 'react';

import CheckIcon from '../../../assets/icons/check.svg?react';

import './Steps.scss';

type StepsProps = {
  items: { title: string }[];
  current: number;
};

export const INITIAL_STEP = 0;

export const Steps = ({ items, current }: StepsProps) => (
  <div className="Steps">
    {items.map((item, index) => {
      const isActive = index === current;
      const isCompleted = current > index;

      return (
        <>
          <div
            className={`Steps__step-line ${isActive ? 'Steps__step-line--active' : ''} ${
              isCompleted ? 'Steps__step-line--completed' : ''
            }`}
          />
          <div className="Steps__step">
            <span
              className={`Steps__step-label ${isActive ? 'Steps__step-label--active' : ''} ${
                isCompleted ? 'Steps__step-label--completed' : ''
              }`}
            >
              {item.title}
            </span>
            <div
              className={`Steps__step-number ${isActive ? 'Steps__step-number--active' : ''} ${
                isCompleted ? 'Steps__step-number--completed' : ''
              }`}
            >
              {isCompleted ? <CheckIcon /> : index + 1}
            </div>
          </div>
        </>
      );
    })}
    {items.length ? <div className="Steps__step-line" /> : null}
  </div>
);
