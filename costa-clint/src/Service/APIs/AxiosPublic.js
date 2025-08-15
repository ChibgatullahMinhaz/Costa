// src/utils/axiosSecure.js
import axios from "axios";

const axiosSecurePublic = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,

});

export default axiosSecurePublic;
