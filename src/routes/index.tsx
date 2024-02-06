import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
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
          <ErrorBoundary fallback={<p>An error occured!</p>}>
            <Suspense fallback={<Spin />}>
              <Elements />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path=":elementId"
        element={
          <ErrorBoundary fallback={<p>An error occured!</p>}>
            <Suspense fallback={<Spin />}>
              <ElementDetails />
            </Suspense>
          </ErrorBoundary>
        }
      />
    </Route>
  </Routes>
);

export default Router;
