import { http } from "@/utils/http";

type orderParams = {
  id: number;
};
type renewBody = {
  id: number;
  duration: number;
};
export function getOrders() {
  return http.request({
    url: "/api/order",
    method: "get"
  });
}

export function getOrder(params?: orderParams) {
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

export function endOrder(params?: orderParams) {
  return http.request({
    url: `/api/order/${params.id}/end`,
    method: "post"
  });
}

//充值
export function renewOrder(params?: renewBody) {
  return http.request({
    url: `/api/order/${params.id}/cancel`,
    method: "post",
    data: {
      duration: params.duration
    }
  });
}
