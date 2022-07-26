import axios from '../config/axiosConfig';

const LoginService = {
    handleLogin(username, password) {
        return axios.post('/api/login/dangnhap', {username, password} );
    },

    handleRegister(data) {
        return axios.post('/api/login/register', {data});
    }
}

export default LoginService;
