type ReplyErrorApi = {
  kind: 'api';
  status: number;
  headers: Headers;
  data: unknown;
};
type ReplyErrorUnauthorized = {kind: 'unauthorized'};
type ReplyErrorUnknown = {kind: 'unknown'; err: unknown};
type ReplyError = ReplyErrorApi | ReplyErrorUnauthorized | ReplyErrorUnknown;
type ReplySuccess<D> = {
  kind: 'success';
  status: number;
  headers: Headers;
  data: D;
};
type Reply<D> = ReplySuccess<D> | ReplyError;

export type RequestParams<D> = {
  res2data: (res: Response) => Promise<D>;
  path: string;
  config?: RequestInit;
};
export const request = <D>(params: RequestParams<D>): Promise<Reply<D>> => {
  const {path, res2data, config} = params;
  return fetch(path, config)
    .then(
      async (res): Promise<Reply<D>> => {
        if (res.ok) {
          const data = await res2data(res);
          return {
            kind: 'success',
            status: res.status,
            headers: res.headers,
            data,
          };
        }
        if (res.status === 401) {
          return {kind: 'unauthorized'};
        }
        const data = await res
          .clone()
          .json()
          .catch(() => res.clone().text());
        return {
          kind: 'api',
          status: res.status,
          headers: res.headers,
          data,
        };
      }
    )
    .catch(
      (err): Reply<D> => {
        return {
          kind: 'unknown',
          err,
        };
      }
    );
};
