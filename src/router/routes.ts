import {createRoute as createRouteOrigin, Route, Empty} from 'utils/router/core';

export type AppRouteSettings = {
  setting1?: null;
};
export type AppRoute<P extends string | Empty = Empty, Q extends string | Empty = Empty> = Route<
  AppRouteSettings,
  P,
  Q
>;

const createRoute = <P extends string | Empty = Empty, Q extends string | Empty = Empty>(
  pattern: string
): AppRoute<P, Q> => createRouteOrigin(pattern, {});

export const hotseat = createRoute('/hotseat');
