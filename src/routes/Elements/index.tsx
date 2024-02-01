import React from 'react';
import { ToolBar } from './partials/ToolBar';
import { EmptyContent } from '../../components/shareds/EmptyContent';

const Elements = () => (
  <div style={{ minHeight: '612px' }}>
    <h2>Elements</h2>
    <ToolBar />
    <div style={{ height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <EmptyContent message="There are no elements to display" />
      </div>
    </div>
  </div>
);

export default Elements;
