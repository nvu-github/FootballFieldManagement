import axios from '../config/axiosConfig';

const LoginService = {
    handleLogin(username, password) {
        return axios.post('/api/login/dangnhap', {username, password} );
    }
}

export default LoginService;
