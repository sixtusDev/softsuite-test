import React from 'react';
import { useParams } from 'react-router-dom';

import { ElementDetails } from './partials/ElementDetails';
import { ElementLinks } from './partials/ElementLinks';

const Element = () => {
  const { elementId } = useParams();

  return (
    <div>
      <h1 className="main-heading mb-30">Element Details</h1>
      <ElementDetails id={elementId!} />
      <div className="mt-100">
        <ElementLinks elementId={elementId!} />
      </div>
    </div>
  );
};

export default Element;
