import { LoginRequest } from '../../services/login/services'; // Import the useLogin hook from services.ts

const useLogin = () => {
    const { mutate, isLoading, isSuccess } = LoginRequest();
    const onFinish = (values: TLoginRequest) => {
        mutate(values);
    };

    return {
        onFinish,
        isLoading
    }
}

export default useLogin;