import React, {FC} from 'react';
import {AppRouteRenderContext} from './routeRenders';
import {matchRoute, useLocation} from 'utils/router';
import NotFoundPage from 'components/pages/NotFoundPage';
import * as routes from './routes';
import {useSelector} from 'utils/redux';
import AuthPage from 'components/pages/AuthPage';

const renderCurrentRoute = (context: AppRouteRenderContext, pathname: string, search: string) => {
  for (const r of Object.values(routes)) {
    const matched = matchRoute(r, pathname, search);
    if (matched) {
      const [params, query] = matched;
      return r.render(params, query, context);
    }
  }
  return <NotFoundPage />;
};

const Router: FC = () => {
  const location = useLocation();
  const token = useSelector(state => state.auth.token);
  if (!token) return <AuthPage />;
  return renderCurrentRoute(null, location.pathname, location.search);
};

export default Router;
