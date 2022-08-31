import axios from '../config/axiosConfig';

const DatsanService = {

    handleGetList() {
        return axios.get('/api/datsan/get-list');
    },

    handleDatsan(data) {
        return axios.post('/api/datsan/insert', {data} );
    },
}

export default DatsanService;
