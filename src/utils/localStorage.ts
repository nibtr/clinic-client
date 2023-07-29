export const keyLocalStorage = {
  TOKEN: 'token',
  ROLE: 'role',
  USERNAME: 'username',
};

export const setKey = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getKey = (key: string) => {
  return localStorage.getItem(key);
};

export const removeKey = (key: string) => {
  localStorage.removeItem(key);
};
