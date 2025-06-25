import { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { confirmResetPassword } from 'aws-amplify/auth';
import { useNavigate } from 'react-router';

type ResetPasswordForm = {
    code: string;
    newPassword: string;
};

export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [usernameForConfirmation, setUsernameForConfirmation] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('UserConfirmation');
        if (storedUsername) {
            setUsernameForConfirmation(storedUsername);
        } else {
            openNotification('Missing username. Please initiate password reset again.', true);
            navigate('/forgot-password');
        }
    }, []);

    const openNotification = (title: string, pauseOnHover: boolean) => {
        api.open({
            message: title,
            description: 'Error, This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            showProgress: true,
            // icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            pauseOnHover,
        })
    }

    const onFinish = async (values: ResetPasswordForm) => {
        setLoading(true);
        try {
            const { code, newPassword } = values;
            await confirmResetPassword({
                username: usernameForConfirmation,
                confirmationCode: code,
                newPassword,
            });

            localStorage.removeItem('UserConfirmation');
            openNotification('Success, Password has been reset. You can now log in.', true);

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error: any) {
            openNotification('Error', error.message || 'Failed to reset password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 24, maxWidth: 400, margin: '0 auto' }}>
            {contextHolder}
            <h2>Reset Password</h2>
            <p>
                Resetting password for: <strong>{usernameForConfirmation}</strong>
            </p>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Confirmation Code"
                    name="code"
                    rules={[{ required: true, message: 'Enter the code sent to your email' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                        { required: true, message: 'Enter a new password' },
                        { min: 8, message: 'Password must be at least 8 characters' },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" loading={loading} block>
                        Reset Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
