import { request } from '@umijs/max';
import { MAKE_APPOINTMENT_REQUESTS, GET_CATEGORIES } from './paths';

export const makeAppointment = async (name: string, phone: string, appointmentTime: string, requestTime: string, category: string, note: string) => {
  return request(MAKE_APPOINTMENT_REQUESTS, {
    method: 'POST',
    data: {
      name,
      phone,
      appointmentTime,
      requestTime,
      category,
      note,
    },
  });
};


export const getCategories = async () => {
  return request(GET_CATEGORIES, {
    method: 'GET',
  });
}
