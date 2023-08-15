import { LIMIT_PER_PAGE } from '@/constants/dataQuery';
import { useGetPatients } from '@/services/staff/services';
import { getParams } from '@/utils/routing';
import { useLocation, useNavigate } from '@umijs/max';
import { useState } from 'react';

type TData = {
    listPatient: TPersonnel[];
    total: number;
    isLoading: boolean;
};

const getData = (page: number): TData => {
    //   const [name, setName] = useState<string>('');
    const { data, isLoading } = useGetPatients(LIMIT_PER_PAGE, page - 1, '');
    console.log('data', data);
    return {
        listPatient: data?.data.list || [],
        total: data?.data.total || 0,
        isLoading,
    };
};

const usePatient = () => {
    let pageParam = getParams('page') || '1';
    const location = useLocation();
    const navigate = useNavigate();
    const [page, setPage] = useState(Number(pageParam));

    const { listPatient, total, isLoading } = getData(page);

    const changePage = (page: number) => {
        setPage(page);
        navigate(location.pathname + '?page=' + page);
    };

    return {
        listPatient,
        total,
        isLoading,
        page: Number(page),
        changePage,
    };
};

export default usePatient;
