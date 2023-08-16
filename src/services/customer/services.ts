import { message } from 'antd';
import { useQuery, useMutation } from 'react-query';
import { makeAppointment, getCategories } from './callers';



export const postAppointmentKey = {
  appointmentRequest: ['APPOINTMENT_REQUEST'],
};

export const getCategoriesKey = {
  categories: ['CATEGORIES'],
};

export const useMakeAppointment = () => {
  return useMutation<TTemplateResponse<TAppointmentRequest>, Error, TMakeAppointmentRequest>({
    mutationFn: (data: TMakeAppointmentRequest) => makeAppointment(data),
    mutationKey: postAppointmentKey.appointmentRequest,
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
  return useQuery<TTemplateResponse<TCategory[]>, Error>({
    queryKey: getCategoriesKey.categories,   
    queryFn: () => getCategories(),
  });
}


