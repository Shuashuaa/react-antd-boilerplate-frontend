import { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { resetPassword } from 'aws-amplify/auth';
import { useNavigate } from 'react-router';

type ForgotPasswordForm = {
  username: string;
};

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotification = (title: string, message: string) => {
    api.open({
      message: title,
      description: message,
    });
  };

  const onFinish = async (values: ForgotPasswordForm) => {

    setLoading(true);
    try {
      const { username } = values;
      await resetPassword({ username });
      openNotification('Reset code sent!', 'Check your email for the confirmation code.');
      localStorage.setItem('UserConfirmation', username!);
      navigate('/reset-password');
    } catch (error: any) {
      openNotification('Error', error.message || 'Failed to send reset code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 400, margin: '0 auto' }}>
      {contextHolder}
      <h2>Forgot Password</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Username or Email"
          name="username"
          rules={[{ required: true, message: 'Please enter your username or email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading} block>
            Send Reset Code
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
