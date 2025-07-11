import axios from "axios";

const axiosSecureInstance = axios.create({
    //   baseURL: "https://backend-nu-orcin.vercel.app/"
    baseURL: "http://localhost:5000/"
});

export default axiosSecureInstance;
