import axios from "axios";

// This is the global configuration for the whole app
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:3002";
axios.defaults.withCredentials = true;

export default axios;
