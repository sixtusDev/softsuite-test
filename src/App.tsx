import React from 'react';
import { ConfigProvider } from 'antd';
import Router from './routes';

import './styles/main.scss';

const App = () => (
  <ConfigProvider
    theme={{
      components: {
        Menu: {
          colorItemBgSelected: '#4BAA79',
          colorItemTextSelected: '#fff',
          colorItemText: '#818DA9',
          colorItemBgHover: '#d1e0e2',
        },
      },
    }}
  >
    <Router />
  </ConfigProvider>
);

export default App;
