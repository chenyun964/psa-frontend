import axios from 'axios';
import LoginModel from '../modules/authentication/LoginModel';

const axiosJwt = () => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        const token = LoginModel.retrieveToken();
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });

    instance.interceptors.response.use(function (response) {
        if (typeof response.data.code !== 'undefined') {
            if (response.data.code == '999') {
                LoginModel.destory().then(response => {
                    window.location.replace('/login?sesion=expired');
                })
                return;
            }
        } else {
            return response;
        }

    }, function (error) {
        return Promise.reject(error);
    });

    return instance;
};

export default axiosJwt();
