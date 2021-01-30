import React, {FC} from 'react';
import {matchRoute, useLocation} from 'utils/router';
import NotFoundPage from 'components/pages/NotFoundPage';
import * as routes from './routes';
import {useSelector} from 'utils/redux';
import AuthPage from 'components/pages/AuthPage';
import {Empty, Route} from 'utils/router/core';

const renderCurrentRoute = (pathname: string, search: string) => {
  for (const r of Object.values(routes)) {
    const matched = matchRoute(
      r as Route<unknown, string | Empty, string | Empty, unknown>,
      pathname,
      search
    );
    if (matched) {
      const [params, query] = matched;
      const queryPayload = r.queryableInstance.fromQuery(query);
      return r.render(params, queryPayload);
    }
  }
  return <NotFoundPage />;
};

const Router: FC = () => {
  const location = useLocation();
  const token = useSelector(state => state.auth.token);
  if (!token) return <AuthPage />;
  return renderCurrentRoute(location.pathname, location.search);
};

export default Router;
