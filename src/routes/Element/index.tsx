import React from 'react';
import { useParams } from 'react-router-dom';

import { ElementDetailsWithAsyncState } from './partials/ElementDetails';

const Element = () => {
  const { elementId } = useParams();

  return (
    <div>
      <h1 className="main-heading mb-30">Element Details</h1>
      <ElementDetailsWithAsyncState id={elementId} />
    </div>
  );
};

export default Element;
