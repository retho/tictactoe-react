import {useMemo} from 'react';
import {Route, Empty, Query} from './core';
import UrlPattern from 'url-pattern';
import {stringify as qsStringifyQuery, parse as qsParse} from 'query-string';
import {mapValues, pickBy, identity, isEmpty} from 'lodash-es';
// eslint-disable-next-line no-restricted-imports
import {
  matchPath,
  useHistory as useHistoryOrigin,
  Redirect,
  useLocation as useLocationOrigin,
} from 'react-router-dom';
import {History} from 'history';

const arrayFormat = 'bracket' as const;

export {Redirect};

export const stringifyQuery = qsStringifyQuery;
export const stringifyRoute = <P extends string | Empty, QP extends unknown>(
  route: Route<unknown, P, QP>,
  params: Record<P, string>,
  queryPayload: QP
): string => {
  const pattern = new UrlPattern(route.pattern);
  const query = route.queryableInstance.toQuery(queryPayload);
  return (
    pattern.stringify(params && mapValues(params, encodeURIComponent)) +
    (isEmpty(query)
      ? ''
      : `?${stringifyQuery(
          mapValues(pickBy<null | string[]>(query, identity), x =>
            x && x.length === 1 ? x[0] : x
          ),
          {arrayFormat}
        )}`)
  );
};

export const matchRoute = <P extends string | Empty, QP>(
  route: Route<unknown, P, QP>,
  pathname: string,
  query: Query<string | Empty>
): null | [Record<P, string>, QP] => {
  const matched: {params: Record<P, string>} | null = matchPath(pathname, {
    path: route.pattern,
    exact: true,
  });

  if (!matched) return null;

  const params = mapValues(matched.params, decodeURIComponent);
  const queryPayload = route.queryableInstance.fromQuery(query);

  return [params, queryPayload];
};

export const parseQuery = (search: string): Query<string | Empty> => {
  const query = mapValues(
    qsParse(search, {
      parseBooleans: false,
      parseNumbers: false,
      arrayFormat,
    }),
    x => (Array.isArray(x) ? x : x ? [x] : []).map(decodeURIComponent)
  );

  return query as Query<string | Empty>;
};

export const useHistory = (): History<unknown> => {
  const history = useHistoryOrigin();
  return useMemo(() => {
    return {
      ...history,
      push: (path: string) => history.push(encodeURI(path)),
      replace: (path: string) => history.replace(encodeURI(path)),
    };
  }, []);
};

export const useLocation = (): Location => {
  useLocationOrigin();
  return window.location;
};
