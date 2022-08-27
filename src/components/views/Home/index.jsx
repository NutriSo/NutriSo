import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { Row, message, Input } from 'antd';

import apiURL from '@/axios/axiosConfig';
import Routes from '@/routes/routes';
import UserCard from '@/components/commons/UserCard/UserCard';
import Loading from '@/components/commons/Loading';
import { isEmptyString } from '@/utils';

import './index.scss';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [fullData, setFullData] = useState(false);
    const [loading, setLoading] = useState(true);

    const { token } = useSelector((state) => state.authorizationStore);
    const history = useHistory();

    useEffect(() => {
        getUsers();
        return () => {
            setUsers([]);
            setFullData([]);
            setLoading(true);
        };
    }, []);

    const getUsers = async () => {
        try {
            if (token && token !== '') {
                const { data } = await apiURL.get('/informacionUsuarios');

                setUsers(data);
                setFullData(data);
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

    const onChange = (e) => {
        const { value } = e.target;

        if (isEmptyString(value)) {
            setUsers(fullData);
            return;
        }

        const normalizedValue = value.toLowerCase().trim();

        const filteredUsers = fullData.filter((user) => {
            const normalizedName = user.nombre.toLowerCase().trim();
            const normalizedLastName1 = user.apellidoPaterno.toLowerCase().trim();
            const normalizedLastName2 = user.apellidoMaterno.toLowerCase().trim();

            const normalizedFullName = `${normalizedName} ${normalizedLastName1} ${normalizedLastName2}`;

            const matchPercentage = normalizedFullName.includes(normalizedValue);

            return matchPercentage;
        });

        setUsers(filteredUsers);
    };

    return (
        <div className='users-container'>
            {loading && <Loading size={50} variant='none' />}
            <div className='title-container'>
                <h2>Usuarios registrados</h2>
                <div className='searchSection'>
                    <Input
                        allowClear
                        onChange={onChange}
                        placeholder='Ingresa el nombre del usuario a buscar'
                        size='large'
                    />
                </div>
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
