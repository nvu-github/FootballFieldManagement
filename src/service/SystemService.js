import axios from "../config/axiosConfig";

const SystemService = {
    handleGetAccountUser() {
        return axios.get('api/system/getinfo');
    }
}

export default SystemService;   