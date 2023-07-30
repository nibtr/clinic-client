import { request } from '@umijs/max';
import { GET_APPOINTMENT_REQUESTS } from './paths';

export const getAppointmentRequests = async (limit: number, page: number, today: boolean) => {
  return request(GET_APPOINTMENT_REQUESTS, {
    method: 'GET',
    params: {
      page,
      limit,
      today,
    },
  });
};
