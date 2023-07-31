import { request } from '@umijs/max';
import { MAKE_APPOINTMENT_REQUESTS } from './paths';

export const makeAppointment = async (name: string, phone: number, appointmentTime: string, requestTime: string, note: string) => {
  return request(MAKE_APPOINTMENT_REQUESTS, {
    method: 'POST',
    data: {
      name,
      phone,
      appointmentTime,
      requestTime,
      note,
    },
  });
};
