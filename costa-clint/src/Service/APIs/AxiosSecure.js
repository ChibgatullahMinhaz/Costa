// src/utils/axiosSecure.js
import axios from "axios";


const instance = axios.create({
  baseURL: "https://backend-nu-orcin.vercel.app/"
});

export default instance;
