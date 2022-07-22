import thunkMiddleware from "redux-thunk";

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';

import createRootReducer from './store/reducers/rootReducer';

const environment = process.env.NODE_ENV || "development";
let isDevelopment = environment === "development";

//hide redux logs
isDevelopment = false;

const rootReducer = createRootReducer();
const composeEnhancers = (isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const reduxStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
)

export const persistor = persistStore(reduxStore);

export default reduxStore;