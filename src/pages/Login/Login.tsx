import { Button, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../../src/assets/images/logo-1.png';
import ClientProviderLayout from '../../components/ClientProvider';
import './Login.less';
import useLogin from './useLogin';


function LoginUI() {
  const { onFinish, isLoading } = useLogin();
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
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  autoComplete="on"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} className="login-form-button">
                  Log in
                </Button>
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
    <ClientProviderLayout>
      <LoginUI />
    </ClientProviderLayout>
  );
}

export default Login;
