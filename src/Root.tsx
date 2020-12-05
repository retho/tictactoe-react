import React, {FC} from 'react';
// eslint-disable-next-line no-restricted-imports
import {Router as ReactRouter} from 'react-router-dom';
import {history} from 'router/history';
import Router from 'router';

const Root: FC = () => (
  <React.StrictMode>
    <ReactRouter history={history}>
      <Router />
    </ReactRouter>
  </React.StrictMode>
);
export default Root;
