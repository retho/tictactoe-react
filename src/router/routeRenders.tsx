import React from 'react';
import {
  Empty,
  Route,
  RouteRender,
  RouteWithRender,
  withRender as withRenderOrigin,
} from 'utils/router/core';
import {app} from './routes';
import AppPage from 'components/pages/AppPage';

export type AppRouteRenderContext = null;
const withRender = <
  S extends Record<string, unknown>,
  P extends string | Empty = Empty,
  Q extends string | Empty = Empty
>(
  route: Route<S, P, Q>,
  render: RouteRender<AppRouteRenderContext, P, Q>
): RouteWithRender<S, AppRouteRenderContext, P, Q> => withRenderOrigin(route, render);

export const appRender = withRender(app, () => <AppPage />);
