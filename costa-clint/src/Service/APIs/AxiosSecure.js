// src/utils/axiosSecure.js
import axios from "axios";


// baseURL: "http://localhost:5000/"
const instance = axios.create({
  baseURL: "https://backend-nu-orcin.vercel.app/"

});

export default instance;
