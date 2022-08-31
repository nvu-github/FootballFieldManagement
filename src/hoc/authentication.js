import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
// import jwt from "jsonwebtoken";

const locationHelper = locationHelperBuilder({});

// const checkVerify = () => {
//     try {
//         if (localStorage.getItem("token")) {
//             jwt.verify(JSON.parse(localStorage.getItem("token"))['refreshToken'], process.env.REACT_APP_SECRETVERIFY);
//             return true;
//         } else {
//             return false;
//         }
//     } catch (e) {
//         return false;
//     }
// }

export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.userLogin.isLogin,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login'
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.userLogin.isLogin,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false
});