import { useMutation } from 'react-query';
import { signIn } from './callers';
import { message } from 'antd';

export const getKeyLogin = {
    loginRequest: ['LOGIN'],
};

export const LoginRequest = () => {
    return useMutation<TTemplateResponse<TLoginResponse>, Error, TLoginRequest>({
        mutationFn: (data: TLoginRequest) => signIn(data),
        mutationKey: getKeyLogin.loginRequest,
        onSuccess: (data) => {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('username', data.data.username);
            localStorage.setItem('type', data.data.type);
            window.location.reload();
        },
        onError: (error) => {
            message.error(error.message);
        }
    });
}

