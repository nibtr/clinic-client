import { useLocation } from '@umijs/max';

export const getParams = (param: string) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  return params.get(param);
};
