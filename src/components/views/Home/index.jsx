import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import apiURL from '../../../axios/axiosConfig';
import Routes from '../../../routes/routes';

import { useSelector } from 'react-redux';
import { Row, message } from 'antd';

import UserCard from '../../commons/UserCard/UserCard';
import Loading from '../../commons/Loading';

import './index.scss';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const { token } = useSelector((state) => state.authorizationStore);
    const history = useHistory();

    useEffect(() => {
        getUsers();
        return () => {
            setUsers([]);
            setLoading(true);
        };
    }, []);

    const getUsers = async () => {
        try {
            if (token && token !== '') {
                const { data } = await apiURL.get('/informacionUsuarios');

                setUsers(data);
                setLoading(false);
            } else {
                message.info('Refresque la página para obtener los usuarios');
            }
        } catch (error) {
            setLoading(false);
            console.groupCollapsed('[Home.js] getUsers()');
            console.error(error);
            console.groupEnd();
        }
    };

    const handleNavigate = (user) => {
        const toNavigate = `${Routes.UsersDetails}/${user.usuario}`;

        history.push(toNavigate);
    };

    return (
        <div className='users-container'>
            {loading && <Loading size={50} variant='none' />}
            <div className='title-container'>
                <h2>Usuarios registrados</h2>
            </div>
            <div>
                <Row gutter={[16, 16]} className='usercard-container'>
                    {users.map(
                        (user) =>
                            user.nombre &&
                            !user.nombre.includes('- Selecione una opción -') && (
                                <div key={user.id} onClick={() => handleNavigate(user)}>
                                    <UserCard user={user} />
                                </div>
                            )
                    )}
                </Row>
            </div>
        </div>
    );
};

export default Home;
