import { keyLocalStorage, setKey } from '@/utils/localStorage';
import { message } from 'antd';
import { useMutation } from 'react-query';
import { signIn } from './callers';

export const getKeyLogin = {
  loginRequest: ['LOGIN'],
};

export const LoginRequest = () => {
  return useMutation<TTemplateResponse<TLoginResponse>, Error, TLoginRequest>({
    mutationFn: (data: TLoginRequest) => signIn(data),
    mutationKey: getKeyLogin.loginRequest,
    onSuccess: (data) => {
      setKey(keyLocalStorage.TOKEN, data.data.token);
      setKey(keyLocalStorage.USERNAME, data.data.username);
      setKey(keyLocalStorage.ROLE, data.data.type);
      window.location.reload();
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
