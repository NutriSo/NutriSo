import { Switch, Route, Redirect } from 'react-router-dom';

import SideMenu from '../components/layouts/SideMenu';
// Pages
import Equivalences from '../pages/equivalences';
import Home from '../pages/home';
import Food from '../pages/food';
import Alimentos from '../pages/alimentos';
import Reminders from '../pages/reminders';
import Ejercicios from '../pages/ejercicios';
import Metas from '../pages/metas';
import Imports from '../pages/imports';
import Exports from '../pages/exports';
import UsersDetails from '../pages/usuarios';
import Recetas from '../pages/recetas';
import Administracion from '../components/views/Administracion';

import Routes from './routes';

const PrincipalRoutes = () => {
    return (
        <>
            <SideMenu />
            <Switch>
                <Route exact path={Routes.Principal} component={Home} />
                <Route
                    exact
                    path={Routes.Equivalencias}
                    component={Equivalences}
                />
                <Route exact path={Routes.ImportarAlimentos} component={Food} />
                <Route exact path={Routes.Alimentos} component={Alimentos} />
                <Route exact path={Routes.Ejercicios} component={Ejercicios} />
                <Route
                    exact
                    path={`${Routes.Imports}/${Routes.Alimentos}`}
                    component={Food}
                />
                <Route
                    exact
                    path={Routes.Recordatorios}
                    component={Reminders}
                />
                <Route exact path={Routes.Metas} component={Metas} />
                <Route
                    exact
                    path={`${Routes.UsersDetails}/:id`}
                    component={UsersDetails}
                />
                <Route exact path={Routes.Imports} component={Imports} />
                <Route exact path={Routes.Exports} component={Exports} />
                <Route exact path={Routes.Recetas} component={Recetas} />
                <Route exact path={Routes.Administracion} component={Administracion} />
                <Redirect to={Routes.Principal} />
            </Switch>
        </>
    );
};

export default PrincipalRoutes;
