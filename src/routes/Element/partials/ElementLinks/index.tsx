import React from 'react';

import { ElementLinksToolBar } from '../ElementLinksToolBar';
import { ElementLinksTable } from '../ElementLinksTable';

type ElementLinksProps = {
  elementId: string;
};

export const ElementLinks = ({ elementId }: ElementLinksProps) => (
  <div>
    <ElementLinksToolBar />
    <div className="mt-30">
      <ElementLinksTable elementId={elementId} />
    </div>
  </div>
);
