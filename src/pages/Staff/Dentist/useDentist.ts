import { LIMIT_PER_PAGE } from '@/constants/dataQuery';
import { useGetDentists } from '@/services/staff/services';
import { getParams } from '@/utils/routing';
import { useLocation, useNavigate } from '@umijs/max';
import { useState } from 'react';

type TData = {
    listDentist: TPersonnel[];
    total: number;
    isLoading: boolean;
};

const getData = (page: number): TData => {
    const { data, isLoading } = useGetDentists(LIMIT_PER_PAGE, page - 1, '', '');
    return {
        listDentist: data?.data.list || [],
        total: data?.data.total || 0,
        isLoading,
    };
};

const useDentist = () => {
    let pageParam = getParams('page') || '1';
    const location = useLocation();
    const navigate = useNavigate();
    const [page, setPage] = useState(Number(pageParam));

    const { listDentist, total, isLoading } = getData(page);

    const changePage = (page: number) => {
        setPage(page);
        navigate(location.pathname + '?page=' + page);
    };

    return {
        listDentist,
        total,
        isLoading,
        page: Number(page),
        changePage,
    };
};

export default useDentist;
