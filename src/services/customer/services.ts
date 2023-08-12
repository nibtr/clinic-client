import { message } from 'antd';
import { useQuery, useMutation } from 'react-query';
import { makeAppointment, getCategories } from './callers';


export const getAppointmentKey = {
  appointment: ['MAKE_APPOINTMENT'],
};

export const postAppointmentKey = {
  appointment: getAppointmentKey.appointment,
};

export const getCategoriesKey = {
  categories: ['GET_CATEGORIES'],
};

export const useMakeAppointment = () => {
  return useMutation<TTemplateResponse<TAppointmentRequest>, Error, TMakeAppointmentRequest>({
    mutationFn: (data: TMakeAppointmentRequest) => makeAppointment(data),
    mutationKey: postAppointmentKey.appointment,
    onSuccess: () => {
      message.success('Create appointment successfully');
    },

    onError: () => {
      message.error('Create appointment failed');
    },
  }

  );
};



export const useGetCategories = () => {
  return useQuery<TTemplateResponse<TListResponse<TCategory[]>>, Error>({
    queryKey: [...getCategoriesKey.categories],
    queryFn: () => getCategories(),
  });
}

