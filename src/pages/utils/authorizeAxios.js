import axios from 'axios'
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from './formatters'
import { logoutUserApi } from '~/redux/user/userSlice';
import { refreshTokenApi } from '~/apis';

//Khong the import { store } from '~/redux/store theo cach thong thuong o day
//Giai phap: Inject store: la kyx thuat  khi can su dung bien redux store o cac file ngoai pham vi component
//nhu file authorizeAxios hien tai
//Hieu don gian khi ung dung bat dau chay len, code se chay vao main.jsx dau tien, tu ben do chung ta goi
//ham injectStore ngay lap tuc de gan bien mainStore vao bien axiosReduxStore cuc bo trong file nay.
let axiosReduxStore
export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}
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

//Khoi tao 1 cai promise cho viec goi api refresh_token
//Muc dich tao Promise nay de khi nao goi api refresh_token xong xuoi thi moi retry lai nhieu api bi loi truoc do
let refreshTokenPromise = null

// Interceptor Response: Can thiệp vào những cái response nhận về
authorizeAxiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  interceptorLoadingElements(false)

  return response
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  interceptorLoadingElements(false)

  // Quan trong: xu ly refresh token tu dong
  //TH1: Neu nhu nhan ma 401 tu BE thi goi api dang xuat luon
  if (error.response?.status === 401) {
    axiosReduxStore.dispatch(logoutUserApi(false))
  }

  //TH2: Neu nhu nhan ma 410 tu BE, thi se goi api refresh token de lam moi lai accessToken
  //Dau tien lay dc cac request API dang bi loi thong qua error.config
  const originalRequests = error.config
  if (error.response?.status === 410 && !originalRequests._retry) {
    originalRequests._retry = true

    //Kiem tra xem neu chua co refreshTokenPromise thi thuc hien gan viec goi api refresh_token dong thoi
    //gan vao cho cai refreshTokenPromise
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenApi()
        .then(data => {
          //dong thoi accessToken da nam trong httpOnly cookie (xu ly phia BE)
          return data?.accessToken
        })
        .catch((_error) => {
          //Neu nhan bat ky loi nao tu api refrsh token thi logout luon
          axiosReduxStore.dispatch(logoutUserApi(false))
          return Promise.reject(_error)
        })
        .finally(() => {
          //Du api co ok hay loi thi van luon gan lai cai refreshTokenPromise ve null nhu ban dau
          refreshTokenPromise = null
        })
    }
    //can return truong hop refreshTokenPromise chay thanh cong va xu ly them o day:
    // eslint-disable-next-line no-unused-vars
    return refreshTokenPromise.then(accessToken => {
      //B1: doi voi TH neu du an luu accessToken vao localstorage hoa o dau do thi se viet them code o day
      //Hien tai o day ko can b1 vi chung ta da dua accessToken vao cookie(xu ly phia BE) sau khi api
      //refrshToken duoc goi thanh cong

      //B2: return lai axios instance cua chung ta ket hop voi cac originalRequests de goi lai nhung
      //api ban dau bi loi
      return authorizeAxiosInstance(originalRequests)
    })
  }
  // Do something with response error
  let errorMessage = error?.message
  if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }
  if (error.response?.status !== 410) {
    toast.error(errorMessage)
  }

  return Promise.reject(error)
})

export default authorizeAxiosInstance