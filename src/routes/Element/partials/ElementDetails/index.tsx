import React from 'react';

import { useAppSelector } from '../../../../store/hooks';
import {
  fetchElementById,
  selectAsyncState,
  selectElement,
} from '../../../../store/slices/element.slice';
import { withAsyncState } from '../../../../hoc/withAsyncState';

export const ElementDetails = () => {
  const element = useAppSelector(selectElement);

  return (
    <div className="details-container">
      <div className="details-column">
        <div className="details-item">
          <span className="details-label">ELEMENT NAME</span>
          <span className="details-name">{element?.name}</span>
        </div>
        <div className="details-item">
          <span className="details-label">ELEMENT CATEGORY</span>
          <span className="details-name">{element?.categoryId}</span>
        </div>
        <div className="details-item">
          <span className="details-label">DESCRIPTION</span>
          <span className="details-name">{element?.description}</span>
        </div>
        <div className="details-item">
          <span className="details-label">EFFECTIVE START DATE</span>
          <span className="details-name">{element?.effectiveStartDate}</span>
        </div>
        <div className="details-item">
          <span className="details-label">PROCESSING TYPE</span>
          <span className="details-name">{element?.processingType}</span>
        </div>
        <div className="details-item">
          <span className="details-label">PAY MONTHS</span>
          <span className="details-name">{element?.selectedMonths.join(', ')}</span>
        </div>
        <div className="details-item">
          <span className="details-label">STATUS</span>
          <span className="details-name">{element?.status}</span>
        </div>
      </div>

      <div className="details-column">
        <div className="details-item">
          <span className="details-label">ELEMENT CLASSIFICATION</span>
          <span className="details-name">{element?.classificationId}</span>
        </div>
        <div className="details-item">
          <span className="details-label">PAYRUN</span>
          <span className="details-name">{element?.payFrequency}</span>
        </div>
        <div className="details-item">
          <span className="details-label">REPORTING NAME</span>
          <span className="details-name">{element?.reportingName}</span>
        </div>
        <div className="details-item">
          <span className="details-label">EFFECTIVE END DATE</span>
          <span className="details-name">{element?.effectiveEndDate}</span>
        </div>
        <div className="details-item">
          <span className="details-label">PAY FREQUENCY</span>
          <span className="details-name">{element?.payFrequency}</span>
        </div>
        <div className="details-item">
          <span className="details-label">PRORATE</span>
          <span className="details-name">{element?.prorate}</span>
        </div>
        <div className="details-item" />
      </div>
    </div>
  );
};

export const ElementDetailsWithAsyncState = withAsyncState(
  ElementDetails,
  fetchElementById,
  selectAsyncState,
);
