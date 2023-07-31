import { useQuery } from 'react-query';
import { signIn } from './callers';

export const getKeyLogin = {
    loginRequest: ['LOGIN'],
};

export const useLogin = (username: string, password: string) => {
    return useQuery<TTemplateResponse<TLoginResponse>, Error>({
        queryKey: [...getKeyLogin.loginRequest, username, password],
        queryFn: () => signIn(username, password),
    });
}

