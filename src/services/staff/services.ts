import { useQuery } from 'react-query';
import { getAppointmentRequests } from './callers';

export const getKeyStaff = {
  appointmentRequest: ['APPOINTMENT_REQUEST'],
};

export const useGetAppointmentRequests = (limit: number, page: number, today: boolean) => {
  return useQuery<TTemplateResponse<TListResponse<TAppointmentRequest[]>>, Error>({
    queryKey: [...getKeyStaff.appointmentRequest, page, today],
    queryFn: () => getAppointmentRequests(limit, page, today),
  });
};
