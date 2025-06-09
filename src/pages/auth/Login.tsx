import { useState, useEffect } from 'react';
import { notification, type FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { GoogleCircleFilled, FacebookFilled } from '@ant-design/icons';
import { signIn } from 'aws-amplify/auth';
import { useNavigate } from 'react-router';
import { getCurrentUser } from 'aws-amplify/auth';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const handleGoogleLogin = () => {
    alert('Logging in with Google...');
};

const handleFacebookLogin = () => {
    alert('Logging in with Facebook...');
};

export default function Login(){

    const navigate = useNavigate();
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const checkUser = async () => {
            try {
                await getCurrentUser();
                navigate('/'); // Already logged in
            } catch {
                // Not logged in — do nothing
            }
        };
        checkUser();
    }, [navigate]);

    const openNotification = (title: string, pauseOnHover: boolean) => {
        api.open({
            message: title,
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            showProgress: true,
            // icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            pauseOnHover,
        })
    }

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { username, password } = values;

        enterLoading(0, true);
        try {
            const user = await signIn({ username: username!, password: password! });

            console.log('Login success:', user);
            openNotification('Successfully Logged In!', true);
            navigate('/');
        } catch (error: any) {
            console.error('Login error:', error);
            openNotification(error.message || 'Failed to log in', true);
        } finally {
            enterLoading(0, false);
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
 
        const allErrors = errorInfo.errorFields
            .flatMap(field => field.errors)
            .join('\n'); 

        openNotification(`Failed to log in: ${allErrors}`, true);
    };

    const enterLoading = (index: number, state: boolean) => {
        setLoadings((prev) => {
            const newLoadings = [...prev];
            newLoadings[index] = state;
            return newLoadings;
        });
    };

    return (
        <>
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

                {/* <img src="https://voidzero.dev/logo.svg" 
                    alt="company icon - admin portal" 
                    width={100}
                /> */}

                <h1>Login</h1>

                <Form
                    name="basic"
                    layout='vertical'
                    //   labelCol={{ span: 8 }}
                    //   wrapperCol={{ span: 16 }}
                    style={{ width: '400px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >
                    <Form.Item<FieldType>
                        style={{ marginBottom: '12px' }}
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        style={{ marginBottom: '12px' }}
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType> 
                        style={{ marginBottom: '12px' }}
                        name="remember" 
                        valuePropName="checked" 
                        label={null}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item 
                        label={null}
                        style={{ marginBottom: '12px' }}
                    >
                        <Button color="default" variant="solid" htmlType="submit" loading={loadings[0]} style={{ width: '100%' }}>
                        Login
                        </Button>
                    </Form.Item>

                    <Form.Item 
                        label={null}
                        style={{ marginBottom: '12px' }}
                    >
                        <div
                            style={{
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                            gap: '10px',
                            }}
                        >
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#d9d9d9' }} />
                                <span style={{ whiteSpace: 'nowrap', color: '#999' }}>or</span>
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#d9d9d9' }} />
                        </div>
                    </Form.Item>

                    <Form.Item 
                        label={null}
                        style={{ marginBottom: '12px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <Button
                            style={{ backgroundColor: '#db4437', color: 'white', width: '100%' }}
                            icon={<GoogleCircleFilled />}
                            onClick={handleGoogleLogin}
                        >
                            Google
                        </Button>
                        <Button
                            style={{ backgroundColor: '#3b5998', color: 'white', width: '100%' }}
                            icon={<FacebookFilled />}
                            onClick={handleFacebookLogin}
                        >
                            Facebook
                        </Button>
                        </div>
                    </Form.Item>
                </Form>
                <div style={{ marginTop: '12px' }}>
                    <span>Not registered yet? </span>
                    <a href="/register">Create an account</a>
                </div>
            </div>
        </>
    )
}