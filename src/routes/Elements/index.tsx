import React from 'react';
import { ToolBar } from './partials/ToolBar';
import { ElementsTableWithAsyncState } from './partials/ElementsTable';

const Elements = () => (
  <div className="Elements">
    <h1 className="main-heading mb-30">Elements</h1>
    <div className="mb-30">
      <ToolBar />
    </div>
    <div>
      <ElementsTableWithAsyncState />
    </div>
  </div>
);

export default Elements;
