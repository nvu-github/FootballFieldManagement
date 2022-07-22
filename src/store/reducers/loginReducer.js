import actionTypes from '../actions/actionTypes';

const initialState = {
    isLogin: false,
    userInfo: null
};
  
const userLogin = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return { 
                ...state, 
                isLogin: true,
                userInfo: action.userInfo
            }

        case actionTypes.USER_LOGOUT:
            return { 
                ...state, 
                isLogin: false,
                userInfo: null
            }

        default:
            return state;
    }
};

export default userLogin;
  