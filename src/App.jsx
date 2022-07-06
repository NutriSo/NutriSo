import MainLayout from './components/layouts/MainLayout';
import PathRoutes from './routes/PathRoutes';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import './styles/App.scss';
import 'antd/dist/antd.css';
import './styles/antd.less';
import '~slick-carousel/slick/slick.css';
import '~slick-carousel/slick/slick-theme.css';

require('dotenv').config();

function App() {
    return (
        <MainLayout>
            <PathRoutes />
        </MainLayout>
    );
}

export default App;
