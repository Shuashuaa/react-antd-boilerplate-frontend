import { useState, useEffect } from 'react';
import { 
    notification,
    Button,
    Form,
    Input,
    type FormProps 
} from 'antd';
import { GoogleCircleFilled, FacebookFilled } from '@ant-design/icons';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import { useNavigate } from 'react-router';

type RegisterFieldType = {
  username?: string;
  email?: string;
  password?: string;
  confirm?: string;
};

export default function Register() {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [needsConfirmation, setNeedsConfirmation] = useState(false);
    const [usernameForConfirmation, setUsernameForConfirmation] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username-confirmation');
        if(storedUsername){
            setUsernameForConfirmation(storedUsername);
            setNeedsConfirmation(true);
            navigate(`/register/toConfirm=${storedUsername}`)
        }
    },[])

    const openNotification = (title: string, pauseOnHover: boolean) => {
        api.open({
            message: title,
            description: 'Please check your email or try again.',
            pauseOnHover,
        });
    };

    const onFinish: FormProps<RegisterFieldType>['onFinish'] = async (values) => {
        const { username, password, email } = values;

        enterLoading(0, true);
        try {
            const { isSignUpComplete } = await signUp({
                username: username!,
                password: password!,
                options: {
                    userAttributes: {
                        email: email!,
                    },
                    autoSignIn: true,
                },      
            });

            console.log('SignUp Success:', { isSignUpComplete });

            setUsernameForConfirmation(username!);
            setNeedsConfirmation(true);
            localStorage.setItem('username-confirmation', username!);
            openNotification('Verification code sent to your email!', true);
        } catch (error: any) {
            console.error('SignUp Error:', error);
            openNotification(error.message || 'Registration failed.', true);
        } finally {
            enterLoading(0, false);
        }
    };

    const onFinishFailed: FormProps<RegisterFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Registration Failed:', errorInfo);
        openNotification(`Registration Failed: ${errorInfo}` , true);
    };

    const enterLoading = (index: number, state: boolean) => {
        setLoadings((prev) => {
            const newLoadings = [...prev];
            newLoadings[index] = state;
            return newLoadings;
        });
    };

    const handleGoogleRegister = () => {
        alert('Signing up with Google...');
    };

    const handleFacebookRegister = () => {
        alert('Signing up with Facebook...');
    };

    const handleConfirmCode = async () => {
        try {
            await confirmSignUp({
                username: usernameForConfirmation,
                confirmationCode,
            });
            openNotification('Confirmation successful! You can now log in.', true);
            setNeedsConfirmation(false);
            localStorage.removeItem('username-confirmation');
            navigate('/');
            // openNotification('Hello!', true); hello username!
        } catch (err: any) {
            console.error('ConfirmSignUp Error:', err);
            openNotification(err.message || 'Confirmation failed.', true);
        }
    };

    return (
        <>
            {!needsConfirmation && (
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
                    <h1>Register</h1>

                    <Form
                        name="register"
                        layout="vertical"
                        style={{ width: '400px', backgroundColor: 'white' }}
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
                                    gap: '10px',
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
            )}

            {needsConfirmation && (
                <div 
                    style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems:'center',
                        height: '100vh'
                    }}
                >
                    <div style={{ width: 400 }}>
                        <h3>Enter Confirmation Code</h3>
                        <Input
                            placeholder="Enter the code sent to your email"
                            value={confirmationCode}
                            onChange={(e) => setConfirmationCode(e.target.value)}
                            style={{ marginBottom: 12 }}
                        />
                        <Button type="primary" onClick={handleConfirmCode} style={{ width: '100%' }}>
                            Confirm Account
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
