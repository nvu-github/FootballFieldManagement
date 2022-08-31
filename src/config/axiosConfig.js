import axios from 'axios';
// import _ from 'lodash';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
    headers: {
        'content-type': 'application/json',
    },
});
    
instance.interceptors.request.use(
    req => {
        const accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token'))['accessToken'] : null;
        if (accessToken) {
            req.headers["x-access-token"]= accessToken;
        }
        return req;
    },
    err => {return Promise.reject(err)}    
);

instance.interceptors.response.use(
    res => {
        return res
    },
    err => {
        const status = err.response ? err.response.status : '';
        const originalReq = err.config;
        if (status === 401) {
            if (!localStorage.getItem('token')) {
                localStorage.removeItem('persist:userLogin');
                window.location.replace('/login');
            }
            return axios.post(process.env.REACT_APP_BACKEND_URL+'/api/login/auth/refreshToken', {refreshToken: JSON.parse(localStorage.getItem('token'))['refreshToken']})
            .then((res) => {
                const dataToken = {
                    accessToken: res.data.token,
                    refreshToken: res.data.tokenRefresh
                }
                localStorage.setItem('token', JSON.stringify(dataToken));
                err.config.headers.authorization = dataToken.accessToken;
                return instance(originalReq);
            })
            .catch((err) => {
                console.log('err', 'refreshToken fail');
                localStorage.removeItem('token');
                localStorage.removeItem('persist:userLogin');
                window.location.replace('/login');
            });
        }
        return Promise.reject(err)
    }
);

export default instance;
