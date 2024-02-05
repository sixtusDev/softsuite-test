import React from 'react';

import { withAsyncState } from '../../../../hoc/withAsyncState';
import { useFetchElementByIdQuery } from '../../../../store/apis/element.api';

type ElementDetailsProps = {
  id: string;
};

export const ElementDetails = ({ id }: ElementDetailsProps) => {
  const { data, isLoading, isError } = useFetchElementByIdQuery(id);

  const DetailsJSX = React.useMemo(
    () => (
      <div className="details-container">
        <div className="details-column">
          <div className="details-item">
            <span className="details-label">ELEMENT NAME</span>
            <span className="details-name">{data?.data?.name}</span>
          </div>
          <div className="details-item">
            <span className="details-label">ELEMENT CATEGORY</span>
            <span className="details-name">{data?.data?.categoryId}</span>
          </div>
          <div className="details-item">
            <span className="details-label">DESCRIPTION</span>
            <span className="details-name">{data?.data?.description}</span>
          </div>
          <div className="details-item">
            <span className="details-label">EFFECTIVE START DATE</span>
            <span className="details-name">{data?.data?.effectiveStartDate}</span>
          </div>
          <div className="details-item">
            <span className="details-label">PROCESSING TYPE</span>
            <span className="details-name">{data?.data?.processingType}</span>
          </div>
          <div className="details-item">
            <span className="details-label">PAY MONTHS</span>
            <span className="details-name">{data?.data?.selectedMonths.join(', ')}</span>
          </div>
          <div className="details-item">
            <span className="details-label">STATUS</span>
            <span className="details-name">{data?.data?.status}</span>
          </div>
        </div>

        <div className="details-column">
          <div className="details-item">
            <span className="details-label">ELEMENT CLASSIFICATION</span>
            <span className="details-name">{data?.data?.classificationId}</span>
          </div>
          <div className="details-item">
            <span className="details-label">PAYRUN</span>
            <span className="details-name">{data?.data?.payFrequency}</span>
          </div>
          <div className="details-item">
            <span className="details-label">REPORTING NAME</span>
            <span className="details-name">{data?.data?.reportingName}</span>
          </div>
          <div className="details-item">
            <span className="details-label">EFFECTIVE END DATE</span>
            <span className="details-name">{data?.data?.effectiveEndDate}</span>
          </div>
          <div className="details-item">
            <span className="details-label">PAY FREQUENCY</span>
            <span className="details-name">{data?.data?.payFrequency}</span>
          </div>
          <div className="details-item">
            <span className="details-label">PRORATE</span>
            <span className="details-name">{data?.data?.prorate}</span>
          </div>
          <div className="details-item" />
        </div>
      </div>
    ),
    [data?.data],
  );

  const ElementDetailsWithErrorAndLoading = withAsyncState(DetailsJSX, isLoading, isError);

  return <ElementDetailsWithErrorAndLoading />;
};
