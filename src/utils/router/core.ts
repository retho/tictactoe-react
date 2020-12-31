const empty = Symbol('empty');
export type Empty = typeof empty;

export type Query<Q extends string | Empty> = Record<Q, null | string[]>;

export type Route<
  S extends unknown,
  C extends unknown,
  P extends string | Empty,
  Q extends string | Empty
> = {
  pattern: string;
  render: RouteRender<C, P, Q>;
  settings: S;
};
export type RouteRender<C extends unknown, P extends string | Empty, Q extends string | Empty> = (
  params: Record<P, string>,
  query: Query<Q>,
  context: C
) => JSX.Element;

export const createRouteRender = <
  C extends unknown,
  P extends string | Empty = Empty,
  Q extends string | Empty = Empty
>(
  render: RouteRender<C, P, Q>
): RouteRender<C, P, Q> => render;
export const createRoute = <
  S extends unknown,
  C extends unknown,
  P extends string | Empty = Empty,
  Q extends string | Empty = Empty
>(
  pattern: string,
  render: RouteRender<C, P, Q>,
  settings: S
): Route<S, C, P, Q> => ({pattern, render, settings});
