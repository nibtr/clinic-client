import { getParams } from '@/utils/routing';
import { useLocation, useNavigate } from '@umijs/max';
import { useState } from 'react';

const useSessionList = (getData: TGetData) => {
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

  const navigateToDetail = (id: number) => {
    navigate(location.pathname + '/' + id + location.search);
  };

  return {
    list,
    total,
    isLoading,
    page: Number(page),
    isToday,
    changePage,
    changeIsToday,
    navigateToDetail,
  };
};

export default useSessionList;
