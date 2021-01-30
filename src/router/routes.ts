import {
  createRoute as createRouteOrigin,
  Route,
  Empty,
  RouteRender,
  Queryable,
} from 'utils/router/core';
import {hotseatRender} from './routeRenders';

type AppRouteSettings = null;
export type AppRoute<P extends string | Empty, QP extends unknown> = Route<AppRouteSettings, P, QP>;
const createRoute = <P extends string | Empty, QP extends unknown>(
  pattern: string,
  routeRender: [Queryable<string | Empty, QP>, RouteRender<P, QP>],
  settings: AppRouteSettings = null
): AppRoute<P, QP> => createRouteOrigin(pattern, routeRender, settings);

export const hotseat = createRoute('/hotseat', hotseatRender);
