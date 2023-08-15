import { LoginRequest } from '../../services/login/services'; // Import the useLogin hook from services.ts

const useLogin = () => {
    const { mutate, isLoading, isSuccess} = LoginRequest(); 
    const onFinish = (values: TLoginRequest) => {
        console.log('Received values of form: ', values);
        mutate(values);
    };

    if(isSuccess){
        window.location.reload();
    }

    return {
        onFinish,
        isLoading
    }
}

export default useLogin;