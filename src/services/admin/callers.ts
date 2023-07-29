import { request } from '@umijs/max';
import { GET_STAFFS } from './paths';

export const getStaffs = async (limit: number, page: number) => {
  return request(GET_STAFFS, {
    method: 'GET',
    params: {
      page,
      limit,
    },
  });
};
