import actionTypes from './actionTypes';

export  const LoginUser = (userInfo) => ({
        type: actionTypes.USER_LOGIN,
        userInfo: userInfo
})
    
export const LogoutUser = () => ({
        type: actionTypes.USER_LOGOUT
})
