import React from 'react';

import { ElementLinksToolBar } from '../ElementLinksToolBar';
import { ElementLinksTable } from '../ElementLinksTable';

type ElementLinksProps = {
  elementId: string;
};

export const ElementLinks = ({ elementId }: ElementLinksProps) => (
  <div>
    <h1 className="main-heading mb-30">Element Links</h1>
    <ElementLinksToolBar elementId={elementId} />
    <div className="mt-30">
      <ElementLinksTable elementId={elementId} />
    </div>
  </div>
);
