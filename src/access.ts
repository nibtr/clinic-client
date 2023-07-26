import { ADMIN_ROLE, DENTIST_ROLE, STAFF_ROLE } from './constants/auth';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: any) {
  const { role } = initialState;
  return {
    dentistRoute: () => role === DENTIST_ROLE,
    staffRoute: () => role === STAFF_ROLE,
    adminRoute: () => role === ADMIN_ROLE,
  };
}
