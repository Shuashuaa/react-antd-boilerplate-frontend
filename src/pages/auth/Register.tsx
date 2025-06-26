import { useState, useEffect } from 'react';
import { 
    notification,
    Button,
    Form,
    Input,
    type FormProps 
} from 'antd';
// import { GoogleCircleFilled, FacebookFilled } from '@ant-design/icons';
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
        const storedUsername = localStorage.getItem('UserConfirmation');
        if(storedUsername){
            setUsernameForConfirmation(storedUsername);
            setNeedsConfirmation(true);
            openNotification('Verification Successful!','You can now log in.', true);
            navigate(`/register/toConfirm=${storedUsername}`)
        }
    },[])

    const openNotification = (title: string, description: string, pauseOnHover: boolean) => {
        api.open({
            message: title,
            description: description,
            showProgress: true,
            duration: 3,
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
            localStorage.setItem('UserConfirmation', username!);
            openNotification('Verification code sent!', 'Verification code sent to your email!', true);
        } catch (error: any) {
            console.error('SignUp Error:', error);

            if (error.name === 'InvalidPasswordException') {
                openNotification(
                'Password does not meet requirements',
                (
                    <ul>
                    <li>Minimum 8 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one lowercase letter</li>
                    <li>At least one number</li>
                    <li>At least one special character (!@#$%^&* etc.)</li>
                    </ul>
                ) as unknown as string,
                true
                );
            } else {
                openNotification('Registration failed.', error.message, true);
            }
        } finally {
            enterLoading(0, false);
        }
    };

    const onFinishFailed: FormProps<RegisterFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Registration Failed:', errorInfo);
        openNotification('Registration Failed', `${errorInfo}`, true);
    };

    const enterLoading = (index: number, state: boolean) => {
        setLoadings((prev) => {
            const newLoadings = [...prev];
            newLoadings[index] = state;
            return newLoadings;
        });
    };

    // const handleGoogleRegister = () => {
    //     alert('Signing up with Google...');
    // };

    // const handleFacebookRegister = () => {
    //     alert('Signing up with Facebook...');
    // };

    const handleConfirmCode = async () => {
        try {
            await confirmSignUp({
                username: usernameForConfirmation,
                confirmationCode,
            });
            
            openNotification('Confirmation successful!','You can now log in.', false);
            setTimeout(() => {
                localStorage.removeItem('UserConfirmation');
                navigate('/login');
                setNeedsConfirmation(false);
            }, 3000);
        } catch (err: any) {
            console.error('ConfirmSignUp Error:', err);
            openNotification('Confirmation failed.', err.message, true);
        }
    };

    return (
        <>
            {contextHolder}

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

                        {/* <Form.Item<RegisterFieldType>
                            style={{ marginBottom: '12px' }}
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item> */}

                        <Form.Item<RegisterFieldType>
                            style={{ marginBottom: '12px' }}
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
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

                        {/* <Form.Item style={{ marginBottom: '12px' }}>
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
                        </Form.Item> */}
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
