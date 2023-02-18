import { useState, useCallback } from "react";
import { AxiosPromise } from "axios";

type PromiseCreator<R> = (...params: any[]) => AxiosPromise<R>;

type UseRequestReturnType<R> = [
  (...args: any[]) => void,
  boolean,
  R | null,
  Error | null,
  any | null,
  () => void
];

export default function useRequest<R = any>(
  promiseCreator: PromiseCreator<R>
): UseRequestReturnType<R> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<any | null>(null);

  const onRequest = useCallback(
    async (...params: any[]) => {
      try {
        setLoading(true);
        const response = await promiseCreator(...params);
        setData(response.data);
        setStatus(response.status);
      } catch (e) {
        setError(e as any);
        setStatus(null);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [promiseCreator]
  );

  const onReset = () => {
    setLoading(false);
    setData(null);
    setError(null);
    setStatus(null);
  };

  return [onRequest, loading, data, error, status, onReset];
}
