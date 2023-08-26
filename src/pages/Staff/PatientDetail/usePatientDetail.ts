import { STAFF_TREATMENT_SESSION_PATH } from '@/constants/internalLink';
import { useGetPatientDetail } from '@/services/staff/services';
import { getSearching } from '@/utils/routing';
import { useLocation, useNavigate, useParams } from '@umijs/max';

const getData = (id: string | undefined) => {
  if (!id) {
    return {
      detail: undefined,
      isLoading: false,
    };
  }

  const { data, isLoading } = useGetPatientDetail(Number(id));

  return {
    detail: data?.data,
    isLoading,
  };
};

const usePatientDetail = () => {
  const searching = getSearching();
  const { id } = useParams();
  const { detail, isLoading } = getData(id);
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToTreatmentSession = (id: number) => {
    navigate(`${location.pathname}${STAFF_TREATMENT_SESSION_PATH}/${id}${location.search}`);
  };

  return {
    searching,
    detail,
    isLoading,
    navigateToTreatmentSession,
  };
};

export default usePatientDetail;
