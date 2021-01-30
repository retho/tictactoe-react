import React, {FC} from 'react';
import {matchRoute, parseQuery, useLocation} from 'utils/router';
import NotFoundPage from 'components/pages/NotFoundPage';
import * as routes from './routes';
import {AppRoute} from './routes';
import {useSelector} from 'utils/redux';
import AuthPage from 'components/pages/AuthPage';
import {Empty, Query} from 'utils/router/core';

const findCurrentRoute = (pathname: string, query: Query<string | Empty>) => {
  for (const r of Object.values(routes)) {
    const route = r as AppRoute<string | Empty, unknown>;
    const matched = matchRoute(route, pathname, query);
    if (matched) {
      const [params, queryPayload] = matched;
      return route.render(params, queryPayload);
    }
  }
  return null;
};

const useCurrentRoute = () => {
  const location = useLocation();

  const token = useSelector(state => state.auth.token);
  if (!token) return <AuthPage />;

  const query = parseQuery(location.search);
  const currentRoute = findCurrentRoute(location.pathname, query);

  return currentRoute || <NotFoundPage />;
};

const Router: FC = () => {
  const jsx = useCurrentRoute();
  return jsx;
};

export default Router;
