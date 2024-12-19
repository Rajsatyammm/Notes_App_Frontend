import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://notes-app-backend-55ff.onrender.com/',
    // baseURL: 'http://localhost:5000',
});

export default axiosInstance;
