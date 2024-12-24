//axios instance with jwt interceptor
import axios from "axios";

const api = axios.create({
    //baseURL:"http://localhost:5000/api"
    baseURL:"https://online-assessment-backend-m1e6.onrender.com/",
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    const role = localStorage.getItem("role");
    if (role) {
        config.headers.role = role;
    }

    return config;
},
(error) => Promise.reject(error)
);

export default api;