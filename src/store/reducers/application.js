import actionTypes from '../actions/actionTypes';

const initialState = {
    data: {},
    loading: false,
    statusmodal: false
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
        default:
        return state;
    }
};

export default application;
  