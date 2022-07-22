import {combineReducers} from 'redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import application from "./application";
import loginReducer from "./loginReducer";

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'userLogin',
    whitelist: ['isLogin', 'userInfo']
};

export default () => combineReducers({
    userLogin: persistReducer(userPersistConfig, loginReducer),
    app: application
})