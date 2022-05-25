import MainLayout from './components/layouts/MainLayout';
import PathRoutes from './routes/PathRoutes';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import './styles/App.scss';
import 'antd/dist/antd.css';

require('dotenv').config();

function App() {
    return (
        <MainLayout>
            <PathRoutes />
        </MainLayout>
    );
}

export default App;
