import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ForgatePassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        // Simulate sending reset email
        setTimeout(() => {
            message.success('Reset instructions sent to your email!');
            setLoading(false);
            navigate('/verify-code');
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div  className="py-10 md:py-28 mx-2 md:mx-0 px-6 md:px-10 rounded-2xl w-[580px] h-[525px] bg-[#79DEF8] bg-opacity-25 border-2 border-[#eef6ff] mt-10">
                <h2 className="mb-6 text-2xl font-bold text-center">Forgot Password</h2>
                <p className="mb-8 text-center text-gray-600">
                    Enter your email address to receive password reset instructions
                </p>

                <Form
                    name="forgotPassword"
                    onFinish={onFinish}
                    layout="vertical"
                       
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input
                            placeholder="Enter your email"
                            className="py-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </Form.Item>

                    <Form.Item>
                       <div className='text-center'>
                       <button
                            type="submit"
                            className=" bg-[#52B5D1] text-white p-2 rounded-lg"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Code'}
                        </button>
                       </div>
                    </Form.Item>

                    <p className="text-center text-gray-600">
                        Remember your password?{' '}
                        <button
                            type="button"
                            className="text-primary hover:underline"
                            onClick={() => navigate('/sign-in')}
                        >
                            Sign In
                        </button>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default ForgatePassword;