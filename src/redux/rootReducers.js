import { combineReducers } from 'redux';

import authorizationReducer from './reducers/authorizationReducer';

const rootReducer = combineReducers({
    authorizationStore: authorizationReducer,
});

export default rootReducer;
