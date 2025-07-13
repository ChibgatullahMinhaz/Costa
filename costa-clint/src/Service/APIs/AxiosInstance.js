import axios from "axios";
//   baseURL: "http://localhost:5000/"
const axiosSecureInstance = axios.create({
      baseURL: "https://backend-nu-orcin.vercel.app/"
  
});

export default axiosSecureInstance;
