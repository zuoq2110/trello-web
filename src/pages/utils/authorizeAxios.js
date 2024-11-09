import axios from 'axios'
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from './formatters';

//Khởi tạo 1 đối tượng axios mục đích để custom và cấu hình chung cho dự án
let authorizeAxiosInstance = axios.create()
//Thoi gian cho toi da cua 1 request: de toi da 10p
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10
//withCredentials: se cho phep axios tu dong gui cookie trong moi request len BE( phuc vu viec
//chung ta se luu JWT tokens (refresh & access) vao trong httpOnly Cookie cua trinh duyet)
authorizeAxiosInstance.defaults.withCredentials = true

//Cấu hình interceptor
// Interceptor Request: Can thiệp vào những cái request api
authorizeAxiosInstance.interceptors.request.use((config) => {
  // Do something before request is sent
  interceptorLoadingElements(true)
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

// Interceptor Response: Can thiệp vào những cái response nhận về
authorizeAxiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  interceptorLoadingElements(false)

  return response
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  interceptorLoadingElements(false)
  // Do something with response error
  let errorMessage = error?.message
  if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }
  if (error.response?.status !== 410) {
    toast.error(errorMessage)
  }

  return Promise.reject(error);
});

export default authorizeAxiosInstance