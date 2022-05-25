import { ADD_AUTHORIZATIONS, SIGN_OUT } from '../Constants';

export const addAuthorizationAction = (payload) => {
    return {
        type: ADD_AUTHORIZATIONS,
        payload,
    };
};

export const signOutAction = (payload) => {
    return {
        type: SIGN_OUT,
        payload,
    };
};
