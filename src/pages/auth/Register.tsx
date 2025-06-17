import { useState } from 'react';
import { notification, type FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { GoogleCircleFilled, FacebookFilled } from '@ant-design/icons';

type RegisterFieldType = {
    username?: string;
    email?: string;
    password?: string;
    confirm?: string;
};

export default function Register() {
    const [api, contextHolder] = notification.useNotification();
    // const [notificationTitle, setNotificationTitle] = useState('');
    const [loadings, setLoadings] = useState<boolean[]>([]);

    const openNotification = (title: string, pauseOnHover: boolean) => {
        api.open({
            message: title,
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            showProgress: true,
            // icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            pauseOnHover,
        })
    }

    const onFinish: FormProps<RegisterFieldType>['onFinish'] = (values) => {
        console.log('Registration Success:', values);
        // setNotificationTitle('Successfully Registered!');
        enterLoading(0, 'Successfully Registered!');
        // continue with registration
    };

    const onFinishFailed: FormProps<RegisterFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Registration Failed:', errorInfo);
        // setNotificationTitle('Registration Failed - Check Fields');
        enterLoading(0, 'Registration Failed - Check Fields');
    };

    const enterLoading = (index: number, title: string) => {
        setLoadings((prev) => {
            const newLoadings = [...prev];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prev) => {
                const newLoadings = [...prev];
                newLoadings[index] = false;
                return newLoadings;
            });

            openNotification(title, true);
        }, 3000);
    };

    const handleGoogleRegister = () => {
        alert('Signing up with Google...');
    };

    const handleFacebookRegister = () => {
        alert('Signing up with Facebook...');
    };

    return (
        <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}
        >
        {contextHolder}

        {/* <img src="https://voidzero.dev/logo.svg" alt="company logo" width={100} /> */}
        <h1>Register</h1>

        <Form
            name="register"
            layout="vertical"
            style={{
                width: '400px',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
        >
            <Form.Item<RegisterFieldType>
                style={{ marginBottom: '12px' }}
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<RegisterFieldType>
                style={{ marginBottom: '12px' }}
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Enter a valid email address' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<RegisterFieldType>
                style={{ marginBottom: '12px' }}
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<RegisterFieldType>
                style={{ marginBottom: '12px' }}
                label="Confirm Password"
                name="confirm"
                dependencies={['password']}
                rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match!'));
                    },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item style={{ marginBottom: '12px' }}>
                <Button
                    color="default"
                    variant='solid'
                    htmlType="submit"
                    loading={loadings[0]}
                    style={{ width: '100%' }}
                >
                    Register
                </Button>
            </Form.Item>

            <Form.Item style={{ marginBottom: '12px' }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '10px'
                    }}
                >
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#d9d9d9' }} />
                    <span style={{ whiteSpace: 'nowrap', color: '#999' }}>or</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#d9d9d9' }} />
                </div>
            </Form.Item>

            <Form.Item>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Button
                    style={{ backgroundColor: '#db4437', color: 'white', width: '100%' }}
                    icon={<GoogleCircleFilled />}
                    onClick={handleGoogleRegister}
                    >
                    Google
                    </Button>
                    <Button
                    style={{ backgroundColor: '#3b5998', color: 'white', width: '100%' }}
                    icon={<FacebookFilled />}
                    onClick={handleFacebookRegister}
                    >
                    Facebook
                    </Button>
                </div>
            </Form.Item>
        </Form>

        <div>
            <span>Already have an account? </span>
            <a href="/login">Log in</a>
        </div>
        </div>
    );
}
