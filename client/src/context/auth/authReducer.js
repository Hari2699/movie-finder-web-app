import { LOGIN, LOGOUT } from "../types";

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('QlmVhATFWF', action.payload.token)
            return { ...state, user: action.payload.user, token: action.payload.token }
        
        case LOGOUT:
            localStorage.removeItem('QlmVhATFWF')
            return { ...state, user: null, token: null }
        default:
            return state;
    }
}

export default authReducer;
