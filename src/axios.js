import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://notes-app-backend-p5ln.onrender.com',
});

export default axiosInstance;
