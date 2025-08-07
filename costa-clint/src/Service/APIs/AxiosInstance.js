import axios from "axios";
      // baseURL: "https://backend-nu-orcin.vercel.app/"
const axiosSecureInstance = axios.create({
    baseURL: "http://localhost:5000/"

});

export default axiosSecureInstance;
