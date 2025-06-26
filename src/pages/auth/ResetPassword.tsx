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
            duration: 2.5,
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
            openNotification('Success, Password has been reset. You can now log in.', false);

            setTimeout(() => {
                navigate('/login');
            }, 3400);
        } catch (error: any) {
            openNotification('Error', error || 'Failed to reset password.');
            console.log(error.message)
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
                {/* <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                        { required: true, message: 'Enter a new password' },
                        { min: 8, message: 'Password must be at least 8 characters' },
                    ]}
                >
                    <Input.Password />
                </Form.Item> */}

                <Form.Item
                    style={{ marginBottom: '12px' }}
                    label="New Password"
                    name="newPassword"
                    rules={[
                        { required: true, message: 'Please input your password.' },
                        {
                        validator: async (_, value) => {
                            if (!value) return Promise.resolve();

                            const errors = [];

                            if (value.length < 8) errors.push('at least 8 characters');
                            if (!/[A-Z]/.test(value)) errors.push('an uppercase letter');
                            if (!/[a-z]/.test(value)) errors.push('a lowercase letter');
                            if (!/[0-9]/.test(value)) errors.push('a number');
                            if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) errors.push('a special character');

                            if (errors.length) {
                            return Promise.reject(new Error(`Password must contain ${errors.join(', ')}`));
                            }
                            return Promise.resolve();
                        },
                        },
                    ]}
                    >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: '12px' }}
                    label="Confirm Password"
                    name="confirm"
                    dependencies={['newPassword']}
                    rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match!'));
                        },
                    }),
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
