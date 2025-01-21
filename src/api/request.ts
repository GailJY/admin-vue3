import axios, { type AxiosInstance, type AxiosResponse, type AxiosRequestConfig , type AxiosError } from 'axios';
import { type ErrorResponse} from '@/api/types';
import { MessagePlugin } from 'tdesign-vue-next';
import { useAppStore } from '@/store';

const BASE_URL:string = import.meta.env.VITE_API_BASE_URL;

const instance:AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
const tokenPrefix = 'Bearer '

instance.interceptors.request.use((request: AxiosRequestConfig) => {
  const appStore = useAppStore();
  if(appStore.token && request.headers){
    request.headers.Authorization = tokenPrefix + appStore.token;
  }
  return request;
})

instance.interceptors.response.use( (response: AxiosResponse) =>{
  return response.data;
}, async (error:AxiosError<ErrorResponse>) => {
  const responseData: ErrorResponse | undefined = error.response?.data;
  responseData && await MessagePlugin.error(responseData.message);

  if(error.response?.status === 401){
    const appStore = useAppStore();
    await appStore.loginout();
  }
  return Promise.reject(error);
})

export default instance;