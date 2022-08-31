import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from './App';
import * as serviceWorker from './serviceWorker';
import NotificationProvider from './context/NotificationProvider';

import './assets/scss/style.scss';
import './assets/style/style.scss';

import { Provider } from 'react-redux';
import reduxStore from './store';


const renderApp = (props) => {
    const history = createBrowserHistory();
    ReactDOM.render(
        <Provider store={reduxStore}>
            <Router history={history}>
                <NotificationProvider>
                    <App />
                </NotificationProvider>
            </Router>
        </Provider>,
        document.getElementById('root')
    );
}   
renderApp();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
