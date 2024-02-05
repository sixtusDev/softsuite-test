import React, { useEffect } from 'react';
import { useLazyFetchElementLinkByIdQuery } from '../../../../store/apis/elementLink.api';
import { withAsyncState } from '../../../../hoc/withAsyncState';

type ElementLinkDetailsProps = {
  elementId: string;
  elementLinkId: string;
  openDrawer: boolean;
  onCloseDrawer: () => void;
};

export const ElementLinkDetails = ({
  elementId,
  elementLinkId,
  openDrawer,
  onCloseDrawer,
}: ElementLinkDetailsProps) => {
  const [trigger, { data, isLoading, error }] = useLazyFetchElementLinkByIdQuery();

  useEffect(() => {
    if (elementId && elementLinkId) {
      trigger({ elementId, elementLinkId });
    }
  }, [elementId, elementLinkId]);

  const JSX = (
    <div>
      <h1 className="main-heading mb-20">Element Link Details</h1>
      <div className="details-container">
        <div className="details-column">
          <div className="details-item">
            <span className="details-label">ELEMENT NAME</span>
            <span className="details-name">{data?.data.name}</span>
          </div>
          <div className="details-item">
            <span className="details-label">ELEMENT CATEGORY</span>
            <span className="details-name">{data?.data.employeeCategoryId}</span>
          </div>
          <div className="details-item">
            <span className="details-label">DESCRIPTION</span>
            <span className="details-name">{data?.data?.amountType}</span>
          </div>
          <div className="details-item">
            <span className="details-label">EFFECTIVE START DATE</span>
            <span className="details-name">{data?.data?.status}</span>
          </div>
          <div className="details-item">
            <span className="details-label">PROCESSING TYPE</span>
            <span className="details-name">{data?.data?.suborganizationId}</span>
          </div>
          <div className="details-item">
            <span className="details-label">PAY MONTHS</span>
            <span className="details-name">{data?.data.automate}</span>
          </div>
          <div className="details-item">
            <span className="details-label">STATUS</span>
            <span className="details-name">{data?.data?.status}</span>
          </div>
        </div>
        <div className="details-column">
          <div className="details-item">
            <span className="details-label">ELEMENT NAME</span>
            <span className="details-name">{data?.data.name}</span>
          </div>
          <div className="details-item">
            <span className="details-label">ELEMENT CATEGORY</span>
            <span className="details-name">{data?.data.employeeCategoryId}</span>
          </div>
          <div className="details-item">
            <span className="details-label">DESCRIPTION</span>
            <span className="details-name">{data?.data?.amountType}</span>
          </div>
          <div className="details-item">
            <span className="details-label">EFFECTIVE START DATE</span>
            <span className="details-name">{data?.data?.status}</span>
          </div>
          <div className="details-item">
            <span className="details-label">PROCESSING TYPE</span>
            <span className="details-name">{data?.data?.suborganizationId}</span>
          </div>
          <div className="details-item">
            <span className="details-label">PAY MONTHS</span>
            <span className="details-name">{data?.data.automate}</span>
          </div>
          <div className="details-item">
            <span className="details-label">STATUS</span>
            <span className="details-name">{data?.data?.status}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ElementLinkDetailsWithErrorAndLoading = withAsyncState(JSX, isLoading, error);

  return <ElementLinkDetailsWithErrorAndLoading />;
};
