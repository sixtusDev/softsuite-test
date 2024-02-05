import React from 'react';
import { ToolBar } from './partials/ToolBar';
import { ElementsTable } from './partials/ElementsTable';

const Elements = () => (
  <div className="Elements">
    <h1 className="main-heading mb-30">Elements</h1>
    <div className="mb-30">
      <ToolBar />
    </div>
    <div>
      <ElementsTable />
    </div>
  </div>
);

export default Elements;
