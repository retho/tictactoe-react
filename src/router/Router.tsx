import React, {FC} from 'react';
import * as routesWithRenders from './routeRenders';
import {AppRouteRenderContext} from './routeRenders';
import {matchRoute, useLocation} from 'utils/router';
import NotFoundPage from 'components/pages/NotFoundPage';

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
  return <>{renderCurrentRoute(null, location.pathname, location.search)}</>;
};

export default Router;
