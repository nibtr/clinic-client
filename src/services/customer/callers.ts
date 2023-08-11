import { request } from '@umijs/max';
import { MAKE_APPOINTMENT_REQUESTS, GET_CATEGORIES } from './paths';


export const makeAppointment = async (appointment: TMakeAppointmentRequest) => {
  return request(MAKE_APPOINTMENT_REQUESTS, {
    method: 'POST',
    data: {
      ...appointment,
    },
  });
};


export const getCategories = async () => {
  return request(GET_CATEGORIES, {
    method: 'GET',
  });
}
