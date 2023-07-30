import { LIMIT_PER_PAGE } from '@/constants/dataQuery';
import { useGetStaffs } from '@/services/admin/services';
import { getParams } from '@/utils/routing';
import { useLocation, useNavigate } from '@umijs/max';
import { useState } from 'react';

type TData = {
  listStaff: TPersonnel[];
  total: number;
  isLoading: boolean;
};

const getData = (page: number): TData => {
  const { data, isLoading } = useGetStaffs(LIMIT_PER_PAGE, page - 1);
  return {
    listStaff: data?.data.list || [],
    total: data?.data.total || 0,
    isLoading,
  };
};

const useStaff = () => {
  let pageParam = getParams('page') || '1';
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(Number(pageParam));

  const { listStaff, total, isLoading } = getData(page);

  const changePage = (page: number) => {
    setPage(page);
    navigate(location.pathname + '?page=' + page);
  };

  return {
    listStaff,
    total,
    isLoading,
    page: Number(page),
    changePage,
  };
};

export default useStaff;
