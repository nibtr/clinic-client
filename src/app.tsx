import { history } from '@umijs/max';
import { ADMIN_ROLE, DENTIST_ROLE, STAFF_ROLE } from './constants/auth';
import { ADMIN_LINK, DENTIST_LINK, LOGIN_LINK, STAFF_LINK } from './constants/internalLink';
import { errorConfig } from './requestErrorConfig';
import { getKey, keyLocalStorage } from './utils/localStorage';

export async function getInitialState() {
  const token = getKey(keyLocalStorage.TOKEN);
  let role, username;

  if (token) {
    role = getKey(keyLocalStorage.ROLE);
    username = getKey(keyLocalStorage.USERNAME);
    switch (role) {
      case ADMIN_ROLE:
        history.push(ADMIN_LINK);
        break;
      case DENTIST_ROLE:
        history.push(DENTIST_LINK);
        break;
      case STAFF_ROLE:
        history.push(STAFF_LINK);
        break;
      default:
        history.push(LOGIN_LINK);
        break;
    }
  } else {
    history.push(LOGIN_LINK);
  }

  return {
    username,
    role,
  };
}

export const request = {
  ...errorConfig,
};
