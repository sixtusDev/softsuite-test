import React from 'react';
import { ConfigProvider } from 'antd';
// import { Link } from 'react-router-dom';
import Router from './routes';

import './styles/main.scss';

// const App = () => (
//   <main>
//     <p>App Works!</p>
//     <ul>
//       <li>
//         <Link to="/">Home</Link>
//       </li>
//       <li>
//         <Link to="/about">About</Link>
//       </li>
//     </ul>
//     <Router />
//   </main>
// );

// export default App;

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
