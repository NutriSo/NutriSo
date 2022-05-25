import dayjs from 'dayjs';
import {
    PhoneOutlined,
    ManOutlined,
    WomanOutlined,
    ContactsOutlined,
    PushpinOutlined,
    GlobalOutlined,
} from '@ant-design/icons';

import { getCurrentAge } from '../../../utils';

import './User-card.scss';
const standardAvatar = 'https://res.cloudinary.com/dwjv6orjf/image/upload/v1618875313/standard_avatar_txfgx5.png';

const UserCard = ({ user }) => {
    const isPhotoExist = user?.foto && user.foto !== '';
    const formattedBirthday = dayjs(user.fechaDeNacimiento).format('DD/MM/YYYY');
    const userName = `${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`;
    const age = getCurrentAge(user.fechaDeNacimiento);

    return (
        <div className='user-card' key={user.id}>
            <div className='profile-img-name'>
                <div className='fondo-img' />
                <div className='hoyito'></div>

                <div className='profile-img'>
                    <img src={isPhotoExist ? user.foto : standardAvatar} alt='userProfile' />
                </div>
                <div className='person-name'>
                    <h2>{userName}</h2>
                </div>
                <div className='contact-info'>
                    <div className='celular'>
                        <p className='info-text'>
                            <PhoneOutlined />
                            &nbsp;
                            {user.celular}
                        </p>
                    </div>
                    <div className='cumple'>
                        <p className='info-text'>
                            <ContactsOutlined />
                            &nbsp;
                            {formattedBirthday}
                            <br />
                            {age}
                        </p>
                    </div>
                    <div className='city'>
                        <p className='info-text'>
                            <PushpinOutlined />
                            &nbsp;
                            {user.ciudadDeResidencia}
                        </p>
                    </div>
                    <div className='genero'>
                        <p className='info-text'>
                            {user.genero == 'hombre' || user.genero == 'Hombre' ? <ManOutlined /> : <WomanOutlined />}
                            &nbsp;
                            {user.genero}
                        </p>
                    </div>
                    <div className='pais'>
                        <p className='info-text'>
                            <GlobalOutlined />
                            &nbsp;
                            {user.paisDeNacimiento}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
