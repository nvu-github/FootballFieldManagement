import actionTypes from '../actions/actionTypes';

const initialState = {
    data: {},
    loading: false,
    statusmodal: false,
    count_notify: 0,
    data_notify: null
};
  
const application = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_LOADER:
            return { ...state, loading: true };

        case actionTypes.HIDE_LOADER:
            return { ...state, loading: false };

        case actionTypes.SHOW_MODAL:
            return {...state, statusmodal: true};

        case actionTypes.HIDE_MODAL:
            return {...state, statusmodal: false};

        case actionTypes.NOTIFY_ON:
            return {
                ...state, 
                count_notify: action.count_notify
            };

        case actionTypes.NOTIFY_OFF:
            return {
                ...state, 
                count_notify: 0
            };
        default:
        return state;
    }
};

export default application;
  