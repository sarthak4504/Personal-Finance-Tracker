import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                /*

                if (error.response.status === 401) {
                // Redirect to login page
                window.location.href = '/login'; // this caused the page to reload, which is not ideal in a React app so changed it with a component-based approach
                } 

                */

                // Don't reload, just log
                console.warn('Unauthorized - handled by component.');
                // TODO: if needed clear token if needed:
            } else if (error.response.status === 500) {
                console.error('Server error. Please try again later.');
            }
        } else if (error.code === 'ECONNABORTED') {
            console.error('Request timeout. Please try again.');
        }
        return Promise.reject(error); // Let component handle it
    }
);

export default axiosInstance;
