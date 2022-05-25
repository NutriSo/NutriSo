import { ADD_AUTHORIZATIONS, SIGN_OUT } from '../Constants';

const initialState = {
    token: '',
    isLoggedIn: false,
    username: '',
    id: '',
};

const authorizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_AUTHORIZATIONS:
            return {
                ...state,
                token: action.payload.token,
                isLoggedIn: true,
                username: action.payload.name,
                id: action.payload.id,
            };
        case SIGN_OUT:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default authorizationReducer;
