import React, {FC} from 'react';
import * as routesWithRenders from './routeRenders';
import {AppRouteRenderContext} from './routeRenders';
import {matchRoute, useLocation} from 'utils/router';
import NotFoundPage from 'components/pages/NotFoundPage';
import * as routes from './routes';
import {useSelector} from 'utils/redux';
import AuthPage from 'components/pages/AuthPage';

if (process.env.NODE_ENV !== 'production') {
  const allRoutesWithRenders = Object.values(routesWithRenders).map(x => x.pattern);
  for (const r in routes) {
    const pattern = routes[r as keyof typeof routes].pattern;
    if (!allRoutesWithRenders.includes(pattern)) {
      throw new Error(`route without render: [${r}] ${pattern}`);
    }
  }
}

const renderCurrentRoute = (context: AppRouteRenderContext, pathname: string, search: string) => {
  for (const r of Object.values(routesWithRenders)) {
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
