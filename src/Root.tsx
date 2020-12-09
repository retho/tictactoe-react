import React, {FC} from 'react';
// eslint-disable-next-line no-restricted-imports
import {Router as ReactRouter} from 'react-router-dom';
import {history} from 'router/history';
import Router from 'router';
// eslint-disable-next-line no-restricted-imports
import {Provider} from 'react-redux';
import store from 'store';

const Root: FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ReactRouter history={history}>
        <Router />
      </ReactRouter>
    </Provider>
  </React.StrictMode>
);
export default Root;
