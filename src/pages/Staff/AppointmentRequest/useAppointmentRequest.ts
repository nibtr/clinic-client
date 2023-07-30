import { LIMIT_PER_PAGE } from '@/constants/dataQuery';
import { useGetAppointmentRequests } from '@/services/staff/services';
import { getParams } from '@/utils/routing';
import { useLocation, useNavigate } from '@umijs/max';
import { useState } from 'react';

const getData = (page: number, isToday: boolean) => {
  const { data, isLoading } = useGetAppointmentRequests(LIMIT_PER_PAGE, page - 1, isToday);
  return {
    list: data?.data?.list || [],
    total: data?.data?.total || 0,
    isLoading,
  };
};

const useAppointmentRequest = () => {
  let pageParam = getParams('page') || '1';
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(Number(pageParam));
  const [isToday, setIsToday] = useState(false);

  const { list, total, isLoading } = getData(page, isToday);

  const changePage = (page: number) => {
    setPage(page);
    navigate(location.pathname + '?page=' + page);
  };

  const changeIsToday = () => {
    setIsToday(!isToday);
  };

  return {
    list,
    total,
    isLoading,
    page: Number(page),
    changePage,
    isToday,
    changeIsToday,
  };
};

export default useAppointmentRequest;
