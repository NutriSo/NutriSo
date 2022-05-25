import React from 'react';

import { Form, Row, Input, Button, message } from 'antd';

import apiURL from '../../../../axios/axiosConfig';

import '../Login.scss';

const SignIn = ({ loading, setLoading }) => {
    const [ form ] = Form.useForm();

    const onRegister = async (data) => {
        try {
            setLoading(true);

            const response = await apiURL.post('/usuarios/register', data);
            console.log('res', response);
            setLoading(false);
        } catch (error) {
            const msg = error.response.data.message;
            message.error(
                `${msg ??
                `Ocurrió un error, intente más tarde [${error.message}]`
                }`
            );
            setLoading(false);
        }
    };

    return (
        <Form form={form} onFinish={onRegister} requiredMark='optional'>
            <Row gutter={(0, 10)} className='form'>
                {/* <Form.Item
                    name='nombre'
                    label='Name'
                    className='form__item'
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your name.',
                        },
                    ]}>
                    <Input placeholder='Name' />
                </Form.Item> */}
                <Form.Item
                    name='email'
                    label='Email'
                    className='form__item'
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your email address.',
                        },
                    ]}>
                    <Input placeholder='Email' />
                </Form.Item>
                <Form.Item
                    name='contrasena'
                    label='Contraseña'
                    className='form__item'
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your password.',
                        },
                    ]}>
                    <Input.Password
                        placeholder='Password'
                        type='password'
                        visibilityToggle
                    />
                </Form.Item>
                <Button type='primary' htmlType='submit' loading={loading}>
                    Sign In
                </Button>
            </Row>
        </Form>
    );
};

export default SignIn;
