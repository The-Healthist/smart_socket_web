import Axios, {
  type AxiosInstance, // 引入 Axios 实例类型
  type AxiosError, // 引入 Axios 错误类型
  type AxiosResponse, // 引入 Axios 响应类型
  type AxiosRequestConfig // 引入 Axios 请求配置类型
} from "axios";
// import { ContentTypeEnum, ResultEnum } from "@/enums/requestEnum"; // 引入请求相关的枚举
import { ContentTypeEnum } from "@/enums/requestEnum"; // 引入请求相关的枚举
import NProgress from "../progress"; // 引入进度条插件
import { showFailToast } from "vant"; // 引入 Vant 库中的提示函数
import "vant/es/toast/style"; // 引入 Vant 库中的提示样式

// 默认 axios 实例请求配置
const configDefault = {
  headers: {
    "Content-Type": ContentTypeEnum.JSON // 设置默认的请求头 Content-Type 数据请求格式
  },
  timeout: 5000, // 请求超时时间，0 表示不超时
  baseURL: "/", // 基础 URL，通过环境变量配置
  data: {}
};

class Http {
  // 当前实例
  private static axiosInstance: AxiosInstance; // Axios 实例
  // 请求配置
  private static axiosConfigDefault: AxiosRequestConfig; // 默认请求配置

  // 请求拦截
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      config => {
        NProgress.start(); // 开始进度条
        // 发送请求前，可在此携带 token
        // if (token) {
        //   config.headers['token'] = token
        // }
        return config;
      },
      (error: AxiosError) => {
        showFailToast(error.message); // 显示错误提示
        return Promise.reject(error); // 返回拒绝的 Promise
      }
    );
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        NProgress.done(); // 结束进度条
        // 与后端协定的返回字段
        // const { code, result } = response.data;
        // // const { message } = response.data;
        // // 判断请求是否成功
        // const isSuccess =
        //   result &&
        //   Reflect.has(response.data, "code") &&
        //   code === ResultEnum.SUCCESS;
        // if (isSuccess) {
        //   return result; // 返回成功结果
        // } else {
        //   // 处理请求错误
        //   // showFailToast(message);
        //   return Promise.reject(response.data); // 返回拒绝的 Promise
        // }
        return response.data;
      },
      (error: AxiosError) => {
        NProgress.done(); // 结束进度条
        // 处理 HTTP 网络错误
        let message = "";
        // HTTP 状态码
        const status = error.response?.status;
        switch (status) {
          case 400:
            message = "请求错误";
            break;
          case 401:
            message = "未授权，请登录";
            break;
          case 403:
            message = "拒绝访问";
            break;
          case 404:
            message = `请求地址出错: ${error.response?.config?.url}`;
            break;
          case 408:
            message = "请求超时";
            break;
          case 500:
            message = "服务器内部错误";
            break;
          case 501:
            message = "服务未实现";
            break;
          case 502:
            message = "网关错误";
            break;
          case 503:
            message = "服务不可用";
            break;
          case 504:
            message = "网关超时";
            break;
          case 505:
            message = "HTTP版本不受支持";
            break;
          default:
            message = "网络连接故障";
        }

        showFailToast(message); // 显示错误提示
        return Promise.reject(error); // 返回拒绝的 Promise
      }
    );
  }

  constructor(config: AxiosRequestConfig) {
    Http.axiosConfigDefault = config; // 设置默认请求配置
    Http.axiosInstance = Axios.create(config); // 创建 Axios 实例
    this.httpInterceptorsRequest(); // 配置请求拦截器
    this.httpInterceptorsResponse(); // 配置响应拦截器
  }

  // 通用请求函数
  public request<T>(paramConfig: AxiosRequestConfig): Promise<T> {
    const config = { ...Http.axiosConfigDefault, ...paramConfig }; // 合并默认配置和传入配置
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config) // 发送请求
        .then((response: any) => {
          resolve(response); // 请求成功，返回结果
        })
        .catch(error => {
          reject(error); // 请求失败，返回错误
        });
    });
  }
}

export const http = new Http(configDefault); // 创建 Http 实例并导出
