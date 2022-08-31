import axios from "../config/axiosConfig";

const SystemService = {
    handleGetAccountUser() {
        return axios.get('api/system/getinfo');
    },

    handleChangeStatusNotification(id) {
        return axios.post('api/system/change-status', {id});
    }
}

export default SystemService;   