import axios from "axios";
import { getAuth } from "firebase/auth";
const axiosSecureInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,

});

axiosSecureInstance.interceptors.request.use(
    async (config) => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const token = await user.getIdToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        } catch (error) {
            console.error("Failed to get Firebase token:", error);
            return config;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosSecureInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.error("Unauthorized access - logging out");
        }
        return Promise.reject(error);
    }
);


export default axiosSecureInstance;
