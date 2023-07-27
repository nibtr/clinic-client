import { STAFF_ROLE } from './constants/auth';
import { errorConfig } from './requestErrorConfig';

export async function getInitialState() {
  // const token = getKey(keyLocalStorage.TOKEN);
  let role: string = STAFF_ROLE;
  let username: string = 'namhoai';
  // if (token) {
  //   role = getKey(keyLocalStorage.ROLE) as string;
  //   currentUser.username = getKey(keyLocalStorage.USERNAME);
  // }
  return {
    username,
    role,
  };
}

export const request = {
  ...errorConfig,
};
