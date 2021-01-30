import {
  createRoute as createRouteOrigin,
  Route,
  Empty,
  RouteRender,
  Queryable,
} from 'utils/router/core';
import {hotseatRender} from './routeRenders';

export type AppRouteSettings = null;
export type AppRoute<
  P extends string | Empty,
  Q extends string | Empty,
  QP extends unknown
> = Route<AppRouteSettings, P, Q, QP>;

const createRoute = <P extends string | Empty, Q extends string | Empty, QP extends unknown>(
  pattern: string,
  routeRender: [Queryable<Q, QP>, RouteRender<P, QP>],
  settings: AppRouteSettings = null
): AppRoute<P, Q, QP> => createRouteOrigin(pattern, routeRender, settings);

export const hotseat = createRoute('/hotseat', hotseatRender);
