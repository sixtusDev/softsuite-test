import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import AppLayout from '../components/shareds/AppLayout';

const About = lazy(() => import('./About'));
const Elements = lazy(() => import('./Elements'));

const Router: FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route
      path="about"
      element={
        <Suspense fallback={<Spin />}>
          <About />
        </Suspense>
      }
    />
    <Route
      path="elements"
      element={
        <AppLayout>
          <Suspense fallback={<Spin />}>
            <Elements />
          </Suspense>
        </AppLayout>
      }
    />
  </Routes>
);

export default Router;
