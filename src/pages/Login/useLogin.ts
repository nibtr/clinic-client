import { LoginRequest } from '../../services/login/services'; // Import the useLogin hook from services.ts

const useLogin = () => {
    const { mutate } = LoginRequest(); 
    const onFinish = (values: TLoginRequest) => {
        console.log('Received values of form: ', values);
        mutate(values);
        // window.location.reload();
    };

    return {
        onFinish
    }
}

export default useLogin;