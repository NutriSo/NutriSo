import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/PathRoutes';

import { Provider } from 'react-redux';
import stores from './redux/Store';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import './styles/App.scss';
import 'antd/dist/antd.css';

const { store, persister } = stores();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persister}>
                <Routes />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
