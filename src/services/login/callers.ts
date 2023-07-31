import { request } from '@umijs/max';
import { SIGN_IN } from './paths';

export const signIn = async (username: string, password: string) => {
    return request(SIGN_IN, {
        method: 'POST',
        data: {
            username,
            password,
        },
    });
}
