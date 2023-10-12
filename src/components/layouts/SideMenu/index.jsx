import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { Menu } from 'antd';
import {
    HomeOutlined,
    LogoutOutlined,
    SwapOutlined,
    CoffeeOutlined,
    CloudUploadOutlined,
    ScheduleOutlined,
    CloudDownloadOutlined,
    TrophyOutlined,
    YoutubeOutlined,
    SettingOutlined,
    GoldOutlined,
    OrderedListOutlined,
} from '@ant-design/icons';

import { signOutAction } from '@/redux/actions/authorizationAction';
import Routes from '@/routes/routes';

import './SideMenu.scss';

const SideMenu = () => {
    const [onHover, setOnHover] = useState(true);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleHistory = (route) => {
        history.replace(route);
    };

    const handleHover = () => {
        setOnHover(!onHover);
    };

    const logOut = () => {
        dispatch(signOutAction());
        history.replace(Routes.Login);
    };

    return (
        <Menu
            className={`sideMenuContainer${!onHover ? '-open' : ''}`}
            onMouseLeave={handleHover}
            onMouseEnter={handleHover}
            inlineCollapsed={onHover}
            mode='inline'
            defaultSelectedKeys={[Routes.Principal]}>
            <Menu.Item
                key={Routes.Principal}
                icon={<HomeOutlined />}
                onClick={() => handleHistory(Routes.Principal)}>
                Inicio
            </Menu.Item>
            <Menu.Item
                key={Routes.Alimentos}
                icon={<CoffeeOutlined />}
                onClick={() => handleHistory(Routes.Alimentos)}>
                Alimentos
            </Menu.Item>
            {/* <Menu.Item
                key={Routes.Recordatorios}
                icon={<ScheduleOutlined />}
                onClick={() => handleHistory(Routes.Recordatorios)}>
                Recordatorios
            </Menu.Item> */}
            <Menu.Item
                key={Routes.Menus}
                icon={<OrderedListOutlined />}
                onClick={() => handleHistory(Routes.Menus)}>
                Crear menus
            </Menu.Item>
            <Menu.Item
                key={Routes.AssignMenus}
                icon={<ScheduleOutlined />}
                onClick={() => handleHistory(Routes.AssignMenus)}>
                Asignar Menu
            </Menu.Item>
            <Menu.Item
                key={Routes.Metas}
                icon={<TrophyOutlined />}
                onClick={() => handleHistory(Routes.Metas)}>
                Metas
            </Menu.Item>
            <Menu.Item
                key={Routes.Equivalencias}
                icon={<SwapOutlined />}
                onClick={() => handleHistory(Routes.Equivalencias)}>
                Exportar equivalencias
            </Menu.Item>
            <Menu.Item
                key={`${Routes.Imports}/${Routes.ImportarEquivalencias}`}
                icon={<CloudUploadOutlined />}
                onClick={() =>
                    handleHistory(
                        `${Routes.Imports}${Routes.ImportarEquivalencias}`
                    )
                }>
                Importar equivalencias
            </Menu.Item>
            <Menu.Item
                key={`${Routes.Imports}/${Routes.Alimentos}`}
                icon={<CloudUploadOutlined />}
                onClick={() =>
                    handleHistory(`${Routes.Imports}${Routes.Alimentos}`)
                }>
                Importar alimentos
            </Menu.Item>
            <Menu.Item
                key={Routes.Imports}
                icon={<CloudUploadOutlined />}
                onClick={() => handleHistory(Routes.Imports)}>
                Puntajes por alimento
            </Menu.Item>
            <Menu.Item
                key={Routes.Exports}
                icon={<CloudDownloadOutlined />}
                onClick={() => handleHistory(Routes.Exports)}>
                Exportaciones
            </Menu.Item>
            <Menu.Item
                key={Routes.Recetas}
                icon={<YoutubeOutlined />}
                onClick={() => handleHistory(Routes.Recetas)}>
                Recetas
            </Menu.Item>
            <Menu.Item
                key={Routes.Admistracion}
                icon={<SettingOutlined />}
                onClick={() => handleHistory(Routes.Administracion)}>
                Administracion
            </Menu.Item>
            <Menu.Item
                key={Routes.Puntos}
                icon={<GoldOutlined />}
                onClick={() => handleHistory(Routes.Puntos)}>
                Puntos de usuario
            </Menu.Item>
            <Menu.Item
                key={'LogIn'}
                className='exit'
                icon={<LogoutOutlined />}
                onClick={logOut}>
                Cerrar sesion
            </Menu.Item>
        </Menu>
    );
};

export default SideMenu;
