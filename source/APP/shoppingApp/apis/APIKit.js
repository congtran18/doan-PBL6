import axios from "axios";

let APIKit = axios.create({
  // baseURL: 'http://localhost:5000/api/'
  baseURL: "http://192.168.1.3:5000/api/",
  // baseURL: 'http://10.0.1.1:5000/api/'
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token) => {
  APIKit.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("setClientToken:", config);
    return config;
  });
};

// Alter defaults after instance has been created
// APIKit.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default APIKit;
