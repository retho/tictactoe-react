import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
// eslint-disable-next-line no-restricted-imports
import {Router as ReactRouter} from 'react-router-dom';
import {history} from 'router/history';
import Router from 'router';

ReactDOM.render(
  <React.StrictMode>
    <ReactRouter history={history}>
      <Router />
    </ReactRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
