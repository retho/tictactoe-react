import React from 'react';
import {Empty, RouteRender, createRouteRender as createRouteRenderOrigin} from 'utils/router/core';
import HotseatPage from 'components/pages/HotseatPage';

export type AppRouteRenderContext = null;
const createRouteRender = <P extends string | Empty = Empty, Q extends string | Empty = Empty>(
  render: RouteRender<AppRouteRenderContext, P, Q>
): RouteRender<AppRouteRenderContext, P, Q> => createRouteRenderOrigin(render);

export const hotseatRender = createRouteRender(() => <HotseatPage />);
