import React from 'react';
import {
  Empty,
  RouteRender,
  createRouteRender as createRouteRenderOrigin,
  Queryable,
} from 'utils/router/core';
import HotseatPage from 'components/pages/HotseatPage';

export type AppRouteRenderContext = null;
const createRouteRender = <
  QD extends unknown,
  Q extends string | Empty,
  P extends string | Empty = Empty
>(
  queryableInstance: Queryable<Q, QD>,
  render: RouteRender<AppRouteRenderContext, P, QD>
): [Queryable<Q, QD>, RouteRender<AppRouteRenderContext, P, QD>] =>
  createRouteRenderOrigin(queryableInstance, render);

const instance: Queryable<'aaa', null | string> = {
  fromQuery: q => q.aaa?.[0] || null,
  toQuery: d => ({aaa: d == null ? null : [d]}),
};
export const hotseatRender = createRouteRender(instance, () => <HotseatPage />);
