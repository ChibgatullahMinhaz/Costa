// src/utils/axiosSecure.js
import axios from "axios";
    // baseURL: "http://localhost:5000/"


const axiosSecurePublic = axios.create({
      baseURL: "https://backend-nu-orcin.vercel.app/"
});

export default axiosSecurePublic;
