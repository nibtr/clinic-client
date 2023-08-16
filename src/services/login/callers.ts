import { request } from '@umijs/max';
import { SIGN_IN } from './paths';

export const signIn = async (account: TLoginRequest) => {
    return request(SIGN_IN, {
        method: 'POST',
        data: {
           ...account,
        },
    });
}
