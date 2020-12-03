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
export const stringifyRoute = <P extends string | Empty, Q extends string | Empty>(
  route: Route<Record<string, never>, P, Q>,
  params: Record<P, string>,
  query: Query<Q>
): string => {
  const pattern = new UrlPattern(route.pattern);
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

export const matchRoute = <P extends string | Empty, Q extends string | Empty>(
  route: Route<Record<string, unknown>, P, Q>,
  pathname: string,
  search: string
): null | [Record<P, string>, Query<Q>] => {
  const matched: {params: Record<P, string>} | null = matchPath(pathname, {
    path: route.pattern,
    exact: true,
  });

  if (!matched) return null;

  const params = mapValues(matched.params, decodeURIComponent);
  const query = (mapValues(
    qsParse(search, {
      parseBooleans: false,
      parseNumbers: false,
      arrayFormat,
    }),
    x => (Array.isArray(x) ? x : x ? [x] : []).map(decodeURIComponent)
  ) as unknown) as Query<Q>;
  return [params, query];
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
