import { useState } from 'react';
import { Tabs } from 'antd';

import LogIn from './LogIn';
import SignIn from './SignIn';

import './Login.scss';

const Login = () => {
    const [loading, setLoading] = useState(false);

    const { TabPane } = Tabs;

    return (
        <div className='loginContainer'>
            <LogIn
                    loading={loading}
                    setLoading={(value) => setLoading(value)}
                />
            {/*
            <Tabs defaultActiveKey='1' centered>                
                
                <TabPane tab='Log In' key='1' style={{ padding: '1rem' }}>

                </TabPane>
                
                {/* <TabPane tab='Sign In' key='2' style={{ padding: '1rem' }}>
                    <SignIn
                        loading={loading}
                        setLoading={(value) => setLoading(value)}
                    />
                </TabPane> Aqui cierra este comentario
            </Tabs>
            */}
        </div>
    );
};

export default Login;
