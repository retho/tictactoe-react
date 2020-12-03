const empty = Symbol('empty');
export type Empty = typeof empty;

export type Query<Q extends string | Empty> = Record<Q, null | string[]>;

/* eslint-disable @typescript-eslint/no-unused-vars */
export type Route<
  S extends Record<string, unknown>,
  P extends string | Empty = Empty,
  Q extends string | Empty = Empty
> = S & {
  pattern: string;
};
/* eslint-enable @typescript-eslint/no-unused-vars */
export type RouteRender<
  C extends unknown,
  P extends string | Empty = Empty,
  Q extends string | Empty = Empty
> = (params: Record<P, string>, query: Query<Q>, context: C) => JSX.Element;
export type RouteWithRender<
  S extends Record<string, unknown>,
  C extends unknown,
  P extends string | Empty = Empty,
  Q extends string | Empty = Empty
> = Route<S, P, Q> & {render: RouteRender<C, P, Q>};

export const createRoute = <
  S extends Record<string, unknown>,
  P extends string | Empty = Empty,
  Q extends string | Empty = Empty
>(
  pattern: string,
  settings: S
): Route<S, P, Q> => ({...settings, pattern});
export const withRender = <
  S extends Record<string, unknown>,
  C extends unknown,
  P extends string | Empty = Empty,
  Q extends string | Empty = Empty
>(
  route: Route<S, P, Q>,
  render: RouteRender<C, P, Q>
): RouteWithRender<S, C, P, Q> => ({...route, render});
