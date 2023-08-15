import { STAFF_ROLE, ADMIN_ROLE, DENTIST_ROLE } from './constants/auth';
import { errorConfig } from './requestErrorConfig';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export async function getInitialState() {
  // const token = getKey(keyLocalStorage.TOKEN);
  // let role: string = STAFF_ROLE;
  // let username: string = 'namhoai';
  // if (token) {
  //   role = getKey(keyLocalStorage.ROLE) as string;
  //   currentUser.username = getKey(keyLocalStorage.USERNAME);
  // }

  const token = localStorage.getItem('token');
  let role, username;

  if (token) {
    role = localStorage.getItem('type');
    username = localStorage.getItem('username');

    if (role === 'ADM') {
      role = ADMIN_ROLE;
      history.push('/admin');
    } else if (role === 'DEN') {
      role = DENTIST_ROLE;
      history.push('/dentist');
    } else {
      role = STAFF_ROLE;
      history.push('/staff');
    }
  }

  return {
    username,
    role,
  };
}

export const request = {
  ...errorConfig,
};
