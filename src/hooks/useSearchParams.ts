import { useLocation, useNavigate } from 'react-router';
import { useMemo } from 'react';

export type HistoryParamValue = string | undefined | null;

export const pushUrlHistoryParamFn = (location: any, navigate: any, paramName: string | Array<string>) => (
  paramValue: HistoryParamValue
) => {
  const params = new URLSearchParams(location.search);
  if (paramName instanceof Array) {
    if (!paramValue) {
      // eslint-disable-next-line no-restricted-syntax
      for (const name of paramName) params.delete(name);
    }
  } else if (paramValue) {
    params.set(paramName, paramValue);
  } else {
    params.delete(paramName);
  }
  navigate({ search: params.toString() ? `?${params.toString()}` : '' });
};

export const useSearchParams = (
  ...paramNames: Array<string>
): { [paramName: string]: { value?: string; setValue: (paramValue?: string
  ) => void } } => {
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = location;

  return useMemo(() => {
    const urlParams = new URLSearchParams(search);
    return paramNames.reduce(
      (res, paramName) => ({
        ...res,
        [paramName]: {
          value: urlParams.get(paramName) || undefined,
          setValue: pushUrlHistoryParamFn(location, navigate, paramName),
        },
      }),
      {}
    );
  }, [location, paramNames, search]);
};
