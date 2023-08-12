import { useMutation } from 'react-query';
import { signIn } from './callers';

export const getKeyLogin = {
    loginRequest: ['LOGIN'],
};

export const useLogin = () => {
    return useMutation<TTemplateResponse<TLoginResponse>, Error, TLoginRequest>({
        mutationFn: (data: TLoginRequest) => signIn(data),
        mutationKey: getKeyLogin.loginRequest,
    });
}

