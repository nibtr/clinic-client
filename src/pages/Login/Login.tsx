import { Button, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { QueryClient, QueryClientProvider } from 'react-query';
import logo from '../../../src/assets/images/logo-1.png';
import './Login.less';
import useLogin from './useLogin';


const queryClient = new QueryClient();

function LoginRequest() {
  const { onFinish } = useLogin();
  return (
    <main className='login-wrapper'>
      <div className="login_page">
        <div className="login_container">
          <div className="login_banner">
            <div className="login_image">
              <img src={logo} alt="Logo" />
            </div>
          </div>
          <div className="login_form">
            <div className="login_form_title">
              <h2>Login</h2>
            </div>
            <Form
              className="form-container"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  autoComplete='off'
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  autoComplete="on"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className='check-title'>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                <div>Or <a href="">register now!</a></div>
              </Form.Item>
            </Form>

          </div>
        </div>
      </div>
    </main>
  );
}

function Login() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginRequest />
    </QueryClientProvider>
  );
}

export default Login;
