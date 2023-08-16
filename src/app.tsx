import { STAFF_ROLE, ADMIN_ROLE, DENTIST_ROLE } from './constants/auth';
import { errorConfig } from './requestErrorConfig';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export async function getInitialState() {

  const token = localStorage.getItem('token');
  let role, username;

  if (token) {
    role = localStorage.getItem('type');
    username = localStorage.getItem('username');

    if (role === 'ADM') {
      role = ADMIN_ROLE;
      history.push('/' + ADMIN_ROLE);
    } else if (role === 'DEN') {
      role = DENTIST_ROLE;
      history.push('/' + DENTIST_ROLE);
    } else {
      role = STAFF_ROLE;
      history.push('/' + STAFF_ROLE);
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
