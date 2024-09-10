import Axios, {
  type AxiosInstance, // Axios 实例的类型定义
  type AxiosError, // Axios 错误的类型定义
  type AxiosResponse, // Axios 响应的类型定义
  type AxiosRequestConfig // Axios 请求配置的类型定义
} from "axios";
import { ContentTypeEnum } from "@/enums/requestEnum"; // 导入内容类型枚举
import NProgress from "../progress"; // 导入进度条组件
import { showFailToast } from "vant"; // 导入 Vant 的错误提示组件
import "vant/es/toast/style"; // 导入 Vant 提示组件的样式
import { useRouter } from "vue-router";
import { guestUserLogin } from "@/api/auth";

// 默认的 Axios 实例请求配置
const configDefault = {
  headers: {
    "Content-Type": ContentTypeEnum.JSON // 设置默认的请求头 Content-Type 为 JSON
  },
  timeout: 5000, // 请求超时时间，单位为毫秒
  baseURL: "/", // 基础 URL，所有请求都会基于此 URL
  data: {} // 默认的请求数据，通常为空对象
};

const router = useRouter();

class Http {
  // 静态属性，用于存储 Axios 实例
  private static axiosInstance: AxiosInstance;
  // 静态属性，用于存储默认请求配置
  private static axiosConfigDefault: AxiosRequestConfig;

  // 请求拦截器方
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      config => {
        NProgress.start(); // 开始显示进度条
        // 从本地存储获取 token
        const token = localStorage.getItem("common_token");

        if (token) {
          // 如果 token 存在，将其添加到请求头的 Authorization 字段中
          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          guestUserLogin().then((res: any) => {
            localStorage.setItem("common_token", res.token);
          });
        }
        return config;
      },
      (error: AxiosError) => {
        showFailToast(error.message); // 显示错误提示
        return Promise.reject(error); // 返回一个被拒绝的 Promise
      }
    );
  }

  // 响应拦截器方法
  private httpInterceptorsResponse(): void {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        NProgress.done(); // 结束进度条显示
        // 这里可以根据后端的响应结构进行自定义处理
        // 目前直接返回响应的 data 部分
        return response.data;
      },
      (error: AxiosError) => {
        NProgress.done(); // 结束进度条显示
        // 处理 HTTP 网络错误
        let message = "";
        // 根据 HTTP 状态码设置错误信息
        const status = error.response?.status;
        switch (status) {
          case 400:
            message = "请求错误";
            break;
          case 401:
            {
              message = "未授权，请登录";
              router.push({ name: "Login" });
            }

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
        return Promise.reject(error); // 返回一个被拒绝的 Promise
      }
    );
  }

  // 构造函数
  constructor(config: AxiosRequestConfig) {
    Http.axiosConfigDefault = config; // 设置默认请求配置
    Http.axiosInstance = Axios.create(config); // 创建 Axios 实例
    this.httpInterceptorsRequest(); // 配置请求拦截器
    this.httpInterceptorsResponse(); // 配置响应拦截器
  }

  // 通用请求方法
  public request<T>(paramConfig: AxiosRequestConfig): Promise<T> {
    // 合并默认配置和传入的配置
    const config = { ...Http.axiosConfigDefault, ...paramConfig };
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response); // 请求成功，返回结果
        })
        .catch(error => {
          reject(error); // 请求失败，返回错误
        });
    });
  }
}

// 创建 Http 实例并导出，使用默认配置
export const http = new Http(configDefault);
