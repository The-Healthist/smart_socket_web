// import { http } from "@/utils/http";

// type ListResult = {
//   code: number;
//   message: string;
//   list: Array<any>;
// };

// export function getListApi(): Promise<ListResult> {
//   return http.request({
//     url: "/api/list/get",
//     method: "get"
//   });
// }

// export function getListApiError(data?: object): Promise<ListResult> {
//   return http.request({
//     url: "/api/list/error",
//     method: "post",
//     data
//   });
// }

// type formDataLogin = {
//   mobile: string;
//   password: string;
// };
// type formDataResigister = {
//   mobile: string;
//   password: string;
//   email?: string;
//   formData?: string;
//   token?: string;
// };
// export function Login(body: formDataLogin) {
//   return http.request({
//     url: "/api/common/login",
//     method: "post",
//     data: body
//   });
// }

// export function Register(body: formDataResigister) {
//   return http.request({
//     url: "/api/common/register",
//     method: "post",
//     data: body
//   });
// }

// export function guestUserLogin() {
//   return http.request({
//     url: "/api/common/login_guest",
//     method: "post"
//   });
// }

// type infoParams = {
//   id: string;
// };
// export const getSocketInfo = (params: infoParams): Promise<any> => {
//   return http.request({
//     url: `/api/socket/${params.id}`,
//     method: "get"
//   });
// };
// type orderParams = {
//   id: string;
// };
// type renewBody = {
//   id: string;
//   duration: number;
// };
// export function getOrders(params: any) {
//   return http.request({
//     url: "/api/order",
//     method: "get",
//     params: params
//   });
// }

// export function getOrder(params?: orderParams) {
//   return http.request({
//     url: `/api/order/${params.id}`,
//     method: "get"
//   });
// }

// // TODO: 订单创建以及获得支付二维码
// export function createOrder(data?: object) {
//   return http.request({
//     url: "/api/order",
//     method: "post",
//     data
//   });
// }

// export function endOrder(params?: orderParams) {
//   return http.request({
//     url: `/api/order/${params.id}/end`,
//     method: "post"
//   });
// }

// //充值
// export function renewOrder(params?: renewBody) {
//   return http.request({
//     url: `/api/order/${params.id}/renewal`,
//     method: "post",
//     data: {
//       duration: params.duration
//     }
//   });
// }
