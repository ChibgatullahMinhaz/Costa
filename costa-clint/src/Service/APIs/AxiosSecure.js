// src/utils/axiosSecure.js
import axios from "axios";
//     baseURL: "https://backend-nu-orcin.vercel.app/"

const instance = axios.create({
  baseURL: "http://localhost:5000/"

});

export default instance;
