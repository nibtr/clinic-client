import { useQuery } from 'react-query';
import { getStaffs } from './callers';

export const getKeyAdmin = {
  staffs: ['STAFFS'],
};

export const useGetStaffs = (limit: number, page: number) => {
  return useQuery<TTemplateResponse<TGetStaffsResponse>, Error>({
    queryKey: [...getKeyAdmin.staffs, page],
    queryFn: () => getStaffs(limit, page),
  });
};
