import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Routes, Route } from 'react-router-dom';

import AppLayout from '../components/shareds/AppLayout';

const Elements = lazy(() => import('./Elements'));
const ElementDetails = lazy(() => import('./Element'));

const Router: FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route
        index
        element={
          <Suspense fallback={<Spin />}>
            <Elements />
          </Suspense>
        }
      />
      <Route
        path=":elementId"
        element={
          <Suspense fallback={<Spin />}>
            <ElementDetails />
          </Suspense>
        }
      />
    </Route>
  </Routes>
);

export default Router;
