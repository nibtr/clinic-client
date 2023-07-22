import { DENTIST_ROLE, STAFF_ROLE } from './constants/auth';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser: TCurrentUser }) {
  const { currentUser } = initialState;
  console.log('access', currentUser.role);
  return {
    dentistRoute: () => currentUser && currentUser.role === DENTIST_ROLE,
    staffRoute: () => currentUser && currentUser.role === STAFF_ROLE,
  };
}
