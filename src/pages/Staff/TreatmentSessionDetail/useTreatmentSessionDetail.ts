import { useGetTreatmentSessionDetail } from '@/services/staff/services';
import { useParams } from '@umijs/max';

const getData = (id: number) => {
  const { data, isLoading } = useGetTreatmentSessionDetail(id);
  return {
    detail: data?.data,
    isLoading,
  };
};

const useTreatmentSessionDetail = () => {
  const { id } = useParams();
  const { detail, isLoading } = getData(Number(id));
  console.log(detail);
  return {
    detail,
    isLoading,
  };
};

export default useTreatmentSessionDetail;
