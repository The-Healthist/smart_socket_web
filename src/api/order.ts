import { http } from "@/utils/http";

export function getOrders(params: any) {
  return http.request({
    url: "/api/common/order",
    method: "get",
    params: params
  });
}

export function payOrder(params?: any) {
  return http.request({
    url: `/api/common/order/${params.uuid}/pay`,
    method: "post"
  });
}

export function getOrderOnPayMent(params?: any) {
  return http.request({
    url: `/api/common/order/${params.uuid}/ongoing_payment`,
    method: "get"
  });
}

export function getOrder(params?: any) {
  return http.request({
    url: `/api/common/order/${params.uuid}`,
    method: "get"
  });
}

export function AddOrder(data?: any) {
  return http.request({
    url: "/api/common/order",
    method: "post",
    data
  });
}

export function endOrder(params?: any) {
  return http.request({
    url: `/api/common/order/${params.uuid}/end`,
    method: "post"
  });
}

//充值
export function renewOrder(params?: any) {
  return http.request({
    url: `/api/common/order/${params.uuid}/renewal`,
    method: "post",
    data: {
      duration: params.duration
    }
  });
}
