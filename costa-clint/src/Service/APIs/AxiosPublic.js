// src/utils/axiosSecure.js
import axios from "axios";


const axiosSecurePublic = axios.create({
      baseURL: "https://backend-nu-orcin.vercel.app/"
    // baseURL: "http://localhost:5000/"
});

export default axiosSecurePublic;
