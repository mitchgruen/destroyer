import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './app/store';
import { Provider } from 'react-redux';
import Router from './components/router';
import { ReactComponent as XIcon } from './assets/icons/xmark-sharp-regular.svg'

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
