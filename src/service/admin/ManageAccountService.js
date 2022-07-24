import axios from '../../config/axiosConfig';

const ManageAccountLoginService = {
    handleAddAccount(username, password, permission) {
        return axios.post('/api/account/insert', {username, password, permission} );
    },

    handleGetAccount() {
        return axios.get('/api/account/getaccount');
    },

    handleGetAccountUpdate(id) {
        return axios.post('/api/account/getaccountupdate', {id});
    },

    handleUpdateAccount(data) {
        return axios.post('/api/account/update', {data});
    },

    handleDeleteAccount(id) {
        return axios.post('/api/account/delete', {id});
    }
}

export default ManageAccountLoginService;
