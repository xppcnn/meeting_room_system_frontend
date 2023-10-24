import useUserInfoStore from "@/stores/userInfo";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";
interface ResponseData<T = unknown> {
  code: number;
  message: string;
  data: T;
}
export const instance = axios.create({
  baseURL: "/api",
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.url !== "/api/user/login") {
    const token = useUserInfoStore.getState().userInfo?.accessToken;
    if (token) {
      config.headers.Authorization = token;
    }
  }
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    if (data.code === 200) {
      return response;
    } else {
      toast.error(data?.message || "系统错误");
      return response;
    }
  },
  (error: AxiosError<ResponseData>) => {
    const { response } = error;
    if (response?.status === 500) {
      toast.error("系统响应错误");
    }
    if (response?.status === 400 && response.data.code === 400) {
      toast.error(response.data.message || "参数校验错误");
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

const request = async <T = unknown>(
  config: AxiosRequestConfig
): Promise<ResponseData<T>> => {
  const { data } = await instance.request(config);
  return data;
};

export default request;
