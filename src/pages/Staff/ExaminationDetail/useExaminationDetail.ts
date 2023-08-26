import {
  useGetExaminationDetail,
  useGetReExaminationOfExamination,
} from '@/services/staff/services';
import { getSearching } from '@/utils/routing';
import { useParams } from '@umijs/max';

const getExaminationDetail = (id: number) => {
  const { data, isLoading } = useGetExaminationDetail(id);
  return {
    examination: data?.data || null,
    isLoading,
  };
};

const getReExList = (id: number) => {
  const { data, isLoading } = useGetReExaminationOfExamination(id);
  return {
    reExList: data?.data || [],
    reExListLoading: isLoading,
  };
};

const useExaminationDetail = () => {
  const { id } = useParams();
  const { examination, isLoading } = getExaminationDetail(Number(id));
  const { reExList, reExListLoading } = getReExList(Number(id));
  const searching = getSearching();

  return {
    searching,
    examination,
    isLoading,
    reExList,
    reExListLoading,
  };
};

export default useExaminationDetail;
