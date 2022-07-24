import React from 'react';
import { BrowserRouter, Switch, useLocation , Redirect} from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ReactGA from 'react-ga'; 

// Layouts
// import LayoutDefault from './layouts/LayoutDefault';
import LayoutAdmin from './layouts/LayoutAdmin';
import { userIsAuthenticated, userIsNotAuthenticated } from './hoc/authentication';

// Views 
// import Home from './views/Home';
// import HomAdmin from './views/HomAdmin';
// import MangerAccount from './views/admin/AccountManage';
import Login from './views/Login';
import Register from './views/Register';
import NotFound from './views/NotFound';

// Css
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import "./assets/admin/scss/paper-dashboard.scss";
import "./assets/admin/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

import routes from './routes';

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const App = (props) => {
    const location = useLocation();
    const checkNotFound = routes.some(item => location.pathname === (item.layout + item.path));
    return (
        <BrowserRouter>
            <Switch>
                <AppRoute path='/login' component={userIsNotAuthenticated(Login)} layout={LayoutAdmin} />
                <AppRoute path='/register' component={userIsNotAuthenticated(Register)} layout={LayoutAdmin} />
                <AppRoute path='/notfound' component={NotFound} layout={LayoutAdmin} />
                {(location.pathname !== '/notfound' && checkNotFound === false) && <Redirect to="notfound" />}
                {routes.map((prop, key) => {
                    return (
                        <AppRoute
                            path={prop.layout + prop.path}
                            component={userIsAuthenticated(prop.component)}
                            layout={LayoutAdmin}
                            key={key}
                        />
                    );
                })}
            </Switch>
        </BrowserRouter>
    );
}

export default App;