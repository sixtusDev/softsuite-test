import React from 'react';
import { withAsyncState } from '../../../../hoc/withAsyncState';
import { useElementLinkWithValues } from '../../../../hooks/useElementLinkWithValues';

type ElementLinkDetailsProps = {
  elementId: string;
  elementLinkId: string;
  onCloseDrawer: () => void;
};

export const ElementLinkDetails = ({
  elementId,
  elementLinkId,
  onCloseDrawer,
}: ElementLinkDetailsProps) => {
  const { elementLink, isLoading, error } = useElementLinkWithValues(elementId, elementLinkId);

  const JSX = (
    <div>
      <div className="details-container">
        <div className="details-column">
          <div className="details-item">
            <span className="details-label">NAME</span>
            <span className="details-name">{elementLink?.name}</span>
          </div>
          <div className="details-item">
            <span className="details-label">DEPARTMENT</span>
            <span className="details-name">{elementLink?.departmentName}</span>
          </div>
          <div className="details-item">
            <span className="details-label">EMPLOYEE TYPE</span>
            <span className="details-name">{elementLink?.employeeTypeName}</span>
          </div>
          <div className="details-item">
            <span className="details-label">EFFECTIVE DATE</span>
            <span className="details-name">{elementLink?.effectiveEndDate}</span>
          </div>
          <div className="details-item">
            <span className="details-label">GRADE</span>
            <span className="details-name">{elementLink?.gradeName}</span>
          </div>
          <div className="details-item">
            <span className="details-label">AMOUNT TYPE</span>
            <span className="details-name">{elementLink?.amountType}</span>
          </div>
          <div className="details-item">
            <span className="details-label">JOB TITLE</span>
            <span className="details-name">{elementLink?.jobTitleName}</span>
          </div>
        </div>
        <div className="details-column">
          <div className="details-item">
            <span className="details-label">SUB ORGANIZATION</span>
            <span className="details-name">{elementLink?.subOrganizationName}</span>
          </div>
          <div className="details-item">
            <span className="details-label">LOCATION</span>
            <span className="details-name">{elementLink?.locationName}</span>
          </div>
          <div className="details-item">
            <span className="details-label">EMLOYEE CATEGORY</span>
            <span className="details-name">{elementLink?.status}</span>
          </div>
          <div className="details-item">
            <span className="details-label">GRADE STEP</span>
            <span className="details-name">{elementLink?.gradeStepName}</span>
          </div>
          <div className="details-item">
            <span className="details-label">AMOUNT</span>
            <span className="details-name">{elementLink?.amount}</span>
          </div>
          <div className="details-item">
            <span className="details-label">LOCATION</span>
            <span className="details-name">{elementLink?.locationName}</span>
          </div>
          <div className="details-item">
            <span className="details-label">EFFECTIVE END DATE</span>
            <span className="details-name">{elementLink?.effectiveEndDate}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ElementLinkDetailsWithErrorAndLoading = withAsyncState(JSX, isLoading, error);

  return <ElementLinkDetailsWithErrorAndLoading />;
};
