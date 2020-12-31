import {createRoute as createRouteOrigin, Route, Empty, RouteRender} from 'utils/router/core';
import {AppRouteRenderContext} from './routeRenders';
import {hotseatRender} from './routeRenders';

export type AppRouteSettings = null;
export type AppRoute<P extends string | Empty = Empty, Q extends string | Empty = Empty> = Route<
  AppRouteSettings,
  AppRouteRenderContext,
  P,
  Q
>;

const createRoute = <P extends string | Empty = Empty, Q extends string | Empty = Empty>(
  pattern: string,
  render: RouteRender<AppRouteRenderContext, P, Q>,
  settings: AppRouteSettings = null
): AppRoute<P, Q> => createRouteOrigin(pattern, render, settings);

export const hotseat = createRoute('/hotseat', hotseatRender);
