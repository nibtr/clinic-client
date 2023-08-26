import { STAFF_PATIENT_PATH } from '@/constants/internalLink';
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

  return {
    detail,
    isLoading,
    isPatientRoute: location.pathname.includes(STAFF_PATIENT_PATH),
  };
};

export default useTreatmentSessionDetail;
