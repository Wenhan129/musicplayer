import axios from 'axios';

export const baseURL = 'http://localhost:4000/';

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err, 'Network Error.');
  }
);

export { axiosInstance };
