import { useQuery } from 'react-query';
import { makeAppointment, getCategories } from './callers';

export const makeAppointmentKey = {
  appointmentRequest: ['MAKE_APPOINTMENT'],
};

export const getCategoriesKey = {
  categories: ['GET_CATEGORIES'],
};

export const useMakeAppointment = (name: string, phone: string, appointmentTime: string, requestTime: string, category: string, note: string) => {
  return useQuery<TTemplateResponse<TMakeAppointmentRequest>, Error>({
    queryKey: [...makeAppointmentKey.appointmentRequest, name, phone, appointmentTime, requestTime, category, note],
    queryFn: () => makeAppointment(name, phone, appointmentTime, requestTime, category, note),
  });
}

export const useGetCategories = () => {
  return useQuery<TTemplateResponse<TListResponse<TCategory[]>>, Error>({
    queryKey: [...getCategoriesKey.categories],
    queryFn: () => getCategories(),
  });
}


