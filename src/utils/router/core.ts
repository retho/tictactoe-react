const empty = Symbol('empty');
export type Empty = typeof empty;

export type Query<Q extends string | Empty> = Record<Q, null | string[]>;

export type Queryable<Q extends string | Empty, D extends unknown> = {
  toQuery: (payload: D) => Query<Q>;
  fromQuery: (query: Query<Q>) => D;
};

export type Route<
  S extends unknown,
  C extends unknown,
  P extends string | Empty,
  Q extends string | Empty,
  QD extends unknown
> = {
  pattern: string;
  queryableInstance: Queryable<Q, QD>;
  render: RouteRender<C, P, QD>;
  settings: S;
};
export type RouteRender<C extends unknown, P extends string | Empty, QD extends unknown> = (
  params: Record<P, string>,
  queryPayload: QD,
  renderContext: C
) => JSX.Element;

export const createRouteRender = <
  C extends unknown,
  Q extends string | Empty,
  QD extends unknown,
  P extends string | Empty = Empty
>(
  queryableInstance: Queryable<Q, QD>,
  render: RouteRender<C, P, QD>
): [Queryable<Q, QD>, RouteRender<C, P, QD>] => [queryableInstance, render];
export const createRoute = <
  S extends unknown,
  C extends unknown,
  Q extends string | Empty,
  QD extends unknown,
  P extends string | Empty = Empty
>(
  pattern: string,
  [queryableInstance, render]: [Queryable<Q, QD>, RouteRender<C, P, QD>],
  settings: S
): Route<S, C, P, Q, QD> => ({pattern, queryableInstance, render, settings});
