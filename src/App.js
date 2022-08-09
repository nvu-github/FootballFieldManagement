import React from 'react';
import { BrowserRouter, Switch, useLocation , Redirect} from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import { connect } from "react-redux";
import sha1 from 'sha1';
import  { ReactNotifications }  from 'react-notifications-component';

// component
import LoadPage from './components/elements/LoadPage';

// Layouts
import LayoutAdmin from './layouts/LayoutAdmin';
import LayoutUser from './layouts/LayoutUser';

// authentication redux
import { userIsAuthenticated, userIsNotAuthenticated } from './hoc/authentication';

// Views 
import Login from './views/Login';
import Register from './views/Register';
import NotFound from './views/NotFound';

// stylesheet
import './App.css';
import "./assets/admin/scss/paper-dashboard.scss";
import "./assets/admin/demo/demo.css";
import "bootstrap/dist/css/bootstrap.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import 'react-confirm-alert/src/react-confirm-alert.css';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";    
import 'react-notifications-component/dist/theme.css';

import { routes } from './routes';


const App = (props) => {
    const location = useLocation();
    const checkRoutes = routes.some(item => location.pathname ===  item.path);
    const noRoutes = ['/login', '/notfound', '/register'];

    return (
        <BrowserRouter>
            <ReactNotifications />
            <Switch>
                <AppRoute path='/login' component={userIsNotAuthenticated(Login)} layout={LayoutUser} />
                <AppRoute path='/register' component={userIsNotAuthenticated(Register)} layout={LayoutUser} />
                <AppRoute path='/notfound' component={NotFound} layout={LayoutUser} /> 
                {(!noRoutes.includes(location.pathname) && (checkRoutes === false)) 
                && <Redirect to="notfound" />}
                {routes.map((prop, key) => {
                    if (props.dataLogin && prop.auth === true) {
                        if ((props.dataLogin.permission === sha1(prop.permission))) {
                            return (
                                <AppRoute
                                    path={prop.path}
                                    component={userIsAuthenticated(prop.component)}
                                    layout={LayoutAdmin}
                                    key={key}
                                />
                            );
                        }
                    }
                    if (prop.auth === false) {
                        return (
                            <AppRoute
                                path={prop.path}
                                component={prop.component}
                                layout={LayoutUser}
                                key={key}
                            />
                        );
                    }
                    return null;
                })}
            </Switch>
            <LoadPage />
        </BrowserRouter>
    );
}

const mapStateToProps = state => {
    return {
        dataLogin: state.userLogin.userInfo
    }
};

export default connect(mapStateToProps)(App);