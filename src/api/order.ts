import { http } from "@/utils/http";

export function getOrders() {
  return http.request({
    url: "/api/order",
    method: "get"
  });
}

export function getOrder(params?: any) {
  return http.request({
    url: `/api/order/${params.id}`,
    method: "get"
  });
}

// TODO: 订单创建以及获得支付二维码
export function createOrder(data?: object) {
  return http.request({
    url: "/api/order",
    method: "post",
    data
  });
}

export function endOrder(params?: any) {
  return http.request({
    url: `/api/order/${params.id}/end`,
    method: "post"
  });
}

//充值
export function renewOrder(params?: any) {
  return http.request({
    url: `/api/order/${params.id}/cancel`,
    method: "post",
    data: {
      duration: params.duration
    }
  });
}
