import {
  createRoute as createRouteOrigin,
  Route,
  Empty,
  RouteRender,
  Queryable,
} from 'utils/router/core';
import {AppRouteRenderContext} from './routeRenders';
import {hotseatRender} from './routeRenders';

export type AppRouteSettings = null;
export type AppRoute<
  P extends string | Empty,
  Q extends string | Empty,
  QD extends unknown
> = Route<AppRouteSettings, AppRouteRenderContext, P, Q, QD>;

const createRoute = <P extends string | Empty, Q extends string | Empty, QD extends unknown>(
  pattern: string,
  routeRender: [Queryable<Q, QD>, RouteRender<AppRouteRenderContext, P, QD>],
  settings: AppRouteSettings = null
): AppRoute<P, Q, QD> => createRouteOrigin(pattern, routeRender, settings);

export const hotseat = createRoute('/hotseat', hotseatRender);
