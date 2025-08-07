// src/utils/axiosSecure.js
import axios from "axios";
    // baseURL: "http://localhost:5000/"
    //   baseURL: "https://backend-nu-orcin.vercel.app/"


const axiosSecurePublic = axios.create({
      baseURL: "http://localhost:5000/"
});

export default axiosSecurePublic;
