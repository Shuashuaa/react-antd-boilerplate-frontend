// import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'
// import { Button, Input } from 'antd';
// import { GoogleCircleFilled, FacebookFilled } from '@ant-design/icons';

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <div 
//           style={{ 
//             display: 'flex', 
//             flexDirection: 'column',
//             justifyContent: 'center', 
//             alignItems: 'center',
//             height: '100vh' 
//           }}
//         >
//           <div 
//             style={{ 
//               display: 'flex', 
//               flexDirection: 'column',
//               justifyContent: 'center',
//             }}
//           >
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
//               <Input type="text" placeholder='username' style={{ padding: '10px' }}/>
//               <Input type="text" placeholder='password' style={{ padding: '10px' }}/>
//               <Button color='blue' variant='solid' style={{ padding: '18px' }}>LOGIN</Button>
//             </div>

//             <p style={{ textAlign: 'center' }}>or</p>

//             <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
//               <Button color="red" variant="solid" style={{ padding: '20px' }}>
//                 <GoogleCircleFilled style={{ fontSize: '24px' }}/>
//                 Sign up with Google!
//               </Button>
//               <Button color="blue" variant="solid" style={{ padding: '20px' }}>
//                 <FacebookFilled style={{ fontSize: '24px' }}/>
//                 Sign up with Facebook!
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a> */}
//       </div>
//       {/* <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p> */}
//     </>
//   )
// }

// export default App


import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const App: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType> 
      name="remember" 
      valuePropName="checked" 
      label={null}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default App;