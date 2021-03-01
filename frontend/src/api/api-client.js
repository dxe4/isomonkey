
import axios from 'axios';

// TODO pick from settings
const HOST = 'http://localhost:8000/'


const _authHeaderFromUser = () => {
    let user = localStorage.getItem('user');

    if (!user || !JSON.parse(user)) {
        return;
    }

    const token = JSON.parse(user).token
    return  `Bearer ${token}`;
}

const _setupAuthHeader = (config) => {
    const authHeader = _authHeaderFromUser();

    if (authHeader) {
        config.headers['Authorization'] = authHeader;
    }

    return config
}

axios.interceptors.request.use(function (config) {
    config = _setupAuthHeader(config);

    const currentUrl = config.url;
    config.url = `${HOST}${currentUrl}`

    return config;
}, function (error) {
    return Promise.reject(error);
});


export default axios;
